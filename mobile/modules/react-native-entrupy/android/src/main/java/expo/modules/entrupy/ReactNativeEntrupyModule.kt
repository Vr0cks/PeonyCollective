package expo.modules.entrupy

import android.app.Application
import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import com.entrupy.sdk.app.EntrupyApp
import com.entrupy.sdk.model.METADATA_KEY_BRAND
import com.entrupy.sdk.model.METADATA_KEY_ITEM_TYPE
import com.entrupy.sdk.model.METADATA_KEY_CUSTOMER_ITEM_ID
import com.entrupy.sdk.listeners.SdkLoginCallback
import com.entrupy.sdk.listeners.CaptureCallback

/**
 * ReactNativeEntrupyModule
 *
 * Entrupy Android SDK'sını Expo native modülü olarak sararlar.
 * Expo Module API üzerinden JS tarafına şu fonksiyonları açar:
 *  - generateSDKAuthorizationRequest(): SDK'nın imzalanmak üzere ürettiği auth isteği
 *  - loginUser(signedRequest): Backend'den dönen imzalı token ile SDK oturumu açar
 *  - startCapture(brand, itemType, customerItemId): Rehberli kamera akışını başlatır
 */
class ReactNativeEntrupyModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ReactNativeEntrupy")

    // SDK'yı uygulama başlarken initialize et
    OnCreate {
      val app = appContext.reactContext?.applicationContext as? Application
      if (app != null) {
        try {
          EntrupyApp.init(app)
          Log.d("EntrupyModule", "✦ Entrupy SDK başarıyla initialize edildi.")
        } catch (e: Exception) {
          Log.e("EntrupyModule", "✦ Entrupy SDK initialize hatası", e)
        }
      } else {
        Log.w("EntrupyModule", "✦ Application context bulunamadı — SDK initialize edilemedi.")
      }
    }

    /**
     * SDK'nın backend'e imzalatmak üzere ürettiği şifreli authorization request stringi döner.
     * Bu string backend proxy'ye gönderilir, Entrupy API tarafından imzalanır ve geri gelir.
     */
    Function("generateSDKAuthorizationRequest") {
      try {
        val entrupyApp = EntrupyApp.sharedInstance()
        val request = entrupyApp.generateSDKAuthorizationRequest()
        Log.d("EntrupyModule", "✦ SDK Authorization Request üretildi.")
        return@Function request
      } catch (e: Exception) {
        Log.e("EntrupyModule", "✦ generateSDKAuthorizationRequest hatası", e)
        throw e
      }
    }

    /**
     * Backend'den alınan imzalı request ile SDK kullanıcı oturumu açar.
     * Başarılı → promise.resolve(true)
     * Hatalı   → promise.reject("LOGIN_ERROR", ...)
     *
     * NOT: loginUser fire-and-forget da kullanılabilir ama biz callback kullanıyoruz
     * çünkü JS tarafı oturumun açıldığını onaylamadan startCapture'a geçmemeli.
     */
    AsyncFunction("loginUser") { signedRequest: String, promise: Promise ->
      try {
        val entrupyApp = EntrupyApp.sharedInstance()
        entrupyApp.loginUser(signedRequest, object : SdkLoginCallback {
          override fun onLoginStarted() {
            Log.d("EntrupyModule", "✦ Entrupy SDK login başladı...")
          }

          override fun onLoginSuccess(expirationTime: Long) {
            Log.d("EntrupyModule", "✦ Entrupy SDK login başarılı. Token süresi: $expirationTime")
            promise.resolve(true)
          }

          override fun onLoginError(errorCode: Int, description: String, localizedDescription: String) {
            Log.e("EntrupyModule", "✦ Entrupy SDK login hatası: $description (kod: $errorCode)")
            promise.reject("LOGIN_ERROR", "Entrupy login hatası: $description (kod: $errorCode)", Exception(description))
          }
        })
      } catch (e: Exception) {
        Log.e("EntrupyModule", "✦ loginUser exception", e)
        promise.reject("LOGIN_EXCEPTION", e.message ?: "Bilinmeyen hata", e)
      }
    }

    /**
     * Entrupy rehberli kamera akışını (Capture Flow) başlatır.
     *
     * ÖNEMLI: startCapture, tam ekran bir Activity başlatır.
     * - onCaptureStarted → SDK UI ekranda göründü (henüz tamamlanmadı)
     * - onCaptureError   → Hata oluştu, promise reject edilir
     * - onFallbackOpened → Marka fallback menüsü açıldı (SDK devam ediyor)
     *
     * Promise SADECE hata durumunda reject, yoksa SDK kendi navigation'ını yönetir.
     * JS tarafı await yapmaz — fire-and-forget olarak davranmak gerekir.
     * Bu nedenle startCapture'ı JS tarafında try/catch ile sarmalamalı ve
     * SDK kapanınca (Activity sonuçlanınca) devam etmeli.
     *
     * @param brand           Marka adı (örn. "gucci", "louis vuitton") — küçük harf önerilir
     * @param itemType        Ürün tipi (örn. "handbag", "outerwear") — Entrupy kataloğuna uygun olmalı
     * @param customerItemId  Bizim sistemdeki ürün ID'si — webhook'ta geri gelecek
     */
    AsyncFunction("startCapture") { brand: String, itemType: String, customerItemId: String, promise: Promise ->
      try {
        val entrupyApp = EntrupyApp.sharedInstance()

        // Oturum geçerlilik kontrolü
        if (!entrupyApp.isAuthorizationValid()) {
          Log.w("EntrupyModule", "✦ Entrupy authorization geçerli değil veya süresi dolmuş.")
          promise.reject("UNAUTHORIZED", "Entrupy authorization geçersiz. Lütfen önce loginUser çağrısı yapın.", null)
          return@AsyncFunction
        }

        // Metadata oluştur — configMetadataOf helper kullanılamazsa buildMap kullan
        val metadata: Map<String, Any?> = buildMap {
          put(METADATA_KEY_BRAND, brand)
          put(METADATA_KEY_ITEM_TYPE, itemType)
          put(METADATA_KEY_CUSTOMER_ITEM_ID, customerItemId)
        }

        Log.d("EntrupyModule", "✦ startCapture başlatılıyor. Brand: $brand, Type: $itemType, ItemId: $customerItemId")

        entrupyApp.startCapture(
          configMetadata = metadata,
          callback = object : CaptureCallback {
            override fun onCaptureStarted() {
              // SDK UI açıldı — bu tamamlandı anlamına gelmez!
              // Promise'i burada resolve etmiyoruz — SDK kendi yaşam döngüsünü yönetir.
              Log.d("EntrupyModule", "✦ Entrupy Capture UI açıldı (onCaptureStarted)")
              promise.resolve(true)  // JS'e "açıldı" sinyali ver, SDK devam eder
            }

            override fun onCaptureError(errorCode: Int, description: String) {
              Log.e("EntrupyModule", "✦ Entrupy Capture hatası: $description (kod: $errorCode)")
              promise.reject("CAPTURE_ERROR", "Entrupy capture hatası: $description (kod: $errorCode)", Exception(description))
            }

            override fun onFallbackOpened() {
              // Marka eşleşmedi → Entrupy fallback menüsü açıldı (SDK devam ediyor, hata değil)
              Log.d("EntrupyModule", "✦ Entrupy marka fallback menüsü açıldı.")
              // Promise zaten onCaptureStarted'da resolve edilmiş olabilir.
              // onFallbackOpened'da ekstra işlem gerekmez.
            }
          }
        )
      } catch (e: Exception) {
        Log.e("EntrupyModule", "✦ startCapture exception", e)
        promise.reject("CAPTURE_EXCEPTION", e.message ?: "Bilinmeyen hata", e)
      }
    }
  }
}

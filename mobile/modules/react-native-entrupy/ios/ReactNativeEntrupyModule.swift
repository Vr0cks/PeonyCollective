import ExpoModulesCore

/**
 * ReactNativeEntrupyModule (iOS)
 *
 * iOS için Entrupy SDK entegrasyonu.
 *
 * DURUM: iOS Entrupy SDK'sı (https://github.com/entrupy/entrupy-sdk-iOS) ayrı
 * bir Swift Package / CocoaPod entegrasyonu gerektirir.
 * Şu an bu modül iOS'ta tüm metodları graceful hata ile döner.
 *
 * iOS entegrasyonu için yapılması gerekenler:
 * 1. Entrupy'den iOS SDK erişimi talep et
 * 2. Podspec'e pod bağımlılığı ekle
 * 3. Aşağıdaki metodları gerçek SDK API'siyle implement et
 */
public class ReactNativeEntrupyModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ReactNativeEntrupy")

    // generateSDKAuthorizationRequest — senkron fonksiyon
    Function("generateSDKAuthorizationRequest") {
      // TODO: iOS SDK entegrasyonu tamamlandığında buraya gerçek SDK çağrısı gelecek
      // return EntrupyApp.shared().generateSDKAuthorizationRequest()
      throw NSError(
        domain: "EntrupyModule",
        code: 501,
        userInfo: [NSLocalizedDescriptionKey: "iOS Entrupy SDK henüz entegre edilmedi. Android'i kullanın."]
      )
    }

    // loginUser — async fonksiyon
    AsyncFunction("loginUser") { (signedRequest: String) -> Bool in
      // TODO: iOS SDK entegrasyonu tamamlandığında buraya gerçek SDK çağrısı gelecek
      throw NSError(
        domain: "EntrupyModule",
        code: 501,
        userInfo: [NSLocalizedDescriptionKey: "iOS Entrupy SDK henüz entegre edilmedi. Android'i kullanın."]
      )
    }

    // startCapture — async fonksiyon
    AsyncFunction("startCapture") { (brand: String, itemType: String, customerItemId: String) -> Bool in
      // TODO: iOS SDK entegrasyonu tamamlandığında buraya gerçek SDK çağrısı gelecek
      throw NSError(
        domain: "EntrupyModule",
        code: 501,
        userInfo: [NSLocalizedDescriptionKey: "iOS Entrupy SDK henüz entegre edilmedi. Android'i kullanın."]
      )
    }
  }
}

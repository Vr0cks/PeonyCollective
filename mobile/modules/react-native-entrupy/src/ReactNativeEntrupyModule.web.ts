import { registerWebModule, NativeModule } from 'expo';

/**
 * Web stub modülü — Entrupy SDK sadece native Android/iOS'ta çalışır.
 * Web ortamında tüm metodlar no-op döner.
 */
class ReactNativeEntrupyModule extends NativeModule {
  generateSDKAuthorizationRequest(): string {
    console.warn('[EntrupyModule] Web ortamında çalışıyor — SDK kullanılamaz.');
    return '';
  }
  async loginUser(_signedRequest: string): Promise<boolean> {
    console.warn('[EntrupyModule] Web ortamında çalışıyor — loginUser no-op.');
    return false;
  }
  async startCapture(_brand: string, _itemType: string, _customerItemId: string): Promise<boolean> {
    console.warn('[EntrupyModule] Web ortamında çalışıyor — startCapture no-op.');
    return false;
  }
}

export default registerWebModule(ReactNativeEntrupyModule, 'ReactNativeEntrupy');

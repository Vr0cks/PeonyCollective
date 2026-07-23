import { NativeModule, requireNativeModule } from 'expo';

declare class ReactNativeEntrupyModule extends NativeModule {
  generateSDKAuthorizationRequest(): string;
  loginUser(signedRequest: string): Promise<boolean>;
  startCapture(brand: string, itemType: string, customerItemId: string): Promise<boolean>;
}

export default requireNativeModule<ReactNativeEntrupyModule>('ReactNativeEntrupy');

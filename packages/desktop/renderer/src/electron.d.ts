interface Window {
  electron: {
    openExternal: (url: string) => void;
    openAuthWindow: (url: string) => void;
    onAuthCallback: (callback: (tokens: { accessToken: string; refreshToken: string }) => void) => void;
  };
}

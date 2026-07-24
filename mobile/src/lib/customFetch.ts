export const customFetch = (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const urlString = typeof url === 'string' ? url : url.toString();
    xhr.open(options?.method || 'GET', urlString);
    
    if (options?.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => xhr.setRequestHeader(key, value));
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => xhr.setRequestHeader(key, value));
      } else {
        Object.entries(options.headers).forEach(([key, value]) => xhr.setRequestHeader(key, value as string));
      }
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let responseData = xhr.responseText;
        
        // Parse response headers
        const headers = new Headers();
        const rawHeaders = xhr.getAllResponseHeaders();
        if (rawHeaders) {
          rawHeaders.trim().split(/[\r\n]+/).forEach((line) => {
            const parts = line.split(': ');
            const header = parts.shift();
            const value = parts.join(': ');
            if (header) headers.append(header, value);
          });
        }

        resolve({
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          statusText: xhr.statusText,
          json: () => {
            try {
              return Promise.resolve(responseData ? JSON.parse(responseData) : null);
            } catch (e) {
              return Promise.reject(e);
            }
          },
          text: () => Promise.resolve(responseData),
          blob: () => Promise.resolve(new Blob([xhr.response])),
          arrayBuffer: () => Promise.resolve(xhr.response),
          headers: headers,
          clone: function() { return this; }
        } as unknown as Response);
      }
    };
    
    xhr.onerror = () => reject(new Error('XHR Network Error'));
    xhr.ontimeout = () => reject(new Error('XHR Timeout'));
    xhr.timeout = 30000;
    
    xhr.send((options?.body as any) || null);
  });
};

interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

class FetchWrapper {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<R = any>({
    url,
    method = 'GET',
    params = {},
    data = {},
    headers = {},
  }: RequestConfig): Promise<R> {
    const fullURL = new URL(url, this.baseURL);
    Object.keys(params).forEach((key) => fullURL.searchParams.append(key, params[key]));

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(fullURL.toString(), fetchOptions);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'An error occurred');
    }

    return responseData as R;
  }

  get<R = any>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<R> {
    return this.request<R>({ url, method: 'GET', params, headers });
  }

  post<R = any>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<R> {
    return this.request<R>({ url, method: 'POST', data, headers });
  }

  put<R = any>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<R> {
    return this.request<R>({ url, method: 'PUT', data, headers });
  }

  patch<R = any>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<R> {
    return this.request<R>({ url, method: 'PATCH', data, headers });
  }

  delete<R = any>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<R> {
    return this.request<R>({ url, method: 'DELETE', params, headers });
  }
}

// Usage
const api = new FetchWrapper('http://localhost:4000');
export default api;

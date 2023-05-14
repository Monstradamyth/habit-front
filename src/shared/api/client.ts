import { clientToken } from '@/app/token/token';
import { Toasts } from '@/shared/ui/toast/instance';

interface IApiClient {
    get<TResponse>(path: string): Promise<TResponse>;
    post<TResponse, TReqBody>(
        path: string,
        data: TReqBody,
        
    ): Promise<TResponse>;
    put<TResponse, TReqBody>(
        path: string,
        data: TReqBody,
        
    ): Promise<TResponse>;
    patch<TResponse, TReqBody>(
        path: string,
        data: TReqBody,
        
    ): Promise<TResponse>;
    delete<TResponse>(
        path: string,
    ): Promise<TResponse>;
}


class ApiClient implements IApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<TResponse, TReqBody = unknown>(
        path: string,
        method: string,
        body?: TReqBody,
    ): Promise<TResponse> {
        const jwt = await clientToken.getToken();
        const response = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const error = await response.text();
            console.log(error)
            Toasts.methods.addErrorToast(error);

            return Promise.reject(error);
        }

        try {
            const responseData = await response.json();
            return responseData as TResponse;
        } catch (error) {
            return Promise.reject("Failed to parse response from API: " + response.url);
        }
    }

    public async get<TResponse>(
        path: string,
    ): Promise<TResponse> {
        return this.request<TResponse>(path, "GET", undefined);
    }

    public async post<TResponse, TReqBody>(
        path: string,
        data: TReqBody,
    ): Promise<TResponse> {
        return this.request<TResponse, TReqBody>(path, "POST", data);
    }

    public async put<TResponse, TReqBody>(
        path: string,
        data: TReqBody,
    ): Promise<TResponse> {
        return this.request<TResponse, TReqBody>(path, "PUT", data);
    }

    public async patch<TResponse, TReqBody>(
        path: string,
        data: TReqBody,
    ): Promise<TResponse> {
        return this.request<TResponse, TReqBody>(path, "PATCH", data);
    }

    public async delete<TResponse>(
        path: string,
    ): Promise<TResponse> {
        return this.request<TResponse>(path, "DELETE", undefined);
    }
}

export const apiClient = new ApiClient("http://192.168.1.10:3000");


class HttpProvider {

    private static instance: HttpProvider;
    static getInstance() {
        if (!HttpProvider.instance) {
            HttpProvider.instance = new HttpProvider();
        }
        return HttpProvider.instance;
    }
    async callApi<TResponse>(
       url: RequestInfo,
        options?: RequestInit
    ): Promise<TResponse | undefined> {
        const response = await fetch(url, options);
        let res: TResponse | undefined;
        const bodyAsText = await response.text();
        if (bodyAsText) {
            try {
                res = JSON.parse(bodyAsText) as TResponse;
            } catch (error: any) {
                throw error;
            }
        }
        return res;
    } 
    async streamApi(
       url: RequestInfo,
        options?: RequestInit
    ): Promise<any> {
        const response = await fetch(url, options);
        return await response.blob();
    } 

    async get<TResponse>(
        url: RequestInfo,
        body?: string
    ): Promise<TResponse | undefined> {
        return await this.callApi<TResponse>(url, {
            method: "GET",
            credentials: "include",
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });
    }
    async getStream<TResponse>(
        url: RequestInfo,
        body?: string
    ): Promise<TResponse | undefined> {
        return await this.streamApi(url, {
            method: "GET",
            credentials: "include",
            mode: 'cors',
            redirect: 'follow',
            body,
        });
    }
    async patch<TResponse>(
        url: RequestInfo,
        body?: string
    ): Promise<TResponse | undefined> {
        return await this.callApi<TResponse>(url, {
            method: "PATCH",
            credentials: "include",
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            },
            body,
        });
    }

    async put<TResponse>(
        url: RequestInfo,
        body?: string
    ): Promise<TResponse | undefined> {
        return await this.callApi<TResponse>(url, {
            method: "PUT",
            credentials: "include",
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            },
            body,
        });
    }

    async post<TResponse>(
        url: RequestInfo,
        body?: string
    ): Promise<TResponse | undefined> {
        return await this.callApi<TResponse>(url, {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            redirect: 'follow',
            body,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    async postWithNoHeaders<TResponse>(
        url: RequestInfo,
        body?: string
    ): Promise<TResponse | undefined> {
        return await this.callApi<TResponse>(url, {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            redirect: 'follow',
            body,
        });
    }
    async formData<TResponse>(
        url: RequestInfo,
        body?: FormData
    ): Promise<TResponse | undefined> {
        return await this.callApi<TResponse>(url, {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            redirect: 'follow',
            body,
        });
    }

    async delete<TResponse>(
        url: RequestInfo,
        body?: string
    ): Promise<TResponse | undefined> {
        return await this.callApi<TResponse>(url, {
            method: "DELETE",
            credentials: "include",
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            },
            body,
        });
    }
}


export default HttpProvider.getInstance();
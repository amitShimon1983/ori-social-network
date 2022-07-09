

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
                'Content-Type': 'application/json'
            },
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
            headers: {
                'Content-Type': 'application/json'
            },
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
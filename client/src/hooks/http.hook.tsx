import { useCallback, useState } from 'react';

interface IHttp {
    loading: boolean;
    error: object | null;
    request: (
        url: string,
        method?: string,
        body?: any,
        headers?: {}
    ) => Promise<void>;
    clearError: () => void;
}

export const useHttp = (): IHttp => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<object | null>(null);

    const request = useCallback(
        async (
            url: string,
            method: string = 'GET',
            body = null,
            headers = {}
        ) => {
            setLoading(true);

            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }

                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Что-то пощло не так');
                }

                return data;
            } catch (e) {
                setError(e.message);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const clearError: () => void = useCallback(() => setError(null), []);

    return { loading, request, error, clearError } as IHttp;
};

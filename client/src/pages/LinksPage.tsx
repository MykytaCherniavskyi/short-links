import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

export const LinksPage: React.FC = () => {
    const [links, setLinks] = useState<[]>([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchedLinks: () => Promise<void> = useCallback(async (): Promise<
        void
    > => {
        try {
            const fetched: any = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`,
            });
            setLinks(fetched);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        fetchedLinks().then();
    }, [fetchedLinks]);

    if (loading) {
        return <Loader />;
    }

    return <>{!loading && <LinksList links={links} />}</>;
};

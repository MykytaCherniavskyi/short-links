import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailPage: React.FC = () => {
    const [link, setLink] = useState(null);
    const { id: linkId } = useParams();
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);

    const getLink: () => Promise<void> = useCallback(async (): Promise<
        void
    > => {
        try {
            const fetched: any = await request(
                `/api/link/${linkId}`,
                'GET',
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            setLink(fetched);
        } catch (e) {}
    }, [token, linkId, request]);

    useEffect((): void => {
        getLink().then();
    }, [getLink]);

    if (loading) {
        return <Loader />;
    }

    // @ts-ignore
    return <>{!loading && link && <LinkCard link={link} />}</>;
};

import React from 'react';

interface ILink {
    link: {
        from: string;
        to: string;
        clicks: number;
        date: Date;
    };
}

export const LinkCard: React.FC<ILink> = ({ link }) => {
    return (
        <>
            <h2>Ссылка</h2>
            <p>
                Ваша ссылка:
                <a href={link.to} target="_blank" rel="noopener noreferrer">
                    {link.to}
                </a>
            </p>
            <p>
                Откуда:
                <a href={link.from} target="_blank" rel="noopener noreferrer">
                    {link.from}
                </a>
            </p>
            <p>
                Количество кликов:
                <strong>{link.clicks}</strong>
            </p>
            <p>
                Дата создания:
                <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </p>
        </>
    );
};

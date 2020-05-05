import React from 'react';
import { Link } from 'react-router-dom';

interface ILink {
    from: string;
    to: string;
    _id: string | (() => any | void);
}

interface ILinks {
    links?: ILink[] | undefined;
}

export const LinksList: React.FC<ILinks> = ({ links }) => {
    console.log(links);
    return (
        <>
            {links?.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Оригинальная</th>
                            <th>Сокращенная</th>
                            <th>Открыть</th>
                        </tr>
                    </thead>

                    <tbody>
                        {links?.map(
                            (link: ILink, index: number): JSX.Element => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{link.from}</td>
                                    <td>{link.to}</td>
                                    <td>
                                        <Link to={`detail/${link._id}`}>
                                            Открыть
                                        </Link>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            ) : (
                <p className="center">Список ссылок пуст</p>
            )}
        </>
    );
};

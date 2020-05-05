import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage: React.FC = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState<string>('');

    const linkHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLink(e.target.value);
    };

    useEffect(() => {
        // @ts-ignore
        window.M.updateTextFields();
    }, []);

    const pressHandler = async (e: React.KeyboardEvent): Promise<void> => {
        if (e.key === 'Enter') {
            try {
                const data: any = await request(
                    '/api/link/generate',
                    'POST',
                    {
                        from: link,
                    },
                    {
                        Authorization: `Bearer ${auth.token}`,
                    }
                );
                history.push(`/detail/${data.link._id}`);
            } catch (e) {}
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Вставьте ссылку"
                        id="link"
                        value={link}
                        onChange={linkHandler}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    );
};

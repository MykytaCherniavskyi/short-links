import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

interface IAuth {
    email: string;
    password: string;
}

export const AuthPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState<IAuth>({
        email: '',
        password: '',
    });
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        // @ts-ignore
        window.M.updateTextFields();
    }, []);

    const changeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const registerHandler = async () => {
        try {
            const data: any = await request('api/auth/register', 'POST', {
                ...form,
            });
            message(data);
        } catch (e) {}
    };

    const loginHandler = async () => {
        try {
            const data: any = await request('api/auth/login', 'POST', {
                ...form,
            });
            // @ts-ignore
            auth.login(data.token, data.userId);
            message(`Добро пожаловать в систему`);
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сокращение ссылки</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    className="validate yellow-input"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    className="validate yellow-input"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: 10 }}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

'use client';

import { useState, useEffect } from "react";

const USERNAME = "admin";
const PASSWORD = "admin";

const LoginForm = ({ onLogin }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (login === USERNAME && password === PASSWORD) {
            localStorage.setItem("admin-auth", "true");
            onLogin(true);
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 border rounded shadow bg-white flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center">Администратор</h2>

            <input
                className="border p-2 rounded"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                className="border p-2 rounded"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Войти</button>
        </form>
    );
};

export default LoginForm;

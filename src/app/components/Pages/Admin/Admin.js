'use client';

import { useState, useEffect } from "react";
import LoginForm from "/src/app/components/LoginForm/LoginForm";
import AdminPanel from "/src/app/components//Admin/AdminPanel";

const Admin = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem("admin-auth");
        if (storedAuth === "true") setIsAuth(true);
    }, []);

    const handleLogin = (status) => {
        setIsAuth(status);
        localStorage.setItem("admin-auth", status ? "true" : "false");
    };

    if (!isAuth) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return <AdminPanel />;
};

export default Admin;









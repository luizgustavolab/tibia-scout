import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
export function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        // Verifica se existe uma sessão ativa no Supabase
        supabase.auth.getSession().then(({ data: { session } }) => {
            setAuthenticated(!!session);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return (_jsx("div", { className: "flex h-screen items-center justify-center", children: "Carregando..." }));
    }
    if (!authenticated) {
        // Se não estiver logado, manda para a página de login
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}

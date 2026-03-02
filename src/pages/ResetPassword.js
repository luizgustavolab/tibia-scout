import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { GlassButton } from '../components/v0/glass-button';
import { Input } from '../components/v0/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '../components/v0/ui/card';
import { Lock, ShieldCheck } from 'lucide-react';
export default function ResetPassword() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    async function handleUpdatePassword(e) {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });
            if (error)
                throw error;
            alert('Senha forjada com sucesso! Agora você pode entrar.');
            navigate('/login');
        }
        catch (error) {
            const err = error;
            alert(err.message || 'Erro ao atualizar senha.');
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: "min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden", children: [_jsx("div", { className: "fixed inset-0 bg-[url('/wallpaper.jpg')] bg-fixed bg-cover bg-center -z-20 scale-100 opacity-80", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 bg-black/30 -z-10" }), _jsxs(Card, { className: "w-full max-w-md bg-black/60 border-[#d4af37]/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)] mx-auto", children: [_jsxs(CardHeader, { className: "space-y-1 text-center border-b border-[#d4af37]/10 pb-6", children: [_jsx(CardTitle, { className: "text-4xl font-medieval tracking-widest text-[#d4af37]", children: "Nova Senha" }), _jsx(CardDescription, { className: "text-[#c4b08a]/60 font-serif", children: "Defina seu novo segredo de acesso." })] }), _jsx(CardContent, { className: "pt-8 px-6 sm:px-10", children: _jsxs("form", { onSubmit: handleUpdatePassword, className: "space-y-6 w-full", children: [_jsx("div", { className: "space-y-2", children: _jsxs("div", { className: "relative flex items-center w-full", children: [_jsx(Lock, { className: "absolute left-3 h-4 w-4 text-[#d4af37]/50 pointer-events-none z-10" }), _jsx(Input, { type: "password", placeholder: "Nova Senha", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "pl-10 bg-black/40 border-[#d4af37]/20 text-[#f5e6c8] focus:border-[#d4af37] h-11 w-full", required: true })] }) }), _jsx("div", { className: "space-y-2", children: _jsxs("div", { className: "relative flex items-center w-full", children: [_jsx(ShieldCheck, { className: "absolute left-3 h-4 w-4 text-[#d4af37]/50 pointer-events-none z-10" }), _jsx(Input, { type: "password", placeholder: "Confirme a Nova Senha", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "pl-10 bg-black/40 border-[#d4af37]/20 text-[#f5e6c8] focus:border-[#d4af37] h-11 w-full", required: true })] }) }), _jsx("div", { className: "w-full flex justify-center pt-2", children: _jsx(GlassButton, { variant: "primary", type: "submit", className: "w-full h-12 text-lg uppercase tracking-widest font-medieval flex items-center justify-center", disabled: loading, children: loading ? 'Atualizando...' : 'ATUALIZAR SENHA' }) })] }) })] })] }));
}

import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
export function Layout() {
    return (_jsx("main", { className: "w-full min-h-screen", children: _jsx(Outlet, {}) }));
}

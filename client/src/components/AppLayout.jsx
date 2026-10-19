import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Megaphone, ClipboardList, PlusCircle, LogOut, Compass, UserRound } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isBrand = user?.role === "brand";
  const links = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/campaigns", label: "Explore campaigns", icon: Compass },
    ...(isBrand ? [{ to: "/campaigns/new", label: "Create campaign", icon: PlusCircle }] : []),
    { to: "/applications", label: "Applications", icon: ClipboardList },
  ];

  const handleLogout = () => { logout(); navigate("/login"); };
  return (
    <div className="min-h-screen bg-[#f7f8fc] md:flex">
      <aside className="flex w-full flex-col border-b border-slate-200 bg-white px-5 py-4 md:fixed md:inset-y-0 md:w-64 md:border-b-0 md:border-r">
        <div className="mb-7"><BrandLogo /></div>
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</p>
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-violet-50 text-violet-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6 hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-4 text-white md:block">
          <p className="text-sm font-bold">Grow together.</p>
          <p className="mt-1 text-xs leading-5 text-violet-100">Find the right creators for your next big idea.</p>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 md:mt-auto">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-violet-100 font-bold text-violet-700">{user?.name?.charAt(0)?.toUpperCase() || "U"}</div>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">{user?.name || "User"}</p><p className="text-xs capitalize text-slate-500">{user?.role || "member"}</p></div>
          <button onClick={handleLogout} title="Log out" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800"><LogOut size={18} /></button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 md:ml-64 md:px-10 md:py-9"><Outlet /></main>
    </div>
  );
}
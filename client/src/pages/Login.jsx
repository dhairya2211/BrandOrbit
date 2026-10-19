import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault(); setError("");
    try {
      const user = await login({ email, password });
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to log in. Check your backend server and credentials.");
    }
  }

  return <div className="grid min-h-screen bg-white lg:grid-cols-2">
    <div className="hidden flex-col justify-between bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700 p-12 text-white lg:flex"><BrandLogo light /><div className="max-w-lg"><p className="text-sm font-bold uppercase tracking-[.2em] text-violet-200">Welcome back</p><h1 className="mt-4 text-5xl font-black leading-tight">Your next great collaboration starts here.</h1><p className="mt-5 leading-7 text-indigo-100">Manage campaigns, discover opportunities and build partnerships with BrandOrbit.</p></div><p className="text-sm text-indigo-200">One platform. Shared growth.</p></div>
    <div className="flex items-center justify-center px-5 py-12"><div className="w-full max-w-md"><Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-violet-700"><ArrowLeft size={16} /> Back to home</Link><div className="mb-8 lg:hidden"><BrandLogo /></div><p className="text-sm font-bold uppercase tracking-[.16em] text-violet-600">Your workspace</p><h2 className="mt-2 text-3xl font-black text-slate-950">Sign in to BrandOrbit</h2><p className="mt-2 text-slate-500">Enter your account details to continue.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">{error && <div role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}<label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Email address</span><span className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-50"><Mail size={18} className="text-slate-400" /><input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full py-3.5 outline-none" /></span></label><label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Password</span><span className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-50"><LockKeyhole size={18} className="text-slate-400" /><input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="w-full py-3.5 outline-none" /></span></label><button disabled={loading} className="w-full rounded-xl bg-violet-600 py-3.5 font-bold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700 disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button></form><p className="mt-6 text-center text-sm text-slate-500">New to BrandOrbit? <Link to="/register" className="font-bold text-violet-700 hover:text-violet-900">Create an account</Link></p>
    </div></div>
  </div>;
}
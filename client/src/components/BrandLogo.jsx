import { Orbit } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandLogo({ light = false }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 font-bold tracking-tight ${light ? "text-white" : "text-slate-900"}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-600 text-white shadow-sm"><Orbit size={21} /></span>
      <span className="text-xl">Brand<span className={light ? "text-violet-200" : "text-violet-600"}>Orbit</span></span>
    </Link>
  );
}
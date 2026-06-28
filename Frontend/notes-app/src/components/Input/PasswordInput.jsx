import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 shadow-sm transition-all duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 dark:border-slate-700 dark:bg-slate-950/40 dark:focus-within:border-indigo-400/50 dark:focus-within:ring-indigo-400/10">
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            />

            <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label={isShowPassword ? "Hide password" : "Show password"}
            >
                {isShowPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
            </button>
        </div>
    );
};

export default PasswordInput;

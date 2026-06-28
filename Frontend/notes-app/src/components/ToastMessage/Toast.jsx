import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

function Toast({ isShown, message, type, onClose }) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [onClose, isShown]);

    return (
        <div
            className={`fixed right-4 top-6 z-50 transition-all duration-300 sm:right-6 ${
                isShown ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
        >
            <div
                className={`relative min-w-72 overflow-hidden rounded-2xl border bg-white/95 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:bg-slate-900/95 ${
                    type === "delete" ? "border-red-200 dark:border-red-500/20" : "border-emerald-200 dark:border-emerald-500/20"
                }`}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-1.5 ${
                        type === "delete" ? "bg-red-500" : "bg-emerald-500"
                    }`}
                />

                <div className="flex items-center gap-3 px-4 py-3 pl-5">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            type === "delete"
                                ? "bg-red-50 text-red-500 dark:bg-red-500/10"
                                : "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10"
                        }`}
                    >
                        {type === "delete" ? <MdDeleteOutline className="text-xl" /> : <LuCheck className="text-xl" />}
                    </div>

                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{message}</p>
                </div>
            </div>
        </div>
    );
}

export default Toast;

import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout, isMobile = false }) => {
    const initials = userInfo?.fullName ? getInitials(userInfo.fullName) : "N/A";

    return (
        <div className={`flex items-center gap-3 ${isMobile ? "rounded-2xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-950/40" : ""}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-indigo-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-primary/20">
                {initials}
            </div>

            <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {userInfo?.fullName || "Guest"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    {userInfo?.email || "Signed in workspace"}
                </p>
            </div>

            <button
                className="ml-auto rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:text-red-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-red-500/40 dark:hover:text-red-400"
                onClick={onLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default ProfileInfo;

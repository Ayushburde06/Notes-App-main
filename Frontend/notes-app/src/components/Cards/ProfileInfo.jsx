import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-white text-sm font-semibold bg-gradient-to-br from-primary to-indigo-400 shadow-md shadow-primary/20">
                {userInfo?.fullName ? getInitials(userInfo.fullName) : "N/A"}
            </div>

            <div>
                {userInfo?.fullName ? (
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{userInfo.fullName}</p>
                ) : (
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Guest</p>
                )}
                <button
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;

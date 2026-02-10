import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }


    return (
        <div className="flex items-center bg-transparent border-[1.5px] border-slate-200 dark:border-slate-600 px-5 rounded-lg mb-3 transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />

            {isShowPassword ? <FaRegEye
                size={22}
                className="text-primary dark:text-indigo-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
            /> : <FaRegEyeSlash
                size={22}
                className="text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                onClick={() => toggleShowPassword()}
            />}
        </div>


    )
}

export default PasswordInput
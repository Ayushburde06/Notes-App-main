import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import PasswordInput from "../../components/Input/PasswordInput"
import { useState } from "react"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return;
        }

        if (!password) {
            setError("Please enter your password.")
            return;
        }

        setError("")

        // Login API call
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            })

            // handle successfull login response
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken)
                navigate("/dashboard");
            }
        }
        catch (error) {
            // handle login error
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
            else {
                setError("An unexpected error occured. Please try again.")
            }
        }

    }

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-dark-bg dark:via-slate-900 dark:to-dark-bg transition-colors duration-300">
                <div className="w-full max-w-md glass-card rounded-2xl px-8 py-10 animate-scale-in dark:bg-slate-800/90 dark:border-slate-700/50">
                    <form onSubmit={handleLogin}>
                        <div className="mb-8">
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back 👋</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Sign in to pick up where you left off</p>
                        </div>

                        <input
                            type="text"
                            placeholder="you@example.com"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />

                        {
                            error && <p className="text-red-500 text-xs pb-1 animate-fade-in">{error}</p>
                        }

                        <button type="submit" className="btn-primary">Sign In</button>

                        <p className="text-sm text-center mt-6 text-slate-500 dark:text-slate-400">New here?{" "}
                            <Link to="/signup" className="font-semibold text-primary hover:text-primary-hover dark:text-indigo-400 transition-colors">Create an Account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="app-shell">
            <Navbar />

            <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <section className="surface-card relative overflow-hidden p-8 sm:p-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_24%)]" />
                        <div className="relative">
                            <span className="chip w-fit">Sign in</span>
                            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                Welcome back to your focused note workspace.
                            </h1>
                            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                                Pick up where you left off with a clean dashboard, fast search, and thoughtful organization tools.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                <div className="stat-card">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                                        Fast access
                                    </p>
                                    <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                                        Search, pin, and edit without friction.
                                    </p>
                                </div>
                                <div className="stat-card">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                                        Secure sync
                                    </p>
                                    <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                                        Your notes stay neatly organized in one place.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="surface-card p-6 sm:p-8">
                        <form onSubmit={handleLogin}>
                            <div className="mb-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                    Access account
                                </p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                    Sign in to continue
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    Use the same email and password you created when you signed up.
                                </p>
                            </div>

                            <div className="space-y-4">
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
                            </div>

                            {error ? <p className="mt-3 text-sm font-medium text-red-500">{error}</p> : null}

                            <button type="submit" className="btn-primary mt-5">
                                Sign in
                            </button>

                            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                New here?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-primary transition-colors hover:text-primary-hover dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Login;

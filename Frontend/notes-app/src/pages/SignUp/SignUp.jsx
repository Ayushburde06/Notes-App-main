import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter a password");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email,
                password,
            });

            if (response.data && response.data.error) {
                setError(response.data.message);
            }

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
                            <span className="chip w-fit">Create account</span>
                            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                Start a polished note system in a few seconds.
                            </h1>
                            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                                Build a clean space for ideas, reminders, and plans with tags, search, and beautiful cards.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                <div className="stat-card">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                                        Organized by default
                                    </p>
                                    <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                                        Notes, tags, and pins all stay in sync.
                                    </p>
                                </div>
                                <div className="stat-card">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                                        Built for speed
                                    </p>
                                    <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                                        Capture ideas before they slip away.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="surface-card p-6 sm:p-8">
                        <form onSubmit={handleSignUp}>
                            <div className="mb-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                    Create your account
                                </p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                    Get started for free
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    Create your workspace and start organizing notes right away.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    className="input-box"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

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
                                    placeholder="Create a password"
                                />
                            </div>

                            {error ? <p className="mt-3 text-sm font-medium text-red-500">{error}</p> : null}

                            <button type="submit" className="btn-primary mt-5">
                                Create account
                            </button>

                            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                Already a member?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-primary transition-colors hover:text-primary-hover dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default SignUp;

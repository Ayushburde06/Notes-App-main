import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../theme/themeSlice";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

    const isAuthenticated = useMemo(() => Boolean(userInfo || localStorage.getItem("token")), [userInfo]);

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="glass-nav sticky top-0 z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/dashboard" className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-indigo-500 to-cyan-400 text-white shadow-lg shadow-primary/20">
                        <span className="absolute inset-[3px] rounded-[0.9rem] border border-white/25" />
                        <span className="relative text-lg font-black tracking-tight">N</span>
                    </div>
                    <div className="leading-none">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                            Notes workspace
                        </p>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                            Notebook
                        </h2>
                    </div>
                </Link>

                <div className="hidden flex-1 items-center justify-center px-6 md:flex">
                    {isAuthenticated ? (
                        <div className="w-full max-w-xl">
                            <SearchBar
                                value={searchQuery}
                                onChange={({ target }) => {
                                    setSearchQuery(target.value);
                                }}
                                handleSearch={handleSearch}
                                onClearSearch={onClearSearch}
                            />
                        </div>
                    ) : null}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="icon-btn bg-white/80 dark:bg-slate-900/60"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <FaMoon className="text-sm" />
                        ) : (
                            <FaSun className="text-amber-400 text-sm" />
                        )}
                    </button>

                    {isAuthenticated ? (
                        <>
                            <div className="hidden lg:block">
                                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                            </div>
                            <button
                                onClick={toggleMenu}
                                className="icon-btn md:hidden bg-white/80 dark:bg-slate-900/60"
                                aria-label="Toggle menu"
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
                            </button>
                        </>
                    ) : (
                        <div className="hidden items-center gap-2 lg:flex">
                            <Link to="/login" className="btn-secondary px-4 py-2.5">
                                Sign in
                            </Link>
                            <Link to="/signup" className="btn-primary w-auto px-5 py-2.5">
                                Get started
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="md:hidden">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-4 sm:px-6 lg:px-8">
                    {isAuthenticated ? (
                        <button
                            onClick={toggleMenu}
                            className="btn-secondary px-4 py-2.5"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? "Close" : "Menu"}
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="btn-secondary px-4 py-2.5">
                                Sign in
                            </Link>
                            <Link to="/signup" className="btn-primary w-auto px-4 py-2.5">
                                Join free
                            </Link>
                        </div>
                    )}
                </div>

                {isMenuOpen && isAuthenticated && (
                    <div className="border-t border-slate-200/70 bg-white/90 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 sm:px-6 lg:px-8">
                        <div className="space-y-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={({ target }) => {
                                    setSearchQuery(target.value);
                                }}
                                handleSearch={handleSearch}
                                onClearSearch={onClearSearch}
                            />
                            <ProfileInfo userInfo={userInfo} onLogout={onLogout} isMobile />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

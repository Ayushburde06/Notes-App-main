import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../theme/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa6";


const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

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
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-slate-900/80 dark:border-slate-700/50 sticky top-0 z-50 transition-colors duration-300">
            {/* Desktop and Tablet Navigation */}
            <div className="hidden md:flex items-center justify-between px-6 py-3">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
                    ✦ Notes
                </h2>
                <div className="flex-1 max-w-xl mx-4">
                    <SearchBar
                        value={searchQuery}
                        onChange={({ target }) => {
                            setSearchQuery(target.value);
                        }}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <FaMoon className="text-slate-600 text-sm" />
                        ) : (
                            <FaSun className="text-amber-400 text-sm" />
                        )}
                    </button>
                    <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
                        ✦ Notes
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                            onClick={() => dispatch(toggleTheme())}
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <FaMoon className="text-slate-600 text-xs" />
                            ) : (
                                <FaSun className="text-amber-400 text-xs" />
                            )}
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <HiX className="h-6 w-6 dark:text-slate-200" />
                            ) : (
                                <HiMenu className="h-6 w-6 dark:text-slate-200" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 animate-slide-up">
                        <div className="mb-4">
                            <SearchBar
                                value={searchQuery}
                                onChange={({ target }) => {
                                    setSearchQuery(target.value);
                                }}
                                handleSearch={handleSearch}
                                onClearSearch={onClearSearch}
                            />
                        </div>
                        <div className="py-2">
                            <ProfileInfo
                                userInfo={userInfo}
                                onLogout={onLogout}
                                isMobile={true}
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

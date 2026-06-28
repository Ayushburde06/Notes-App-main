import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="flex w-full items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-2.5 shadow-sm transition-all duration-200 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 dark:border-slate-700 dark:bg-slate-950/50 dark:focus-within:border-indigo-400/50 dark:focus-within:ring-indigo-400/10">
            <FaMagnifyingGlass className="text-sm text-slate-400 transition-colors dark:text-slate-500" />
            <input
                type="text"
                placeholder="Search notes, tags, and text"
                className="w-full bg-transparent py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                value={value}
                onChange={onChange}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
            />

            {value ? (
                <button
                    type="button"
                    onClick={onClearSearch}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    aria-label="Clear search"
                >
                    <IoMdClose className="text-lg" />
                </button>
            ) : null}

            <button
                type="button"
                onClick={handleSearch}
                className="btn-primary w-auto px-4 py-2 text-xs"
                aria-label="Search notes"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;

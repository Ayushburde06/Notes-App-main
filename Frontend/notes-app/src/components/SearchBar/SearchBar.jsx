import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"



const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-full flex items-center px-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-transparent focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200">
            <input
                type="text"
                placeholder="Search notes..."
                className="w-full text-xs bg-transparent py-[11px] outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                value={value}
                onChange={onChange}
            />

            {value && (<IoMdClose className="text-xl text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 mr-3 transition-colors" onClick={onClearSearch} />)}

            <FaMagnifyingGlass className="text-slate-400 dark:text-slate-500 cursor-pointer hover:text-primary dark:hover:text-indigo-400 transition-colors" onClick={handleSearch} />
        </div>
    )
}

export default SearchBar
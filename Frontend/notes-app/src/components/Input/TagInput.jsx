import { useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"


const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    return (
        <div>
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-1.5 text-xs font-medium text-primary dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-full transition-colors">
                            #{tag}
                            <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-colors">
                                <MdClose className="text-sm" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-3 mt-3">
                <input
                    type="text"
                    value={inputValue}
                    className="text-sm bg-transparent border border-slate-200 dark:border-slate-600 dark:text-slate-200 px-3 py-2 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Add tags"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover text-white transition-all duration-200 hover:shadow-md hover:shadow-primary/25 active:scale-95"
                    onClick={() => {
                        addNewTag();
                    }}
                >
                    <MdAdd className="text-lg" />
                </button>

            </div>
        </div>
    )
}

export default TagInput
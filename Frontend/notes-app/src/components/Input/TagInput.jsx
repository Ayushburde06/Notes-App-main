import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    const addNewTag = () => {
        const nextTag = inputValue.trim();
        if (nextTag !== "" && !tags.includes(nextTag)) {
            setTags([...tags, nextTag]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="space-y-3">
            {tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300"
                        >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="rounded-full p-0.5 transition-colors hover:bg-white hover:text-red-500 dark:hover:bg-slate-900"
                                aria-label={`Remove ${tag}`}
                            >
                                <MdClose className="text-sm" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={inputValue}
                    className="input-box mb-0 flex-1"
                    placeholder="Add tags"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-[0_14px_30px_-14px_rgba(99,102,241,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-16px_rgba(99,102,241,0.85)] active:translate-y-0"
                    onClick={addNewTag}
                    aria-label="Add tag"
                >
                    <MdAdd className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default TagInput;

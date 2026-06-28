import { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes, showToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("add-note", {
                title,
                content,
                tags,
            });

            if (response.data && response.data.note) {
                showToastMessage("Note added successfully");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const editNote = async () => {
        const noteId = noteData._id;

        try {
            const response = await axiosInstance.put("edit-note/" + noteId, {
                title,
                content,
                tags,
            });

            if (response.data && response.data.note) {
                showToastMessage("Note updated successfully");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title");
            return;
        }

        if (!content) {
            setError("Please enter the content");
            return;
        }

        setError("");

        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className="relative">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <span className="chip mb-3 w-fit">{type === "edit" ? "Edit note" : "New note"}</span>
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        {type === "edit" ? "Refine your note" : "Capture a new idea"}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Keep your workspace polished with clear titles, concise content, and useful tags.
                    </p>
                </div>

                <button
                    type="button"
                    className="icon-btn shrink-0 bg-slate-100 text-slate-500 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <MdClose className="text-xl" />
                </button>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="input-label">Title</label>
                    <input
                        type="text"
                        className="input-box mb-0 text-base font-medium"
                        placeholder="What's on your mind?"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="input-label">Content</label>
                    <textarea
                        className="input-box min-h-[220px] resize-none text-sm leading-7"
                        placeholder="Write your thoughts here..."
                        rows={10}
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="input-label">Tags</label>
                    <TagInput tags={tags} setTags={setTags} />
                </div>

                {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
                    <button type="button" className="btn-secondary w-full sm:w-auto" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="button" className="btn-primary w-full sm:w-auto" onClick={handleAddNote}>
                        {type === "edit" ? "Update note" : "Add note"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEditNotes;

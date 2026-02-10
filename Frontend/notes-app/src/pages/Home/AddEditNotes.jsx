import { useState } from "react"
import TagInput from "../../components/Input/TagInput"
import { MdClose } from "react-icons/md"
import axiosInstance from "../../utils/axiosInstance"

const AddEditNotes = ({ onClose, noteData, type, getAllNotes, showToastMessage }) => {

    const [title, setTitle] = useState(noteData?.title || "")
    const [content, setContent] = useState(noteData?.content || "")
    const [tags, setTags] = useState(noteData?.tags || [])

    const [error, setError] = useState(null)

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("add-note", {
                title,
                content,
                tags,
            })

            if (response.data && response.data.note) {
                showToastMessage("Note Added Successfully");
                getAllNotes();
                onClose();
            }
        }

        catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message)
            }
        }
    }

    // Edit Note
    const editNote = async () => {

        const noteId = noteData._id

        try {
            const response = await axiosInstance.put("edit-note/" + noteId, {
                title,
                content,
                tags,
            })

            if (response.data && response.data.note) {
                showToastMessage("Note Edited Successfully");
                getAllNotes();
                onClose();
            }
        }

        catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message)
            }
        }
    }


    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title")
            return
        }

        if (!content) {
            setError("Please enter the content")
            return
        }

        setError("")

        if (type === 'edit') {
            editNote()
        }
        else {
            addNewNote()
        }
    }

    return (
        <div className="relative animate-scale-in">

            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400 dark:text-slate-500" />
            </button>


            <div className="flex flex-col gap-2">
                <label className="input-label">Title</label>
                <input
                    type="text"
                    className="text-2xl font-semibold text-slate-900 dark:text-slate-100 outline-none bg-transparent"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">Content</label>
                <textarea
                    type="text"
                    className="text-sm text-slate-700 dark:text-slate-200 outline-none bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                    placeholder="Write your thoughts here..."
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className="mt-4">
                <label className="input-label">Tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-xs pt-4 animate-fade-in">{error}</p>}

            <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>{type === "edit" ? "UPDATE NOTE" : "ADD NOTE"}</button>
        </div>
    )
}

export default AddEditNotes
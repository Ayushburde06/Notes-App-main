import { useCallback, useEffect, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import AddNotesImg from "../../assets/images/add-notes.svg";
import NoData from "../../assets/images/no-data.svg";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import Toast from "../../components/ToastMessage/Toast";
import axiosInstance from "../../utils/axiosInstance";
import AddEditNotes from "./AddEditNotes";

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add",
    });

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type,
        });
    };

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: "",
        });
    };

    const getAllNotes = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteNote = async (data) => {
        const noteId = data._id;
        try {
            const response = await axiosInstance.delete("delete-note/" + noteId);
            if (response.data && !response.data.error) {
                showToastMessage("Note deleted successfully", "delete");
                getAllNotes();
            }
        } catch {
            console.log("An unexpected error occurred. Please try again");
        }
    };

    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/search-notes", {
                params: { query },
            });
            if (response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("update-note-pinned/" + noteId, {
                isPinned: !noteData.isPinned,
            });
            if (response.data && response.data.note) {
                showToastMessage("Note updated successfully");
                getAllNotes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axiosInstance.get("/get-user");
                if (response.data && response.data.user) {
                    setUserInfo(response.data.user);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.clear();
                    navigate("/login");
                } else {
                    console.error("Error fetching user info:", error);
                }
            }
        };

        getAllNotes();
        getUserInfo();
    }, [navigate, getAllNotes]);

    const stats = useMemo(() => {
        const pinnedCount = allNotes.filter((note) => note.isPinned).length;
        const tagCount = new Set(allNotes.flatMap((note) => note.tags || [])).size;
        const recentCount = allNotes.filter((note) => {
            const createdAt = new Date(note.createdOn);
            const today = new Date();
            return (
                createdAt.getDate() === today.getDate() &&
                createdAt.getMonth() === today.getMonth() &&
                createdAt.getFullYear() === today.getFullYear()
            );
        }).length;

        return [
            {
                label: "Total notes",
                value: String(allNotes.length).padStart(2, "0"),
                hint: "In your workspace",
            },
            {
                label: "Pinned",
                value: String(pinnedCount).padStart(2, "0"),
                hint: "Quick access",
            },
            {
                label: "Tags",
                value: String(tagCount).padStart(2, "0"),
                hint: "Unique topics",
            },
            {
                label: "Today",
                value: String(recentCount).padStart(2, "0"),
                hint: "Fresh captures",
            },
        ];
    }, [allNotes]);

    const topTags = useMemo(() => {
        const uniqueTags = [];

        allNotes.forEach((note) => {
            (note.tags || []).forEach((tag) => {
                if (!uniqueTags.includes(tag)) {
                    uniqueTags.push(tag);
                }
            });
        });

        return uniqueTags.slice(0, 4);
    }, [allNotes]);

    const SkeletonCard = () => (
        <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950/40">
            <div className="mb-4 h-1.5 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="mt-4 space-y-2">
                <div className="h-3 w-full animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-3 w-4/6 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="mt-6 flex gap-2">
                <div className="h-7 w-16 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
            </div>
        </div>
    );

    return (
        <div className="app-shell">
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

            <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
                <section className="surface-card relative overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_26%)]" />
                    <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div>
                            <span className="chip w-fit">Premium notes workspace</span>
                            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                                Write, organize, and sync ideas in one polished home base.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                                Capture thoughts quickly, search them instantly, and keep your best ideas surfaced with pinned notes and clean tags.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <button
                                    className="btn-primary w-auto px-5 py-3"
                                    onClick={() => {
                                        setOpenAddEditModal({
                                            isShown: true,
                                            type: "add",
                                            data: null,
                                        });
                                    }}
                                >
                                    <MdAdd className="mr-1 text-lg" />
                                    New note
                                </button>
                                {isSearch ? (
                                    <button className="btn-secondary" onClick={handleClearSearch}>
                                        Clear search
                                    </button>
                                ) : null}
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {topTags.length > 0 ? (
                                    topTags.map((tag) => (
                                        <span key={tag} className="chip">
                                            #{tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="chip">Add tags to create smart filters</span>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {stats.map((item) => (
                                <div key={item.label} className="stat-card">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                                        {item.label}
                                    </p>
                                    <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                        {item.value}
                                    </p>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.hint}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-8">
                    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                Your notes
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                {isSearch ? "Search results" : "Recent captures"}
                            </h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {allNotes.length} {allNotes.length === 1 ? "note" : "notes"} in view
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : allNotes.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {allNotes.map((item) => (
                                <NoteCard
                                    key={item._id}
                                    title={item.title}
                                    date={item.createdOn}
                                    content={item.content}
                                    tags={item.tags}
                                    isPinned={item.isPinned}
                                    onEdit={() => handleEdit(item)}
                                    onDelete={() => deleteNote(item)}
                                    onPinNote={() => updateIsPinned(item)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyCard
                            imgSrc={isSearch ? NoData : AddNotesImg}
                            message={
                                isSearch
                                    ? "No notes match that search. Try a broader keyword or clear the filter to see everything again."
                                    : 'Start creating your first note. Click the "New note" button to jot down ideas, reminders, and plans.'
                            }
                        />
                    )}
                </section>
            </main>

            <button
                className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-indigo-500 to-indigo-600 text-white shadow-[0_20px_40px_-14px_rgba(99,102,241,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(99,102,241,0.8)] active:translate-y-0"
                onClick={() => {
                    setOpenAddEditModal({
                        isShown: true,
                        type: "add",
                        data: null,
                    });
                }}
                aria-label="Add new note"
            >
                <MdAdd className="text-[28px]" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {
                    setOpenAddEditModal({
                        isShown: false,
                        type: "add",
                        data: null,
                    });
                }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(15, 23, 42, 0.45)",
                        backdropFilter: "blur(10px)",
                        zIndex: 1000,
                    },
                }}
                contentLabel=""
                className="modal-shell mx-auto mt-10 w-[92%] max-w-2xl animate-scale-in md:mt-14"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({
                            isShown: false,
                            type: "add",
                            data: null,
                        });
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </div>
    );
};

export default Home;

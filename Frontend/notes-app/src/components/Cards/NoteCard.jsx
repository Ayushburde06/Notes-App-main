import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

const accentClasses = [
    "from-violet-500/90 to-fuchsia-500/90",
    "from-cyan-500/90 to-blue-500/90",
    "from-amber-500/90 to-orange-500/90",
    "from-emerald-500/90 to-teal-500/90",
];

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    const accent = accentClasses[Math.abs((title || "").length) % accentClasses.length];

    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_-30px_rgba(15,23,42,0.38)] dark:border-slate-700 dark:bg-slate-950/50">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />

            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                        {isPinned ? <span className="chip border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">Pinned</span> : null}
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                            {moment(date).format("Do MMM YYYY")}
                        </span>
                    </div>
                    <h6 className="truncate text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                        {title}
                    </h6>
                </div>

                <button
                    type="button"
                    className={`icon-btn shrink-0 ${isPinned ? "text-amber-500 hover:text-amber-600 dark:text-amber-300" : ""}`}
                    onClick={onPinNote}
                    aria-label={isPinned ? "Unpin note" : "Pin note"}
                >
                    <MdOutlinePushPin className={`text-[20px] ${isPinned ? "rotate-45" : ""}`} />
                </button>
            </div>

            <p className="mt-4 min-h-[72px] text-sm leading-7 text-slate-600 dark:text-slate-300">
                {content?.slice(0, 120)}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
                {tags?.slice(0, 4).map((item, idx) => (
                    <span key={idx} className="chip">
                        #{item}
                    </span>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                    Keep it moving
                </p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="icon-btn bg-slate-50 text-slate-600 hover:text-emerald-500 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-emerald-400"
                        onClick={onEdit}
                        aria-label="Edit note"
                    >
                        <MdCreate className="text-[18px]" />
                    </button>
                    <button
                        type="button"
                        className="icon-btn bg-slate-50 text-slate-600 hover:text-red-500 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-red-400"
                        onClick={onDelete}
                        aria-label="Delete note"
                    >
                        <MdDelete className="text-[18px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;

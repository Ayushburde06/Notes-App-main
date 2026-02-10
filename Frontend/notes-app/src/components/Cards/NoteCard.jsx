import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"
import moment from "moment"

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
    return (
        <div className="group border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 bg-white dark:bg-slate-800/80 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 ease-out relative overflow-hidden animate-fade-in">
            {/* Accent stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-indigo-400 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="flex place-items-center justify-between">
                <div>
                    <h6 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {title}
                    </h6>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
                </div>

                <MdOutlinePushPin
                    className={`icon-btn ${isPinned ? 'text-primary dark:text-indigo-400' : 'text-slate-300 dark:text-slate-600'}`}
                    onClick={onPinNote}
                />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{content?.slice(0, 60)}</p>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((item, idx) => (
                        <span key={idx} className="text-[10px] font-medium text-primary dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">
                            #{item}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <MdCreate className="icon-btn hover:text-green-500 dark:hover:text-green-400" onClick={onEdit} />
                    <MdDelete className="icon-btn hover:text-red-500 dark:hover:text-red-400" onClick={onDelete} />
                </div>
            </div>
        </div>
    )
}

export default NoteCard
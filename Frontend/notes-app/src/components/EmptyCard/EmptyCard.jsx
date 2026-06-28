const EmptyCard = ({ imgSrc, message }) => {
    return (
        <div className="empty-card mt-12 animate-fade-in">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-indigo-50 to-cyan-50 p-4 shadow-inner dark:from-indigo-500/10 dark:to-cyan-500/10">
                <img src={imgSrc} alt="No notes" className="h-full w-full object-contain opacity-90 dark:opacity-75" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Nothing here yet</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                {message}
            </p>
        </div>
    );
};

export default EmptyCard;

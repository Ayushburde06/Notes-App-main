import React, { useEffect } from 'react'
import { LuCheck } from "react-icons/lu"
import { MdDeleteOutline } from 'react-icons/md'

function Toast({ isShown, message, type, onClose }) {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000)

    return () => {
      clearTimeout(timeoutId);
    }
  }, [onClose])

  return (
    <div className={`fixed top-20 right-6 z-50 transition-all duration-400 ${isShown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      }`}>

      <div
        className={`min-w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl after:w-[5px] after:h-full ${type === "delete" ? "after:bg-red-500" : "after:bg-emerald-500"
          } after:absolute after:left-0 after:top-0 after:rounded-l-xl`}>

        <div className='flex items-center gap-3 py-3 px-4'>

          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type === "delete" ? "bg-red-50 dark:bg-red-500/10" : "bg-emerald-50 dark:bg-emerald-500/10"
            }`}>

            {type === 'delete' ? (<MdDeleteOutline className='text-xl text-red-500' />) : (<LuCheck className="text-xl text-emerald-500" />)}
          </div>

          <p className='text-sm text-slate-700 dark:text-slate-200 font-medium'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Toast
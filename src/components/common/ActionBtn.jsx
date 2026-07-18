import React from 'react'


const ActionBtn = ({text , onclick , children,disabled,outline = false,customClasses,type,}) => {
  return (
     <button disabled={disabled}
        onClick={onclick}
        className={`flex items-center gap-x-2 cursor-pointer rounded-md py-2 px-5 font-semibold text-[#000814]
                    ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-500" }  ${customClasses}`}
        type={type}>
        {
            children ? (
                <>   {/* react fragment*/}
                    <span className={`${outline && "text-yellow-500"}`}>{text}</span>
                    {children}
                </>
            ) : (
                <span>{text}</span>
            )
        }
     </button>
  )
}

export default ActionBtn
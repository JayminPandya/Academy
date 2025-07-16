import React from 'react'
import clsx from 'clsx'

const FeeButton = ({ dark, onClick }: { dark?: boolean; onClick?: () => void }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="flex overflow-hidden rounded-full shadow-lg text-lg font-semibold w-fit">
        <div className="bg-yellow-400 text-black px-6 py-3 flex items-center space-x-1">
          <span className="text-sm text-black/70 font-medium">Entry Fee:</span>
          <span className="text-lg font-semibold text-black">₹250/-</span>
        </div>
        <button
          type="button"
          className={clsx(
            "px-7 py-3 flex items-center justify-center transition-all duration-200",
            {
              "bg-red-600 text-white hover:bg-red-700": dark,
              "bg-white text-black hover:bg-gray-100 border-l": !dark,
            }
          )}
        >
          Pay Now
        </button>
      </div>
    </div>
  )
}

export default FeeButton

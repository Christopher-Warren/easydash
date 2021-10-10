import { useState } from 'react'

const SideBar = () => {
  const [sideToggle, setSideToggle] = useState(false)
  return (
    <div
      className={`fixed top-0  w-20 h-20  transition-all duration-200 overflow-hidden
      ${sideToggle && 'h-screen border-r shadow-xl'}`}
    >
      {/* Menu Button */}
      <button
        className="w-20 h-20 text-gray-500  "
        onClick={() => setSideToggle(!sideToggle)}
      >
        {!sideToggle ? (
          <svg
            className="w-12 h-12 mx-auto border-2 border-gray-400 rounded-full p-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="none"
            fill="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        ) : (
          <svg
            className="w-12 h-12 mx-auto border-2 border-gray-400 rounded-full p-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </button>
    </div>
  )
}

export default SideBar

const SecondaryButton = ({ type, children, handleClick, className }: any) => {
  return (
    <button
      onClick={handleClick}
      className={`flex justify-around bg-white text-purple-600 border border-purple-600 font-semibold text-md rounded-sm focus:outline-purple hover:text-white hover:bg-purple-800 hover:shadow-md focus:shadow-md ${className} transition-colors`}
      type={type}
    >
      {children}
    </button>
  )
}

export default SecondaryButton

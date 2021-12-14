const PrimaryButton = ({ type, children, handleClick, className, id }: any) => {
  return (
    <button
      onClick={handleClick}
      className={`flex justify-around bg-purple-600 text-white font-semibold text-md rounded-sm transition-colors focus:outline-purple hover:bg-purple-800 hover:shadow-md focus:shadow-md ${className}`}
      type={type}
      id={id}
    >
      {children}
    </button>
  )
}

export default PrimaryButton

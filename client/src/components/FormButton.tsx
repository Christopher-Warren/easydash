const FormButton = ({ type, children, handleClick, className }: any) => {
  // className="flex bg-purple-600 px-10 py-1.5 my-8 text-white font-semibold text-md rounded-sm focus:outline-purple hover:bg-purple-700 hover:shadow-md focus:shadow-md"
  return (
    <button
      onClick={handleClick}
      className={`flex justify-around bg-purple-600 text-white font-semibold text-md rounded-sm focus:outline-purple hover:bg-purple-700 hover:shadow-md focus:shadow-md ${className}`}
      type={type}
    >
      {children}
    </button>
  )
}

export default FormButton

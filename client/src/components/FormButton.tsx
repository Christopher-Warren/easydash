const FormButton = ({ type, children, handleClick }: any) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={handleClick}
        className="bg-purple-600 px-10 py-1.5 text-white font-semibold  rounded-sm focus:outline-purple hover:bg-purple-700 hover:shadow-md focus:shadow-md"
        type={type}
      >
        {children}
      </button>
    </div>
  )
}

export default FormButton

const PrimaryButton = ({ handleClick, children, padding, id }: any) => {
  return (
    <button
      onClick={handleClick}
      id={id}
      className={`flex justify-around font-semibold text-md tracking-wide rounded
      ${padding}

    bg-purple-600 text-white 
    hover:bg-purple-700 hover:shadow-md 
      focus:shadow-md focus:outline-purple-500 focus:accent-purple-400
    shadow-purple-500/50 shadow
    transition-color duration-200
    `}
    >
      {children}
    </button>
  )
}

export default PrimaryButton

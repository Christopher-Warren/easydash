const SecondaryButton = ({ type, children, handleClick, padding, id }: any) => {
  return (
    <button
      onClick={handleClick}
      id={id}
      className={`flex justify-around bg-transparent shadow shadow-purple-500/50 text-purple-500 border

      ${padding}
       border-purple-500 font-semibold text-md rounded focus:outline-purple-500 focus:accent-purple-400 hover:text-white hover:bg-purple-700
        hover:shadow-md focus:shadow-md  transition-colors`}
      type={type}
    >
      {children}
    </button>
  )
}

export default SecondaryButton

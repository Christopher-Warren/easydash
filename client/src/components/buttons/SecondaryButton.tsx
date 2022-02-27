const SecondaryButton = ({
  type,
  children,
  onClick,
  padding,
  id,
  red,
}: any) => {
  return (
    <button
      onClick={onClick}
      id={id}
      className={`flex justify-around bg-transparent shadow border leading-relaxed tracking-wide
      ${
        red
          ? 'border-red-500 focus:outline-red-500 focus:accent-red-400 hover:bg-red-500 shadow-red-500/50 text-red-500'
          : 'border-purple-500 focus:outline-purple-500 focus:accent-purple-400 hover:bg-purple-500 shadow-purple-500/50 text-purple-500'
      }
       
      ${padding}
        font-semibold text-md rounded  hover:text-white 

        hover:shadow-md focus:shadow-md  transition-colors`}
      type={type}
    >
      {children}
    </button>
  )
}

export default SecondaryButton

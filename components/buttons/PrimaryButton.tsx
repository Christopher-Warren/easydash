const PrimaryButton = ({
  onClick,
  children,
  padding,
  id,
  className,
  type,
}: any) => {
  return (
    <button
      onClick={onClick}
      id={id}
      type={type}
      className={`justify-around font-medium text-md tracking-wide leading-relaxed rounded inline-flex
      ${padding}
      ${className}
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

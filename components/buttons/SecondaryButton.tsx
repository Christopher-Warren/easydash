const SecondaryButton = ({
  type,
  children,
  onClick,
  padding,
  id,
  red,
  className,
}: any) => {
  return (
    <button
      onClick={onClick}
      id={id}
      className={`inline-flex bg-transparent shadow border leading-relaxed tracking-wide
      ${
        red
          ? 'border-red-500 focus:outline-red-500 hover:text-white focus:accent-red-400 hover:bg-red-500  text-red-500'
          : 'border-gray-600 hover:text-purple-700  hover:border-purple-600 dark:border-gray-300 dark:hover:border-purple-500 focus:outline-purple-500 focus:accent-purple-400 hover:bg-transparent dark:hover:bg-transparent dark:hover:text-purple-500  text-gray-600 dark:text-gray-300'
      }
       
      ${padding}
      ${className}
        font-semibold text-md rounded  

        hover:shadow-md focus:shadow-md  transition-colors`}
      type={type}
    >
      {children}
    </button>
  )
}

export default SecondaryButton

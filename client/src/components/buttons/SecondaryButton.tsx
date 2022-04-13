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
          ? 'border-red-500 focus:outline-red-500 focus:accent-red-400 hover:bg-red-500  text-red-500'
          : 'border-gray-600 hover:border-purple-600 dark:border-gray-400 dark:hover:border-purple-800 focus:outline-purple-500 focus:accent-purple-400 hover:bg-white dark:hover:bg-gray-800 dark:hover:text-purple-500  text-gray-600 dark:text-gray-400'
      }
       
      ${padding}
        font-semibold text-md rounded  hover:text-purple-700 

        hover:shadow-md focus:shadow-md  transition-colors`}
      type={type}
    >
      {children}
    </button>
  )
}

export default SecondaryButton

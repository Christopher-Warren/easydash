const InfoCardSmall = ({
  children,
  title,

  titleClassName,
  className,
}: any) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md p-3 ${className} shadow-md relative`}
    >
      <div className="relative ">
        {title && (
          <h1
            className={`mb-5 text-2xl text-gray-700 dark:text-gray-50 ${titleClassName}`}
          >
            {title}
          </h1>
        )}

        {children}
      </div>
    </div>
  )
}

export default InfoCardSmall

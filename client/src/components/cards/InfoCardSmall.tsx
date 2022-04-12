const InfoCardSmall = ({ children, title, titleClassName, className }: any) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md p-3 ${className} shadow-md`}
    >
      {title && (
        <h1
          className={`${titleClassName} text-2xl text-gray-700 dark:text-gray-50`}
        >
          {title}
        </h1>
      )}

      {children}
    </div>
  )
}

export default InfoCardSmall

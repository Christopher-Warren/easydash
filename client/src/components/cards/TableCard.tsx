const TableCard = ({ children, title, titleClassName, className }: any) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border dark:border-gray-700 dark:text-gray-200 rounded-md tracking-wide shadow-lg overflow-x-auto
    ${className}
    `}
    >
      {titleClassName && (
        <h1 className={`${titleClassName} text-2xl text-gray-800`}>{title}</h1>
      )}
      {children}
    </div>
  )
}

export default TableCard

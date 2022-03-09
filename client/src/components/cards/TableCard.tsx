const TableCard = ({ children, title, titleClassName }: any) => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-100/25 rounded-md overflow-hidden tracking-wide shadow-lg ">
      <h1 className={`${titleClassName} text-2xl text-gray-800`}>{title}</h1>
      {children}
    </div>
  )
}

export default TableCard

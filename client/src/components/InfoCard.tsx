const InfoCard = ({ children, title, titleClassName }: any) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100/25 rounded-md p-3 ">
      <h1
        className={`${titleClassName} text-2xl text-gray-700 dark:text-gray-50`}
      >
        {title}
      </h1>
      {children}
    </div>
  )
}

export default InfoCard

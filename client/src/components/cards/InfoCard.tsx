const InfoCard = ({ children, title, titleClassName, p }: any) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border dark:border-gray-100/25 rounded-md p-3 ${p}`}
    >
      <h1
        className={`${titleClassName} text-2xl text-gray-700 dark:text-white`}
      >
        {title}
      </h1>
      {children}
    </div>
  )
}

export default InfoCard

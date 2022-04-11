const InfoCardLarge = ({ children, title, titleClassName, p }: any) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border dark:border-gray-100/25 py-7 lg:px-8 px-4  rounded-2xl shadow-xl ${p}
      
      transition-all
      duration-1000
      `}
    >
      {title && (
        <h1
          className={`${titleClassName} text-2xl text-gray-700 font-bold dark:text-white pb-5`}
        >
          {title}
        </h1>
      )}

      {children}
    </div>
  )
}

export default InfoCardLarge

const InfoCard = ({ children, title, titleClassName }: any) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-3">
      <h1 className={`${titleClassName} text-2xl text-gray-800`}>{title}</h1>
      {children}
    </div>
  )
}

export default InfoCard

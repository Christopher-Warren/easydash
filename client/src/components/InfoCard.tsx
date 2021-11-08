const InfoCard = (props: any) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-3 relative">
      {props.children}
    </div>
  )
}

export default InfoCard

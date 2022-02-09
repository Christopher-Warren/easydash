const PageWrapper = (props: any) => {
  return (
    <div className="relative max-w-7xl mx-auto mt-32 mb-20 px-5  dark:text-gray-200 text-gray-700">
      {props.children}
    </div>
  )
}
export default PageWrapper

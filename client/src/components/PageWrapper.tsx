const PageWrapper = (props: any) => {
  return (
    <div
      className={`relative mx-auto mt-32 mb-20 px-5 max-w-7xl dark:text-gray-200 text-gray-700`}
    >
      {props.children}
    </div>
  )
}
export default PageWrapper

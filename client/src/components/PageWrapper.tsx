const PageWrapper = (props: any) => {
  return (
    <div
      className={`relative mx-auto my-20 mt-32 md:mt-20 px-5 max-w-7xl dark:text-gray-200 text-gray-700`}
    >
      {props.children}
    </div>
  )
}
export default PageWrapper

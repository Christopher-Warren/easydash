const PageWrapper = (props: any) => {
  return (
    <div className="relative max-w-7xl mx-auto mt-32 px-10">
      {props.children}
    </div>
  )
}

export default PageWrapper

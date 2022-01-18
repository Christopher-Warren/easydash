const PageWrapper = (props: any) => {
  return (
    <div className="relative max-w-7xl mx-auto pt-32 pb-20 px-5">
      {props.children}
    </div>
  )
}

export default PageWrapper

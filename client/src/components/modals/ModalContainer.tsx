import PageWrapper from '../PageWrapper'

const ModalContainer = ({ children }: any) => {
  return (
    <div className="bg-gray-900 bg-opacity-50 fixed top-0 h-screen w-full z-20">
      <PageWrapper>{children}</PageWrapper>
    </div>
  )
}

export default ModalContainer

import PageWrapper from '../PageWrapper'

import { toggleModal } from '../../redux/modal/modalSlice'

import { useAppDispatch } from '../../redux/hooks'

const ModalContainer = ({ children }: any) => {
  const dispatch = useAppDispatch()
  return (
    <div
      className="bg-black bg-opacity-50 fixed top-0  h-screen w-full z-20 lg:pl-20 overflow-y-scroll"
      id="overlay"
      onClick={(e: any) => {
        if (e.target.id === 'overlay') {
          dispatch(toggleModal(null))
        }
      }}
    >
      <PageWrapper>{children}</PageWrapper>
    </div>
  )
}

export default ModalContainer

import PageWrapper from '../PageWrapper'

import { toggleModal } from '../../redux/modal/modalSlice'

import { useAppDispatch } from '../../redux/hooks'
import customPrompt from '../../utils/customPrompt'

const ModalContainer = ({ children, size }: any) => {
  const dispatch = useAppDispatch()
  return (
    <div
      className="bg-black bg-opacity-20 fixed top-0  h-screen w-full z-20 lg:pl-20 overflow-y-scroll transition-opacity duration-200"
      id="overlay"
      onClick={(e: any) => {
        const dispatchToggle = () => {
          dispatch(toggleModal(null))
        }

        const opts = {
          title: 'Are you sure?',
          body: 'If you are, all changes will be lost',
          confirm: 'yes',
          cancel: 'no',
        }

        if (e.target.id === 'overlay') {
          customPrompt(opts, dispatchToggle)
        }
      }}
    >
      <div className={`max-w-${size} mx-auto`}>
        <PageWrapper>{children}</PageWrapper>
      </div>
    </div>
  )
}

export default ModalContainer

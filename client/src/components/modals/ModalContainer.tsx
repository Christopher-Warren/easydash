import PageWrapper from '../PageWrapper'

import { toggleModal } from '../../redux/modal/modalSlice'

import { useAppDispatch } from '../../redux/hooks'
import customPrompt from '../../utils/customPrompt'

type ModalProps = {
  children: any
  size: any
  opts: any
  hasChanged?: boolean
}

const ModalContainer = ({ children, size, opts, hasChanged }: ModalProps) => {
  const dispatch = useAppDispatch()

  return (
    <div
      className="bg-black bg-opacity-20 fixed top-0  h-screen w-full z-20 lg:pl-20 overflow-y-scroll transition-opacity duration-200"
      id="overlay"
      onClick={(e: any) => {
        const closeModal = () => {
          dispatch(toggleModal({ value: null }))
        }

        if (e.target.id === 'overlay') {
          if (hasChanged) customPrompt(opts, closeModal)
          if (!hasChanged) closeModal()
        }
      }}
    >
      <div className={`${size} mx-auto`}>
        <PageWrapper>{children}</PageWrapper>
      </div>
    </div>
  )
}

export default ModalContainer

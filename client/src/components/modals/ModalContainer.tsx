import PageWrapper from '../PageWrapper'

import { toggleModal } from '../../redux/modal/modalSlice'

import { useAppDispatch } from '../../redux/hooks'
import customPrompt from '../../utils/customPrompt'

type ModalProps = {
  children: any
  size: any
  opts: any
  hasChanges?: any
}

const ModalContainer = ({ children, size, opts, hasChanges }: ModalProps) => {
  const dispatch = useAppDispatch()

  return (
    <div
      className="bg-black bg-opacity-20 fixed top-0  h-screen w-full z-20 lg:pl-20 overflow-y-scroll transition-opacity duration-200"
      id="overlay"
      onClick={(e: any) => {
        const closeToggle = () => {
          dispatch(toggleModal({ value: null }))
        }

        if (e.target.id === 'overlay') {
          if (hasChanges) customPrompt(opts, closeToggle)
          if (!hasChanges) closeToggle()
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

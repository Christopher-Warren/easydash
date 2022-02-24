import PageWrapper from '../PageWrapper'

import { toggleModal } from '../../redux/modal/modalSlice'

import { useAppDispatch } from '../../redux/hooks'
import customPrompt from '../../utils/customPrompt'

const ModalContainer = ({ children, size, opts, hasChanges }: any) => {
  const dispatch = useAppDispatch()

  // console.log(hasChanges)

  return (
    <div
      className="bg-black bg-opacity-20 fixed top-0  h-screen w-full z-20 lg:pl-20 overflow-y-scroll transition-opacity duration-200"
      id="overlay"
      onClick={(e: any) => {
        const dispatchToggle = () => {
          dispatch(toggleModal({ value: null }))
        }

        if (e.target.id === 'overlay') {
          if (hasChanges) customPrompt(opts, dispatchToggle)
          if (!hasChanges) dispatchToggle()
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

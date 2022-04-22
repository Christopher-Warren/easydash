import PageWrapper from '../PageWrapper'

import { toggleModal } from '../../redux/modal/modalSlice'

import { useAppDispatch } from '../../redux/hooks'
import customPrompt from '../../utils/customPrompt'
import InfoCardLarge from '../cards/InfoCardLarge'

type size = 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl'
export interface PromptTypes {
  title: string
  body: string
  confirm: string
  cancel: string
}
type ModalProps = {
  className?: string
  title: string
  children: any
  size: size
  opts: PromptTypes
  hasChanged?: boolean
}

const ModalContainer = ({
  children,
  size,
  opts,
  hasChanged,
  title,
  className,
}: ModalProps) => {
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
      <div className={`${size} max-w-7xl max-w mx-auto`}>
        <PageWrapper>
          <div className="w-full left-0 z-30 modal-anims  transition-all duration-100">
            <InfoCardLarge title={title} className={className}>
              {children}
            </InfoCardLarge>
          </div>
        </PageWrapper>
      </div>
    </div>
  )
}

export default ModalContainer

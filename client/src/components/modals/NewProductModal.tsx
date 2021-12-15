import InfoCard from '../InfoCard'
import ModalContainer from './ModalContainer'

const NewProductModal = () => {
  return (
    <ModalContainer>
      <div className=" w-full left-0 z-30 ">
        <InfoCard title="New Product"></InfoCard>
      </div>
    </ModalContainer>
  )
}

export default NewProductModal

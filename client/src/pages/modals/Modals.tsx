import { Forms } from '../../enums'
import { useAppSelector } from '../../redux/hooks'

import NewProductModal from '../../components/modals/NewProductModal'

const Modals = () => {
  const modal = useAppSelector((state) => state.modal.value)

  switch (modal) {
    case Forms.newProduct:
      return <NewProductModal />

    default:
      return null
  }
}

export default Modals

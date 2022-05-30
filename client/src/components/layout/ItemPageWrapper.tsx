import { useHistory } from 'react-router-dom'
import SecondaryButton from '../buttons/SecondaryButton'
import PageWrapper from '../PageWrapper'

const ItemPageWrapper = ({ children }: any) => {
  const history = useHistory()

  return (
    <PageWrapper>
      <div className="flex mb-6">
        <SecondaryButton onClick={() => history.goBack()} padding="px-5 py-1.5">
          {'<- Back'}
        </SecondaryButton>
      </div>
      {children}
    </PageWrapper>
  )
}

export default ItemPageWrapper

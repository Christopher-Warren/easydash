import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import SecondaryButton from '../../../components/buttons/SecondaryButton'
import InfoCardLarge from '../../../components/cards/InfoCardLarge'
import PageWrapper from '../../../components/PageWrapper'

import { useHistory } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'

function ViewOrder() {
  let { id }: any = useParams()

  const history = useHistory()

  const { data: { getOrder: order } = {}, loading } = useQuery(
    gql`
      query getOrder($input: ID!) {
        getOrder(input: $input) {
          _id
          orderNumber
          total
          products {
            qty
            sum
            product {
              name
              price
              images
            }
          }
          status {
            paid
            processed
            fulfilled
          }
          billingInfo {
            firstName
            lastName
            country
            country
            city
            zipcode
            address
            address2
          }
          shippingInfo {
            firstName
            lastName
            country
            country
            city
            zipcode
            address
            address2
          }
        }
      }
    `,
    {
      variables: {
        input: id,
      },
    },
  )

  if (!order && !loading) return <div>404</div>

  if (!order) return <LoadingSpinner />

  return (
    <PageWrapper>
      <div className="flex my-5">
        <SecondaryButton
          onClick={() => history.goBack()}
          padding="px-5 py-1.5 mr-5"
        >
          {'<-Back'}
        </SecondaryButton>
      </div>
      <div className="my-5">
        <h1 className="text-4xl  font-medium ">Order #{order.orderNumber}</h1>
        <span>Status: {order.status?.paid ? 'paid' : 'unpaid'}</span>
      </div>

      <InfoCardLarge>
        <div>
          <h3>ID: {id}</h3>
        </div>
      </InfoCardLarge>
    </PageWrapper>
  )
}

export default ViewOrder

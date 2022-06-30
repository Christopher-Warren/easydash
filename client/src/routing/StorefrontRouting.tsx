import { Route, Switch } from 'react-router-dom'
import ViewProduct from '../pages/shop/ViewProduct'
import { ShopHome } from '../pages/shop/ShopHome'
import Navbar from '../pages/shop/store-navigation/Navbar'

import { ShopByCategory } from '../pages/shop/store-navigation/shop-by-category/ShopByCategory'

const StorefrontRouting = () => {
  return (
    <Switch>
      <Route path={'/'}>
        <Navbar />
        <Route exact path={'/'}>
          <ShopHome />
        </Route>
        <Route exact path={'/shop/categories/'}>
          <ShopByCategory />
        </Route>
        <Route exact path={'/shop/categories/:category'}>
          <ShopByCategory />
        </Route>
        <Route path={'/shop/categories/:category/:id'}>
          <ViewProduct />
        </Route>
      </Route>
    </Switch>
  )
}
export default StorefrontRouting

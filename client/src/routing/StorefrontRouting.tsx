import { Route, Switch } from 'react-router-dom'
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
        <Route path={'/shop/categories/'} exact>
          <ShopByCategory />
        </Route>
        <Route path={'/shop/categories/:category'}>
          <ShopByCategory />
        </Route>
      </Route>
    </Switch>
  )
}
export default StorefrontRouting

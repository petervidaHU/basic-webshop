import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import Product from './screens/Product';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProtectedRoute from './layout/ProtectedRoute';
import UsersList from './admin/components/UsersList';
import DefaultItem from './admin/components/DefaultItem';
import OrdersList from './admin/components/OrdersList';
import EditOrder from './admin/components/edit/EditOrder';
import ProductList from './admin/components/ProductList';
import EditProduct from './admin/components/edit/EditProduct';
import CategoriesList from './admin/components/CategoriesList';
import EditCategories from './admin/components/edit/editCategories';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import ThankYou from './screens/ThankYou';
import EditUsers from './admin/components/edit/editUser';
import AdminSettings from './admin/AdminSettings';
import Sample from './screens/Sample';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/rolunk' component={Home} />
        <Route path='/sale' component={Home} />
        <Route path='/cart' component={CartScreen} />
        <Route path='/order' component={OrderScreen} />
        <Route path='/profile' component={MyProfileScreen} />
        <Route path='/thank_you' component={ThankYou} />
        <Route path='/sample' component={Sample} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/kategoriak' component={CategoriesScreen} />
        <ProtectedRoute path="/admin/settings" component={AdminSettings} />
        <ProtectedRoute path="/admin/userslist/:id" component={EditUsers} />
        <ProtectedRoute path="/admin/userslist" component={UsersList} />
        <ProtectedRoute path="/admin/orderslist/:id" component={EditOrder} />
        <ProtectedRoute path="/admin/orderslist" component={OrdersList} />
        <ProtectedRoute path="/admin/productslist/:id" component={EditProduct} />
        <ProtectedRoute path="/admin/productslist" component={ProductList} />
        <ProtectedRoute path="/admin/categorieslist/:id" component={EditCategories} />
        <ProtectedRoute path="/admin/categorieslist" component={CategoriesList} />
        <ProtectedRoute exact path="/admin" component={DefaultItem} exact />
        <Route path='/:kategoria/:slug' component={Product} />
        <Route path='/:kategoria' component={CategoryScreen} />
      </Switch>

    </Router>
  );
}

export default App;

import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductListPage = lazy(() => import('./modules/product/pages/ProductListPage'));
const AddProductPage = lazy(() => import('./modules/product/pages/AddProductPage'));
const DetailProductPage = lazy(() => import('./modules/product/pages/DetailProductPage'));
const UserListPage = lazy(() => import('./modules/user/pages/UserListPage'));
const AddUserPage = lazy(() => import('./modules/user/pages/AddUserPage'));
const UserDetailPage = lazy(() => import('./modules/user/pages/UserDetailPage'));

import Header from './layout/components/Header';

export const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Header>
        <Switch location={location}>
          <Route path={ROUTES.login} component={LoginPage} />
          <ProtectedRoute path={ROUTES.home} component={HomePage} />
          <Route path={ROUTES.contact} component={ContactPage} />
          <Route path={ROUTES.productList} component={ProductListPage} />
          <Route path={ROUTES.productForm} component={AddProductPage} />
          <Route path={`${ROUTES.productDetail}/:id`} component={DetailProductPage} />
          <Route path={ROUTES.userList} component={UserListPage} />
          <Route path={ROUTES.userForm} component={AddUserPage} />
          <Route path={`${ROUTES.userDetail}/:id`} component={UserDetailPage} />

          <ProtectedRoute path="/" component={ProductListPage} />
        </Switch>
      </Header>
    </Suspense>
  );
};

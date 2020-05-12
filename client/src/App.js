import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//UTILS
import  ErrorBoundary from './shared/components/ErrorBoundary/ErrorBoundary';
import { UserContextProvider } from './auth/context/UserContext';
import { EstatesContextProvider } from './estates/context/EstatesContext';
import Main from './shared/ui/layout/Main';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Layout from './shared/ui/layout/Layout';
import PrivateRoute from './routes/privateRoutes/PrivateRoute';
import InfoStatus from './shared/components/InfoStatus/InfoStatus';
import Footer from './shared/components/Footer/Footer';
import ScrollTop from './routes/ScrollTop';
import Center from './shared/ui/position/Center';
import Loader from './shared/components/Loader/Loader';
//PAGES
const HomePage = React.lazy(() => import('./homePage/pages/HomePage'));
const Users = React.lazy(() => import('./users/pages/Users'));
const Estates = React.lazy(() => import('./estates/pages/Estates'));
const UserDashboard = React.lazy(() => import('./users/pages/UserDashboard'));
const EstateDashboard = React.lazy(() => import('./estates/pages/EstateDashboard'));
const UserProfilePage = React.lazy(() => import('./users/pages/UserProfilePage'));
const AddEstate = React.lazy(() => import('./estates/pages/AddEstate'));
const SignUpPage = React.lazy(() => import('./auth/pages/SignupPage'));
const LoginPage = React.lazy(() => import('./auth/pages/LoginPage'));
const Route404 = React.lazy(() => import('./routes/404/Route404'));

function App() {
  return (
    <Layout>
      <ErrorBoundary>
        <UserContextProvider>
        <EstatesContextProvider>
          <BrowserRouter>
          <ScrollTop>
            <MainNavigation />
            <Suspense fallback={<Center cover="true"><Loader/></Center>}>
              <Main>
                <InfoStatus />
                <Switch>

                  <Route exact path="/">
                    <HomePage />
                  </Route> 

                  <Route path="/users" exact>
                    <Users />
                  </Route>

                  <Route path="/users/:userId" exact>
                    <UserDashboard />
                  </Route>

                  <PrivateRoute
                    path="/users/me/:userId"
                    component={UserProfilePage} 
                  />

                  <PrivateRoute 
                    path="/estates/new"
                    component={AddEstate} 
                    exact 
                  />

                  <Route path="/estates/:estateId" exact>
                    <EstateDashboard />
                  </Route>

                  <Route path="/estates" exact>
                    <Estates />
                  </Route>

                  <Route path="/signup">
                    <SignUpPage />
                  </Route>

                  <Route path="/login">
                    <LoginPage />
                  </Route>

                  <Route404 />

                </Switch>
              </Main>
            </Suspense>
            <Footer />
            </ScrollTop>
          </BrowserRouter>
        </EstatesContextProvider>
        </UserContextProvider>
      </ErrorBoundary>
    </Layout>
  )
};

export default App;

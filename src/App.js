import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { UserContextProvider } from './auth/context/UserContext';
import { EstatesContextProvider } from './estates/context/EstatesContext';

//Pages
import Main from './shared/ui/layout/Main';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Layout from './shared/ui/layout/Layout';
import PrivateRoute from './routes/privateRoutes/PrivateRoute';
import HomePage from './homePage/pages/HomePage';
import Users from './users/pages/Users';
import Estates from './estates/pages/Estates';
import UserDashboard from './users/pages/UserDashboard';
import EstateDashboard from './estates/pages/EstateDashboard';
import AddEstate from './estates/pages/AddEstate';
import SignUpPage from './auth/pages/SignupPage';
import UserProfilePage from './users/pages/UserProfilePage';
import LoginPage from './auth/pages/LoginPage';
import InfoStatus from './shared/components/InfoStatus/InfoStatus';
import Footer from './shared/components/Footer/Footer';
import ScrollTop from './routes/ScrollTop';

function App() {
  return (
    <Layout>
      <UserContextProvider>
      <EstatesContextProvider>
        <BrowserRouter>
        <ScrollTop>
          <MainNavigation />
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

              <Route path="/estates" exact>
                <Estates />
              </Route>

              <PrivateRoute 
              path="/estates/new"
              component={AddEstate} 
              exact />

              <Route path="/estates/:estateId" exact>
                <EstateDashboard />
              </Route>

              <Route path="/signup">
                <SignUpPage />
              </Route>

              <Route path="/login">
                <LoginPage />
              </Route>

              <PrivateRoute
                path="/profile/:userId"
                component={UserProfilePage} 
              />

              <Redirect to="/"/>

            </Switch>
          </Main>
          <Footer />
          </ScrollTop>
        </BrowserRouter>
      </EstatesContextProvider>
      </UserContextProvider>
    </Layout>
  )
};

export default App;

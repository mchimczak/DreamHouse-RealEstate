import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Main from './shared/ui/layout/Main';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import HomePage from './homePage/pages/HomePage';
import Users from './users/pages/Users';
import Estates from './estates/pages/Estates';
import UserDashboard from './users/pages/UserDashboard';
import Layout from './shared/ui/layout/Layout';
import EstateDashboard from './estates/pages/EstateDashboard';

import { UserContextProvider } from './auth/context/UserContext';
import { EstatesContextProvider } from './estates/context/EstatesContext';
import AddEstate from './estates/pages/AddEstate';
import SignUpPage from './auth/pages/SignupPage';
import PrivateRoute from './routes/privateRoutes/PrivateRoute';
import UserProfilePage from './users/pages/UserProfilePage';

function App() {
  return (
    <Layout>
      <UserContextProvider>
      <EstatesContextProvider>
        <BrowserRouter>
          <MainNavigation />
          <Main>
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

              <Route path="/estates/new" exact>
                <AddEstate />
              </Route>

              <Route path="/estates/:estateId" exact>
                <EstateDashboard />
              </Route>

              <Route path="/signup">
                <SignUpPage />
              </Route>

              <PrivateRoute
                path="/profile/:userId"
                component={UserProfilePage} 
              />

              <Redirect to="/"/>

            </Switch>
          </Main>
        </BrowserRouter>
      </EstatesContextProvider>
      </UserContextProvider>
    </Layout>
  )
};

export default App;

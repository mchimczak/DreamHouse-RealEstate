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

import { EstatesContextProvider } from './estates/context/EstatesContext';
import AddEstate from './estates/pages/AddEstate';
import SignUpPage from './auth/pages/SignupPage';

function App() {
  return (
    <Layout>
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

            <Redirect to="/"/>

          </Switch>
        </Main>
      </BrowserRouter>
      </EstatesContextProvider>
    </Layout>
  )
};

export default App;

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

import { EstatesContext, EstatesListData } from './estates/context/EstatesContext';

function App() {
  return (
    <Layout>
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
              <EstatesContext.Provider value={EstatesListData}>
                <UserDashboard />
              </EstatesContext.Provider>
            </Route>

            <Route path="/estates" exact>
              <EstatesContext.Provider value={EstatesListData}>
                  <Estates />
              </EstatesContext.Provider>
            </Route>

            <Route path="/estates/:estateId">
              <EstatesContext.Provider value={EstatesListData}>
                <EstateDashboard />
              </EstatesContext.Provider>
            </Route>

            <Redirect to="/"/>
          </Switch>
        </Main>
      </BrowserRouter>
    </Layout>
  )
};

export default App;

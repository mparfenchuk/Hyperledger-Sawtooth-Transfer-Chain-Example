import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './ducks/store';

import HomePage from '../home';
import NewAssetPage from '../new-asset';
import AddressPage from '../address';

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/new-asset" component={NewAssetPage} />
                <Route exact path="/:address" component={AddressPage} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

export default App;

// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';
import Catcher from '../../components/Catcher';
import Feed from '../../components/Feed';
import Profile from '../../components/Profile';
import { Provider } from '../../components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';

// Instruments
import avatar from '../../theme/assets/lisa';

@hot(module)
export default class App extends Component {
    state = {
        avatar,
        currentUserFirstName: 'Антон',
        currentUserLastName:  'Худяков',
        isLoggedIn:           false,
    };
    _setLogIn = (state) => {
        this.setState({
            isLoggedIn: true,
        });
    }
    _setLogOut = (state) => {
        this.setState({
            isLoggedIn: false,
        });
    }

    render () {

        const { isLoggedIn } = this.state;

        return (
            <Catcher>
                {
                    <Provider value = { this.state }>
                        {
                            (isLoggedIn ? <StatusBar _setLogOut = { this._setLogOut } /> : null)
                        }
                        <Switch>
                            <Route component = { Feed } path = '/feed' />
                            <Route component = { Profile } path = '/profile' />
                            {
                                !isLoggedIn?(<>
                                    <Route component = { Login } path = '/login' />
                                    <Login _setLogIn = { this._setLogIn } />
                                    </>
                                ):null
                            }
                            {
                                isLoggedIn ? <Redirect to = '/feed' /> : <Redirect to = '/login' />
                            }
                        </Switch>
                    </Provider>

                }
            </Catcher>

        );
    }
}

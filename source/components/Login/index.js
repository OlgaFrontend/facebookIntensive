//Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';
import { withProfile } from '../../components/HOC/withProfile';
import { Link } from 'react-router-dom';

@withProfile
export default class Post extends Component {
    _setLogIn = () => {
        const { _setLogIn } = this.props;

        _setLogIn();
    }

    render () {
        return (
            <section className = { Styles.login }>
                <button onClick = { this._setLogIn }>Log in</button>
            </section>

        );
    }
}

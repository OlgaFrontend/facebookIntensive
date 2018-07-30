//Core
import React, { Component } from 'react';
// Components
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.feed }>
                <StatusBar { ...this.props } />
                <Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Post { ...this.props } />
            </section>
        );
    }
}

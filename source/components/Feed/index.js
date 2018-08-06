//Core
import React, { Component } from 'react';
// Components
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';

// Instruments
import Styles from './styles.m.css';
import Spinner from '../Spinner';

export default class Feed extends Component {
    state = {
        posts:      [{ id: '123', comment: 'Hi there!', created: 15365646546 }, { id: '456', comment: 'Приветик! ', created: 2646456 }],
        isSpinning: true,
    };
    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { posts } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { this.state.isSpinning } />
                <StatusBar { ...this.props } />
                <Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                {postsJSX}
            </section>
        );
    }
}

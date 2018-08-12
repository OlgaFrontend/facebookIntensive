//Core
import React, { Component } from 'react';

// Components
import Like from '../../components/Like/index'
import { Consumer } from '../../components/HOC/withProfile';

// Instruments
import moment from 'moment';
import {func, string, number, array} from 'prop-types';
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        id: string.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        _likePost: func.isRequired,
        likes: array.isRequired,
        _removePost: func.isRequired,
    };
    constructor (){
        super();

        this._removePost = this._removePost.bind(this);
    }

    _removePost (){
        const { _removePost, id } = this.props;

        _removePost (id);
    }
    render () {
        const { comment, created, _likePost, _removePost, id, likes } = this.props;

        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.post }>
                            <span className = {Styles.cross} onClick = {this._removePost}>cross</span>
                            <img src = { context.avatar } />
                            <a>{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                            <time>{moment.unix(created).format(`MMMM D h:mm:ss a`)}</time>
                            <p>{comment}</p>
                            <Like id ={id} 
                            likes = {likes}
                            _likePost = {_likePost}
                              {...context}
                               />
                        </section>)
                }
            </Consumer>
        );
    }
}

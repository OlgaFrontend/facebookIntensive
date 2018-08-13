//Core
import React, { Component } from 'react';
import moment from 'moment';
// Components
import Composer from '../Composer';
import Post from '../Post';
import { withProfile } from '../../components/HOC/withProfile';
import StatusBar from '../StatusBar';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from '../../instruments/index';
import Spinner from '../Spinner';

@withProfile
export default class Feed extends Component {

    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 15365646546, likes: []},
            { id: '456', comment: 'Приветик! ', created: 2646456, likes: []}],
        isPostsFetching: false,
    };

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostsFetching: state,
        });
    }

     _createPost= async (comment) => {
         this._setPostsFetchingState(true);

         const post = {
             id:      getUniqueID(),
             created: moment.utc(),
             comment,
             likes:   [],
         };

         await delay(1200);

         this.setState(({ posts }) => ({
             posts:           [post, ...posts],
             isPostsFetching: false,
         }));
     }

      _likePost = async (id) => {
          const { currentUserFirstName, currentUserLastName } = this.props;

          this._setPostsFetchingState(true);

          await delay(1200);

          const newPosts = this.state.posts.map((post) => {
              if (post.id === id) {
                  return {
                      ...post,
                      likes: [
                          {
                              id:        getUniqueID(),
                              firstName: currentUserFirstName,
                              lastName:  currentUserLastName,
                          }
                      ],
                  };
              }

              return post;
          });

          this.setState({
              posts:           newPosts,
              isPostsFetching: false,
          });
      }

       _removePost= async (id) => {
           const { currentUserFirstName, currentUserLastName } = this.props;

           this._setPostsFetchingState(true);

           await delay(1200);

           const newPosts = this.state.posts.filter((post) => post.id !== id);

           this.setState({
               posts:           newPosts,
               isPostsFetching: false,
           });
       }

       render () {
           const { avatar, currentUserFirstName, currentUserLastName } = this.props;
           const { posts } = this.state;

           const postsJSX = posts.map((post) => {
               return <Post key = { post.id } { ...post } _likePost = { this._likePost } _removePost = { this._removePost } />;
           });
           const isPostsFetching = this.state.isPostsFetching;

           return (
               <section className = { Styles.feed }>
                   <Spinner isPostsFetching = { isPostsFetching } />
                   <StatusBar { ...this.props } />
                   <Composer
                       _createPost = { this._createPost }
                       avatar = { avatar }
                       currentUserFirstName = { currentUserFirstName }
                   />
                   {postsJSX}
               </section>
           );
       }
}

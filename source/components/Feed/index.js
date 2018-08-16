//Core
import React, { Component } from 'react';
// Components
import Composer from '../Composer';
import Post from '../Post';
import { withProfile } from '../../components/HOC/withProfile';
import StatusBar from '../StatusBar';

// Instruments
import Styles from './styles.m.css';
import Catcher from '../../components/Catcher';
import Spinner from '../Spinner';
import { api, TOKEN, GROUP_ID } from '../../config/api';
import { socket } from '../socket/init';

@withProfile
export default class Feed extends Component {

    state = {
        posts:           [],
        isPostsFetching: false,
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
        });
        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });
        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts:           posts.map((post) => post.id === likedPost.id ? likedPost: post),
                    isPostsFetching: false,
                }));
            }
        });
    }

    componentWillUnmount () {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostsFetching: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        // ВОПРОС
        const { data: posts } = await response.json();

        this.setState(
            {
                posts,
                isPostsFetching: false,
            }
        );
    }

     _createPost= async (comment) => {
         this._setPostsFetchingState(true);

         const response = await fetch(api, {
             method:  'POST',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:  TOKEN,
             },
             body: JSON.stringify({ comment }),
         });

         const { data: post } = await response.json();

         this.setState(({ posts }) => ({
             posts:           [post, ...posts],
             isPostsFetching: false,
         }));
     }

      _likePost = async (id) => {

          this._setPostsFetchingState(true);

          const response = await fetch(`${api}/${id}`, {
              method:  'PUT',
              headers: {
                  Authorization: TOKEN,
              },
          });

          const { data: likedPost } = await response.json();

          this.setState(({ posts }) => ({
              posts:           posts.map((post) => post.id === likedPost.id ? likedPost: post),
              isPostsFetching: false,
          }));
      }

       _removePost= async (id) => {
           this._setPostsFetchingState(true);

           await fetch(`${api}/${id}`, {
               method:  'DELETE',
               headers: {
                   Authorization: TOKEN,
               },
           });

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
               return (
                   <Catcher key = { post.id }>
                       <Post
                           { ...post }
                           _likePost = { this._likePost }
                           _removePost = { this._removePost }
                       />
                   </Catcher>);
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

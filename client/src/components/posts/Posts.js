import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ post: { posts, loading }, getPosts }) => {
    // console.log(post);
    // console.log(getPosts);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ? <Spinner /> :
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>
            <PostForm/>
            <div className="posts">
                {posts.map(post => (
                    <PostItem
                        key={post._id}
                        post={post}
                    />
                ))}
            </div>
        </Fragment>
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {
    getPosts
})(Posts);
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({
    post: { post, loading },
    getPost,
    match
}) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost]);

    return (
        loading || post === null
            ?
            <Spinner />
            :
            <Fragment>
                <div class="post bg-white p-1 my-1">
                    <div>
                        <Link to={`/posts/${post._id}`}>
                            <img
                                class="round-img"
                                src=''
                                alt=""
                            />
                            <h4>{post.name}</h4>
                        </Link>
                    </div>

                    <div>
                        <p class="my-1">
                            {post.text}
                        </p>
                        <p class="post-date">
                            Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
                        </p>
                    </div>
                </div>


                <CommentForm postId={post._id} />
                <div className="comments">
                    {post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
                </div>
            </Fragment>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {
    getPost
})(Post);
import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostFeed = ({ posts }) => {
  const allPosts = posts.map(post => <PostItem key={post._id} post={post} />);

  return <div className="posts">{allPosts}</div>;
};

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;

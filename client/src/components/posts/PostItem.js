import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ name, avatar, text }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to={`/profile/`}>
            <img
              className="rounded-circle d-none d-md-block"
              src={avatar}
              alt=""
            />
          </Link>
          <br />
          <p className="text-center">{name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{text}</p>
          <button type="button" className="btn btn-light mr-1">
            <i className="text-info fas fa-thumbs-up" />
            <span className="badge badge-light">4</span>
          </button>
          <button type="button" className="btn btn-light mr-1">
            <i className="text-secondary fas fa-thumbs-down" />
          </button>
          <a href="post.html" className="btn btn-info mr-1">
            Comments
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

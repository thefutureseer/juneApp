import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const CommentItem = ({ 
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,

}) => <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
          clLinkss="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">
        {text}
      </p>
       <p className="post-date">
          Posted on: <Moment format='YYYYMMDD'>{date}</Moment>
      </p>
    </div>
  </div>

CommentItem.propTypes = {
 postId: PropTypes.number.isRequired,
 comment: PropTypes.object.isRequired,
 auth: PropTypes.object.isRequired,
 deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(CommentItem);
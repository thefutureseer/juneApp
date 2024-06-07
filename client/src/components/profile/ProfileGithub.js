import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({username, getGithubRepos, repos}) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
   <div className="profile-github">
     <h2 className="text-primary my-1">Github repos</h2>
     {repos === null ? <Spinner /> : (
       repos.map(repo => (
         <div key={repo._id} className="repo bg-white p-1 my-1">
           <h4>
             <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
               {repo.name}
             </a>
           </h4>
           <h4>
             <p>{repos.description} </p>
           </h4>
           <div>
             <ul>
               <li className="badge badge-primary" >
                 Stars: {repos.stargazers_count}
               </li>
             </ul>
             <ul>
               <li className="badge badge-dark" >
                 Watchers: {repos.watchers_count}
               </li>
             </ul>
             <ul>
               <li className="badge badge-light" >
                 Forks: {repos.forks_count}
               </li>
             </ul>
           </div>
         </div>
       ))
     )}
   </div>
  );
};

ProfileGithub.propTypes = {
 getGithubRepos: PropTypes.func.isRequired,
 repos: PropTypes.array.isRequired,
 username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
 repos: state.profile.repos
});

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);
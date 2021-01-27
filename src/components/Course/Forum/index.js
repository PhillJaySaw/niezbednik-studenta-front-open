/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import AddPost from './AddPost';
import { fetchPostsData } from '../../../store/reducers/posts/action';
import './style.scss';
import { checkIfUserIsMember } from '../../../store/reducers/courses/actions';
import { injectIntl } from 'react-intl';
import ShowMoreButton from '../../items/ShowMoreButton';
import FilterBox from '../../items/FilterBox';
import SearchInput from '../../items/SearchInput';

class Forum extends Component {
  constructor(props) {
    super(props);

    const { courseId } = this.props;

    this.state = {
      isUserIsMember: false,
      courseId,
      morePostsFetching: false,
    };
  }

  componentDidMount = () => {
    const { fetchPostsData } = this.props;
    const { courseId } = this.state;
    fetchPostsData(courseId, 0);
    Promise.resolve(checkIfUserIsMember(courseId)).then((value) => {
      if (value) {
        this.setState({
          isUserIsMember: true,
        });
      }
    });
  };

  formatDate = (date) => {
    const formatDate = date.replace('T', ' ').replace(/-/g, '/');
    return formatDate.substr(0, 16);
  };

  fetchMorePosts = () => {
    const { fetchPostsData, pageNumber } = this.props;
    const { courseId } = this.state;
    this.setState({
      morePostsFetching: true,
    });
    const page = pageNumber + 1;
    fetchPostsData(courseId, page);
    setTimeout(() => {
      this.setState({
        morePostsFetching: false,
      });
    }, 1000);
  };

  handleSearch = (author, content) => {
    const { fetchPostsData, courseId } = this.props;
    let data = {
      content,
      userFilter: author,
    };
    fetchPostsData(courseId, null, data);
  };

  render() {
    const { courseId, morePostsFetching } = this.state;
    const { postsList, pageNumber, totalPages, intl } = this.props;
    let posts = '';

    if (Object.keys(postsList).length) {
      posts = postsList.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          edited={post.edited}
          date={this.formatDate(post.date)}
          likes={post.likes}
          userLikedIt={post.userLikedIt}
          totalComments={post.totalComments}
          authorName={post.author.name + ' ' + post.author.surname}
          authorId={post.author.id}
          courseId={courseId}
        />
      ));
    }

    return (
      <>
        <div className="current-option-content course-forum">
          <div className="bookmark-menu">
            <AddPost courseId={courseId} />
            <SearchInput 
              searchCategories={[{name: intl.formatMessage({ id: 'filter.author' }), category: "user"}, {name: intl.formatMessage({ id: 'filter.content' }), category: "category2"}]}
              handleSearch={this.handleSearch}
            />
          </div>
          <div className="posts-list">{posts}</div>
          {pageNumber < totalPages && (
            <ShowMoreButton onClick={this.fetchMorePosts} morePostsFetching={morePostsFetching} />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  postsList: state.posts.postsList,
  totalElements: state.posts.totalElements,
  totalPages: state.posts.totalPages,
  pageNumber: state.posts.pageNumber,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPostsData: (courseId, page, data) => dispatch(fetchPostsData(courseId, page, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Forum));

/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../Checkbox';
import searchCheckboxes from '../SearchCheckboxes';
import { checkedToString } from '../../../helpers/Functions/CheckFunctions';
import './style.scss';
import SearchCheckboxes from '../SearchCheckboxes';

function toggle() {
  document
    .getElementsByClassName('search-dropdown-list')[0]
    .classList.toggle('search-dropdown-list__hidden');
}

class CategorySearchbox extends Component {
  constructor(props) {
    super(props);
    const { searchCategories, checkBoxes } = this.props;
    const checked = new Map();
    checkBoxes
      ? checkBoxes.forEach((checkbox) => {
          checked.set(checkbox.value, true);
        })
      : null;
    this.state = {
      searchCategory: searchCategories[0],
      searchInput: '',
      checkedValues: checked,
    };
  }

  handleChangeCategory = (category) => {
    this.setState({
      searchCategory: category,
    });
    toggle();
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleChangeCheckbox = (e) => {
    const { value } = e.target;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      checkedValues: prevState.checkedValues.set(value, isChecked),
    }));
  };

  handleSubmit = () => {
    const { handleSearch, checkBoxes } = this.props;
    const { searchCategory, searchInput, checkedValues } = this.state;
    let user = null;
    let category2 = null;
    if (searchInput !== '') {
      if (searchCategory.category === 'user') {
        let name = searchInput.split(' ');
        user = {
          name: name[0],
          surname: name[1] ? name[1] : name[0],
        };
      } else if (searchCategory.category === 'category2') {
        category2 = searchInput;
      }
    }
    if (checkBoxes) {
      let type = checkedToString(checkedValues);
      handleSearch(user, category2, type);
    } else {
      handleSearch(user, category2);
    }
  };

  render() {
    const { name, searchCategories, intl, checkBoxes } = this.props;
    const { searchCategory, searchInput, checkedValues } = this.state;

    let categories = searchCategories.map((category, index) => {
      return (
        <li key={index} onClick={() => this.handleChangeCategory(category)}>
          {category.name.toUpperCase()}
        </li>
      );
    });

    let searchCheckboxes = checkBoxes
      ? checkBoxes.map((checkbox) => {
          return (
            <Checkbox
              name={checkbox.name}
              id={checkbox.value}
              displayName={checkbox.name}
              checked={checkedValues.get(checkbox.value)}
              onChange={this.handleChangeCheckbox}
            />
          );
        })
      : null;

    return (
      <>
        <div className="search-input search-with-dropdown">
          {/* eslint-disable-next-line max-len */}
          <input
            className="form-control border-right-0 border"
            type="text"
            placeholder={intl.formatMessage({ id: 'placeholder.search' })}
            name="searchInput"
            value={searchInput}
            onChange={this.handleChangeInput}
          />
          <div className="searchbox-dropdown" onClick={() => toggle()}>
            <p>{searchCategory.name.toUpperCase()}</p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          <div className="search-dropdown-list search-dropdown-list__hidden">
            <ul>{categories}</ul>
          </div>
          <div
            className="searchbox-button btn btn-outline-secondary border-left-0 border"
            type="button"
            onClick={this.handleSubmit}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>
          {searchCheckboxes && (
            <SearchCheckboxes
              checkBoxes={checkBoxes}
              checkedValues={checkedValues}
              handleChangeCheckbox={this.handleChangeCheckbox}
            />
          )}
        </div>
      </>
    );
  }
}

export default injectIntl(CategorySearchbox);

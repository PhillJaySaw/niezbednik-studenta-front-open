/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { checkedToString } from '../../../helpers/Functions/CheckFunctions';
import SearchBox from '../SearchBox';
import SearchCheckboxes from '../SearchCheckboxes';

class SearchWithSearchBoxes extends Component {
  constructor(props) {
    super(props);
    const { checkBoxes, defaultValue = true } = this.props;

    const checked = new Map();
    checkBoxes ? checkBoxes.forEach((checkbox) => {
      checked.set(checkbox.value, defaultValue);
    }) : null; 
    this.state = {
      searchInput: "",
      checkedValues: checked,
    };
  }

  handleChangeInput = (e) => {
    const { value } = e.target;
    this.setState({
      searchInput: value,
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
    const { courseName, handleSearch } = this.props;
    const { searchInput, checkedValues } = this.state;
    let user = null;
    if (searchInput !== "") {
      let name = searchInput.split(' ');
      user = {
        name: name[0],
        surname: name[1] ? name[1] : name[0],
      }
    }
    let type = checkedToString(checkedValues);
    if(courseName) {
      handleSearch(user, courseName, type);
    }
    else {
      handleSearch(user, type);
    }
  }

  render() {
    const { intl, checkBoxes } = this.props;
    const { searchInput, checkedValues } = this.state;

    return (
      <>
      <div className="searchbox-with-checkboxes">
        <SearchBox name={searchInput} handleChangeInput={this.handleChangeInput} handleSubmit={this.handleSubmit} placeholder={intl.formatMessage({ id: 'placeholder.search-by-author' })}/>
        <SearchCheckboxes checkBoxes={checkBoxes} checkedValues={checkedValues} handleChangeCheckbox={this.handleChangeCheckbox}/>
      </div>
      </>
    );
  }
}

export default injectIntl(SearchWithSearchBoxes);

/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Checkbox from '../Checkbox';
import { checkedToString } from '../../../helpers/Functions/CheckFunctions';

class SearchCheckboxes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { checkBoxes, checkedValues, handleChangeCheckbox } = this.props;

    let searchCheckboxes = checkBoxes ? checkBoxes.map((checkbox) => {
      return (
      <Checkbox 
        name={checkbox.name} 
        id={checkbox.value} 
        displayName={checkbox.name} 
        checked={checkedValues.get(checkbox.value)} 
        onChange={handleChangeCheckbox}/>);
    }) : null;

    return (
      <>
        <div className="search-checkboxes">
        {searchCheckboxes}
        </div>
      </>
    );
  }
}

export default injectIntl(SearchCheckboxes);

import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from '../index';
import img from '../../../assets/img/error-logo.png'

describe('Error Page component', () => {
    test('Component should render', () => {
        const wrapper = shallow(<ErrorPage />);
        expect(wrapper.exists()).toBeTruthy();
    });

    test('Renders an image', () => {
      const logo = shallow(<ErrorPage />);
      expect(logo.find('img').prop('src')).toEqual(img)
    });

    test('Renders title', () => {
      const wrapper = shallow(<ErrorPage />);
      expect(wrapper.find('.error-page-title').render().text()).toEqual(
        'Oops!Something went wrong.',
      );
    });
});
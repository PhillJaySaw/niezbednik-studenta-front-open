import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '../index';
import img from '../../../assets/img/ufo.png'

describe('Page Not Found component', () => {
    test('Component should render', () => {
        const wrapper = shallow(<PageNotFound />);
        expect(wrapper.exists()).toBeTruthy();
    });

    test('Renders an image', () => {
      const logo = shallow(<PageNotFound />);
      expect(logo.find('img').prop('src')).toEqual(img)
    });

    test('Renders title', () => {
      const wrapper = shallow(<PageNotFound />);
      expect(wrapper.find('.page-not-found-title').render().text()).toEqual('404Page not found');
    });
});
import { mount } from "enzyme";
import React from "react";
import Home from '../pages/index';

import { configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe("With Enzyme", () => {
  test.concurrent('Test Threat Dropdown', () => {
    const wrapper = mount(<Home />);
    wrapper.find('select').at(0).simulate('change', {
        target: { value: '1', name: 'Security penetration skills (1)' }
    });
  });
});
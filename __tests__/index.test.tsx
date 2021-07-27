import { mount, shallow } from "enzyme";
import React from "react";
import SelectDropDown from '../component/select';
import Home from '../pages/index';

import { configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const props = {
  "name": "skill level",
  "id": "SL",
  "options": [
      {
          "name" : "Security penetration skills",
          "value" : 1
      },
    ]
  };
  

describe("With Enzyme", () => {
  test.concurrent('Test Threat Dropdown using shallow', () => {
    const wrapper = shallow(<SelectDropDown {...props} />);
    wrapper
	.find('#dropdown_SL')
	.at(0)
	.simulate("change", {target : { value : 'Security penetration skills (1)', name: 'Security penetration skills' }})
  
  expect(wrapper.find('#dropdown_SL').props().value).toBe('Security penetration skills (1)');
  }); 
});
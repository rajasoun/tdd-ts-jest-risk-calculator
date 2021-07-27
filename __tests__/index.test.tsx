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
  test('Test Threat Dropdown using shallow', () => {
    const wrapper = shallow(<SelectDropDown {...props} />);
    console.log(wrapper.debug());
    
    wrapper
	.find('#dropdown_SL')
	.at(0)
	.simulate("change", {target : { value : 1, name: 'Security penetration skills' }})

    // expect(wrapper.dropDownData('input')).toEqual(1);

  });
  // const props = {
  //   updateFilter: jest.fn()  
  // };
  
// test("Test Threat Dropdown using mount", () => {
// 	  const wrapper = mount(<Home {...props} />);
//     // console.log(wrapper.debug());
    
//     wrapper
//     .find("#dropdown-id")
//     .at(0)
//     .props()
//     .onChange({ target: { name: 'abc', value: 20 } });

    
//     expect(wrapper.dropDownData('input')).toEqual(20);
});
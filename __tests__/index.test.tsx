import { mount, shallow } from "enzyme";
import React from "react";
import SelectDropDown from '../component/select';
import Home from '../pages/index';

import { configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe("With Enzyme", () => {
  // test('Test Threat Dropdown using shallow', () => {
  //   const wrapper = shallow(<SelectDropDown {...props} />);
  //   wrapper
	// .find('InputLabel')
	// .at(0)
	// .simulate("change", {target : { value : 1 }})

  //   expect(props.handleChange).toHaveBeenCalled();

  // });
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
// });
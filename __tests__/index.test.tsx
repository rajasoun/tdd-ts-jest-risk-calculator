import { mount, shallow } from "enzyme";
import React from "react";
import SelectDropDown from '../component/select';
import Home from '../pages/index';

import { configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const props = {
  updateFilter: jest.fn()
};

describe("With Enzyme", () => {
  test.concurrent('Test Threat Dropdown using shallow', () => {
    const wrapper = shallow(<SelectDropDown {...props} />);
    wrapper
	.find('#select-option')
	.at(0)
	.simulate("change", {target : { value : 1 }})

    expect(props.updateFilter).toHaveBeenCalled();

  });

// test("Test Threat Dropdown using mount", () => {
//	  const wrapper = mount(<FiltersDesktop {...props} />);
  //  wrapper
  //   .find("#select-option")
  //   .at(0)
  //   .props()
  //   .onChange({ target: { value: 1 } });
    
  //   expect(props.updateFilter).toHaveBeenCalled();
//});
});
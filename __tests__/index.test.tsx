import { mount, shallow } from "enzyme";
import React from "react";
import SelectDropDown from '../src/component/select';
import Home from '../src/pages/index';
import data from '../src/data/risk-calculator.json'

import { configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// const dropDownData: any = [];
// data.data.map((ele: any) => {
//   ele.select.map((selectele: any) => {
//       dropDownData.push(selectele)
//   })
// })

// console.log(...dropDownData);

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

const props1 = {
  "name": "Motive",
    "id": "M",
    "options": [
      {
          "name" : "Low or no reward",
          "value" : 1
      },
    ]
  };

const props2 = {
  "name": "Opportunity",
  "id": "O",
  "options": [
    {
        "name" : "Full access or expensive resources required",
        "value" : 0
    },
  ]
};

const props3 = {
  "name": "Size",
  "id": "S",
  "options": [
    {
        "name" : "Developers, System administrators",
        "value" : 2
    },
  ]
};

describe("With Enzyme", () => {
  // describe.each( shallow(<SelectDropDown {dropDownData} />))
  test.concurrent('Test Threat Dropdown using shallow', () => {
    // wrapper
    // let wrapper: any;
    // dropDownData.map((propsdata: any) => {
    //   wrapper = shallow(<SelectDropDown {...propsdata} />);
    // })
    const wrapper = shallow(<SelectDropDown {...props} />);
    wrapper
	.find('#dropdown_SL')
	.at(0)
	.simulate("change", {target : { value : 'Security penetration skills (1)', name: 'Security penetration skills' }})
  
  expect(wrapper.find('#dropdown_SL').props().value).toBe('Security penetration skills (1)');


  // wrapper 1
  const wrapper1 = shallow(<SelectDropDown {...props1} />);
    wrapper1
	.find('#dropdown_M')
	.at(0)
	.simulate("change", {target : { value : 'Low or no reward (1)', name: 'Low or no reward' }})
  
  expect(wrapper1.find('#dropdown_M').props().value).toBe('Low or no reward (1)');

  // wrapper 2
  const wrapper2 = shallow(<SelectDropDown {...props2} />);
    wrapper2
	.find('#dropdown_O')
	.at(0)
	.simulate("change", {target : { value : 'Full access or expensive resources required (0)', name: 'Full access or expensive resources required' }})
  
  expect(wrapper2.find('#dropdown_O').props().value).toBe('Full access or expensive resources required (0)');

  // wrapper 3
  const wrapper3 = shallow(<SelectDropDown {...props3} />);
    wrapper3
	.find('#dropdown_S')
	.at(0)
	.simulate("change", {target : { value : 'Developers, System administrators (2)', name: 'Developers, System administrators' }})
  
  expect(wrapper3.find('#dropdown_S').props().value).toBe('Developers, System administrators (2)');
});
});
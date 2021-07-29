import { mount, shallow } from "enzyme";
import React from "react";
import SelectDropDown from '../src/component/select';
import Home from '../src/pages/index';
import data from '../src/data/risk-calculator.json'

import { configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const props = {
  "name": "skill level",
  "id": "TAF_SL",
  "options": [
    {
      "name" : "Security penetration skills",
      "value" : 1
    }]
  };
const props1 = {
  "name": "Motive",
    "id": "TAF_M",
    "options": [
      {
          "name" : "Low or no reward",
          "value" : 1
      },
    ]
  };
const props2 = {
  "name": "Opportunity",
  "id": "TAF_O",
  "options": [
    {
        "name" : "Full access or expensive resources required",
        "value" : 0
    },
  ]
};
const props3 = {
  "name": "Size",
  "id": "TAF_S",
  "options": [
    {
        "name" : "Developers, System administrators",
        "value" : 2
    },
  ]
};

describe("With Enzyme", () => {
  let useEffect: any;
  beforeAll(() => {
    useEffect = jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f())  
  })
  test.concurrent('Test Threat Dropdown using shallow', () => {
    const wrapper = mount(<SelectDropDown {...props} />);
    wrapper
	.find('input')
	.at(0)
	.simulate("change", {target : { value : 'TAF_SL:1', name: 'TAF_SL' }})
  
  expect(wrapper.find('input').at(0).props().value).toBe('TAF_SL:1');


  // wrapper 1
  const wrapper1 = shallow(<SelectDropDown {...props1} />);
    wrapper1
	.find('input')
	.at(0)
	.simulate("change", {target : { value : 'TAF_M:1', name: 'TAF_M' }})
  
  expect(wrapper1.find('input').at(0).props().value).toBe('TAF_M:1');

  // wrapper 2
  const wrapper2 = shallow(<SelectDropDown {...props2} />);
    wrapper2
	.find('#input')
	.at(0)
	.simulate("change", {target : { value : 'TAF_O:0', name: 'TAF_O' }})
  
  expect(wrapper2.find('#input').at(0).props().value).toBe('TAF_O:0');

  // wrapper 3
  const wrapper3 = shallow(<SelectDropDown {...props3} />);
    wrapper3
	.find('input')
	.at(0)
	.simulate("change", {target : { value : 'TAF_S:2', name: 'TAF_S' }})
  
  expect(wrapper3.find('input').at(0).props().value).toBe('TAF_S:2');
});
});

// describe("test", () => {
//   let props: any, wrapper: any, useEffect: any;
//   const select: any = {
//       "name": "Skill level",
//       "id": "TAF_SL",
//       "options": [
//           {
//               "name" : "Security penetration skills",
//               "value" : 1
//           },
//           {
//               "name" : "Network and programming skills",
//               "value" : 3
//           },
//           {
//               "name" : "Advanced computer user",
//               "value" : 5
//           },
//           {
//               "name" : "Some technical skills",
//               "value" : 6
//           },
//           {
//               "name" : "No technical skills",
//               "value" : 9
//           }
//         ]
//     }
//   beforeEach(() => {
//     useEffect = jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f())  
//     wrapper = shallow(<SelectDropDown {...select} />)
//   })
//   afterAll(() => {	
//     jest.clearAllMocks()
//   })
//   it('select all data from json', () => {
//     expect(useEffect).toHaveBeenCalled();
//     wrapper
//     	.find('#dropdown_TAF_SL')
//     	.at(0)
//     	.simulate("change", {target : { value : 'TAF_SL:1', name: 'TAF_SL' }})
//       expect(useEffect).toHaveBeenCalled()
//       expect(wrapper.find('#dropdown_TAF_SL').props().value).toBe('TAF_SL:1');
//   })
// })
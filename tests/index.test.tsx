import '@testing-library/jest-dom'
import { render, fireEvent } from "@testing-library/react";
import Index, { generateThreatVectorJSON } from "../src/pages/index";

const { getByTestId, getByText } = render(<Index />);

describe("Page Header ", () => {
    test.concurrent("$header", () => {
        expect(
            getByTestId("header").textContent
        ).toEqual(
            "Risk Assessment Calculator"
        )
    });
});

describe("On change of", () => {
    const Q1 = {id: 0, name: "SL", value: 1};
    const Q2 = {id: 1, name: "M", value: 4};
    const Q3 = {id: 5, name: "EE", value: 5};
    const Q4 = {id: 3, name: "S", value: 6};
    const Q5 = {id: 0, name: "SL", value: 0};
    const wantedVectorForQ1 = [{id: 0, name: "SL", value: 1},{id: 1, name: "M", value: 0},{id: 2, name: "O", value: 0},{id: 3, name: "S", value: 0},{id: 4, name: "ED", value: 0},{id: 5, name: "EE", value: 0},{id: 6, name: "A", value: 0},{id: 7, name: "ID", value: 0},{id: 8, name: "LC", value: 0},{id: 9, name: "LI", value: 0},{id: 10, name: "LAV", value: 0},{id: 11, name: "LAC", value: 0},{id: 12, name: "FD", value: 0},{id: 13, name: "RD", value: 0},{id: 14, name: "NC", value: 0},{id: 15, name: "PV", value: 0}];
    const wantedVectorForQ2 = [{id: 0, name: "SL", value: 1},{id: 1, name: "M", value: 4},{id: 2, name: "O", value: 0},{id: 3, name: "S", value: 0},{id: 4, name: "ED", value: 0},{id: 5, name: "EE", value: 0},{id: 6, name: "A", value: 0},{id: 7, name: "ID", value: 0},{id: 8, name: "LC", value: 0},{id: 9, name: "LI", value: 0},{id: 10, name: "LAV", value: 0},{id: 11, name: "LAC", value: 0},{id: 12, name: "FD", value: 0},{id: 13, name: "RD", value: 0},{id: 14, name: "NC", value: 0},{id: 15, name: "PV", value: 0}];
    const wantedVectorForQ3 = [{id: 0, name: "SL", value: 1},{id: 1, name: "M", value: 4},{id: 2, name: "O", value: 0},{id: 3, name: "S", value: 0},{id: 4, name: "ED", value: 0},{id: 5, name: "EE", value: 5},{id: 6, name: "A", value: 0},{id: 7, name: "ID", value: 0},{id: 8, name: "LC", value: 0},{id: 9, name: "LI", value: 0},{id: 10, name: "LAV", value: 0},{id: 11, name: "LAC", value: 0},{id: 12, name: "FD", value: 0},{id: 13, name: "RD", value: 0},{id: 14, name: "NC", value: 0},{id: 15, name: "PV", value: 0}];
    const wantedVectorForQ4 = [{id: 0, name: "SL", value: 1},{id: 1, name: "M", value: 4},{id: 2, name: "O", value: 0},{id: 3, name: "S", value: 6},{id: 4, name: "ED", value: 0},{id: 5, name: "EE", value: 5},{id: 6, name: "A", value: 0},{id: 7, name: "ID", value: 0},{id: 8, name: "LC", value: 0},{id: 9, name: "LI", value: 0},{id: 10, name: "LAV", value: 0},{id: 11, name: "LAC", value: 0},{id: 12, name: "FD", value: 0},{id: 13, name: "RD", value: 0},{id: 14, name: "NC", value: 0},{id: 15, name: "PV", value: 0}];
    const wantedVectorForQ5 = [{id: 0, name: "SL", value: 0},{id: 1, name: "M", value: 4},{id: 2, name: "O", value: 0},{id: 3, name: "S", value: 6},{id: 4, name: "ED", value: 0},{id: 5, name: "EE", value: 5},{id: 6, name: "A", value: 0},{id: 7, name: "ID", value: 0},{id: 8, name: "LC", value: 0},{id: 9, name: "LI", value: 0},{id: 10, name: "LAV", value: 0},{id: 11, name: "LAC", value: 0},{id: 12, name: "FD", value: 0},{id: 13, name: "RD", value: 0},{id: 14, name: "NC", value: 0},{id: 15, name: "PV", value: 0}];
    describe.each`
        inputJson     |  wantedVector
        ${Q1}         |  ${wantedVectorForQ1}
        ${Q2}         |  ${wantedVectorForQ2}
        ${Q3}         |  ${wantedVectorForQ3}
        ${Q4}         |  ${wantedVectorForQ4}
        ${Q5}         |  ${wantedVectorForQ5}
    `("$dropdown", ({ inputJson, wantedVector}) => {
        test.concurrent(
            `JSON string ${inputJson},to retrun the following vector ${wantedVector}`, () => {
            // Generate Threat Vecor
            const vector = generateThreatVectorJSON(inputJson)
            expect(vector).toEqual(wantedVector)
        });
    });
});

// describe("On Change dropdown change the vector datas", () => {
//     const vectorLabel = getByText('VECTOR:');
//     expect(vectorLabel as HTMLLabelElement).toBeInTheDocument()
//     const anchorTag = getByText('(SL:0/M:0/O:0/S:0/ED:0/EE:0/A:0/ID:0/LC:0/LI:0/LAV:0/LAC:0/FD:0/RD:0/NC:0/PV:0)')
//     expect((anchorTag as HTMLAnchorElement).closest('a')).toHaveAttribute('href', '#')
// })


describe("On change", () => {
    describe.each`
        id     |  name     |  value
        ${0}   |  ${"SL"}  |  ${1}
        ${1}   |  ${"M"}   |  ${4}
        ${2}   |  ${"O"}   |  ${4}
        ${3}   |  ${"S"}   |  ${2}
        ${4}   |  ${"ED"}  |  ${1}
        ${5}   |  ${"EE"}  |  ${9}
        ${6}   |  ${"A"}   |  ${1}
        ${7}   |  ${"ID"}  |  ${0}
        ${8}   |  ${"LC"}  |  ${2}
        ${9}   |  ${"LI"}  |  ${7}
        ${10}  |  ${"LAV"} |  ${9}
        ${11}  |  ${"LAC"} |  ${0}
        ${12}  |  ${"FD"}  |  ${3}
        ${13}  |  ${"RD"}  |  ${4}
        ${14}  |  ${"NC"}  |  ${2}
        ${15}  |  ${"PV"}  |  ${9}
    `("$selected", ({ id, name, value }) => {
        test.concurrent(`id "${id}", wanted the value of ${value} with the name "${name}"`, () => {
            const select = getByTestId(id)
            fireEvent.change(select, { target: { value: value } })
            expect(Number((select as HTMLOptionElement).value)).toEqual(value)
            expect((select as HTMLSelectElement).name).toEqual(name)
        });
    });
});

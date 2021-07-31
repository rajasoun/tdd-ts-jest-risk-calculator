import '@testing-library/jest-dom'
import { render, fireEvent } from "@testing-library/react";
import Index from "../src/pages/index";
import risk from "../src/risk";

const { getByTestId } = render(<Index />);

describe("Page Header ", () => {
    test.concurrent("$header", () => {
        expect(
            getByTestId("header").textContent
        ).toEqual(
            "Risk Assessment Calculator"
        )
    })
})

describe("Select Dropdown and Create Vector", () => {
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
    `("$select dropdown", ({ id, name, value }) => {
        test.concurrent(`selected id ${id} and wanted ${value} with the name ${name}`, () => {
            const select = getByTestId(id)
            fireEvent.change(select, { target: { value: value } })
            expect(Number((select as HTMLOptionElement).value)).toEqual(value)
            expect((select as HTMLSelectElement).name).toEqual(name)
        });
    });
})

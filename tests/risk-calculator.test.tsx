import '@testing-library/jest-dom'
import { render, fireEvent } from "@testing-library/react";
import Index from "../src/pages/index"

describe("Index Component", () => {

    const wrapper = render(<Index />);

    test.concurrent("Check for page header", () => {
        expect(
            wrapper.getByTestId("header").textContent
        ).toEqual(
            "Risk Assessment Calculator"
        )
    })

    test.concurrent("Select Options", () => {
        const select = wrapper.getByTestId('0')
        fireEvent.change(select, { target: { value: '1' } })
        expect((select as HTMLOptionElement).value).toEqual('1')
    })

})

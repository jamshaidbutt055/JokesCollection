import { fireEvent, render } from "@testing-library/react"
import { SearchForm } from "../SearchForm"

test("number of results is between 0-10", () => {
  const handleinput = jest.fn()
  const { getByRole } = render(
    <SearchForm
      onInputChange={handleinput}
      onRandomClick={() => {}}
      onSubmitClick={() => {}}
    />
  )
  const numberField = getByRole("spinbutton")
  //screen.debug(numberField)
  //container.querySelector(`input[name="noOfResults"]`);
  fireEvent.change(numberField, { target: { value: 65 } })

  const val = parseInt(numberField.value)
  expect(handleinput).toBeCalledTimes(1)
  expect(val).toBeGreaterThan(0)
  expect(val).toBeLessThan(10)
})

test("Dropdown value Change will disable random button", () => {
  const handleinput = jest.fn()
  const { getByTestId, getByText } = render(
    <SearchForm
      onInputChange={handleinput}
      onRandomClick={() => {}}
      onSubmitClick={() => {}}
    />
  )

  const randomButton = getByText("Random")
  const wrapperNode = getByTestId("select")
  const selectNode = wrapperNode.childNodes[0]

  expect(randomButton).toBeEnabled(true)
  fireEvent.change(selectNode, { target: { value: "gif" } })

  expect(selectNode.childNodes[0].selected).toBeFalsy()
  expect(selectNode.childNodes[1].selected).toBeFalsy()
  expect(selectNode.childNodes[2].selected).toBeTruthy()
  expect(randomButton).toBeDisabled(true)
})

import { TestAddMessageAction, TEST_ADD_MESSAGE } from "./../types/test.types";

export function addMessagetoTest(message: string): TestAddMessageAction {
  return {
    type: TEST_ADD_MESSAGE,
    payload: message
  };
}

export interface TestState {
  messages: string[];
}

export const TEST_ADD_MESSAGE = "TEST_ADD_MESSAGE";
export const TEST_REMOVE_MESSAGE = "TEST_REMOVE_MESSAGE";

export interface TestAddMessageAction {
  type: typeof TEST_ADD_MESSAGE;
  payload: string;
}
export interface TestRemoveMessageAction {
  type: typeof TEST_REMOVE_MESSAGE;
}

export type TestActionTypes = TestAddMessageAction | TestRemoveMessageAction;

export interface TestState {
  messages: string[];
}

export const TEST_ADD_MESSAGE = "TEST_ADD_MESSAGE";

export interface TestAddMessageAction {
  type: typeof TEST_ADD_MESSAGE;
  payload: string;
}

export type TestActionTypes = TestAddMessageAction;

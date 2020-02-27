import {
  TestState,
  TEST_ADD_MESSAGE,
  TestActionTypes
} from "./../types/test.types";

const initialState: TestState = {
  messages: []
};

export function testReducer(
  state: TestState = initialState,
  action: TestActionTypes
) {
  switch (action.type) {
    case TEST_ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
}

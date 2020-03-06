import {
  TestState,
  TEST_ADD_MESSAGE,
  TEST_REMOVE_MESSAGE,
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
    case TEST_REMOVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages.slice(0, state.messages.length - 1)]
      };
    default:
      return state;
  }
}

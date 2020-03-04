import {
  TEST_ADD_MESSAGE,
  TEST_REMOVE_MESSAGE,
  TestActionTypes
} from "./../types/test.types";

export function addMessagetoTest(message: string): TestActionTypes {
  return {
    type: TEST_ADD_MESSAGE,
    payload: message
  };
}

export function removeMessagefromTest(): TestActionTypes {
  return {
    type: TEST_REMOVE_MESSAGE
  };
}

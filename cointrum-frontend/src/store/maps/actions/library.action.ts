import {
  TEST_ADD_MESSAGE,
  TEST_REMOVE_MESSAGE,
  TestActionTypes
} from "./../types/test.types";

export function fetchMapLibrary(): TestActionTypes {
  return {
    type: TEST_ADD_MESSAGE,
    payload: message
  };
}

export function addMaptoLibrary(): TestActionTypes {
  return {
    type: TEST_REMOVE_MESSAGE
  };
}

export function removeMapfromLibrary(): TestActionTypes {
  return {
    type: TEST_REMOVE_MESSAGE
  };
}

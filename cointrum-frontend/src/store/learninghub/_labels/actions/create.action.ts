import * as LabelCreateTypes from "./../types/create.types";

import { ILabel } from "models";

export function openCreateLabelDialog(): LabelCreateTypes.Actions {
  return {
    type: LabelCreateTypes.LABELCREATE_SET_DIALOG,
    payload: {
      create: true
    }
  };
}

export function openEditLabelDialog(label: ILabel): LabelCreateTypes.Actions {
  return {
    type: LabelCreateTypes.LABELCREATE_SET_DIALOG,
    payload: {
      edit: true,
      label: label
    }
  };
}

export function closeLabelDialog(): LabelCreateTypes.Actions {
  return {
    type: LabelCreateTypes.LABELCREATE_SET_DIALOG,
    payload: {}
  };
}

export function updateLabelName(name: string): LabelCreateTypes.Actions {
  return {
    type: LabelCreateTypes.LABELCREATE_UPDATE,
    payload: {
      field: "name",
      value: name
    }
  };
}

export function updateLabelDesc(desc: string): LabelCreateTypes.Actions {
  return {
    type: LabelCreateTypes.LABELCREATE_UPDATE,
    payload: {
      field: "desc",
      value: desc
    }
  };
}

export function updateLabelColour(colourHex: string): LabelCreateTypes.Actions {
  return {
    type: LabelCreateTypes.LABELCREATE_UPDATE,
    payload: {
      field: "colour",
      value: colourHex
    }
  };
}

export function resetLabelForm(): LabelCreateTypes.Actions {
  return {
    type: LabelCreateTypes.LABELCREATE_RESET_FORM
  };
}

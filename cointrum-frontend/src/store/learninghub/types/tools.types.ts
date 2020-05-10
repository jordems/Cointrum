import { IOHLCData } from "shared-components/charts/lib/IOHLCData";

export type LearningHubTools = "BUYSELL" | "SEEDSELECT" | "TEST";

export interface State {
  currenttool: LearningHubTools;
  selection: {
    start?: IOHLCData;
    end?: IOHLCData;
  };
}

export const LEARNINGHUB_CHANGE_SEEDTOOL = "LEARNINGHUB_CHANGE_SEEDTOOL";
export const LEARNINGHUB_CHANGE_SELECTION = "LEARNINGHUB_CHANGE_SELECTION";
export const LEARNINGHUB_CLEAR_SELECTION = "LEARNINGHUB_CLEAR_SELECTION";

interface LearningHubToolsChangeSeedTool {
  type: typeof LEARNINGHUB_CHANGE_SEEDTOOL;
  payload: LearningHubTools;
}
interface LearningHubToolsChangeSelection {
  type: typeof LEARNINGHUB_CHANGE_SELECTION;
  payload: {
    frame: "start" | "end";
    data: IOHLCData;
  };
}
interface LearningHubToolsClearSelection {
  type: typeof LEARNINGHUB_CLEAR_SELECTION;
}

export type Actions =
  | LearningHubToolsChangeSeedTool
  | LearningHubToolsChangeSelection
  | LearningHubToolsClearSelection;

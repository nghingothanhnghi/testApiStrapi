import { types } from "../types/fileTypes";

export function fileReducer(state = {}, action) {
    const payload = action.payload;
    switch (action.type) {
        case types.NEW_FILE:
            return {
                files: [
                ...state.files,
                newFile(state.files, payload.filePath)
            ]
        };
        case types.MOVE_FILES:
            return {
                files: moveFiles(state.files, payload.pathToMove, payload.targetPath)
        };
        case types.DELETE_FILES:
            return {
                files: deleteFiles(state.files, payload.pathToRemove)
            };
        default:
            return state;
    }
}
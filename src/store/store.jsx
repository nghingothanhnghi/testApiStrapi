import { createStore } from 'redux';
import fileReducer from '../reducers/fileReducer'

const initialState = {
    files: [
        { id: 1, filePath: ['Documents'] },
        { id: 2, filePath: ['Documents', 'txt'] },
        // more files ...
    ]
};

export default createStore(fileReducer, initialState);
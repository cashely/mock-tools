import { StoreApi, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
    ProjectsActions,
    ProjectsState,
    FoldersActions,
    FoldersState,
    DocumentActions,
    DocumentState,
} from './index.d';
import userInfoSlice, { type UserInfoStore } from './userInfoSlice';
import projectsSlice from './projectsSlice';
import foldersSlice from './foldersSlice';
import documentSlice from './documentSlice';

type Store =
      UserInfoStore
    & ProjectsState
    & ProjectsActions
    & FoldersState
    & FoldersActions
    & DocumentState
    & DocumentActions;

const useStore = create<Store, any>(immer((set, ...a) => ({
    ...userInfoSlice(set, ...a),
    ...documentSlice(set,...a),
    ...projectsSlice(set,...a),
    ...foldersSlice(set,...a),
})));

export default useStore;
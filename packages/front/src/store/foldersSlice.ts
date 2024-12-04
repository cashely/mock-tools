import type { Slice, FoldersActions, FoldersState } from './index.d';

const foldersSlice: Slice<FoldersState, FoldersActions> = (set) => {
    return {
        folders: [],
        updateFolders: (folders) => {
            set((state) => {
                state.folders = folders;
            })
        }
    }
}

export default foldersSlice;
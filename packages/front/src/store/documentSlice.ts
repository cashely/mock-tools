import type { Slice, DocumentState, DocumentActions } from './index.d';

const documentSlice: Slice<DocumentState, DocumentActions> = (set) => {
    return {
        selectedDocument: {},
        updateSelectedDocument: (document) => {
            set((state) => {
                state.selectedDocument = document;
            })
        },
        setSelectedDocument: set,
        /**
         * @name 清除选中文档
         */
        clearSelectedDocument: () => {
            set((state) => {
                state.selectedDocument = {};
            })
        },
        fetchDocument: async (getDocumentApi, id) => {
            const res = await getDocumentApi(id);
            if (res.code === 200) {
                set((state) => {
                    state.selectedDocument = res.data;
                    state.selectedDocument.content = res.data.schema.content;
                })
                return res.data;
            }
            
        }

    }
}

export default documentSlice;
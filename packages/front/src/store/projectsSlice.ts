import type { Slice, ProjectsActions, ProjectsState } from './index.d';

const projectsSlice: Slice<ProjectsState, ProjectsActions> = (set) => {
    return {
        projects: [],
        updateProjects: (projects) => {
            set((state) => {
                state.projects = projects;
            })
        }
    }
}

export default projectsSlice;
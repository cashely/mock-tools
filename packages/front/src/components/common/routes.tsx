import { createHashRouter, RouterProvider } from "react-router-dom";
import loadable from "@loadable/component";

const Project = loadable(() => import("../../pages/projects"));
const ProjectDetail = loadable(() => import("../../pages/projects/detail"));
const ProjectList = loadable(() => import("../../pages/projects/list"));
const Login = loadable(() => import("../../pages/login"));
const Regist = loadable(() => import("../../pages/regist"));


export const routes = [
  {
    path: "/",
    element: <Project />,
    children: [
      {
        index: true,
        element: <ProjectList />,
        handle: {
          title: "项目列表",
        }
      },
      {
        path: "/project/:projectId",
        element: <ProjectDetail />,
        handle: {
          title: "项目详情",
        }
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/regist",
    element: <Regist />,
  }
]

export const router = createHashRouter(routes as any);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
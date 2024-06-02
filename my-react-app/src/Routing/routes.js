import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root, {rootLoader} from "./routes/root";
import Team, {teamLoader} from "./routes/team";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "../dev";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        loader: rootLoader,
        children: [
            {
                path: "team",
                element: <Team/>,
                loader: teamLoader,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <DevSupport ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
    >
        <RouterProvider router={router}/>
    </DevSupport>
);
import {store} from "./store/store.ts";
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./Components/RootLayout.tsx";
import Home from "./Pages/HomePage.tsx";
import Crew from "./Pages/Crew.tsx";
import LandPads from "./Pages/LandPads.tsx";
import Launches from "./Pages/Launches.tsx";
import LaunchPads from "./Pages/LaunchPads.tsx";
import MyAccount from "./Pages/MyAccount.tsx";
import CrewMember from "./Pages/CrewMember.tsx";
import SpecificLandPad from "./Pages/SpecificLandPad.tsx";
import SignUp from "./Pages/SignUpPage.tsx";
import SignIn from "./Pages/SignInPage.tsx";
import Payloads from "./Pages/PayLoads.tsx";
import SpecificLaunch from "./Pages/SpecificLaunch.tsx";
import SpecificLaunchPad from "./Pages/SpecificLaunchPad.tsx";
import {Provider,useSelector} from "react-redux";
import SpecificPayload from "./Pages/SpecificPayload.tsx";
import AuthenticatedRoute from "./Components/AuthenticatedRoute.tsx";


function App() {

    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout />,
            children: [
                { path: "", element: <SignUp /> },
                { path: "/signup", element: <SignUp /> },
                { path: "/signin", element: <SignIn /> },
                {
                    path: "/home",
                    element: (
                        <AuthenticatedRoute>
                            <Home />
                        </AuthenticatedRoute>
                    ),
                },
                { path: "/launches", element: (
                        <AuthenticatedRoute>
                            <Launches />
                        </AuthenticatedRoute>
                    ), },
                { path: "/launchpads", element: (
                        <AuthenticatedRoute>
                            <LaunchPads />
                        </AuthenticatedRoute>
                    ), },
                { path: "/landpads", element: (
                        <AuthenticatedRoute>
                            <LandPads />
                        </AuthenticatedRoute>
                    ), },
                { path: "/payloads", element: (
                        <AuthenticatedRoute>
                            <Payloads />
                        </AuthenticatedRoute>
                    ), },
                { path: "/payloads/:id", element: (
                        <AuthenticatedRoute>
                            <SpecificPayload />
                        </AuthenticatedRoute>
                    ), },
                { path: "/crew", element: (
                        <AuthenticatedRoute>
                            <Crew />
                        </AuthenticatedRoute>
                    ),},
                { path: "/myaccount",element: (
                        <AuthenticatedRoute>
                            <MyAccount />
                        </AuthenticatedRoute>
                    ), },
                { path: "/crew/:id", element: (
                        <AuthenticatedRoute>
                            <CrewMember />
                        </AuthenticatedRoute>
                    ), },
                { path: "/landpads/:id", element: (
                        <AuthenticatedRoute>
                            <SpecificLandPad />
                        </AuthenticatedRoute>
                    ),},
                { path: "/launches/:id", element: (
                        <AuthenticatedRoute>
                            <SpecificLaunch />
                        </AuthenticatedRoute>
                    ), },
                { path: "/launchpads/:id",element: (
                        <AuthenticatedRoute>
                            <SpecificLaunchPad />
                        </AuthenticatedRoute>
                    ), },
            ],
        },
    ]);

    return (
        <Provider store={store}>
            <RouterProvider router={routes} />
        </Provider>
    );
}

export default App;

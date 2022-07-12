import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

function App() {
    const RegisterOrLoginPage = React.lazy(
        () => import("./pages/registerorlogin")
    );
    const RegisterPage = React.lazy(() => import("./pages/register"));
    const LoginPage = React.lazy(() => import("./pages/login"));
    const SearchPage = React.lazy(() => import("./pages/search"));

    const options = [
        { path: "", label: "Home", page: <Home></Home> },
        { path: "/home", label: "Home", page: <Home></Home> },
        {
            path: "/registerorlogin",
            label: "RegisterOrLogin",
            page: <RegisterOrLoginPage></RegisterOrLoginPage>,
        },
        {
            path: "/register",
            label: "Register",
            page: <RegisterPage></RegisterPage>,
        },
        { path: "/login", label: "Login", page: <LoginPage></LoginPage> },
        { path: "/search", label: "Search", page: <SearchPage></SearchPage> },
    ];
    return (
        <React.Suspense>
            <Routes>
                {options.map((item) => (
                    <Route
                        key={item.label}
                        path={item.path}
                        element={item.page}
                    ></Route>
                ))}
            </Routes>
        </React.Suspense>
    );
}

export default App;

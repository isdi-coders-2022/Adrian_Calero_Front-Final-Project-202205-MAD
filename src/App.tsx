import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { HttpProfesional } from "./services/http.profesional";
import * as ac from "./redux/profesional-reducer/action.creator";

function App() {
    const api = new HttpProfesional();
    const dispatch = useDispatch();

    useEffect(() => {
        api.getAllProfesional().then((resp) =>
            dispatch(ac.loadProfesionalAction(resp))
        );
    }, [dispatch]);

    const RegisterOrLoginPage = React.lazy(
        () => import("./pages/registerorlogin")
    );
    const RegisterPage = React.lazy(() => import("./pages/register"));
    const LoginPage = React.lazy(() => import("./pages/login"));
    const SearchPage = React.lazy(() => import("./pages/search"));
    const DetailPage = React.lazy(() => import("./pages/detail"));

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
        {
            path: "/search/:profesion",
            label: "Search",
            page: <SearchPage></SearchPage>,
        },
        {
            path: "/detail/:id",
            label: "Detail",
            page: <DetailPage></DetailPage>,
        },
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

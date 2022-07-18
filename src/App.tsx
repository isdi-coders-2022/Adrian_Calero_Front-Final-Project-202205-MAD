import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { HttpProfesional } from "./services/http.profesional";
import * as acProf from "./redux/profesional-reducer/action.creator";
import * as acUser from "./redux/user-reducer/action.creator";
import { HttpUser } from "./services/http.user";
import { LocalStorage } from "./services/localStorage";

function App() {
    const apiProf = new HttpProfesional();
    const apiUser = new HttpUser();
    const dispatch = useDispatch();
    const local = new LocalStorage().getItem();

    useEffect(() => {
        if (local) {
            apiUser
                .getUser(local.id as string)
                .then((resp) => dispatch(acUser.modifyUserAction(resp)));
        }
        apiProf
            .getAllProfesional()
            .then((resp) => dispatch(acProf.loadProfesionalAction(resp)));
    }, []);

    const RegisterOrLoginPage = React.lazy(
        () => import("./pages/registerorlogin")
    );
    const RegisterPage = React.lazy(() => import("./pages/register"));
    const LoginPage = React.lazy(() => import("./pages/login"));
    const SearchPage = React.lazy(() => import("./pages/search"));
    const DetailPage = React.lazy(() => import("./pages/detail"));
    const SettingPage = React.lazy(() => import("./pages/setting"));

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
        {
            path: "/setting",
            label: "Setting",
            page: <SettingPage></SettingPage>,
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

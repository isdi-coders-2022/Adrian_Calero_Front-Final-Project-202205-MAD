import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';


function App() {
const RegisterPage = React.lazy(()=> import('./pages/register'))

    const options = [
        {path: '', label: 'Home', page: <Home></Home> },
    {path: '/home', label: 'Home', page: <Home></Home> },
    {path:'/register', label: 'Register', page: <RegisterPage></RegisterPage>}
        
]
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

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Employee from "./pages/list/employee";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Signup from "./pages/signup/signup";
import Error from "./pages/error/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AllProject from "./Views/Admin/AllProject.jsx";
import Createproject from "./pages/createProject/Createproject";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Single />} />
            <Route path="/allproject" element={<AllProject />} />
            <Route path="/createproject" element={<Createproject />} />

            <Route path="employee">
              <Route index element={<Employee />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              {/* <Route index element={<List />} /> */}
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
          
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

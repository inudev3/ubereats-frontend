import React from "react";
import { LoggedOutRouter } from "./routes/logged-out-router";
import { gql, makeVar, useQuery, useReactiveVar } from "@apollo/client";
import { LoggedInRouter } from "./routes/logged-in-router";
import { IsLoggedInVar } from "./apollo";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// or u can just simply use useReactiveVar hook

function App() {
  const isLoggedIn = useReactiveVar(IsLoggedInVar); //without query, 렌더링이 일어나는 '훅'임
  console.log(IsLoggedInVar());
  console.log(isLoggedIn);
  return (
    <>
      <Router>{isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}</Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

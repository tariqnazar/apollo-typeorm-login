import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { setAccessToken } from "./accessToken";
import { Bye } from "./pages/Bye";

const App: React.FC = () => {
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      credentials: "include",
      method: "POST",
    }).then(async (x) => {
      const data = await x.json();
      setAccessToken(data.accessToken);
    });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/bye">Bye</Link>
        </div>
      </div>
      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/bye" component={Bye}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

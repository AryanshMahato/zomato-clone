import React from "react";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import SearchRestaurantPage from "./Pages/SearchRestaurant";

function App() {
  return (
    <div>
      <ToastContainer />
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route
          exact
          path={"/location/:locationId"}
          component={SearchRestaurantPage}
        />
      </Switch>
    </div>
  );
}

export default App;

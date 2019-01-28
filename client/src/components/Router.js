import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserNamePicker from "./UserNamePicker";
import App from "../App";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={UserNamePicker} />
      <Route path="/chat/:handle" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

import logo from "./logo.svg";
import "./App.css";
import Mainpage from "./components/MainPage/mainpage.component";
import Redirect from "./components/RedirectComponent/redirect.component";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Mainpage} />
      <Route path="/:id" exact component={Redirect} />
    </Router>
  );
}

export default App;

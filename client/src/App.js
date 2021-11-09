import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from './components/LadingPage';
import Home from './components/Home';
import Detail from "./components/Detail"
import ActivityCreate from "./components/ActivityCreate"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/countries" component={Home}/>
        <Route exact path="/countries/:id" component={Detail}></Route>
        <Route exact path="/activity" component={ActivityCreate}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

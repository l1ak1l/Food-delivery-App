import './App.css';
import {
  BrowserRouter as Router,
  Routes,Route,
  Link
} from "react-router-dom"
import Home from './Pages/Home';
import Login from './Pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  return (
    <Router>
   <div >
    <Routes>
     <Route exact path="/" element = {<Home/>}/>
     <Route exact path="/Login" element = {<Login/>}/>
    </Routes>
     
    </div>
    </Router>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navbar} from "./components/navbar"
import {Add} from "./pages/add-page"
import {Main} from "./pages/main-page"
import {Edit} from "./pages/edit-page" // make sure to import the Edit component
import { Home } from './pages/home-page';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/saved" element={<Main></Main>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/add" element={<Add></Add>}></Route>
          <Route path="/edit/:recipeId" element={<Edit></Edit>}></Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;

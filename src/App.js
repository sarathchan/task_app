import './App.css';
import {Routes,Route} from "react-router-dom";
import Taskassign from './Components/Taskassign';
import Taskview from './Components/Taskview';
import Login from './Components/Login/Login';



function App() {
  return (
    <>
      <Routes>
  <Route path='/' element={<Login />}></Route>
  <Route path='/Assign' element={<Taskassign />}></Route>
  <Route path='/View' element={<Taskview />}></Route>
</Routes>
    </>
  );
}

export default App;

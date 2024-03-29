import './App.css';
import {Routes,Route} from "react-router-dom";
import Taskassign from './Components/Taskassign';
import Taskview from './Components/Taskview';
import CreateTask from './Components/CreateTask';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';



function App() {
  return (
    <>
      <Routes>
  <Route path='/' element={<Login />}></Route>
  <Route path='/Signup' element={<Signup />}></Route>
  <Route path='/Assign' element={<Taskassign />}></Route>
  <Route path='/View' element={<Taskview />}></Route>
  <Route path='/Create' element={<CreateTask />}></Route>
</Routes>
    </>
  );
}

export default App;

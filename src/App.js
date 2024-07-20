import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider } from './auth/AuthContext';
import ProtectRoute from './auth/ProtectRoute';
import TaskProvider from './context/TaskContext';
import EditProfile from './pages/EditProfile';
import ProfileProvider from './context/ProfileContext';
import AdmintLayout from './layout/AdmintLayout';
import Dashboard from './layout/Dashboard';
// import { Navigate } from 'react-router-dom';

function App() {  
  return (
    
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          
            
          
      <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Navigate to="/login"/>}></Route>
          <Route path="/" element={<Home />}>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/task-list" element={<TaskList/>}></Route>
          <Route path="/create-task" element={<CreateTask/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>  
          {/* <Route path='/edit-profile' element={<EditProfile/>}></Route> */}
          <Route path='/admin' element={<AdmintLayout/>}></Route>
          <Route path='/admin/dashboard'element={<Dashboard/>}></Route>
          <Route path="*" element={<PageNotFound/>}></Route>  
        </Routes>
          {/* </ProfileProvider> */}
        </TaskProvider>
        </AuthProvider>  
    </BrowserRouter> 

  );
}

export default App;

import {BrowserRouter, Routes ,Route} from 'react-router-dom';

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import CreateTask from "./pages/CreateTask"
import EditTask from "./pages/EditTask"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path= "/login" element={<Login/>}/>
           <Route path= "/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
           <Route path= "/tasks" element={<ProtectedRoute><Tasks/></ProtectedRoute>}/>
           <Route path= "/tasks/create" element={<ProtectedRoute><CreateTask/></ProtectedRoute>}/>
           <Route path= "/tasks/edit/:id" element={<ProtectedRoute><EditTask/></ProtectedRoute>}/>
           <Route path = "*" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

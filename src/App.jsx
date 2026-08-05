import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadLab from "./pages/UploadLab";
import MyFiles from "./pages/MyFiles";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Tools from "./pages/Tools";
import Trash from "./pages/Trash";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadLab />
            </ProtectedRoute>
          }
        />
        <Route
  path="/trash"
  element={
    <ProtectedRoute>
      <Trash />
    </ProtectedRoute>
  }
/>

        <Route
          path="/myfiles"
          element={
            <ProtectedRoute>
              <MyFiles />
            </ProtectedRoute>
          }
        />
        <Route
  path="/tools"
  element={
    <ProtectedRoute>
      <Tools />
    </ProtectedRoute>
  }
/>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
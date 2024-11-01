import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../wrappers/ProtectedRoute";
import PublicRoute from "../wrappers/PublicRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Feed from "../pages/Feed";
import MyProfile from "../pages/MyProfile";
import UserProfile from "../pages/UserProfile";
import ViewPost from "../pages/ViewPost";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <ViewPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

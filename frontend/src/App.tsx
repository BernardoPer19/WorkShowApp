import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import Profile from "./components/Profile";
import AuthContextProvider from "./features/auth/context/AuthContext";
import HomePage from "./features/Home/Landing";
import Navbar from "./components/Navbar";
import LoginPage2 from "./features/auth/components/LoginForm2";
import RegisterPage2 from "./features/auth/components/RegisterPage2";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/login2" element={<LoginPage2 />} />
            <Route path="/register2" element={<RegisterPage2 />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import AuthContextProvider from "./features/auth/context/AuthContext";
import Navbar from "./components/Navbar";
import ProfilePage from "./features/auth/pages/Profile";
import CategoriesPage from "./pages/categoryPage/categories";
import AboutPage from "./pages/About";
import ProjectPage from "./features/projects/pages/ProjectPage";
import WebDevelopmentPage from "./pages/categoryPage/sections/developmentPage";
import HomePage from "./pages/Landing";
import Footer from "./components/Footer";

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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/desarrollo" element={<WebDevelopmentPage />} />
          </Routes>
          <Footer/>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

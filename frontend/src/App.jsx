import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import PropertyDetails from "./pages/PropertyDetails";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useAuth } from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Toast } from "./components/Toast/Toast";

function App() {
    const {
        authUser,
        setAuthUser,
        loadingAuth,
        setLoadingAuth,
        errorAuth,
        setErrorAauth,
    } = useAuth();

    const getAuth = async () => {
        console.log("USER");
        try {
            setLoadingAuth(true);
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            console.log("AUTH USER: ", data);
            if ("error" in data) throw new Error(data.error);
            setAuthUser(data);
        } catch (e) {
            console.log("Error while trying to login: ", e.message);
            setErrorAauth(e.message);
            Toast.fire({
                title: e.message,
                icon: "error",
            });
        } finally {
            setLoadingAuth(false);
        }
    };

    useEffect(() => {
        getAuth();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/property/:id' element={<PropertyDetails />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route
                    path='/profile'
                    element={
                        <ProfilePage
                            authUser={authUser}
                            loadingAuth={loadingAuth}
                            errorAuth={errorAuth}
                        />
                    }
                />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;

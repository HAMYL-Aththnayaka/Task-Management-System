import { useState } from "react"
import api from "../api/axios.js"
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import {toast} from "react-toastify";

import '../styles/login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await api.post('/auth/login', {
                email: email,
                password: password
            })

            login(res.data);
            //console.log("userLogged");
            toast.success("Login Successfull");
            await navigate("/dashboard");

        } catch (err) {
            const message = err.response?.data?.message || err.message;
            toast.error(message);
            console.log(message);
        }
    }


return (
    <>
        <div className="login-container">
            <h1>Login Page</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User Email :</label>
                    <input
                        type='email'
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>User Password :</label>
                    <input
                        type='password'
                        placeholder="Enter Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <button className="login-btn" type="submit">
                    Login
                </button>
            </form>
        </div>
    </>
)
}

export default Login;
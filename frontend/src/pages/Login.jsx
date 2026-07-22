import { useState } from "react"
import api from "../api/axios.js"
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

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
            console.log("userLogged");
            await navigate("/dashboard");

        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    }


    return (
        <>
            <div>
                <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>User Email :</label>
                        <input
                            type='email'
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>User Password :</label>
                        <input
                            type='password'
                            placeholder="Enter Password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;
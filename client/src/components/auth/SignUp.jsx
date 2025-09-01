import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import axios from "axios";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { username, email, password };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/auth/signup/",
                payload
            );
            console.log("Signup successful:", response.data);
            navigate('/login');
        } catch (error) {
            if (error.response) {
                console.error("Signup failed:", error.response.data);
            } else if (error.request) {
                console.error("No response from server:", error.request);
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517495306984-f84210c9c24a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')" }}
        >
            <div className="absolute inset-0 bg-black opacity-75"></div>
            
            <div className="absolute top-5 left-5 z-10">
                <Link to="/" className="font-medium text-white hover:text-green-300 transition-colors">
                    &larr; Back to Home
                </Link>
            </div>

            <div className="relative bg-white bg-opacity-80 backdrop-blur-sm shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Create an Account
                    </h2>
                    <p className="text-gray-600">Join us and make a difference</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField
                        id="username"
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="your_username"
                    />
                    <InputField
                        id="email"
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;

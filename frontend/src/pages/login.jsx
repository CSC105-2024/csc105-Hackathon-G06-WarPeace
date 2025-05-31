import logo from "/login-regis/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
    const nav = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
        nav("/homepage"); 
    };
    return (
        <div className="min-h-screen bg-[#2D3138] flex items-center justify-center px-4">
            <div className=" text-white p-8 rounded-md w-full max-w-md sm:max-w text-center 2xl:">

                <img src={logo} className="text-shadow " />
                <p className="text-lg lg:text-xl font-shadow font-bold text-[#F04E23] my-6">Say What You Mean—Respectfully</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <p className="text-white text-left lg:text-xl mb-2">Username</p>
                        <input
                            type="text"
                            value={username}
                            className="w-full px-4 py-2 text-white bg-black rounded-[3px] focus:outline-none  "
                        />
                    </div>
                    <div>
                        <p className="text-white text-left lg:text-xl mb-2">Password</p>
                        <input
                            type="password"
                            value={password}
                            className="w-full px-4 py-2 text-white bg-black rounded-[3px]  focus:outline-none     "
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-24 bg-yellow-500 hover:bg-yellow-400 cursor-pointer rounded-[3px]  text-black font-bold py-2 mt-4 rounded-3"
                    >
                        Login
                    </button>
                </form>
                <p className="lg:text-lg mt-4 ">
                    Don't have an account? <button onClick={() => nav("/signUp")} className="underline font-bold cursor-pointer">Sign up</button>
                </p>

            </div>
        </div>

    )
}
export default Login;
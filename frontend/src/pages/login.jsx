import logo from "/login-regis/logo.svg";
import axios from "axios";
import speech1 from "/login-regis/speech1.png";
import speech2 from "/login-regis/speech2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
    const nav = useNavigate();
    const [loginFailText, IsLoginFailText] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3000/auth/login",
                { username, password },
                { withCredentials: true }
            );
            const data = res.data;
            if (res.status === 200) {
                const token = data.token;
                const payload = JSON.parse(atob(token.split(".")[1]));
                const userId = payload.userId;
                if (!userId) {
                    alert("Invalid token: missing userId");
                    return;
                }
                localStorage.setItem("userId", String(userId));
                nav("/homepage");
            } else {
                IsLoginFailText(true);
            }
        } catch (error) {
            alert("Network error: " + error.message);
            IsLoginFailText(true);
        }
    };
    //const handleSubmit = () => {
       // nav("/homepage");
    //};
    return (
        <div className="min-h-screen bg-[#2D3138] flex items-center justify-center px-4">
            <img
                src={speech2}
                className="hidden lg:block absolute left-8 bottom-24 w-48 xl:scale-180 lg:scale-120 opacity-65 xl:ml-28"
            />
            <img
                src={speech1}
                className="hidden lg:block absolute right-8 bottom-24 w-48 xl:scale-200 lg:scale-120 opacity-65 xl:mr-28"
            />
            <div className=" text-white p-8 rounded-md w-full max-w-md sm:max-w text-center ">

                <img src={logo} className="text-shadow " />
                <p className="text-lg lg:text-xl font-shadow font-bold text-[#F04E23] my-6">Say What You Mean—Respectfully</p>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
                    <div>
                        <p className="text-white text-left lg:text-xl mb-2">Username</p>
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="w-full px-4 py-2 text-white bg-black rounded-[3px] focus:outline-none  "
                        />
                    </div>
                    <div>
                        <p className="text-white text-left lg:text-xl mb-2">Password</p>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
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
                    {loginFailText && (
                        <p className="text-red-500 mt-2">Login failed. Please check your credentials.</p>
                    )}
                </form>

                <p className="lg:text-lg mt-4 ">
                    Don't have an account? <button onClick={() => nav("/signup")} className="underline font-bold cursor-pointer">Sign up</button>
                </p>

            </div>
        </div>

    )
}
export default Login;
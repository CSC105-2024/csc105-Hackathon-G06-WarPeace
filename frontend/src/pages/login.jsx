import logo from "/login-regis/logo.svg";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom"
function Login() {
    const nav = useNavigate();
    return (
        <div className="min-h-screen bg-[#2D3138] flex items-center justify-center px-4">
            <div className=" text-white p-8 rounded-md w-full max-w-xl text-center ">

                <img src={logo} className=""/>
                <p className="text-sm lg:text-lg font-bold text-[#F04E23] my-6">Say What You Mean—Respectfully</p>
                <form className="space-y-4">
                    <div>
                        <p className="text-white text-left">Username</p>
                        <input
                            type="text"
                            className="w-full px-4 py-2 text-white bg-black rounded-3 focus:outline-none"
                        />
                    </div>
                    <div>
                        <p className="text-white text-left">Password</p>
                        <input
                            type="password"
                            className="w-full px-4 py-2 text-white bg-black rounded-3 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-24 bg-yellow-500 hover:bg-yellow-400 cursor-pointer text-black font-bold py-2 mt-4 rounded-3"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm mt-4">
                    Don't have an account? <button onClick={()=>nav("/signUp")} className="underline font-bold cursor-pointer">Sign up</button>
                </p>

            </div>
        </div>

    )
}
export default Login;
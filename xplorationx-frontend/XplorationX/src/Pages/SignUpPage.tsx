import {useState} from "react";
import * as React from "react";
import logo from '../assets/Logo.png';
import { Link,useNavigate } from "react-router-dom";
import {registerUser} from "../Reducers/sign-reducer.ts";
import {AppDispatch} from "../store/store.ts";
import {useDispatch} from "react-redux";

export default function SignUpPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function handleRegister(e){
        e.preventDefault();
        const user:User ={username:name,email:email,password:password}
        dispatch(registerUser(user))
            .unwrap()
            .then((response) => {
                console.log('Registered successful:', response);
                navigate('/signin');
            })
            .catch((err) => {
                console.error("Register failed:", err);
            });
    }


    return (
        <div className="beforeScreen">
            <div className="h-full bg-black/10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-[#bbbbbbeb] p-7 rounded-lg w-[40vw] mx-auto flex flex-col items-center justify-center">
                    <img className="w-[100px] h-[100px]" src={logo} alt="Logo" />
                    <h1 className="text-[#032d28] font-bold my-3 text-4xl ">XplorationX</h1>
                    <h2 className="my-5 text-3xl font-bold text-[text-gray-100]">Sign Up</h2>
                    <form className="w-[70%] p-2" onSubmit={handleRegister}>
                        <div className="mb-5">
                            <label className="block text-black text-justify" htmlFor="name">Name</label>
                            <input
                                className="w-full p-2 border border-transparent rounded-sm mt-1"
                                type="text"
                                placeholder="Enter your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-black text-justify" htmlFor="email">Email</label>
                            <input
                                className="w-full p-2 border border-transparent rounded-sm mt-1"
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-black text-justify" htmlFor="password">Password</label>
                            <input
                                className="w-full p-2 border border-transparent rounded-sm mt-1"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                            <button type="submit" className="w-[60%] mx-[15%] bg-[#20b2aa] text-black px-4 py-2 rounded-lg cursor-pointer mt-2 hover:bg-[#0e524f] hover:text-[#f5f5f5]">
                                Sign up
                            </button>
                    </form>
                    <div className="mt-5 text-sm">
                        <Link to="/signin" className="text-[#000000] no-underline hover:underline">
                            <p>
                                Already have an account ? SignIn
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

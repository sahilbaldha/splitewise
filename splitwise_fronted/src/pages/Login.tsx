import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Inputcom } from "../component/Inputcom";
import { GoogleLogin } from "../component/googleLogin";
export const Login = () => {
  const Api_Key = import.meta.env.VITE_API_KEY;
  let navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handelChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginData((data) => ({ ...data, [name]: value }));
  }

  const handelsubmit = async () => {
  
    try {
      const response = await fetch(`${Api_Key}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="bg-[#121212] min-h-screen w-full flex justify-center items-center font-poppins text-white">
        <div
          className="flex flex-col gap-4.5 items-center py-5 md:py-0"
      
        >
          <div className=" text-[25px] md:text-[38px] font-poppins font-extrabold capitalize text-center tracking-tight">
            welcome back
          </div>
          <Inputcom
            handelchange={handelChange}
            label="email"
            placeholder="name@domain.com"
            type="text"
            value={loginData.email}
            name="email"
          />
          <Inputcom
            handelchange={handelChange}
            label="password"
            placeholder="Enter Your Password"
            type="password"
            value={loginData.password}
            name="password"
          />
          <button  onClick={() => handelsubmit()}  className="bg-[#3BE477]  px-37.5 py-2.5 rounded-4xl text-black  font-bold animate">
            LogIn
          </button>
          <div className="text-gray-400 text-[15px]">
            Don't have an account?
          </div>
          <span className="-mt-4 cursor-pointer animate">
            <NavLink to="/signup">Sign Up</NavLink>
          </span>
          <GoogleLogin urlname="login" />
        </div>
      </section>
    </>
  );
};

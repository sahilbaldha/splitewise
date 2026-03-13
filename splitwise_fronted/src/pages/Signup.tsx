import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Inputcom } from "../component/Inputcom";
import { GoogleLogin } from "../component/googleLogin";


export const Signup = () => {
  const Api_Key = import.meta.env.VITE_API_KEY;
  let navigate = useNavigate();

  const [signpData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handelChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignupData((data) => ({ ...data, [name]: value }));
  }

  const handelsubmit = async () => {

    try {
      const response = await fetch(`${Api_Key}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(signpData),
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
      <section className="bg-[#121212] w-full flex justify-center min-h-screen items-center font-poppins text-white">
        <div
          className="flex flex-col gap-[1.3rem] items-center md:py-0 py-5"
        
        >
          <div className=" text-[25px] sm:text-[38px] font-poppins font-extrabold capitalize text-center tracking-tight">
            Sign up to
          </div>

          <Inputcom
            handelchange={handelChange}
            label="name"
            placeholder="Enter Your Name"
            type="text"
            value={signpData.name}
            name="name"
          />
          <Inputcom
            handelchange={handelChange}
            label="email"
            placeholder="name@domain.com"
            type="text"
            value={signpData.email}
            name="email"
          />
          <Inputcom
            handelchange={handelChange}
            label="password"
            placeholder="Enter Your Password"
            type="password"
            value={signpData.password}
            name="password"
          />
          <button   onClick={()=> handelsubmit()} className=" bg-[#3BE477]  px-37.5 py-2.5 rounded-4xl text-black  font-bold animate">
            Sign In
          </button>
          <div className="text-gray-400 text-[15px]">
            Already have an account?
          </div>
          <span className="-mt-4 animate cursor-pointer">
            <NavLink to="/login">Log in</NavLink>
          </span>
           <GoogleLogin urlname="signup"/>
        </div>
      </section>
    </>
  );
};

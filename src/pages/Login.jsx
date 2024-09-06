import React, { useState } from "react";
import logo from "../assets/mishmash-logo.png";
import landingImg from "../assets/landing-img.png";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../api/auth";
import Loader from "../components/Loader";
import { setCookie } from "../utils/cookieHandler";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Sign in");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Signing in");
    try {
      const response = await login(formData);
      setIsLoading(true);
      setCookie("token", response.token);

      const from = location.state?.from?.pathname || "/feed";
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setButtonText("Sign in");
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row items-center justify-center h-screen bg-gray-50">
          <Toaster />
          <div className="lg:w-1/2 w-full h-full p-4 flex flex-col">
            <div className="flex flex-row items-center justify-start">
              <img src={logo} alt="MishMash" width={40} height={40} />
              <div className="cursor-pointer flex text-xl font-semibold">
                <p className="text-black">
                  M<span className="text-blue-500">ish</span>
                </p>
                <p className="text-black">
                  M<span className="text-blue-500">ash</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col w-3/4 items-start my-auto mx-auto gap-3">
              <p className="text-3xl font-semibold">Welcome back</p>
              <p className="text-lg font-normal">
                Enter your credentials to continue.
              </p>
              <Input
                onChange={handleChange}
                value={formData.identifier}
                name="identifier"
                color="blue"
                type="text"
                className="bg-white text-black"
                label="Username, Email or Phone"
              />
              <Input
                onChange={handleChange}
                value={formData.password}
                name="password"
                color="blue"
                type="password"
                className="bg-white text-black"
                label="Password"
              />
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white"
                disabled={isLoading}
              >
                {buttonText}
              </Button>
              <p className="text-sm text-zinc-500 text-start">
                New to MishMash?{" "}
                <Link className="text-blue-700 underline" to={"/register"}>
                  Register here
                </Link>
              </p>
            </div>
          </div>

          <div className="w-1/2 h-full lg:flex hidden items-center justify-center bg-blue-500 rounded-l-[4rem] shadow-2xl">
            <img
              className=""
              src={landingImg}
              alt="Landing Image"
              width={1000}
              height={200}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

import { useState } from "react";
import logo from "../assets/mishmash-logo.png";
import landingImg from "../assets/landing-img.png";
import Loader from "../components/Loader";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import toast, { Toaster } from "react-hot-toast";
import { setCookie } from "../utils/cookieHandler";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    fullname: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Sign up");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Signing up");
    try {
      const response = await signup(formData);
      setIsLoading(true);
      setCookie("token", response.token);

      const from = location.state?.from?.pathname || "/home";
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    } catch (error) {
      setButtonText("Sign up");
      setIsLoading(false);
      toast.error(error.message);
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
              <p className="text-3xl font-semibold">Welcome to MishMash</p>
              <p className="text-lg font-normal">
                Join the best social media now!
              </p>
              <Input
                onChange={handleChange}
                value={formData.emailOrPhone}
                color="blue"
                name="emailOrPhone"
                type="text"
                className="bg-white text-black"
                label="Email or Phone"
              />
              <Input
                onChange={handleChange}
                value={formData.fullname}
                color="blue"
                name="fullname"
                type="text"
                className="bg-white text-black"
                label="Fullname"
              />
              <Input
                onChange={handleChange}
                value={formData.username}
                color="blue"
                name="username"
                type="text"
                className="bg-white text-black"
                label="Username"
              />
              <Input
                onChange={handleChange}
                value={formData.password}
                color="blue"
                name="password"
                type="password"
                className="bg-white text-black"
                label="Password"
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white"
              >
                {buttonText}
              </Button>
              <p className="text-sm text-zinc-500 text-start">
                Already have an account?{" "}
                <Link className="text-blue-700 underline" to={"/"}>
                  Log in here
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

export default Signup;

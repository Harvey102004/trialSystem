import { useState, useRef } from "react";
import Wave from "../../assets/Wave.png";
import hidepass from "../../assets/hidepass.png";
import unhidepass from "../../assets/unhidepass.png";
import ResetPassword from "./ResetPassword";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface FormSwitch {
  switchToCreateAcc: () => void;
  onLoginSuccess: () => void;
}

const LoginForm = ({ switchToCreateAcc, onLoginSuccess }: FormSwitch) => {
  const [seePassword, setSeePassword] = useState<boolean>(false);

  const handleEyeIcon = () => {
    setSeePassword(!seePassword);
  };

  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const handleResetPassword = () => {
    setResetPassword(!resetPassword);
  };

  const container = useRef<HTMLFormElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      container.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
    );
  });

  const handleExitAnimation = () => {
    gsap.to(container.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        switchToCreateAcc();
      },
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div>
      <h1 className="logo absolute left-16 top-5 text-[30px] font-extrabold text-darkgreen">
        TB Tracker
      </h1>
      <div className="absolute left-1/2 top-1/2 z-50 flex h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg bg-formbackground shadow-xl">
        <form
          ref={container}
          action=""
          className="login_form flex w-full flex-col gap-10 text-center"
          onSubmit={handleLogin}
        >
          <div>
            <h1 className="text-[50px] font-black text-darkgreen">Welcome!</h1>
            <p className="mt-3">Sign in to continue to TB Tracker</p>
          </div>
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Username"
              className="mx-auto w-1/2 border border-darkgreen p-3 px-5 placeholder:text-sm focus:border-darkgreen focus:outline-none"
              required
            />
            <div className="relative mx-auto w-1/2">
              <input
                type={seePassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-darkgreen p-3 pl-5 pr-16 placeholder:text-sm focus:border-darkgreen focus:outline-none"
                required
              />
              <img
                src={seePassword ? unhidepass : hidepass}
                onClick={handleEyeIcon}
                className="absolute right-3 top-1/2 mr-2 -translate-y-1/2 transform cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <input
              type="submit"
              value={"LOG IN"}
              className="mx-auto w-[25%] cursor-pointer rounded-md bg-semidarkgreen p-3 font-semibold text-white hover:opacity-80"
            />

            <a
              href="#"
              className="mt-4 font-light hover:opacity-70"
              onClick={handleResetPassword}
            >
              Forgot Password?
            </a>
          </div>
          <a
            href="#"
            className="text-lg underline underline-offset-8 hover:opacity-70"
            onClick={handleExitAnimation}
          >
            Create an account
          </a>
        </form>
      </div>
      <img src={Wave} className="absolute bottom-0 h-[220px] w-full" />
      <ResetPassword
        resetPassword={resetPassword}
        oncancel={handleResetPassword}
      />
    </div>
  );
};

export default LoginForm;

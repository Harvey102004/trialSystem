import { useState, useEffect, useRef } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Wave from "../../assets/Wave.png";
import hidepass from "../../assets/hidepass.png";
import unhidepass from "../../assets/unhidepass.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CreateAccSwitch {
  switchToLoginForm: () => void;
  onSubmitSuccess: () => void;
}

const CreateAccount = ({
  switchToLoginForm,
  onSubmitSuccess,
}: CreateAccSwitch) => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState<boolean>(false);
  const [seeAdminPassword, setSeeAdminPassword] = useState<boolean>(false);

  const [showAdminPass, setShowAdminPass] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      userName.trim() === "" ||
      userPassword.trim() === "" ||
      userConfirmPassword === ""
    ) {
      setIsDisabled(true);
    } else if (userName.trim().length <= 8 && userName.length > 0) {
      setIsDisabled(true);
    } else if (userPassword.trim().length <= 8 && userPassword.length > 0) {
      setIsDisabled(true);
    } else if (
      userConfirmPassword.trim().length <= 8 &&
      userConfirmPassword.length > 0
    ) {
      setIsDisabled(true);
    } else if (userPassword !== userConfirmPassword) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [userName, userPassword, userConfirmPassword]);

  const handleNextInAdminPass = () => {
    setShowAdminPass(!showAdminPass);
    setAdminPassword("");
    setSeeAdminPassword(false);
  };

  const handleNextAdmin = () => {
    setShowAdminPass(!showAdminPass);
  };

  const handleEyeIcon = () => {
    setSeePassword(!seePassword);
  };
  const handleConfirmEyeIcon = () => {
    setSeeConfirmPassword(!seeConfirmPassword);
  };

  const handleAdminEyeIcon = () => {
    setSeeAdminPassword(!seeAdminPassword);
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
        switchToLoginForm();
      },
    });
  };

  const adminpass = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (showAdminPass) {
      gsap.fromTo(adminpass.current, { y: -600 }, { y: 0, duration: 0.5 });
    }
  }, [showAdminPass]);

  const handleExitAdminPass = () => {
    gsap.to(adminpass.current, {
      y: -600,
      duration: 0.5,
      onComplete: () => {
        handleNextInAdminPass();
      },
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitSuccess();
  };

  return (
    <>
      <div>
        <h1 className="logo absolute left-16 top-5 text-[30px] font-extrabold text-darkgreen">
          TB Tracker
        </h1>
        <div className="absolute left-1/2 top-1/2 z-40 flex h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-formbackground shadow-xl">
          <form
            ref={container}
            action=""
            className="create_acc flex h-full w-full flex-col justify-center gap-3 text-center"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-5">
              <h1 className="text-[45px] font-black text-darkgreen">
                Create Your Account
              </h1>
              <p className="mx-auto mt-3 w-[50%] text-start font-light">
                Fill out the fields below to set up your account. Choose a
                unique username and a strong password, then confirm it to ensure
                it matches!
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="mx-auto w-1/2">
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserName(e.target.value);
                  }}
                  className={`mx-auto w-full border p-3 px-5 placeholder:text-sm ${userName.trim().length <= 8 && userName.length > 0 ? "border-red-600 focus:border-red-600" : "border-darkgreen focus:border-darkgreen"} focus:outline-none`}
                  required
                />
                {userName.trim().length <= 8 && userName.length > 0 && (
                  <p className="mt-2 text-start text-xs text-red-500">
                    The username is too short. It must be at least 8 characters.
                  </p>
                )}
              </div>
              <div className="mx-auto w-1/2">
                <div className="relative mx-auto w-full">
                  <input
                    type={seePassword ? "text" : "password"}
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserPassword(e.target.value)
                    }
                    className={`w-full border p-3 pl-5 pr-16 placeholder:text-sm ${userPassword.trim().length <= 8 && userPassword.length > 0 ? "border-red-600 focus:border-red-600" : "border-darkgreen focus:border-darkgreen"} focus:outline-none`}
                    required
                  />
                  <img
                    src={seePassword ? unhidepass : hidepass}
                    onClick={handleEyeIcon}
                    className="absolute right-3 top-1/2 mr-2 -translate-y-1/2 transform cursor-pointer"
                  />
                </div>
                {userPassword.trim().length <= 8 && userPassword.length > 0 && (
                  <p className="mt-2 text-start text-xs text-red-500">
                    For better security, your password must be over 8
                    characters.
                  </p>
                )}
              </div>
              <div className="mx-auto w-1/2">
                <div className="relative mx-auto w-full">
                  <input
                    type={seeConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={userConfirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserConfirmPassword(e.target.value)
                    }
                    className={`w-full border p-3 pl-5 pr-16 placeholder:text-sm ${userConfirmPassword.trim() !== userPassword.trim() ? "border-red-600 focus:border-red-600" : "border-darkgreen focus:border-darkgreen"} ${userConfirmPassword.trim().length <= 8 && userConfirmPassword.length > 0 ? "border-red-600 focus:border-red-600" : "border-darkgreen focus:border-darkgreen"} focus:outline-none`}
                    required
                  />
                  <img
                    src={seeConfirmPassword ? unhidepass : hidepass}
                    onClick={handleConfirmEyeIcon}
                    className="absolute right-3 top-1/2 mr-2 -translate-y-1/2 transform cursor-pointer"
                  />
                </div>
                {userConfirmPassword.trim() !== userPassword.trim() && (
                  <p className="mt-2 text-start text-xs text-red-500">
                    Ensure your password matches the original.
                  </p>
                )}
                {userConfirmPassword.trim().length <= 8 &&
                  userConfirmPassword.length > 0 && (
                    <p className="mt-2 text-start text-xs text-red-500">
                      Your password must be over 8 characters.
                    </p>
                  )}
              </div>
            </div>
            <div className="mx-auto mt-14 flex w-[80%] items-center justify-between">
              <p
                onClick={handleExitAnimation}
                className="flex cursor-pointer items-center text-lg font-semibold text-darkgreen hover:opacity-80"
              >
                <GrFormPrevious className="text-4xl font-black text-darkgreen" />
                Back
              </p>
              <div className="flex">
                <button
                  className={`${isDisabled ? "cursor-not-allowed text-lg font-semibold text-gray-400" : "cursor-pointer items-center text-lg font-semibold text-darkgreen hover:opacity-80"}`}
                  id="next"
                  disabled={isDisabled}
                  onClick={handleNextAdmin}
                >
                  Next
                </button>
                <label htmlFor="next">
                  <GrFormNext
                    className={`${isDisabled ? "cursor-not-allowed text-4xl font-semibold text-gray-400" : "cursor-pointer text-4xl font-black text-darkgreen"}`}
                  />
                </label>
              </div>
            </div>
            {showAdminPass && (
              <div
                ref={adminpass}
                className="absolute left-1/2 top-1/2 z-50 flex w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-md bg-formbackground p-12 text-start shadow-resetPass"
              >
                <div>
                  <h1 className="text-lg font-semibold text-darkgreen">
                    Admin Password Required
                  </h1>
                  <p className="mt-2 text-sm">
                    To proceed with creating a new account, please enter the
                    admin password below. This step is necessary to ensure
                    secure management of user accounts.
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="relative mx-auto w-full">
                    <input
                      type={seeAdminPassword ? "text" : "password"}
                      placeholder="Enter Addmin Password"
                      value={adminPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAdminPassword(e.target.value)
                      }
                      className="w-full border border-darkgreen p-3 pl-5 pr-16 placeholder:text-sm focus:border-darkgreen focus:outline-none"
                      required
                    />
                    <img
                      src={seeAdminPassword ? unhidepass : hidepass}
                      onClick={handleAdminEyeIcon}
                      className="absolute right-3 top-1/2 mr-2 -translate-y-1/2 transform cursor-pointer"
                    />
                  </div>
                  <p className="text-sm italic text-red-400">
                    Please note that only authorized personnel can create new
                    accounts. If you do not have access, please contact your
                    system administrator.
                  </p>
                </div>
                <div className="flex justify-between">
                  <input
                    type="submit"
                    value={"Submit"}
                    className="w-[25%] cursor-pointer rounded-sm bg-semidarkgreen p-2 font-normal text-white hover:opacity-80"
                  />
                  <button
                    className="rounded-sm border border-darkgreen p-2 px-6 font-semibold text-darkgreen"
                    onClick={handleExitAdminPass}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        <img src={Wave} className="absolute bottom-0 h-[220px] w-full" />
      </div>
    </>
  );
};

export default CreateAccount;

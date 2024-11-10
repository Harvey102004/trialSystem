import user from "../../assets/user.png";
import { BiSolidDashboard } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface FormSwitch {
  onSignOut: () => void;
}

const Navigation = ({ onSignOut }: FormSwitch) => {
  const icon = [<BiSolidDashboard />, <MdLibraryAdd />, <IoSearch />];
  const [isActive, setIsActive] = useState<number>(0);
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const handleLogout = () => {
    setIsLogout(true);
  };

  const handleActive = (index: number) => {
    setIsActive(index);
  };

  const logoutContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (isLogout) {
      gsap.fromTo(
        logoutContainer.current,
        { y: -600 },
        { y: 0, duration: 0.5 },
      );
    }
  }, [isLogout]);

  const handleCancelLogout = () => {
    if (logoutContainer.current) {
      gsap.to(logoutContainer.current, {
        y: -600,
        duration: 0.5,
        onComplete: () => setIsLogout(false),
      });
    }
  };

  const navigationContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      navigationContainer.current,
      { x: -300 },
      { x: 0, duration: 0.5 },
    );
  });

  return (
    <div ref={navigationContainer}>
      <nav className="flex h-full min-h-screen w-[25%] flex-col justify-between border-r-2 border-darkgreen">
        <div className="flex flex-col gap-8">
          <h1 className="rounded-b-xl bg-darkgreen p-5 text-xl font-extrabold text-background">
            TB Tracker
          </h1>
          <div className="mx-8 flex w-max items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-darkgreen">
              <img src={user} />
            </div>
            <div>
              <p className="text-xl font-bold">Juan Dela Cruz</p>
              <p className="text-xs font-light">Health Care Worker</p>
            </div>
          </div>
          <ul className="flex flex-col">
            {["Dashboard", "Add Patient", "Search Patient"].map(
              (item, index) => (
                <li
                  key={index}
                  className={`flex cursor-pointer items-center gap-3 p-5 pl-8 text-xl font-semibold ${isActive === index ? "text-[1.43rem] opacity-100" : "opacity-40"} hover:opacity-100`}
                  onClick={() => handleActive(index)}
                >
                  <span className="text-3xl">{icon[index]}</span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="mb-10 ml-8 flex w-max cursor-pointer items-center gap-2 text-darkgreen hover:opacity-80">
          <BiLogOut className="text-3xl" />
          <p className="text-xl font-semibold" onClick={handleLogout}>
            Logout
          </p>
        </div>
      </nav>
      {isLogout && (
        <div
          ref={logoutContainer}
          className="absolute left-1/2 top-1/2 z-50 flex w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-7 rounded-md bg-formbackground py-7 text-center shadow-resetPass"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-center gap-4 text-darkgreen">
            <BiLogOut className="text-3xl" />
            <p className="text-xl font-semibold">Would you like to sign out?</p>
          </div>
          <div className="flex justify-around">
            <button
              className="w-[25%] cursor-pointer rounded-sm bg-semidarkgreen p-2 font-normal text-white hover:opacity-80"
              onClick={handleCancelLogout}
            >
              Cancel
            </button>
            <button
              className="rounded-sm border border-darkgreen p-2 px-8 font-semibold text-darkgreen"
              onClick={onSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;

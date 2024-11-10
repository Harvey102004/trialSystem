import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface ResetPassword {
  resetPassword: boolean;
  oncancel: () => void;
}

const ResetPassword = ({ resetPassword, oncancel }: ResetPassword) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (resetPassword) {
      gsap.fromTo(
        ".reset-password-container",
        { opacity: 0, y: -1000 },
        { opacity: 1, y: -200, duration: 0.5 },
      );
    }
  }, [resetPassword]);

  const handleClose = () => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 1, y: -200, duration: 0.5 },
        {
          opacity: 0.9,
          y: -1000,
          onComplete: () => {
            oncancel();
          },
        },
      );
    }
  };
  return (
    <>
      {resetPassword && (
        <div
          ref={containerRef}
          className="reset-password-container absolute left-1/2 top-1/2 z-50 w-[500px] -translate-x-1/2 -translate-y-1/2 gap-5 rounded-md bg-formbackground py-12 text-center shadow-resetPass"
        >
          <form className="flex w-full flex-col gap-12">
            <h1 className="text-xl font-semibold text-darkgreen">
              Reset Your Password
            </h1>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Username"
                className="mx-auto w-3/4 border border-darkgreen p-3 px-5 placeholder:text-sm focus:border-darkgreen focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="mx-auto w-3/4 border border-darkgreen p-3 px-5 placeholder:text-sm focus:border-darkgreen focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-around">
              <input
                type="submit"
                value={"Submit"}
                className="w-[25%] cursor-pointer rounded-sm bg-semidarkgreen p-2 font-normal text-white hover:opacity-80"
              />
              <button
                className="rounded-sm border border-darkgreen p-2 px-8 font-semibold text-darkgreen"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;

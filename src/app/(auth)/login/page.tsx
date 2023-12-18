"use client";
import Button from "../../../components/ui/Button";
import { FC } from "react";
import { useState } from "react";
interface pageProps {}
import { signIn } from "next-auth/react";
import toast, { Toast } from "react-hot-toast";

const page: FC<pageProps> = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  async function loginWithGoogle() {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      //display error message to user
      // toast.error('error occurs while log in')
      alert('sometthing went wrong')
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <>
      <div>
        <div className="ml-[36vw] mt-[25vh]">
          <div className="text-2xl ml-12 mb-10">log in to Yours Account</div>
          <div>
            <div className="px-6 sm:px-0 max-w-sm">
              <Button
                isLoading={isLoading}
                onClick={loginWithGoogle}
                type="button"
                className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  {isLoading ? null : (
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  )}
                </svg>
                Sign up with Google<div></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default page;

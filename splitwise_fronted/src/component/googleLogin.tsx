import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router";
export const GoogleLogin = (props: { urlname: string }) => {
  const Api_Key = import.meta.env.VITE_API_KEY;
  let navigate = useNavigate();
  const { urlname } = props;
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse.code);
      try {
        const response = await axios.post(
          `${Api_Key}/user/${urlname}`,
          { code: codeResponse.code },
          { withCredentials: true },
        );
        if (response.status == 200) {
          navigate("/");
        }
      } catch (error: any) {
      
        console.error(
          "Backend Error Detail:",
          error.response?.data || error.message,
        );
      }
    },
    onError: (error) => console.error("Login Failed:", error),
    flow: "auth-code",
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center gap-2 border rounded-2xl px-4 py-2 bg-white text-black hover:bg-gray-50"
    >
      <FcGoogle className="text-xl" />
      <span className="font-bold">Continue with Google</span>
    </button>
  );
};

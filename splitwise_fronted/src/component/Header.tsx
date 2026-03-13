import { NavLink, useNavigate } from "react-router-dom";
export const Header = () => {
  const Api_Key = import.meta.env.VITE_API_KEY;
  let navigate = useNavigate();

  async function handelLogout() {
    try {
      const response = await fetch(`${Api_Key}/user/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        navigate("/signup");
      }
    } catch (error) {
      navigate("/signup");
    }
  }
  return (
    <>
      <header className="h-16  bg-[#000000] text-white font-poppins sticky top-0 z-10">
        <div className="max-w-91.25  md:max-w-175  xl:max-w-312 px-5  m-auto flex justify-between items-center h-16 capitalize">
          <div className="  text-[19px] md:text-[24px] font-extrabold">
            splitwise
          </div>
          <div className="flex space-x-3 md:space-x-4 font-semibold cursor-pointer text-[14px] md:text-[16px] ">
            <NavLink to="/">
              <span className="animate">Home</span>
            </NavLink>
            <NavLink to="/create">
              <span className="animate">Create</span>
            </NavLink>
          </div>
          <div className="flex font-semibold cursor-pointer text-[14px] md:text-[16px]">
            <span onClick={handelLogout} className="animate">
              logout
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

import { useNavigate } from "react-router-dom";
function NotFoundPage() {
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen bg-[#2D3138] justify-center items-center">
      <div className="box flex flex-col justify-center  md:flex-row gap-20 items-center">
        <div className="first">
          <img className="w-90 md:w-120" src="notfound.png" />
        </div>
        <div className="second flex flex-col gap-4">
          <div className="textarea text-4xl   font-bold text-white">
            <h1>OOPS! PAGE</h1>
            <h1>NOT FOUND</h1>
          </div>
          <button
            className="bg-yellow-500 rounded-sm hover:bg-amber-500 text-black cursor-pointer font-bold px-4 py-2"
            onClick={() => nav("/homePage")}
          >
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
}
export default NotFoundPage;

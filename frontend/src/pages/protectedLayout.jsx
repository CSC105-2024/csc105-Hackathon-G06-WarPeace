import { Outlet, Navigate } from "react-router-dom";
import ScrollToTop from "../service/scrollToTop";
function ProtectedLayout() {
  const isLoggedIn = !!localStorage.getItem("userId");
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
    <ScrollToTop/>
      <Outlet />
    </>
  );
}
export default ProtectedLayout;

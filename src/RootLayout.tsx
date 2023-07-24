import { AdminNavBar } from "@/components/AdminNavBar";
import AuthNavBar from "@/components/AuthNavBar";
import NavBar from "@/components/NavBar";
import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
export default function RootLayout() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reset-password"
  ) {
    return (
      <Box h="100vh" w="100%">
        <AuthNavBar />
        <Outlet />
      </Box>
    );
  }

  return (
    <Box h="100vh" w="100%">
      {isAdmin ? <AdminNavBar /> : <NavBar />}
      <Outlet />
    </Box>
  );
}

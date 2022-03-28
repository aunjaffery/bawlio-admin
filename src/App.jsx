import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "@pages/authScreens/Login";
import ContactList from "@pages/contacts/ContactList";
import Navbar from "@components/navbar/Navbar";
import { useEffect } from "react";
import { useAuthStore } from "./auth_module/store/auth_store";

const queryClient = new QueryClient();
function App() {
  const { success } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const getUrl = (pathname) => {
    return pathname === "/login" ? true : false;
  };
  useEffect(() => {
    if (success === false) {
      navigate("/login");
    }
  }, [success]);

  const { pathname } = useLocation();

  return (
    <Box>
      <QueryClientProvider client={queryClient}>
        {getUrl(pathname) ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        ) : (
          <Box>
            <Navbar />
            <Routes>
              <Route path="/" element={<ContactList />} />
            </Routes>
          </Box>
        )}
      </QueryClientProvider>
    </Box>
  );
}

export default App;

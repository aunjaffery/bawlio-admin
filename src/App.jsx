import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "@pages/authScreens/Login";
import ContactList from "@pages/contacts/ContactList";
import Navbar from "@components/navbar/Navbar";

const queryClient = new QueryClient();
function App() {
  const getUrl = (pathname) => {
    return pathname === "/login" ? true : false;
  };

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
              <Route path="/contactlist" element={<ContactList />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Box>
        )}
      </QueryClientProvider>
    </Box>
  );
}

export default App;

import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./utils/AppRoutes";
import AgeVerificationModal from "./components/userComponents/AgeVerification";

function App() {
  const router = createBrowserRouter(AppRoutes);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Always show the modal on page load for demonstration purposes
    localStorage.setItem("hasVerifiedAge", "false"); // Reset verification on every refresh
    setShowModal(true);
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <RouterProvider router={router} />
      <AgeVerificationModal show={showModal} onClose={handleCloseModal} />
    </>
  );
}

export default App;

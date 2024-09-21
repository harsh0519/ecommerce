import React , { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./utils/AppRoutes";
import AgeVerificationModal from "./components/userComponents/AgeVerification";

function App() {
  const router = createBrowserRouter(AppRoutes);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem("ageVerified");
    if (!ageVerified) {
      setShowModal(true);
    }
  }, []);
  return (
    <>
      <RouterProvider router={router} />
        <AgeVerificationModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />
    </>
  );
}

export default App;

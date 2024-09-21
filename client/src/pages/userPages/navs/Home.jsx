import React from "react";
import AppNavbar from "../../../components/userComponents/AppNavbar";
import AppFooter from "../../../components/userComponents/AppFooter";
import HomeContent from "../../../components/userComponents/contents/HomeContent";

function Home() {
  return (
    <>
      <AppNavbar />
      <HomeContent />
      <AppFooter />
    </>
  );
}

export default Home;

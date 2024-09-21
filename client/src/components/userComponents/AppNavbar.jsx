import React, { useContext, useEffect, useState } from "react";
import { Button, Image, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import logo from "@/assets/logo.png";
import { CartDataContext } from "../../contextApi/CartDataComponent";
import { useLogout } from "../../hooks/UseLogout";
import { jwtDecode } from "jwt-decode";
import "./AppNavbar.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AppNavbar() {
  const navigate = useNavigate();
  const logout = useLogout();
  const { cart } = useContext(CartDataContext);

  const [myProfile, setMyProfile] = useState(false);
  const [respMenu, setRespMenu] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [guestRegisterloading, setGuestRegisterLoading] = useState(false);

  const getLoginToken = localStorage.getItem("loginToken");
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const handleMyProfile = () => setMyProfile(!myProfile);
  const handleRespMenu = () => setRespMenu(!respMenu);

  const getUser = async () => {
    try {
      if (storedUserData && storedUserData.isGhost) {
        setUserAuth(storedUserData); // Use ghost user data
        return;
      }

      if (getLoginToken) {
        const decodedToken = jwtDecode(getLoginToken);
        const id = decodedToken.id;
        const res = await AxiosService.get(
          `${ApiRoutes.CURRENTUSER.path}/${id}`,
          { headers: { Authorization: `Bearer ${getLoginToken}` } }
        );
        const result = res.data.currentUser;
        if (res.status === 200) {
          setUserAuth(result);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleLogout = async () => {
    try {
      if (storedUserData && storedUserData.isGhost) {
        // If logged in as ghost, just clear local storage
        localStorage.removeItem("loginToken");
        localStorage.removeItem("userData");
        logout();
        return;
      }
      if (getLoginToken) {
        const decodedToken = jwtDecode(getLoginToken);
        const id = decodedToken.id;
        const res = await AxiosService.put(`${ApiRoutes.LOGOUT.path}/${id}`, {
          headers: { Authorization: `Bearer ${getLoginToken}` },
        });
        if (res.status === 200) {
          logout();
          localStorage.removeItem("loginToken");
          localStorage.removeItem("userData");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      try {
        navigate(`/search?query=${query}`);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    } else {
      toast.warning("Please enter a search query.");
    }
  };

  const handleLoginAsGhost = async () => {
    try {
      setGuestRegisterLoading(true);
      let res = await AxiosService.post(
        `${ApiRoutes.GHOST_REGISTER.path}`,
        {}
      );
      if (res.status === 200) {
        const newUser = res.data.newUser;
        let loginRes = await AxiosService.post(`${ApiRoutes.LOGIN.path}`, {
          email: newUser.email,
          isGhost: true,
        });
        if (loginRes.status === 200) {
          localStorage.setItem("loginToken", loginRes.data.loginToken);
          navigate("/");
        }

        // Optionally, navigate to a specific page
        navigate("/"); // Navigate to home or a different page
        toast.info("Logged in as Ghost");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGuestRegisterLoading(false);
    }
  };

  const handleBuyProductClick = () => {
    if (!userAuth) {
      // If not logged in, navigate to login page
      navigate("/login");
      toast.warning("Please log in to buy products.");
    } else {
      // Navigate to the Buy Product page
      navigate("/c/Male");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <nav
        className="top-navbar"
        style={{ backgroundColor: "#000000", height: "5rem" }}
      >
        <div className="d-flex justify-content-between align-items-center px-3">
          <Image src={logo} height={120} onClick={() => navigate("/")} />
          <Form
            className="d-flex"
            style={{ width: "50%" }}
            onSubmit={handleSearchSubmit}
          >
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
          <div className="d-flex align-items-center">
            {userAuth ? (
              <>
                <p className="text-white mb-0 me-3">Hi, {userAuth.firstName}</p>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
                <Button
                  variant="outline-light"
                  onClick={handleLoginAsGhost}
                  className="ms-2"
                >
                  Login as Ghost
                </Button>
              </>
            )}
            <Button
              variant="none"
              className="authBtns cartBtn"
              onClick={() => navigate("/cart")}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ height: "1.5rem", color: "white" }}
              />
              <div className="cartBadge" style={{ fontSize: "1.2rem" }}>
                {cart}
              </div>
            </Button>
          </div>
        </div>
      </nav>

      <nav
        className="bottom-navbar"
        style={{ backgroundColor: "#000000", height: "4rem", padding: "1rem" }}
      >
        <div
          className="d-flex justify-content-center align-items-center p-2"
          style={{ gap: "20px" }}
        >
          <Button
            className="navTab"
            onClick={handleBuyProductClick}
            style={{ textDecoration: "none", color: "white", background: "none", border: "none" }}
          >
            Buy Product
          </Button>
          <Link
            className="navTab"
            to={"/contact"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </>
  );
}

export default AppNavbar;

const ApiRoutes = {
  LOGIN: {
    path: "/users/login",
    authenticate: false,
  },
  REGISTER: {
    path: "/users/register",
    authenticate: false,
  },
  GHOST_REGISTER: {
    path: "/users/registerGhost",
    authenticate: false,
  },
  LOGOUT: {
    path: "/users/logout",
    authenticate: true,
  },
  CONTACTUS: {
    path: "/users/contact ",
    authenticate: true,
  },
  CURRENTUSER: {
    path: "/users/currentuser",
    authenticate: true,
  },
  ALLUSERS: {
    path: "/users/allusers",
    authenticate: true,
  },
  USERPROFILEUPDATE: {
    path: "/users/profileupdate",
    authenticate: true,
  },
  ADDADDRESS: {
    path: "/users/addaddress",
    authenticate: true,
  },
  GETADDRESS: {
    path: "/users/getaddress",
    authenticate: true,
  },
  EDITADDRESS: {
    path: "/users/editaddress",
    authenticate: true,
  },
  DELETEADDRESS: {
    path: "/users/deleteaddress",
    authenticate: true,
  },
  GETALLPRODUCTS: {
    path: "/users/allproducts",
    authenticate: true,
  },
  ADDCARTLIST: {
    path: "/users/addcart",
    authenticate: true,
  },
  REMOVECARTLIST: {
    path: "/users/removecart",
    authenticate: true,
  },
  REMOVECARTITEMS: {
    path: "/users/clearcart",
    authenticate: true,
  },
  GETCARTITEMS: {
    path: "/users/cartitems",
    authenticate: true,
  },
  UPDATEQUANTITY: {
    path: "/users/updatequantity",
    authenticate: true,
  },
  PAYMENTCHECKOUT: {
    path: "/payment/order",
    authenticate: false,
  },
  GETALLORDERS: {
    path: "/orders/myorders",
    authenticate: false,
  },
  PRODUCTBYCATEGORY: {
    path: "/users/listcategory",
    authenticate: true,
  },
  UPDATEORDER: {
    path: "/orders/updateOrderId",
    authenticate: false,
  },
  //Razorpay
  ORDER: {
    path: "/payment/order",
    authenticate: true,
  },
  VALIDATEORDER: {
    path: "/payment/order/validate",
    authenticate: true,
  },
  // ADMIN
  ADMINLOGIN: {
    path: "admin/login",
    authenticate: true,
  },
  ADMINREGISTER: {
    path: "admin/register",
    authenticate: true,
  },
  ADMINLOGOUT: {
    path: "/admin/logout",
    authenticate: true,
  },
  ADMINALLUSERS: {
    path: "/admin/allusers",
    authenticate: true,
  },
  ADMINCURRENTUSER: {
    path: "/admin/currentuser",
    authenticate: true,
  },
  ADMINPROFILEUSER: {
    path: "/admin/getcurrentuser",
    authenticate: true,
  },
  ADMINUPDATEPROFILEUSER: {
    path: "/admin/updatecurrentuser",
    authenticate: true,
  },
  ADMINEDITUSER: {
    path: "/admin/edituser",
    authenticate: true,
  },
  ADMINDELETEUSER: {
    path: "/admin/deleteuser",
    authenticate: true,
  },
  ADMINADDPRODUCT: {
    path: "/admin/addproduct",
    authenticate: true,
  },
  ADMINGETPRODUCT: {
    path: "/admin/getallproducts",
    authenticate: true,
  },

  ADMINEDITPRODUCT: {
    path: "/admin/editproduct",
    authenticate: true,
  },
  ADMINDELETEPRODUCT: {
    path: "/admin/deleteproduct",
    authenticate: true,
  },
  SEARCH: {
    path: "/users/allproducts/search",
    authenticate: true,
  },
};

export default ApiRoutes;

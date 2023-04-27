import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import LogIn from "./pages/Login/Login";
import { useSelector } from "react-redux";


const SidebarLayout = () => (
  <div className="container">
    <Sidebar />
    <Outlet />
  </div>
);
const TopbarLayout = () => (
  <>
    <Topbar />
    <Outlet />
  </>
);

function App() {
  // const admin = useSelector((state) => state.user.currentUser.isAdmin); //original
  const admin = useSelector((state) => state.user.currentUser?state.user.currentUser.isAdmin: false);
  console.log(admin);
  return (
    <Router>
      {/* <Topbar /> */}
      {/* <div className="container"> */}
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/login" element={admin?<Navigate to="/" />:<LogIn />} />
          <Route element={<TopbarLayout />}>
          <Route element={<SidebarLayout />} >
            <Route exact path="/" element={admin?<Home /> :<Navigate to="/login" /> } />
            <Route path="/users" element={!admin? <Navigate to="/login" />:<UserList />} />
            <Route path="/user/:userId" element={!admin? <Navigate to="/login" />:<User />} />
            <Route path="/newUser" element={!admin? <Navigate to="/login" />:<NewUser />} />
            <Route path="/products" element={!admin? <Navigate to="/login" />:<ProductList />} />
            <Route path="/product/:productId" element={!admin? <Navigate to="/login" />:<Product />} />
            <Route path="/newproduct" element={!admin? <Navigate to="/login" />:<NewProduct />} />
          </Route>
          </Route>
        </Routes>

        {/* Does not test whether user is logged in (for testing) */}
        {/* <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route element={<TopbarLayout />}>
          <Route element={<SidebarLayout />} >
            <Route exact path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
          </Route>
          </Route>
        </Routes> */}
      {/* </div> */}
    </Router>
  );
}

export default App;

import "./App.css";
import { Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage"; 
import OrderSuccessPage from "./pages/MyOrders/OrderSuccessPage";
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactSale = lazy(() => import("./pages/ContactSale"));
const Footer = lazy(() => import("./components/Footer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Temp = lazy(() => import("./components/Temp"));
const Address = lazy(() => import("./components/Address"));
const SharePage = lazy(() => import("./pages/Share"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const Test = lazy(() => import("./pages/Test"));
const WishList = lazy(() => import("./pages/WishList"));
const HomeMyOrders = lazy(() => import("./pages/MyOrders/HomeMyOrders"));
const ProductPage = lazy(() => import("./pages/product/ProductPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Filter = lazy(() => import("./pages/searchPage/Filter"));
const Order = lazy(() => import("./pages/MyOrders/Order"));
const SizeChart = lazy(() => import("./pages/SizeChart"));
const AddressPage = lazy(() => import("./pages/addresspage/AddressPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ResetPassword = lazy(() => import("./pages/ResetPasswordPage"));

function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/sizechart" element={<SizeChart />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact-sales" element={<ContactSale />} />
        <Route path="/products" element={<Filter />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/my-orders" element={<HomeMyOrders />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/my-orders/:id" element={<Order />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/test" element={<Test isOpen={true} />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="/checkout/address" element={<Address />} />
        <Route path="/my-address" element={<AddressPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Fragment>
  );
}

export default App;

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { useUser } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerPortal from "./pages/CustomerPortal";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useUser();
  const location = useLocation();
  if (loading) return null;
  if (!isAuth)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

const RoleRoute = ({ children, requiredRole }) => {
  const { user, isAuth, loading } = useUser();
  const location = useLocation();
  if (loading) return null;
  if (!isAuth)
    return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-['Inter']">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:category" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <RoleRoute requiredRole="admin">
                      <AdminDashboard />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/customer"
                  element={
                    <RoleRoute requiredRole="customer">
                      <CustomerPortal />
                    </RoleRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

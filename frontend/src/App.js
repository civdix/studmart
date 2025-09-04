import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import About from "./components/AboutUs";
import SignUp from "./components/signup";
import ContactUs from "./components/ContactUs";
import ListItemPage from "./components/ListingPage";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import ProductSearch from "./components/ProductSearch";
import ProductDetails from "./components/ProductDetails";
import FutureWorks from "./components/futureworks";
import { AuthProvider } from "./context/context";
import LandingPageMain from "./components/LandingPageMain";
import PrivacyPolicy from "./components/Privacypolicy";

function App() {
  try {
    const router = createBrowserRouter([
      {
        element: (
          <>
            <Navbar />
            <Outlet />
          </>
        ),
        children: [
          {
            path: "/",
            element: !localStorage.getItem("token") ? (
              <HomePage />
            ) : (
              <LandingPageMain />
            ),
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/contact",
            element: <ContactUs />,
          },
          {
            path: "/sell",
            element: <ListItemPage />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/search",
            element: <ProductSearch />,
          },
          {
            path: "/product/:id",
            element: <ProductDetails />,
          },
          {
            path: "/futureWorks",
            element: <FutureWorks />,
          },
          {
            path: "/PrivacyPolicy",
            element: <PrivacyPolicy />,
          },
        ],
      },
    ]);

    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
  } catch (e) {
    console.error("Error in App Component:", e);
    return <div>An error occurred. Please try again later.</div>;
  }
}

export default App;

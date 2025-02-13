import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import LayOut from "./components/LayOut/LayOut";
import ProductList from "./components/Product/ProductList";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Categories from "./components/Categories/Categories";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { path: "", element: <ProductList /> },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        { path: "product-details/:id", element: <ProductDetails /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;

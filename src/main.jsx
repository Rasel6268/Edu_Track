import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routers } from "./routes/router.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/auth/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={routers}></RouterProvider>
     <Toaster></Toaster>
   </AuthProvider>
  </StrictMode>
);

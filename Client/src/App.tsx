import React, { Suspense } from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import StoreProvider from "./Storeprovider/store";
import Login from "./pages/LoginFlow"
import HomeLayout from "./UiComp/Layout/HomeLayout";
import LoginLayout from "./UiComp/Layout/LoginLayout";
import Dashboard from "./pages/TaskManagament"
import Root from "./UiComp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<>Error occured</>}>
      <Route element={<LoginLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/dashboard" element={<HomeLayout />}>
      <Route index element={<Dashboard />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </Suspense>
  );
}

export default App;

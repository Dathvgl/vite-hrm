import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "~/index.css";
import HomeLayout from "~/layouts/home/HomeLayout";
import ErrorPage from "~/routes/ErrorPage";
import LoginPage from "~/routes/LoginPage";
import HomePage from "~/routes/home/HomePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<LoginPage />} />
            <Route path="/home" element={<HomeLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);

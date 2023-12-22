import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import "~/index.css";
import Layout from "~/layouts/Layout";
import HomeLayout from "~/layouts/home/HomeLayout";
import { persistor, store } from "~/redux/store";
import ErrorPage from "~/routes/ErrorPage";
import LoginPage from "~/routes/LoginPage";
import CompanyPage from "~/routes/home/CompanyManagement/Company/CompanyPage";
import DepartmentPage from "~/routes/home/CompanyManagement/Department/DepartmentPage";
import PersonnelPage from "~/routes/home/CompanyManagement/Personnel/PersonnelPage";
import HomePage from "~/routes/home/HomePage";
import PersonnelManagementPage from "~/routes/home/PersonnelManagement/PersonnelManagementPage";
import PersonnelRolePage from "~/routes/home/PersonnelRolePage";
import SalaryPage from "~/routes/home/Salary/SalaryPage";
import VacationPage from "~/routes/home/Vacation/VacationPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<LoginPage />} />
                <Route path="/home" element={<HomeLayout />}>
                  <Route index element={<HomePage />} />
                  <Route
                    path="personnel-management"
                    element={<PersonnelManagementPage />}
                  />
                  <Route
                    path="personnel-role"
                    element={<PersonnelRolePage />}
                  />
                  <Route path="company-management">
                    <Route path="company" element={<CompanyPage />} />
                    <Route path="personnel" element={<PersonnelPage />} />
                    <Route path="department" element={<DepartmentPage />} />
                  </Route>
                  <Route path="salary-calculator" element={<SalaryPage />} />
                  <Route path="vacation" element={<VacationPage />} />
                </Route>
                <Route path="/*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

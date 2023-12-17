import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import "~/index.css";
import HomeLayout from "~/layouts/home/HomeLayout";
import { persistor, store } from "~/redux/store";
import ErrorPage from "~/routes/ErrorPage";
import LoginPage from "~/routes/LoginPage";
import CompanyPage from "~/routes/home/CompanyManagement/Company/CompanyPage";
import PersonnelPage from "~/routes/home/CompanyManagement/PersonnelPage";
import HomePage from "~/routes/home/HomePage";
import PersonnelManagementPage from "~/routes/home/PersonnelManagement/PersonnelManagementPage";
import SalaryCalculatorPage from "~/routes/home/SalaryCalculatorPage";
import VacationPage from "~/routes/home/VacationPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider>
          <BrowserRouter>
            <Routes>
              <Route>
                <Route index element={<LoginPage />} />
                <Route path="/home" element={<HomeLayout />}>
                  <Route index element={<HomePage />} />
                  <Route
                    path="personnel-management"
                    element={<PersonnelManagementPage />}
                  />
                  <Route path="company-management">
                    <Route path="company" element={<CompanyPage />} />
                    <Route path="personnel" element={<PersonnelPage />} />
                  </Route>
                  <Route
                    path="salary-calculator"
                    element={<SalaryCalculatorPage />}
                  />
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

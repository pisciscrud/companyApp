import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  DashboardPage,
  CompaniesPage,
  MainPage,
  DepartmentPage,
  EmployeesPage,
  DepartamentsPage,
  EmployeePage,
} from "./pages/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<LoginPage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="main/:id" element={<MainPage />}>
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="employees" element={<EmployeesPage />}></Route>
          <Route
            path="employees/info/:idEmployee"
            element={<EmployeePage />}
          ></Route>
          <Route path="departaments" element={<DepartamentsPage />}></Route>
          <Route
            path="departaments/info/:departmentId"
            element={<DepartmentPage />}
          ></Route>
        </Route>
        <Route path="/companies" element={<CompaniesPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

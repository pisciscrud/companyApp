import react, { useState, FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  LoginPage, DashboardPage, CompaniesPage, MainPage, DepartamentPage, EmployeePage} from  "./pages/index"

function App(): FC {
  return (
    // <trpc.Provider client={trpcClient} queryClient={queryClient}>
    // <QueryClientProvider client={queryClient}>
    // <LoginPage/>
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage/>}></Route>
        <Route path="main/:id" element={<MainPage/>}>
          <Route path='dashboard' element={<DashboardPage/>}></Route>
          <Route path='employees' element={<EmployeePage/>}></Route>
          <Route path='departaments' element={<DepartamentPage/>}></Route>
        </Route>
        <Route path="/companies" element={<CompaniesPage/>}></Route>
      </Routes>
    </Router>
    //   </QueryClientProvider>
    // </trpc.Provider>
  );
}

export default App;

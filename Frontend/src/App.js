import logo from './logo.svg'
import './App.css'
import Navbar from './components/navbar/page'
import Dashboard from './components/dashboard/page'
import { Routes, Route, Navigate } from 'react-router-dom'
import Khatian_search from './components/khatian-search/page'
import Payment from './components/payment/page'
import Login from './components/login/page'
import AvailableServices from './components/services/page'
import { Toaster } from "react-hot-toast"
import ApplicationStatus from './components/application-status/page'
import DownloadCertificate from './components/download/page'
import APITEST from './components/apiTest/page'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("activeUserEmail");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <Toaster></Toaster>
      <div className="">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard/services" replace />} />        
                  
                  <Route path="/dashboard" element={<Dashboard />}>          
                    <Route index element={<h3>Welcome to your Dashboard! Select an option.</h3>} />      
                    <Route path="khatian-search" element={<Khatian_search />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="services" element={<AvailableServices />} />
                    <Route path="applications" element={<ApplicationStatus />} />
                    <Route path="download" element={<DownloadCertificate />} />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route path='/apitest' element={<APITEST/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
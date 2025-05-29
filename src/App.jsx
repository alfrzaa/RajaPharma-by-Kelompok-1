import './App.css'
import PharmacyManagement from './page/test'
import Dashboard from './page/Dashboard-Admin'
import StockManagement from './page/StockManagement-Admin'
import laporan from './page/laporan'
import ReportsSection from './page/laporan'
import LandingPage from './page/LandingPage'
import LoginPage from './page/LoginPage'
import SalesPage from './page/Sales-Kasir'
import UserManagement from './page/UserManagement'
import Report from './page/Report'
// import Dashboard from './page/Dashboard-Kasir'
import DashboardKasir from './page/Dashboard-Kasir'
import ReportAdmin from './page/Report-Admin'

function App() {
  // return <Dashboard />
  // return <DashboardKasir/>
  // return <StockManagement />
  // return <SalesPage />
  // return <LandingPage />
  //  return <LoginPage />

  // return <div><PharmacyManagement /></div>
  // return <Report/>
  return <ReportAdmin/>
  
  // return <UserManagement/>
  
  // return <ReportsSection />
  
 
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<LandingPage />} />
  //       <Route path="/LoginPage" element={<LoginPage />} />
  //     </Routes>
  //   </Router>
  // );
}

export default App

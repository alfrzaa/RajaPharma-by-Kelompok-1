import './App.css'
import PharmacyManagement from './page/test'
import Dashboard from './page/Dashboard'
import StockManagement from './page/stok_obat'
import laporan from './page/laporan'
import ReportsSection from './page/laporan'
import LandingPage from './page/LandingPage'
import LoginPage from './page/LoginPage'
import SalesPage from './page/SalesPage'
import UserManagement from './page/UserManagement'
import Report from './page/Report'

function App() {
  // return <div><PharmacyManagement /></div>
  // return <Report/>
  // return <SalesPage />
  // return <UserManagement/>
  // return <div><Dashboard /></div>
  // return <StockManagement />
  // return <ReportsSection />
  // return <LandingPage />
  return <LoginPage />
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

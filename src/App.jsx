import './App.css'
import PharmacyManagement from './page/test'
import Dashboard from './page/dashboard'
import StockManagement from './page/stok_obat'
import laporan from './page/laporan'
import ReportsSection from './page/laporan'
import RajaPharmaApp from './page/LandingPage'
import LoginPage from './page/LoginPage'

function App() {
  // return <div><PharmacyManagement /></div>
  // return <div><Dashboard /></div>
  // return <StockManagement />
  // return <ReportsSection />
  return <RajaPharmaApp />
  // return <LoginPage />
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

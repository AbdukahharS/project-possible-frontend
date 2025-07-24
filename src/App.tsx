import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'
import { Toaster } from "@/components/ui/sonner"
import ProtectedLayout from '@/components/protected-layout'
// import { ConfirmModalProvider } from './components/Modals/ConfirmModalProvider'
// Pages
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import { ThemeProvider } from './components/theme-provider'
import Departments from './pages/departments'
// import Statistics from './pages/Statistics/Statistics'
// import Crops from './pages/Statistics/Crops'
// import Farmer from './pages/Statistics/Farmer'
// import Analysis from './pages/Analysis/Analysis'
// import RegionAnalysis from './pages/Analysis/Region'
// import Map from './pages/Map/Map'
// import FarmerMap from './pages/Map/Farmer'
// import Reports from './pages/Reports'
// import Yield from './pages/Yield'
// import Panel from './pages/Panel'
// Languages
// import uz from './assets/locales/uz.json'
// import uz_cyrillic from './assets/locales/uz-cyrillic.json'
// import ru from './assets/locales/ru.json'

// const defLanguage = localStorage.getItem('lang')

// i18n.use(initReactI18next).init({
//   resources: {
//     uz: {
//       translation: uz,
//     },
//     ru: {
//       translation: ru,
//     },
//     'uz-cyrillic': {
//       translation: uz_cyrillic
//     }
//   },
//   lng: defLanguage || 'uz',
//   fallbackLng: 'uz',

//   interpolation: {
//     escapeValue: false,
//   },
// })

function App() {
  return (
    <ThemeProvider>
    {/* // <ConfirmModalProvider> */}
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/departments' element={<Departments />} />
            {/* <Route path='/statistics' element={<Statistics />} />
            <Route path='/statistics/crops' element={<Crops />} />
            <Route path='/statistics/crops/farmer' element={<Farmer />} />
            <Route path='/analysis' element={<Analysis />} />
            <Route path='/analysis/region' element={<RegionAnalysis />} />
            <Route path='/map' element={<Map />} />
            <Route path='/map/farmer' element={<FarmerMap />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/yield' element={<Yield />} />
            <Route path='/panel' element={<Panel />} /> */}
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
        <Toaster position='top-right' richColors />
      </BrowserRouter>
    {/* // </ConfirmModalProvider> */}
    </ThemeProvider>
  )
}

export default App

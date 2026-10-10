import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import ClaimForm from './Pages/Claim/Claim';
import Home from './Pages/Home/Home';
import NotFound from './Pages/Not Found/Not Found';
import SockTracker from './Pages/Tracker/SockTracker';
import Upgrade from './Pages/Upgrade/Upgrade';

// Replace these with your real page components

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/claim" element={<ClaimForm />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/tracker" element={<SockTracker />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
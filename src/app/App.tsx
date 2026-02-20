import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      {/* Providers globaux ici (Theme, Auth, etc.) */}
      <AppRoutes />
    </BrowserRouter>
  );
}

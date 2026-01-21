import { AuthProvider } from './store/authStore.jsx';
import AppRoutes from './app/routes/AppRoutes';

/**
 * Main App Component
 * Renders the application routes with AuthProvider
 */
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

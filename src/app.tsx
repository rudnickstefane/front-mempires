import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './modules/routes';

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
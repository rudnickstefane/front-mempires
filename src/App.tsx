import { SnackbarProvider } from 'notistack';
import AppRoutes from './routes';
import GlobalStyle from './styles/globalStyle.d';

function App() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
            <GlobalStyle />
            <AppRoutes />
        </SnackbarProvider>
    );
}

export default App;
import { SnackbarProvider } from 'notistack';
import AppRoutes from './routes';
import GlobalStyle from './styles/globalStyle.d';

function App() {
    // const { darkMode, toggleDarkMode } = useThemeDarkMode();
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
            <GlobalStyle />
            {/* <div style={{ position: "absolute", top: 10, right: 10 }}>
            <button className="button" onClick={toggleDarkMode}>
      {darkMode ? <Box>Claro</Box> : <Box>Escuro</Box>}
    </button>
            </div> */}
            <AppRoutes />
        </SnackbarProvider>
    );
}

export default App;
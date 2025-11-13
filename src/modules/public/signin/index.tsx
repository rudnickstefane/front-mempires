/* eslint-disable @typescript-eslint/no-explicit-any */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, CircularProgress, Divider, Fade, FormControl, IconButton, InputAdornment, Link, Modal, TextField, Typography } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from 'notistack';
import { IoIosCloseCircleOutline } from 'react-icons/io';
// import signIn from '../../assets/images/bgSignIn.png';
import { useSignInForm } from '@sr/modules/common/hooks';
import { Logo } from '@sr/modules/common/ui/Logo';
import Announcement from '@sr/modules/components/sliders/announcement';

// Configuração do Client ID do Google (substitua pelo seu)
const GOOGLE_CLIENT_ID = '341278886012-g324u6msgnao0aqqriu6vhlcpnorcats.apps.googleusercontent.com'; // Obtenha no Google Developer Console

const slides: { id: number; imageUrl: string; link: string; }[] = [
    // { id: 1, imageUrl: "", link: "#" },
    // { id: 2, imageUrl: "", link: "#" },
    // { id: 3, imageUrl: "", link: "#" },
  ];

export default function SignIn({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    isLoading,
    formData,
    errors,
    showPassword,
    handleTextFieldChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleAccess,
    handleKeyPress,
  } = useSignInForm({ enqueueSnackbar });

  const handleGoogleSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    if (token) { 
      const decoded: any = jwtDecode(token);
      console.log('Usuário logado com Google:', decoded);
      // Envie o token para sua API para autenticação no backend
      // Exemplo: await authApi.loginWithGoogle(token);
      onClose(); // Fecha o modal após login
    }
  };
  
    // Função para lidar com erro no login com Google
  const handleGoogleError = () => {
    console.error('Erro ao fazer login com Google');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Modal
        aria-labelledby="authentication-modal-title"
        aria-describedby="authentication-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        className='flex items-center justify-center'
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="max-w-[810px] flex flex-row">
            <Box className='w-[380px] h-[552.61px] flex items-center justify-center bg-primary rounded-l-xl'>
              <Announcement slides={slides} className="rounded-l-xl"/>
            </Box>
            <Box className='bg-primary rounded-r-xl w-[455px] flex flex-col items-end p-2'>
              <Button
                onClick={onClose}
                className='!absolute flex flex-row items-center font-poppins !min-w-0 !rounded-full !min-h-0 button-close !p-2 !mt-3 !mr-3'
              >
                <IoIosCloseCircleOutline className='text-[1.5rem]' />
              </Button>
              <Box className='flex flex-col items-center justify-center w-full h-full'>
                <Box className='flex flex-col justify-center items-center w-full p-5'>
                  <Box className='flex items-center justify-center flex-col'>
                    <Box className="flex flex-row items-center mb-5 cursor-default">
                      <Logo />
                    </Box>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                      type='standard'
                      theme="outline"
                      text="signin_with"
                      shape="circle"
                      width="100%"
                    />
                  </Box>
                  <Divider className='!my-5 w-full'>ou</Divider>
                  <FormControl fullWidth>
                    <TextField
                      required
                      label="CPF, CNPJ, E-mail ou Usuário"
                      placeholder="Digite seu CPF, CNPJ, e-mail ou usuário"
                      variant="outlined"
                      margin="normal"
                      name='login'
                      className='!m-0'
                      value={formData.login}
                      onChange={handleTextFieldChange}
                      error={!!errors.loginError}
                      helperText={errors.loginError}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      required
                      onChange={handleTextFieldChange}
                      onKeyDown={handleKeyPress}
                      error={!!errors.passwordError}
                      name="password"
                      value={formData.password}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      label="Senha"
                      placeholder="Digite sua senha"
                      className='!mt-5'
                      helperText={errors.passwordError}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              style={{ marginRight: '0' }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <Box className='flex flex-row items-center justify-end w-full my-4'>
                    <Link href="/recovery" className="color-primary !no-underline hover:!underline  !transition-all !text-sm">Esqueci minha senha</Link>
                  </Box>
                  <Button
                    type="submit"
                    disabled={isLoading || (!formData.login || !formData.password)}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAccess}
                    className={`h-12 ${
                        isLoading || (!formData.login || !formData.password) ? '' : 'button-primary'
                    }`}
                    >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                  </Button>
                </Box>
                <Typography className='!mt-2 !text-sm'>Não tem uma conta? <Link href="/cadastro" className="color-primary !no-underline hover:!underline decoration-transparent !transition-all hover:decoration-current">Crie agora mesmo</Link></Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </GoogleOAuthProvider>
  );
}
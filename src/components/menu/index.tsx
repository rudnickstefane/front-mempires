import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import React, { useEffect, useState } from 'react';
import '../../input.css';
import logo from '../../modules/assets/images/icon.png';
import { Button, Container, Link, MenuCustom } from '../Header/styles.d';

export function HeaderMenu() {
    const [scrolled, setScrolled] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Container className='relative z-10'>
            <MenuCustom scrolled={scrolled}>
                <a href='/'>
                    <Box className='flex w-32 items-center'>
                        <img src={logo} alt="Logo" className='w-[3.7rem]' />
                        <Box className='ml-3 text-[2rem] text-white font-intro mt-[.35rem]'>iFlex</Box>
                    </Box>
                </a>
                <nav>
                    <Button href="/" className='after-arrowMenu'>Início</Button>
                    <Button
                        aria-controls={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        disableElevation
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Planos e Preços
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        disableScrollLock
                    >
                        <MenuItem onClick={handleClose} component={Link} to="/planos/academia">Academia</MenuItem>
                        {/* <MenuItem onClick={handleClose} component={Link} to="/planos/fornecedor">Fornecedor</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/planos/nutricionista">Nutricionista</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/planos/personal">Personal Trainer</MenuItem> */}
                    </Menu>
                    {/* <Button href="/ajuda">Ajuda</Button> */}
                    <Button href="/entrar">Entrar</Button>
                    <a href="/cadastro" className='bg-secondary text-[white] p-3 rounded-lg ml-10'>Testar Grátis</a>
                </nav>
            </MenuCustom>
        </Container>
    );
}

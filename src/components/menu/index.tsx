import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/machine.png';
import '../../input.css';
import { Button, Container, Img, Link, MenuCustom } from '../Header/styles.d';

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
                <Link to="/"><div className='flex w-32 justify-between items-center'><Img src={logo} alt="Logo" /><h1 className='text-[40px] text-[#fff]'>iFlex</h1></div></Link>
                <nav>
                    <Button href="/" className='after-arrowMenu'>Inicio</Button>
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
                        <MenuItem onClick={handleClose} component={Link} to="/planos/fornecedor">Fornecedor</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/planos/nutricionista">Nutricionista</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/planos/personal">Personal Trainer</MenuItem>
                    </Menu>
                    <Button href="/ajuda">Ajuda</Button>
                    <Button href="/entrar">Entrar</Button>
                    <a href="/cadastro" className='bg-primary text-[white] p-3 rounded-lg ml-10'>Testar Grátis</a>
                </nav>
            </MenuCustom>
        </Container>
    );
}

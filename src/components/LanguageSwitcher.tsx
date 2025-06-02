import { useRouter } from 'next/router';
import { useState } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language'; // Ícone de globo

export function LanguageSwitcher() {
    const router = useRouter();
    const { locale } = router;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lang: string) => {
        router.push(router.pathname, router.asPath, { locale: lang });
        handleClose();
    };

    return (
        <Box>
            <IconButton onClick={handleClick} color="primary">
                <LanguageIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => changeLanguage('pt')}>
                    <Typography variant="body1">Português</Typography>
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('en')}>
                    <Typography variant="body1">English</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
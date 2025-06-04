// src/components/Sidebar.tsx
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const drawerWidth = 240;

export default function Sidebar() {
    const { t } = useTranslation('common');

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar /> {/* Apenas para alinhar com o AppBar */}
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary={t("menu.begin")} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/states">
                        <ListItemIcon><LocationCityIcon /></ListItemIcon>
                        <ListItemText primary={t("menu.state")} />
                    </ListItemButton>
                </ListItem>
                {/* Adicione outros menus aqui */}
            </List>
        </Drawer>
    );
};
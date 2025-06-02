// src/components/Sidebar.tsx
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Link from 'next/link';

const drawerWidth = 240;

export default function Sidebar() {
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
                    <Link href="/" passHref legacyBehavior>
                        <ListItemButton component="a">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Início" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link href="/states" passHref legacyBehavior>
                        <ListItemButton component="a">
                            <ListItemIcon><LocationCityIcon /></ListItemIcon>
                            <ListItemText primary="Estados" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Adicione outros menus aqui */}
            </List>
        </Drawer>
    );
}

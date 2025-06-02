import { ReactNode } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import Sidebar from "@/components/Sidebar";

const drawerWidth = 240;

export default function MainLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar fixo no topo */}
            <AppBar
                position="fixed"
                sx={{
                    width: '100%',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: 'white',
                    color: 'black',
                    boxShadow: 1,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Painel Administrativo
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar na lateral esquerda */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        mt: 8, // espaço para o AppBar
                    },
                }}
            >
                <Toolbar />
                <Sidebar />
            </Drawer>

            {/* Conteúdo principal à direita do sidebar */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8, // altura do AppBar
                    ml: `${drawerWidth}px`,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

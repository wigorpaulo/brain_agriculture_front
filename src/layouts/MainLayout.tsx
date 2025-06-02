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
import Topbar from "@/components/Topbar";

const drawerWidth = 240;

export default function MainLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/*AppBar fixo no topo*/}
            <Topbar />

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

            {children}
        </Box>
    );
}

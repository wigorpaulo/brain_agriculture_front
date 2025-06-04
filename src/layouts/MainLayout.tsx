import { ReactNode } from 'react';
import {
    Toolbar,
    Box,
    CssBaseline,
    Drawer,
    Container,
} from '@mui/material';
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const drawerWidth = 240;

export default function MainLayout({ children }: { children: ReactNode }) {

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
            <Container maxWidth="lg" sx={{mt: 8}}>
                {children}
            </Container>

        </Box>
    );
};

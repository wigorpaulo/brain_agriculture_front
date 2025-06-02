// src/layouts/MainLayout.tsx
import { Box, Toolbar } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar /> {/* Garante espaço abaixo do AppBar */}
                {children}
            </Box>
        </Box>
    );
}

// pages/estados.tsx
import { useState } from 'react'
import { Container, Box, Typography, Paper, Button, Stack } from '@mui/material';
import StateFilterForm from "@/components/states/Search";
import StateListTable from "@/components/states/ListTable";
import { useRouter } from 'next/router';

export default function StatesPage() {
    const router = useRouter();
    const [filters, setFilters] = useState({ description: '', active: true });

    const handleSearch = async (values: typeof filters) => {
        setFilters(values);
        // buscar estados no backend com os filtros
    };

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" gutterBottom>Estado</Typography>

                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>Filtro de Estado</Typography>
                    <StateFilterForm onSearch={handleSearch} />
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Listagem de Estado</Typography>
                    <StateListTable filters={filters} />
                </Paper>
            </Box>
        </Container>
    )
}

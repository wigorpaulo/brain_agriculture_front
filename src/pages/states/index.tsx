// pages/estados.tsx
import {useState} from 'react'
import {Box, Typography, Paper} from '@mui/material';
import StateFilterForm from "@/components/states/Search";
import StateListTable from "@/components/states/ListTable";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type {GetServerSideProps} from "next";

export default function StatesPage() {
    const [filters, setFilters] = useState({description: '', active: true});
    const { t } = useTranslation('common');

    const handleSearch = async (values: typeof filters) => {
        setFilters(values);
        // buscar estados no backend com os filtros
    };

    return (
        <Box my={4}>
            <Typography variant="h4" gutterBottom>Estado</Typography>

            <Paper sx={{p: 3, mb: 4}}>
                <Typography variant="h6" gutterBottom>
                    { t("filter") }
                </Typography>
                <StateFilterForm onSearch={handleSearch}/>
            </Paper>

            <Paper sx={{p: 3}}>
                <Typography variant="h6" gutterBottom>
                    { t("list") }
                </Typography>
                <StateListTable filters={filters}/>
            </Paper>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});
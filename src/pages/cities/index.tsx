// pages/cities.tsx
import {useState} from 'react'
import {Box, Typography, Paper} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type {GetServerSideProps} from "next";
import CityListTable from "@/components/cities/ListTable";
import CityFilterForm from "@/components/cities/Search";

export default function CitiesPage() {
    const [filters, setFilters] = useState({description: '', active: true});
    const { t } = useTranslation('common');

    const handleSearch = async (values: typeof filters) => {
        setFilters(values);
        // buscar estados no backend com os filtros
    };

    return (
        <Box my={4}>
            <Typography variant="h4" gutterBottom>
                {t("city")}
            </Typography>

            <Paper sx={{p: 3, mb: 4}}>
                <Typography variant="h6" gutterBottom>
                    { t("filter") }
                </Typography>
                <CityFilterForm onSearch={handleSearch}/>
            </Paper>

            <Paper sx={{p: 3}}>
                <Typography variant="h6" gutterBottom>
                    { t("list") }
                </Typography>
                <CityListTable filters={filters}/>
            </Paper>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});
import { useState } from 'react';
import {Box, Typography} from '@mui/material';
import CityForm from '@/components/cities/Form';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/auth-context';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type {GetServerSideProps} from "next";
import {State} from "@/types/state";
import cityService from "@/services/city.services";

export default function NewCityPage() {
    const { token, baseUrl } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { t } = useTranslation('common');

    const handleCreate = async (data: State) => {
        try {
            const response = await cityService.create(baseUrl, String(token), data); // Exemplo: POST /states

            if (response.statusCode === 201) {
                setSuccess(t("city.create.success"));
                setError('');
                router.push('/cities')
            } else {
                setError(response?.message || t("city.create.error"));
                setSuccess('');
            }
        } catch (err: any) {
            setError(err?.message || t("city.create.error"));
            setSuccess('');
        }
    };

    return (
        <Box my={4}>
            <Typography variant="h4" gutterBottom>
                {t('city.create')}
            </Typography>
            <CityForm onSubmit={handleCreate} error={error} success={success} />
        </Box>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});
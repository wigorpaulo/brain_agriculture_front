import { useState } from 'react';
import {Box, Typography} from '@mui/material';
import StateForm from '@/components/states/Form';
import { useRouter } from 'next/router';
import stateService from '@/services/state.services';
import { useAuth } from '@/contexts/auth-context';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type {GetServerSideProps} from "next";
import {State} from "@/types/state";

export default function NewStatePage() {
    const { token, baseUrl } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { t } = useTranslation('common');

    const handleCreate = async (data: State) => {
        try {
            const response = await stateService.create(baseUrl, String(token), data); // Exemplo: POST /states

            if (response.statusCode === 201) {
                setSuccess(t("state.create.success"));
                setError('');
                router.push('/states')
            } else {
                setError(response?.message || t("state.create.error"));
                setSuccess('');
            }
        } catch (err: any) {
            setError(err?.message || t("state.create.error"));
            setSuccess('');
        }
    };

    return (
        <Box my={4}>
            <Typography variant="h4" gutterBottom>
                {t('state.create')}
            </Typography>
            <StateForm onSubmit={handleCreate} error={error} success={success} />
        </Box>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});
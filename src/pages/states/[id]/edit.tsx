// pages/states/[id]/edit.tsx
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Box, Container, Typography} from '@mui/material';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';

import StateForm from '@/components/states/Form';
import stateService from '@/services/state.services';
import {State} from '@/types/state';
import {useAuth} from '@/contexts/auth-context';

export default function EditStatePage() {
    const {t} = useTranslation('common');
    const { token, baseUrl } = useAuth();
    const router = useRouter();
    const {id} = router.query;

    const [state, setState] = useState<State | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchState = async () => {
            try {
                if (!id || typeof id !== 'string') return;
                const data = await stateService.getById(baseUrl, token, id,);
                setState(data);
            } catch (err: any) {
                setError(t('error_fetching_state') || 'Erro ao buscar estado.');
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchState();
    }, [id, token, t]);

    const handleUpdate = async (updatedData: { uf: string; name: string }) => {
        try {
            if (!id || typeof id !== 'string') return;
            await stateService.update(baseUrl, token, updatedData, id);
            setSuccess(t('state_updated_successfully') || 'Estado atualizado com sucesso!');
            setError('');
            setTimeout(() => router.push('/states'), 1500);
        } catch (err: any) {
            setError(err?.message || t('error_updating_state') || 'Erro ao atualizar estado.');
        }
    };

    return (
        <Box my={4}>
            <Typography variant="h4" gutterBottom>
                {t('state.edit')}
            </Typography>
            {state && (
                <StateForm
                    initialData={state}
                    onSubmit={handleUpdate}
                    error={error}
                    success={success}
                />
            )}
        </Box>
    );
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});

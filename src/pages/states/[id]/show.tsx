// pages/states/[id]/show.tsx
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import {useAuth} from '@/contexts/auth-context';
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import stateService from "@/services/state.services";
import {State} from "@/types/state";
import StateShow from "@/components/states/Show";

export default function ShowStatePage() {
    const { t } = useTranslation('common');
    const { token, baseUrl } = useAuth();
    const router = useRouter();
    const { id } = router.query;
    const [state, setState] = useState<State | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchState = async () => {
        try {
            if (!id || typeof id !== 'string') return;
            const data = await stateService.getById(baseUrl, token, id,);

            if (data.statusCode === 200) {
                setState(data.state);
            } else {
                setError(t('state.find.error'));
            }
        } catch (err: any) {
            setError(t('state.find.error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchState();
    }, [id, token, t]);

    if (!token || loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Box my={4}>
            <Typography variant="h4" gutterBottom>
                {t('state.show')}
            </Typography>

            {state && (
                <StateShow initialData={state} />
            )}

        </Box>
    )
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});

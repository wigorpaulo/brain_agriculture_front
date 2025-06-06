// pages/states/[id]/edit.tsx
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import cityService from '@/services/city.services';
import {State} from '@/types/state';
import {useAuth} from '@/contexts/auth-context';
import CityForm from "@/components/cities/Form";
import {City} from "@/types/city";

export default function EditCityPage() {
    const { t } = useTranslation('common');
    const { token, baseUrl } = useAuth();
    const router = useRouter();
    const { id } = router.query;

    const [city, setCity] = useState<State | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCity = async () => {
            try {
                if (!id || typeof id !== 'string') return;
                const data = await cityService.getById(baseUrl, token, id,);

                if (data.statusCode === 200) {
                    setCity(data.city);
                } else {
                    setError(t('city.find.error'));
                }
            } catch (err: any) {
                setError(t('city.find.error'));
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchCity();
    }, [id, token, t]);

    const handleUpdate = async (updatedData: City) => {
        try {
            if (!id || typeof id !== 'string') return;
            await cityService.update(baseUrl, token, updatedData, id);
            setSuccess(t('city.update.success'));
            setError('');
            setTimeout(() => router.push('/cities'), 1500);
        } catch (err: any) {
            setError(err?.message || t('city.update.error'));
        }
    };

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
                {t('city.edit')}
            </Typography>
            {city && (
                <CityForm
                    initialData={city}
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

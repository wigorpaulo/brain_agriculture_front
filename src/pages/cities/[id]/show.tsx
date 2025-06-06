// pages/cities/[id]/show.tsx
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import {useAuth} from '@/contexts/auth-context';
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import cityService from "@/services/city.services";
import CityShow from "@/components/cities/Show";
import {City} from "@/types/city";

export default function ShowCityPage() {
    const { t } = useTranslation('common');
    const { token, baseUrl } = useAuth();
    const router = useRouter();
    const { id } = router.query;
    const [city, setCity] = useState<City | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchCity();
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

            {city && (
                <CityShow initialData={city} />
            )}

        </Box>
    )
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});

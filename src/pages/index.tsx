// pages/index.tsx
import { Container, Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

export default function HomePage() {
    const { t } = useTranslation('common');

    return (
        <Container maxWidth="md" sx={{mt: 8}}>
            <Box mt={10} textAlign="center">
                <Typography variant="h3" gutterBottom>
                    {t('welcome')}
                </Typography>
            </Box>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});
// pages/login.tsx
import { useState, useEffect } from 'react'
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    Link as MuiLink
} from '@mui/material'
import { AuthService } from "@/services/auth.service";
import { useAuth } from '@/contexts/auth-context'
import { router } from "next/client";
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type {GetServerSideProps} from "next";
import LoginIcon from '@mui/icons-material/Login';

export default function LoginPage() {
    const { login, baseUrl, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation('common');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = await AuthService.login(baseUrl, { email, password })

            if (data.statusCode === 401) {
                setError(data.message)
            } else {
                login(data.access_token, data.user)

                // Redirecionar
                router.push('/states')
            }
        } catch (error: any) {
            console.error('Erro:', error.message)
            setError(error.message)
            // Exibir toast ou mensagem de erro
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/states') // ou qualquer outra rota
        }
    }, [isAuthenticated, router])

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 10 }}>
                <Typography variant="h5" gutterBottom>
                    { t("login") }
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <TextField
                        label={ t("email") }
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label={ t("password") }
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {/* Link para criar novo usuário */}
                    <Box mt={2} mb={1} textAlign="center">
                        <MuiLink component={Link} href="/users/new" underline="hover">
                            { t("user.create") }
                        </MuiLink>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        startIcon={<LoginIcon />}
                    >
                        { t("enter") }
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
});
// pages/login.tsx
import { useState } from 'react'
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
import Cookies from 'js-cookie';

export default function LoginPage() {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Login com:', { email, password })
        // Aqui você pode chamar sua API de autenticação

        try {
            const data = await AuthService.login({ email, password })
            console.log('Usuário autenticado:', data)

            if (data.statusCode === 401) {
                console.log('Wigor entrou aqui data >> ', data)
                setError(data.message)
            } else {
                login(data.access_token, data.user)

                Cookies.set('token', data.access_token, {
                    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
                    secure: true, // apenas HTTPS
                    sameSite: 'Strict',
                });

                // Redirecionar
                router.push('/states')
            }
        } catch (error: any) {
            console.error('Erro:', error.message)
            // Exibir toast ou mensagem de erro
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 10 }}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Senha"
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
                            Criar novo usuário
                        </MuiLink>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Entrar
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

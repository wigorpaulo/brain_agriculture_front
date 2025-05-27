// pages/login.tsx
import { useState } from 'react'
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import { AuthService } from "@/services/auth.service";
import { useAuth } from '@/contexts/auth-context'
import {router} from "next/client";

export default function LoginPage() {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Login com:', { email, password })
        // Aqui você pode chamar sua API de autenticação

        try {
            const data = await AuthService.login({ email, password })
            console.log('Usuário autenticado:', data)

            login(data.access_token, data.user)
            localStorage.setItem('token', data.access_token)

            // Redirecionar
            router.push('/states')
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

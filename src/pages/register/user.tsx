import { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
    Stack
} from '@mui/material';
import Link from 'next/link';
import {UserServices} from "@/services/user.services";

export default function UserPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const data = await UserServices.create({ name: name, email: email, password: senha })

            if (data.statusCode === 401) {
                setError(data.message)
            } else {
                setSuccess('Usuário criado com sucesso!');
                setName('');
                setEmail('');
                setSenha('');
            }
        } catch (error: any) {
            console.error('Erro:', error.message)
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={8}>
                <Typography variant="h5" gutterBottom>
                    Criar Usuário
                </Typography>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <TextField
                        label="Nome"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <Stack spacing={2} mt={3}>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Criar Usuário
                        </Button>

                        <Button
                            component={Link}
                            href="/login"
                            variant="outlined"
                            color="secondary"
                        >
                            Voltar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
}
import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import StateForm from '@/components/states/Form';
import { useRouter } from 'next/router';
import stateService from '@/services/state.services';
import { useAuth } from '@/contexts/auth-context';

export default function NewStatePage() {
    const { token } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCreate = async (data: { uf: string; name: string }) => {
        try {
            await stateService.create(String(token), data); // Exemplo: POST /states
            setSuccess('Estado criado com sucesso!');
            setError('');
            setTimeout(() => router.push('/states'), 1500);
        } catch (err: any) {
            setError(err?.message || 'Erro ao criar estado.');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Criar Estado</Typography>
            <StateForm onSubmit={handleCreate} error={error} success={success} />
        </Container>
    );
}

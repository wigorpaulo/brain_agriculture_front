import { useState, useEffect } from 'react';
import { TextField, Button, Stack, Box, Alert } from '@mui/material';
import {State} from "@/types/state";

interface Props {
    initialData?: Partial<State>;
    onSubmit: (data: { uf: string; name: string }) => Promise<void>;
    isSubmitting?: boolean;
    error?: string;
    success?: string;
}

export default function StateForm({
                                      initialData = {},
                                      onSubmit,
                                      isSubmitting = false,
                                      error,
                                      success,
                                  }: Props) {
    const [uf, setUf] = useState(initialData.uf || '');
    const [name, setName] = useState(initialData.name || '');

    useEffect(() => {
        if (initialData.uf) setUf(initialData.uf);
        if (initialData.name) setName(initialData.name);
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ uf, name });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <TextField
                    label="UF"
                    value={uf}
                    onChange={(e) => setUf(e.target.value.toUpperCase())}
                    inputProps={{ maxLength: 2 }}
                    required
                />

                <TextField
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
            </Stack>
        </Box>
    );
}

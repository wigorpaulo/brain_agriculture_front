import { useState, useEffect } from 'react';
import { TextField, Button, Stack, Box, Alert } from '@mui/material';
import {State} from "@/types/state";
import {useTranslation} from 'next-i18next';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from '@mui/icons-material/Save';

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
    const {t} = useTranslation('common');

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
                    label={ t("state.uf") }
                    value={uf}
                    onChange={(e) => setUf(e.target.value.toUpperCase())}
                    inputProps={{ maxLength: 2 }}
                    required
                />

                <TextField
                    label={ t("state.name") }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <Button type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        startIcon={<SaveIcon />}>
                    {isSubmitting ? t("salvage") : t("save")}
                </Button>
                <Button type="button"
                        href="/states"
                        variant="contained"
                        color="secondary"
                        startIcon={<ArrowBackIcon />}
                        disabled={isSubmitting}>
                    { t("back") }
                </Button>
            </Stack>
        </Box>
    );
}

import { useState, useEffect } from 'react';
import {TextField, Button, Stack, Box, Alert, MenuItem} from '@mui/material';
import {useTranslation} from 'next-i18next';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from '@mui/icons-material/Save';
import {City} from "@/types/city";
import { useAuth } from "@/contexts/auth-context";
import {GetAllStatesResponse, State} from "@/types/state";
import stateService from "@/services/state.services";

interface Props {
    initialData?: Partial<City>;
    onSubmit: (data: City) => Promise<void>;
    isSubmitting?: boolean;
    error?: string;
    success?: string;
}

interface SelectProps {
    selectedId: string;
    setSelectedId: (id: string) => void;
    label?: string;
}

export default function CityForm({
                                      initialData = {},
                                      onSubmit,
                                      isSubmitting = false,
                                      error,
                                      success,
                                  }: Props) {
    const [stateId, setStateId] = useState(initialData.state?.id || '');
    const [name, setName] = useState(initialData.name || '');
    const {t} = useTranslation('common');

    useEffect(() => {
        if (initialData.state?.id) setStateId(initialData.state.id);
        if (initialData.name) setName(initialData.name);
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const city: City = { name: name, state_id: Number(stateId)};

        await onSubmit(city);
    };

    const SelectState = ({
                             selectedId,
                             setSelectedId
                         }: SelectProps) => {

        const { token, baseUrl } = useAuth();
        const [states, setStates] = useState<State[]>([]);
        const [loading, setLoading] = useState(true);

        console.log('WIGOR selectedId >> ', selectedId);

        const fetchEstados = async () => {
            try {
                const data: GetAllStatesResponse = await stateService.getAll(baseUrl, String(token));
                const states = data.states.map((state: State) => ({
                    id: state.id,
                    uf: state.uf,
                    name: state.name,
                    created_at: state.created_at,
                    updated_at: state.updated_at,
                }));
                setStates(states);
            } catch (error) {
                console.error('Erro ao buscar estados:', error);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            if (token) {
                fetchEstados();
            }
        }, [token]);

        return (
            <TextField
                select
                fullWidth
                label={t('city.state')}
                value={stateId}
                onChange={(e) => setSelectedId(e.target.value)}
                required
            >
                {states.map((state) => (
                    <MenuItem key={state.id} value={String(state.id)}>
                        {state.name} - {state.uf}
                    </MenuItem>
                ))}
            </TextField>
        );
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <TextField
                    label={ t("city.name") }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <SelectState
                    selectedId={stateId}
                    setSelectedId={setStateId}
                />

                <Button type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        startIcon={<SaveIcon />}>
                    {isSubmitting ? t("salvage") : t("save")}
                </Button>
                <Button type="button"
                        href="/cities"
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

import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {useTranslation} from 'next-i18next';
import {State} from "@/types/state";
import {useState} from "react";
import {formatDateTime} from "@/helper/Util";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    initialData?: Partial<State>;
}

export default function StateShow({initialData = {},}: Props) {
    const {t} = useTranslation('common');
    const [state] = useState<Partial<State>>(initialData)

    return (
        <Box sx={{mt: 4}}>
            <Stack spacing={2}>
                <Grid container spacing={12}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" fontWeight="bold" fontSize="1.2rem">{t("state.id")}</Typography>
                        <Typography>{state.id}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" fontWeight="bold" fontSize="1.2rem">{t("state.name")}</Typography>
                        <Typography>{state.name}</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <Typography variant="subtitle2" fontWeight="bold" fontSize="1.2rem">{t("state.created_at")}</Typography>
                    <Typography>{formatDateTime(String(state.created_at))}</Typography>
                </Grid>

                <Button
                    type="button"
                    href={`/states/${state.id}/edit`}
                    variant="contained"
                    color="warning"
                    startIcon={<EditIcon />}
                >
                    {t("edit")}
                </Button>

                <Button
                    type="button"
                    href="/states"
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBackIcon />}
                >
                    {t("back")}
                </Button>
            </Stack>
        </Box>
    )
};
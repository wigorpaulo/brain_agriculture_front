import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {useTranslation} from 'next-i18next';
import {State} from "@/types/state";
import {useState} from "react";
import {formatDateTime} from "@/helper/Util";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {City} from "@/types/city";

interface Props {
    initialData?: Partial<State>;
}

export default function CityShow({initialData = {},}: Props) {
    const {t} = useTranslation('common');
    const [city] = useState<Partial<City>>(initialData)

    return (
        <Box sx={{mt: 4}}>
            <Stack spacing={2}>
                <Grid container spacing={12}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" fontWeight="bold" fontSize="1.2rem">{t("city.id")}</Typography>
                        <Typography>{city.id}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" fontWeight="bold" fontSize="1.2rem">{t("city.name")}</Typography>
                        <Typography>{city.name}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={12}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" fontWeight="bold" fontSize="1.2rem">{t("city.state")}</Typography>
                        <Typography>{city.state?.name}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" fontWeight="bold" fontSize="1.2rem">{t("state.created_at")}</Typography>
                        <Typography>{formatDateTime(String(city.created_at))}</Typography>
                    </Grid>
                </Grid>

                <Button
                    type="button"
                    href={`/cities/${city.id}/edit`}
                    variant="contained"
                    color="warning"
                    startIcon={<EditIcon />}
                >
                    {t("edit")}
                </Button>

                <Button
                    type="button"
                    href="/cities"
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
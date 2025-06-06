import {useState} from 'react';
import {TextField, Stack, Button} from '@mui/material';
import {useTranslation} from 'next-i18next';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

interface Props {
    onSearch: (filters: { name: string; }) => void;
}

export default function CityFilterForm({onSearch}: Props) {
    const [name, setName] = useState('');
    const {t} = useTranslation('common');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSearch({name});
            }}
        >
            <Stack spacing={2}>
                <TextField
                    label="Descrição"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <Stack direction="row" spacing={2}>
                    <Button type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon/>}
                    >
                        {t('search')}
                    </Button>

                    <Button variant="contained"
                            color="info"
                            onClick={() => location.href = '/cities/new'}
                            startIcon={<AddIcon />}
                            sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }}
                    >
                        {t('new')}
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}

import {useState} from 'react';
import {TextField, Checkbox, FormControlLabel, Stack, Button} from '@mui/material';

interface Props {
    onSearch: (filters: { name: string; }) => void;
}

export default function StateFilterForm({onSearch}: Props) {
    const [name, setName] = useState('');
    const [active, setActive] = useState(true);

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
                    <Button type="submit" variant="contained" color="primary">Pesquisar</Button>
                    <Button variant="outlined" onClick={() => {
                        setName('');
                        setActive(true);
                    }}>Limpar</Button>
                    <Button variant="contained" color="info" onClick={() => location.href = '/states/new'}>Novo</Button>
                </Stack>
            </Stack>
        </form>
    );
}

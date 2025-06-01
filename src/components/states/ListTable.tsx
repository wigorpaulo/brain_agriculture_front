import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Container,
    CircularProgress
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useEffect, useState} from "react";
import {State} from "@/types/state";
import stateService from "@/services/state.services";
import {useAuth} from "@/contexts/auth-context";

export default function StateListTable({ filters }: { filters: any }) {
    const { token, baseUrl } = useAuth();
    const [states, setStates] = useState<State[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEstados = async () => {
        try {
            const data = await stateService.getAll(baseUrl, String(token));

            const states = data.map((state: State) => ({
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
    }

    useEffect(() => {
        fetchEstados();
    }, []);

    return (
        <Container>

            {loading ? (
                <CircularProgress />
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>UF</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Criado em</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {states.map((state) => (
                            <TableRow key={state.id}>
                                <TableCell>{state.id}</TableCell>
                                <TableCell>{state.uf}</TableCell>
                                <TableCell>{state.name}</TableCell>
                                <TableCell>{String(state.created_at)}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
        </Container>
    );
}

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Container,
    CircularProgress,
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import { State } from "@/types/state";
import stateService from "@/services/state.services";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import EditIcon from '@mui/icons-material/Edit';

export default function StateListTable({ filters }: { filters: any }) {
    const { token, baseUrl } = useAuth();
    const [states, setStates] = useState<State[]>([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
    const router = useRouter();

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedStateId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedStateId(null);
    };

    const handleEdit = () => {
        if (selectedStateId) {
            router.push(`/states/${selectedStateId}/edit`);
        }
        handleMenuClose();
    };

    const fetchEstados = async () => {
        try {
            const data = await stateService.getAll(baseUrl, String(token));
            if (data.statusCode === 401) {
                router.push('/login');
            } else {
                const states = data.map((state: State) => ({
                    id: state.id,
                    uf: state.uf,
                    name: state.name,
                    created_at: state.created_at,
                    updated_at: state.updated_at,
                }));
                setStates(states);
            }
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

    if (!token || loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
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
                                <IconButton onClick={(e) => handleMenuOpen(e, state.id)}>
                                    <MoreVertIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Editar
                </MenuItem>
                {/* você pode adicionar mais opções aqui */}
            </Menu>
        </Container>
    );
}

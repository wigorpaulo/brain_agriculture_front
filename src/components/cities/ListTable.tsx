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
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import EditIcon from '@mui/icons-material/Edit';
import { formatDateTime } from "../../helper/Util";
import { useTranslation } from 'next-i18next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import {confirmDelete} from "@/helper/confirmDelete";
import {City, GetAllCitiesResponse} from "@/types/city";
import cityService from "@/services/city.services";

export default function CityListTable({ filters }: { filters: any }) {
    const { token, baseUrl } = useAuth();
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const router = useRouter();
    const { t } = useTranslation('common');

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string | number) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const handleEdit = () => {
        if (selectedId) {
            router.push(`/cities/${selectedId}/edit`);
        }
        handleMenuClose();
    };

    const handleShow = () => {
        if (selectedId) {
            router.push(`/cities/${selectedId}/show`);
        }
        handleMenuClose();
    };

    const fetchCities = async () => {
        try {
            const data: GetAllCitiesResponse = await cityService.getAll(baseUrl, String(token));
            if (data.statusCode === 401) {
                router.push('/login');
            } else {
                const cities = data.cities.map((city: City) => ({
                    id: city.id,
                    name: city.name,
                    state: city.state,
                    created_at: city.created_at,
                    updated_at: city.updated_at,
                }));
                setCities(cities);
            }
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () =>  {
        await confirmDelete({
            t,
            id: String(selectedId),
            itemName: t("city.delete.success"), // Ex: "Estado"
            deleteCallback: (id) => cityService.delete(baseUrl, token, id),
            onSuccess: () => {
                handleMenuClose();
                fetchCities();
            }
        });
    }

    useEffect(() => {
        if (token) {
            fetchCities();
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
                        <TableCell sx={{ fontWeight: 'bold' }}>{ t("city.id") }</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{ t("city.name") }</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{ t("city.state") }</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{ t("city.created_at") }</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{ t("action") }</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cities.map((city) => (
                        <TableRow key={city.id}>
                            <TableCell>{city.id}</TableCell>
                            <TableCell>{city.name}</TableCell>
                            <TableCell>{city.state.name}</TableCell>
                            <TableCell>{formatDateTime(String(city.created_at))}</TableCell>
                            <TableCell>
                                <IconButton onClick={(e) => handleMenuOpen(e, city.id)}>
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
                <MenuItem onClick={handleShow}>
                    <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                    { t("show") }
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    { t("edit") }
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    {t("delete")}
                </MenuItem>
            </Menu>
        </Container>
    );
}

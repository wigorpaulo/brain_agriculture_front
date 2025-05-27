// pages/estados.tsx
import { useEffect, useState } from 'react'
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from '@mui/material'
import {StateService} from "@/services/state.services";

interface Estado {
    id: number
    nome: string
    sigla: string
}

export default function StatesPage() {
    const [estados, setEstados] = useState<Estado[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const data = await StateService.getAll(localStorage.getItem('token'))

                const estadosFormatados = data.map((estado: any) => ({
                    id: estado.id,
                    nome: estado.name,
                    sigla: estado.uf,
                }))

                setEstados(estadosFormatados)
            } catch (error) {
                console.error('Erro ao buscar estados:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchEstados()
    }, [])

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Lista de Estados
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Nome</strong></TableCell>
                                <TableCell><strong>Sigla</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {estados.map((estado) => (
                                <TableRow key={estado.id}>
                                    <TableCell>{estado.id}</TableCell>
                                    <TableCell>{estado.nome}</TableCell>
                                    <TableCell>{estado.sigla}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Container>
    )
}

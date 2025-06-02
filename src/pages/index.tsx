// pages/index.tsx
import { Container, Typography, Box } from '@mui/material'

export default function HomePage() {
    return (
        <Container maxWidth="md" sx={{mt: 8}}>
            <Box mt={10} textAlign="center">
                <Typography variant="h3" gutterBottom>
                    Bem-vindo
                </Typography>
            </Box>
        </Container>
    )
}

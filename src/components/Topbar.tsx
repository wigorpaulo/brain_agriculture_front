import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material'
import {useAuth} from '@/contexts/auth-context'
import {useRouter} from 'next/router'
import {LanguageSwitcher} from "@/components/LanguageSwitcher";

export default function Topbar() {
    const {logout, user} = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <AppBar position="fixed" sx={{
            width: '100%',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: 'white',
            color: 'black',
            boxShadow: 1,
        }}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography variant="h6">
                    Minha Aplicação
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <LanguageSwitcher />
                    {user && <Typography variant="body1">Olá, {user.name}</Typography>}
                    <Button color="inherit" onClick={handleLogout}>
                        Sair
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

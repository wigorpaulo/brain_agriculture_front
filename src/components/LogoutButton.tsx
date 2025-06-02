import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // Ícone de saída
import { useTranslation } from 'next-i18next';

export function LogoutButton({ handleLogout }: { handleLogout: () => void }) {
    const { t } = useTranslation('common');

    return (
        <Button
            color="inherit"
            startIcon={<LogoutIcon />} // Adiciona o ícone à esquerda do texto
            onClick={handleLogout}
            sx={{
                textTransform: 'none', // Mantém o texto sem transformação para maiúsculas
                fontWeight: 'bold',
            }}
        >
            Sair
        </Button>
    );
}
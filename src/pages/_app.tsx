// pages/_app.tsx
import type {AppProps} from 'next/app'
import {ThemeProvider, CssBaseline} from '@mui/material'
import theme from '../theme'
import {AuthProvider} from '@/contexts/auth-context'
import MainLayout from "@/layouts/MainLayout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <MainLayout>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </MainLayout>
        </AuthProvider>
    )
}

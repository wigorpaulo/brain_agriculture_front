// pages/_app.tsx
import type {AppProps} from 'next/app'
import {ThemeProvider, CssBaseline} from '@mui/material'
import theme from '../theme'
import {AuthProvider} from '@/contexts/auth-context'
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from 'next/router'

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter()
    const noLayoutPages = ['/login', '/users/new']
    const isPublicPage = noLayoutPages.includes(router.pathname)

    return (
        <AuthProvider>

            {
                isPublicPage ?
                    (
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            <Component {...pageProps} />
                        </ThemeProvider>
                    )
                        :
                    (
                        <MainLayout>
                            <ThemeProvider theme={theme}>
                                <CssBaseline/>
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </MainLayout>
                    )
            }
        </AuthProvider>
    )
}

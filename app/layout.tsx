import '@/css/prism.css';
import '@/css/tailwind.css';
import '@fontsource/mukta';

import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LogRocket from '@/components/LogRocket';
import LenisProvider from '@/components/Providers/LenisProvider';
import ThemeProvider from '@/components/Providers/ThemeProvider';
import localFont from 'next/font/local';
import Script from 'next/script';

const scFont = localFont({
  src: '../public/static/fonts/Noto_Serif_SC/noto-serif-sc-v22-chinese-simplified_latin-regular.woff2',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
         `}
        </Script>
        <title></title>
      </head>
      <body className="bg-white text-black antialiased dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <LenisProvider>
            <main className={scFont.className}>{children}</main>
          </LenisProvider>
          <Footer />
          <LogRocket />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

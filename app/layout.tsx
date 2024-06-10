import Script from 'next/script'
import { initialStore } from '@/store/user'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script id="preloadedState" strategy="beforeInteractive">
          {`window.__PRELOADED_STATE__ = ${JSON.stringify(initialStore.getValue())}`}
        </Script>
      </body>
    </html>
  );
}

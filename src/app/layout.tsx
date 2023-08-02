import ReactQueryProviders from 'components/app-providers/react-query-provider';
import 'assets/styles/resetCSS.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProviders>
          {children}
        </ReactQueryProviders>
      </body>
    </html>
  );
}

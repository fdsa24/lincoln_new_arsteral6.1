import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Lincoln History Lab', description: '링컨의 시대와 사료를 구별해 탐구하는 역사 시뮬레이션', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}

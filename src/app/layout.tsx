import { DM_Sans } from 'next/font/google';
import './assets/scss/tailwind.scss';
import './assets/css/materialdesignicons.css';

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm_sans',
});

export const metadata = {
  title: 'Cartzio - Next Js Fashion Store eCommerce Tailwind CSS Landing Template',
  description: 'Next Js Fashion Store eCommerce Tailwind CSS Landing Template',
};

import { ReactNode } from 'react';
import ApolloWrapper from './components/ApolloWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light scroll-smooth dm_sans" dir="ltr">
      <body className={`${dm_sans.variable} dark:bg-slate-900`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}

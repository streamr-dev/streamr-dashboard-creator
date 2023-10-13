import React, { ReactNode } from 'react';
import Head from 'next/head';

import { IBM_Plex_Sans } from 'next/font/google';
import { SideBar } from './SideBar';
import { HeaderBar } from './HeaderBar';

const imbPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

type Props = {
  children?: ReactNode;
  headerTitle?: string;
  title?: string;
};

export const Layout = ({
  children,
  title = 'Streamr Charts',
  headerTitle = 'All Chart',
}: Props) => (
  <div className={`${imbPlexSans.className} h-full w-full`}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/svg" href={'/logo.svg'} />
    </Head>
    <HeaderBar headerTitle={headerTitle}></HeaderBar>
    <SideBar></SideBar>
    <div className="pr-8 pt-[100px] pb-6 lg:pl-[332px]">{children}</div>
  </div>
);

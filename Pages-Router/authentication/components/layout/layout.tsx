import { Fragment } from 'react';

import MainNavigation from './main-navigation';

function Layout({children} : {children: React.ReactNode}) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
import React from 'react';

import { Header } from '../components';

const Layout = ({ children, pageId }) => {
  return (
    <div id="wrapper">
      <Header />

      <main id={pageId} className="py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;

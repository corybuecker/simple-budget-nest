import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './nav';

export const Main = () => {
  return (
    <>
      <Nav></Nav>
      <div className={'p-2'}>
        <Outlet />
      </div>
    </>
  );
};

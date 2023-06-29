import { redirect } from 'react-router-dom';
import { ServerLoaderParams } from '../types';

export const dashboardLoader = (serverParams?: ServerLoaderParams) => {
  return async () => {
    const response = await fetch(
      `${serverParams?.host ?? ''}/api/dashboard`,
      serverParams?.headers ? { headers: serverParams.headers } : {},
    );

    if (response.status === 403) {
      return redirect('/authentication');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await response.json();
  };
};

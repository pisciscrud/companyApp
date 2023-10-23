import React from 'react';
import { trpc } from '../utils/trpcClient';

export const CompanyList: React.FC = () => {
  const fetchUser = async () => {
    const compamies = await trpc.company.all.query();

    console.log(compamies);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return <></>;
}
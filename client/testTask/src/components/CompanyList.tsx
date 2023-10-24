import React from 'react';
import { trpc } from '../utils/trpcClient';

export const CompanyList: React.FC = () => {
  const fetchUser = async () => {
    const compamies = await trpc.company.addCompany.mutate;
      
    console.log(compamies.data);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return <></>;
}
import react, { useState, FC } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { httpBatchLink, createTRPCProxyClient } from '@trpc/client';

import { QueryClient, QueryClientProvider } from 'react-query';
const BACKEND_URL = "http://localhost:3000/trpc";
import { trpc } from './utils/trpcClient';
import  { CompanyList } from './components/CompanyList'


function App() : FC  {

//   const [queryClient] = useState(() => new QueryClient());
//   const [trpcClient] = useState(() =>
//   trpc.createTRPCProxyClient({
//     links: [
//       httpBatchLink({
//         url: BACKEND_URL,
//       }),
//     ],
//   }),
// );

  return (
    // <trpc.Provider client={trpcClient} queryClient={queryClient}>
    // <QueryClientProvider client={queryClient}>
       <CompanyList/>
  //   </QueryClientProvider>
  // </trpc.Provider>
  )
}

export default App;

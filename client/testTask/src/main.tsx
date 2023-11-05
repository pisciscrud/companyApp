import ReactDOM from "react-dom/client";
import App from "./App";
 import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { trpc, trpcClient } from './utils/trpcClient';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);

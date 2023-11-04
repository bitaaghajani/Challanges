import Search from "../components/Search";
import {  useQueryClient,
            QueryClient,
            QueryClientProvider,
  } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
export default function App(){
    const reactQuery=new QueryClient();
    return(
        <QueryClientProvider client={reactQuery}>
        <Search />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
        </QueryClientProvider>
    )
}
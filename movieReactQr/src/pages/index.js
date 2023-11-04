import Movies from "../components/Movies";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Movies />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  );
}

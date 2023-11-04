import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { App, View} from 'framework7-react';
import routes from '../js/routes';
const queryClient = new QueryClient();
const f7params = {
  routes,
  name: "My App",
};
export default () => (
  <QueryClientProvider client={queryClient}>
    <App {...f7params} className='app'>
    <View main url="/" className="view"/>
    </App>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
);

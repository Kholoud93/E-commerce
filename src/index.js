import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools, ReactQueryDevtoolsPanel} from 'react-query/devtools';
import 'react-toastify/dist/ReactToastify.css';



let queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <QueryClientProvider client={queryClient}>
<ReactQueryDevtools></ReactQueryDevtools>
   <App />
 </QueryClientProvider>


   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

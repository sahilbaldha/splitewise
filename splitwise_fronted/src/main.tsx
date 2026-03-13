import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='966815645440-gpgol8h6c4p3b8994sqpa476d0a7t6lg.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
     <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toasterId="default"
      toastOptions={{
        className: "",
        duration: 3000,
        removeDelay: 1000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  </StrictMode>,
)

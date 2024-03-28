'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux'
import rootReducer from '@/frontendservices/redux/index'
import { configureStore } from '@reduxjs/toolkit'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const inter = Inter({ subsets: ['latin'] })

const store = configureStore({
  //added "rootReducer" into store variable and rootReducer is combination of all reducer which is made in slices;
  reducer: rootReducer,
})

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer />
        </body>
      </html>
    </Provider>
  )
}

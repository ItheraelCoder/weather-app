import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth";
import { LoginPage } from "../pages";

export const AppRouter = () => {

  const authStatus = '';

  return (

    <Routes>
      {
        (authStatus === 'not-authenticated')
        ? <Route path="/auth/*" element={<LoginPage />}/>
        : <Route path="/*" element={<CalendarPage />} />
      }
      <Route path="/*" element={<Navigate to={"auth/login"}/>} />
      
      
      
    </Routes>
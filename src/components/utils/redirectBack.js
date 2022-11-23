import {  useNavigate, useLocation, Navigate } from "react-router-dom";
import React from 'react'

export default function RedirectBack(){
    const {search} = useLocation()
    // const abc=useNavigate()
    // React.useEffect(()=>{abc(-1); abc(location.pathname)},[abc]);
    const params=new URLSearchParams(search)
    console.log(params)
    return (<Navigate to={params.get('redirect') ?? "/"}/>)
}
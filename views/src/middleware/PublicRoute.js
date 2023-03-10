import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'

const PublicRoute = () => {
    return (
        <>
            <Header /> 
            <Outlet />
        </>
    )
}

export default PublicRoute
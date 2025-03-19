import React, {useEffect, useContext} from "react";
import {Context as AuthContext} from '../context/AuthContext'
import {Context as DataContext} from '../context/DataContext'

const ResolveAuthScreen = () => {
    const {tryLocalSignin} = useContext(AuthContext)
    const {fetchData} = useContext(DataContext)

    useEffect(() => {
        tryLocalSignin()
        fetchData()
    }, [])
    return null
}

export default ResolveAuthScreen
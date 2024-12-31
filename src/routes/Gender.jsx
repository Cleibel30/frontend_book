import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { useParams } from 'react-router-dom'
import { Books } from '../components/Books'
import { useForm } from '../helpers/useForm'
import { useApiPost } from '../helpers/useApiPost'

export const Gender = () => {
    const { id } = useParams()
    const { apiGet, responseGet, responseForm } = useApiPost()

    useEffect(() => {
        apiGet(undefined, `searchBook/gender/${id}`)
    }, [])

    console.log(responseGet)

    return (
        <>
            <Nav idName={id}></Nav>
            <h1 className="container margin fw-bold py-4">Búsqueda por categoría: {id}</h1>
            {(responseForm || responseGet) ? (
                <Books books={responseGet} booksSearch={responseGet}></Books>
            ) : <h2 className="container">Cargando...</h2>}
        </>
    )
}

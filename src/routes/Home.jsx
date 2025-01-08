import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { Books } from '../components/Books'
import { useApiPost } from '../helpers/useApiPost'
import { useForm } from '../helpers/useForm'

export const Home = () => {
  const [sendValue, setSendValue] = useState(undefined)
  const { onInputChange, formState, setFormState } = useForm({ search: " " })

  const { setresponseGet, register, sesionShow, apiGet, responseGet, responseForm } = useApiPost()

  const formSearch = (e) => {
    e.preventDefault()

    const { search } = formState
    if (search != " ") {
      setSendValue(formState)
      register(formState, "searchBook/search", undefined)
    }
  }

  useEffect(() => {
    apiGet(undefined, "searchBook/books")
  }, [])


  console.log(responseForm)

  return (
    <>
      <Nav />
      <div className="container margin">
        <div classNameName="container">
          <form className="m d-flex flex-column bg-primary bg-gradient p-5 rounded shadow" role="search" onSubmit={formSearch}>
            <h2 className='text-light pb-3'>Buscar libros por título, autor y categoría</h2>
            <div className="d-flex">
              <input className="form-control me-2 p-2" type="search" name='search' placeholder="Buscar libros por título, autor y categoría" aria-label="Search" onChange={onInputChange} />
              <button className="btn btn-light" type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>
     
      <h2 className='container fw-bolder py-5'>{(!sendValue) && "Últimas publicaciones"} {(sendValue && sendValue.search) && `Búsqueda: ${sendValue.search}.`} {(responseForm && !responseForm.ok) && responseForm.message}</h2>
      {(responseForm || responseGet) ? (
        <Books books={responseGet} booksSearch={responseForm}></Books>
      ) : <h2 className="container">Cargando...</h2>}
    </>
  )
}

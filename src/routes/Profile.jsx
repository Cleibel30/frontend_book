import React, { useContext, useEffect, useRef, useState } from 'react'
import { Nav } from "../components/Nav"
import { Books } from "../components/Books"
import { context } from '../context/Context'
import { useApiPost } from '../helpers/useApiPost'
import { useForm } from '../helpers/useForm'

export const Profile = () => {
  const file = useRef()
  const photo = useRef()
  const token = localStorage.getItem('token');

  const [active, setactive] = useState(false)
  const { user, sesion } = useContext(context)
  const { onInputChange, formState, setFormState } = useForm({})
  const { setresponseGet, register, sesionShow, apiGet, responseGet, responseForm, sendBookFunction } = useApiPost()
  const [gender, setgender] = useState(undefined)
  const [fileShow, setfileShow] = useState(undefined)
  const [photoShow, setphotoShow] = useState(undefined)
  const [error, seterror] = useState(undefined)

  

  const activeFunction = () => {
    setactive(true)
    setgender("terror")
  }

  const closeSesion = () => {
    localStorage.removeItem('token')
    window.location.href = "/"
  }

  useEffect(() => {
    apiGet(undefined, "searchBook/books")
  }, [])

  const sendBook = (e) => {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);

    const { title, author, description } = formState

    formData.append('author', author);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('gender', gender);
      
    if((author.length >= 3 && author.length <= 20) && (description.length >= 3 && description.length <= 1000 && fileShow && photoShow) && (title.length >= 3 && title.length <= 500) && photoShow && fileShow){
      sendBookFunction(formData, "upload/files", token)
    }else{
      seterror(true)
    }

  }

  const genderSelect = (e) => {
    setgender(e.target.value)
  }

  const close = () => {
    setactive(false)
    setgender(undefined)
    setfileShow(undefined)
    setphotoShow(undefined)
  }

  const fileShowFunction = (e) => {
    setfileShow(e.target.files[0])
  }
  const imgShowFunction = (e) => {
    setphotoShow(e.target.files[0])
  }

  

  return (
    <>
      <Nav />
      <div className="container margin pt-5 pb-4">
        <div className="row">
          <div className="col-12">

            <p className='fs-2 fw-bolder'>{(sesion && sesion.body.admin) && sesion.body.admin_name} {(sesion && !sesion.body.admin) && sesion.body.user_name}</p>

            {(sesion && sesion.body.admin) && (
              <><button className='btn btn-primary fw-bold mb-3' onClick={activeFunction}>Subir Libro <i class="fa-solid fa-book"></i></button><br /></>
            )}


            <p className='fs-5 fw-bold bg-light rounded p-2 d-inline-block'>{(sesion && sesion.body.admin) && sesion.body.email} {(sesion && !sesion.body.admin) && sesion.body.email}</p><br />
            {sesion && (<button className='btn btn-primary' onClick={closeSesion}>Cerrar sesión</button>)}
          </div>
        </div>
      </div>

      <h2 className='border-bottom border-light container py-4 mb-4'>Libros recomendados</h2>
      {(responseForm || responseGet) ? (
        <Books books={responseGet} booksSearch={responseForm}></Books>
      ) : <h2 className="container">Cargando...</h2>}

      {active && (
        <div className="edit">
          <form className='container overflow-y-auto' action="" method="POST" enctype="multipart/form-data" onSubmit={sendBook}>
            <div className="row w-100 h-100 bg-light p-5 rounded mx-auto shadow">
              <h2>Subir libro</h2>
              <div className="d-flex gap-1">
                <label htmlFor="file" className='btn btn-primary fw-bold'>Libro PDF <i class="ms-1 fa-solid fa-file-pdf"></i></label>
                <input type="file" ref={file} onChange={fileShowFunction} className='d-none' id='file' name='file' accept="application/pdf" />

                <label htmlFor="image" className='btn btn-primary fw-bold'>Portada del libro <i class="fa-solid fa-image ms-1"></i></label>
                <input type="file" ref={photo} onChange={imgShowFunction} className='d-none' id='image' name='photo' accept="image/*" />
              </div>
              {fileShow && (<div class="col-sm-12 alert alert-success mt-3" role="alert">
                PDF Cargado. Peso {(fileShow.size / 1048576).toFixed(2)}MB
              </div>)}
              {photoShow && (<div class="col-sm-12 alert alert-success" role="alert">
                Portada Cargada. Peso {(photoShow.size / 1048576).toFixed(2)}MB
              </div>)}
              <div classNameName="col-sm-12">
                <label for="exampleInputUser1" className="form-label">Título</label>
                <input type="text" name='title' className="form-control" id="exampleInputUser1" aria-describedby="userHelp" placeholder='Ingresa el título del libro' onChange={onInputChange} />
              </div>

              <div classNameName="col-sm-12">
                <label for="exampleInputAutor1" className="form-label">Autor</label>
                <input type="text" name='author' className="form-control" id="exampleInputAutor1" aria-describedby="userHelp" placeholder='Ingresa el autor del libro' onChange={onInputChange} />
              </div>
              <div classNameName="col-sm-12">
                <label for="des" className="form-label">Descripción</label>

                <textarea name="description" className='form-control w-100 p-3' id="des" placeholder='Descripción del libro' onChange={onInputChange}></textarea>
              </div>
              <div className="col-sm-12">
                <label htmlFor="gender">Categorías</label>
                <select id='gender' class="form-select form-select-sm mt-3" aria-label="Small select example" onClick={genderSelect}>
                  <option value="terror">Terror</option>
                  <option value="romance">Romance</option>
                  <option value="fantasia">Fantasía</option>
                  <option value="historia">Historia</option>
                  <option value="ciencia">Ciencia</option>
                </select>
              </div>

              {error && (<p className='bg-danger p-2 rounded text-light mt-3'>El autor debe tener minimo 3 caracteres y máximo 20, la descripcion mínimo 3 y máximo 1000 y el título minimo 3 y máximo 500</p>)}

              <div className="d-flex gap-2 mt-3">
                <button type='submit' className='btn btn-primary'>Subir</button>
                <button type='' className='btn btn-danger' onClick={close}>Cancelar</button>
              </div>
            </div>


          </form>
        </div>

      )}
    </>
  )
}

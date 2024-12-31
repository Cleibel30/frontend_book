import React, { useContext, useEffect, useRef, useState } from 'react'
import Zoom from 'react-reveal/Zoom';
import { Nav } from "../components/Nav"
import { context } from '../context/Context'
import { useApiPost } from '../helpers/useApiPost'
import { useParams } from 'react-router-dom'
import { useForm } from '../helpers/useForm'


export const Book = ({ value }) => {
const likeCont = useRef()
const textComment = useRef()
  const {onInputChange, formState, setFormState} = useForm()
  const { deleteCommentFunction, showComments, showCommentsResult, setresponseGet, register, sesionShow, apiGet, responseGet, responseForm, showLike, likeShow, sendBookFunction, sendCommentFunction, comment } = useApiPost()
  const [isFocused, setIsFocused] = useState(false)
  const [edit, setedit] = useState(false)
  const [sesionActive, setsesionActive] = useState(false)
  const { user, sesion } = useContext(context)
  const { id } = useParams()
  const token = localStorage.getItem('token');

  

  const like = () => {
    document.querySelector(".like").classList.toggle("text-danger")
    sendBookFunction({}, `like/${id}`,token)
  }

  const editChange = () => {
    if (edit) {
      setedit(false)
    } else {
      setedit(true)
    }
  }

  const errorFunction = () => {
    if (!sesion) setsesionActive(true)
    else {
      fetch(`http://localhost:3000/showBooks/${responseGet.body.book_url}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la red al intentar descargar el archivo');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', responseGet.body.title); // Nombre del archivo PDF descargado
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch(error => console.error('Error al descargar el archivo:', error));
    }

  }

  useEffect(() => {
    if (sesionActive) {

      setTimeout(() => {
        setsesionActive(false)
      }, 1000);

    }
  }, [sesionActive])

  useEffect(() => {
    apiGet(undefined, `searchBook/book/${id}`)
    if(sesion){
      if(!sesion.body.admin) showLike(token, `like/showLike/${id}`)
    }
    showComments(token, `showComments/${id}`)
  }, [])

  const sendComment = (e)=>{
    e.preventDefault()
    const value = textComment.current.value
    sendCommentFunction({comment: value, book_id: responseGet.body.book_id}, `comment`, token)
  }

  const deleteComment = (e)=>{
    
    deleteCommentFunction(token, `deleteComment/${e.target.id}`)
  }

  return (
    <>
      <Nav />
      {responseGet && (
        <div className="container margin">
          <div className="row pt-5">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <img src={`http://localhost:3000/showBooks/${responseGet.body.photo_url}`} className='w-100 h' alt="" />
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <h1 className='fs-2 mb-4'>{responseGet.body.title}</h1>
              <p>{responseGet.body.description}</p>
              <p className='fs-4'><span className='fw-bold'>Autor: </span>{responseGet.body.author}</p>
              <p className='fs-4'><span className='fw-bold'>Genero: </span>{responseGet.body.gender}</p>
              <div className="d-flex gap-2 flex-wrap">
                <button className='btn btn-primary btn-lg fw-bold' onClick={errorFunction}>Descargar <i class="fa-solid fa-download"></i></button>
                <a href={sesion && `http://localhost:3000/showBooks/${responseGet.body.book_url}`} target='_blank' className='btn btn-success btn-lg fw-bold' onClick={errorFunction}>Leer Libro <i class="fa-brands fa-readme"></i></a>
                {(sesion && !sesion.body.admin) && (<button className='btn fs-3' ref={likeCont} onClick={like}><i class={`fa-solid fa-heart heart like ${(likeShow && likeShow.ok) && "text-danger"}`}></i></button>)}
                {(sesion && sesion.body.admin) && (
                  <div className="d-flex">
                  <button className='btn fs-3' onClick={editChange}><i class="fa-solid fa-pen-to-square"></i></button>
                  <button className='btn fs-3'><i class="fa-solid fa-trash"></i></button>
                </div>
                )}
              </div>

            </div>
            <div className="col-lg-8"></div>
          </div>
        </div>
      )}

      {/* Comentarios */}

      <div className="container pb-4">
        <h2 className='py-4'>Comentarios</h2>
        <div className="row row-gap-4">
          <div className="col-sm-12">
            {(sesion && !sesion.body.admin) && (
              <form action="" onSubmit={sendComment}>
              <textarea name="comment" ref={textComment} className='form-control w-100 p-3' id="exampleTextarea" placeholder='Comentar'>
              </textarea>

              <div className="d-flex gap-1 mt-2">
                  <button type='submit' className='btn btn-primary'>Comentar</button>
                </div>
            </form>
            )}
          </div>
          {showCommentsResult && (
            showCommentsResult.body.map(item => (
              <div className="col-sm-12 rounded shadow py-1 bg-light">
              <div className="d-flex gap-1 aling-item-center">
                <span className='fs-5 fw-bold'>{item.User.user_name}</span>
                {(item.user_id == sesion.body.user_id) && (<button id={`${item.comment_id}`} className='btn text-danger p-0' onClick={deleteComment}>Eliminar comentario</button>)}
                
              </div>
              <p>{item.comment}</p>
            </div>
            ))
          )}
        </div>
      </div>
      {edit && (
        <div className="edit">
          <form className='container' action="">
            <div className="row w-75 bg-light p-5 rounded mx-auto mt-5 shadow">
              <h2>Editar libro</h2>
              <div classNameName="col-sm-12">
                <label for="exampleInputUser1" className="form-label">Título</label>
                <input type="text" name='user_name' className="form-control" id="exampleInputUser1" aria-describedby="userHelp" placeholder='Ingresa el título del libro' />
              </div>
              <div classNameName="col-sm-12">
                <label for="exampleInputAutor1" className="form-label">Autor</label>
                <input type="text" name='user_name' className="form-control" id="exampleInputAutor1" aria-describedby="userHelp" placeholder='Ingresa el autor del libro' />
              </div>
              <div classNameName="col-sm-12">
                <label for="des" className="form-label">Descripción</label>

                <textarea name="comment" className='form-control w-100 p-3' id="des" placeholder='Descripción del libro'></textarea>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button type='submit' className='btn btn-primary'>Editar</button>
                <button type='submit' className='btn btn-danger' onClick={editChange}>Cancelar</button>
              </div>
            </div>
          </form>
        </div>

      )}

      {sesionActive && (<div className="alert alert-danger mt-4 alert_efect" role="alert">
        Debes iniciar sesión
      </div>)}
    </>
  )
}

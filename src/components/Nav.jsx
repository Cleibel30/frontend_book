import React, { useContext, useEffect, useState } from 'react'
import { context } from '../context/Context'


export const Nav = ({ idName }) => {
  const { user, sesion } = useContext(context)
  const token = localStorage.getItem('token');


  useEffect(() => {
    if (idName) document.querySelector(`#${idName}`).classList.add("active")
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand fw-bolder fs-4" href="/">Books <i class="fa-solid fa-book"></i></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse ms-auto" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-lg-0">
              <li className="nav-item"><a id='terror' class="nav-link fw-bolder fs-6" href="/gender/terror">Terror</a></li>
              <li className="nav-item"><a id='romance' class="nav-link fw-bolder fs-6" href="/gender/romance">Romance</a></li>
              <li className="nav-item"><a id='fantasia' class="nav-link fw-bolder fs-6" href="/gender/fantasia">Fantasía</a></li>
              <li className="nav-item"><a id='historia' class="nav-link fw-bolder fs-6" href="/gender/historia">Historia</a></li>
              <li className="nav-item"><a id='ciencia' class="nav-link fw-bolder fs-6" href="/gender/ciencia">Ciencia</a></li>
              {!token ? (
                <div className="lg-rg d-flex flex-wrap">
                  <a class="fw-bolder fs-6 btn btn-primary" href="/login">Iniciar Sesión</a>
                  <a class="ms-2 fw-bolder fs-6 btn btn-outline-primary" href="/register">Registrarse</a>
                </div>
              )

                :

                (<a href="/profile" className='btn fw-bolder btn btn-primary ms-2'><i class="fa-solid fa-user"></i> Mi perfil</a>)
              }
            </ul>
          </div>

        </div>
      </nav>
    </>
  )
}

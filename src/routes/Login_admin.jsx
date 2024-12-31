import React from 'react'
import { useForm } from '../helpers/useForm'
import { useApiPost } from '../helpers/useApiPost'

export const Login_admin = () => {
  const {onInputChange, formState, setFormState} = useForm()
  const { responseForm, register, setresponseForm } = useApiPost()
  
  const form = (e) => {
    e.preventDefault()

    const {email, password} = formState

    if(email && password) register(formState, "login/admin", "/")
  }

  console.log(responseForm)

  return (
    <>

      <div className="container-fluid hv mt-5">
        <div className="row justify-content-center aling-item-center">
          <div className="col-lg-6 col-md-8 col-sm-12">
            <form action="" onSubmit={form} className='container-fluid bg-light w-100 p-3 rounded shadow'>
              <a className="navbar-brand fw-bolder fs-4" href="/">Books <i class="fa-solid fa-book"></i></a>
              <h3 className='text-center mt-3'>Inicio de sesión para administradores</h3>

              <div classNameName="row ">
                <div classNameName="col-sm-12">
                  <label for="exampleInputEmail1" class="form-label">Correo electrónico</label>
                  <input onChange={onInputChange} type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Ingresa el correo'/>
                </div>
              </div>
              <div classNameName="row">
                <div classNameName="col-lg-6">
                  <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                  <input onChange={onInputChange} type="password" name='password' class="form-control" id="exampleInputPassword1" placeholder='Ingresa la contraseña'/>
                </div>
              </div>
              
              {(responseForm && Array.isArray(responseForm.body)) && (
                responseForm.body.map(item => <p key={item.msg} className='p-3 rounded bg-danger text-light mt-3'>{item.msg}</p>)
              )}

              {(responseForm && responseForm.message) && (
                <p className='p-3 rounded bg-danger text-light mt-3'>{responseForm.message}</p>
              )}
              

              <button type='submit' className='btn btn-primary w-100 mt-4'>Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

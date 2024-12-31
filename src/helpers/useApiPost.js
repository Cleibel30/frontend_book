import React, { useState } from 'react'
import { json } from 'react-router-dom'

export const useApiPost = () => {

    const [responseForm, setresponseForm] = useState(undefined)
    const [sesion, setsesion] = useState(undefined)
    const [responseGet, setresponseGet] = useState(undefined)
    const [likeShow, setLikeShow] = useState(undefined)
    const [comment, setcomment] = useState()
    const [showCommentsResult, setshowCommentsResult] = useState(undefined)

    const register = async (json, urlApi, url) => {

        try {
            const response = await fetch(`http://localhost:3000/${urlApi}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            setresponseForm(result)


            console.log(result)
            if (result) {
                if (result.ok) {
                    if (urlApi === "login" || urlApi === "login/admin") {
                        localStorage.setItem('token', result.body);
                        window.location.href = `${url}`
                    }
                    if (urlApi === "register" || urlApi === "register/admin") {
                        window.location.href = `${url}`
                    }
                }
            }

        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
        }
    }
    const sendBookFunction = async (json, urlApi, token) => {

        try {
            const response = await fetch(`http://localhost:3000/${urlApi}`, {
                method: 'POST',
                headers: {
                    'token': token
                },
                body: json,
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            setresponseForm(result)


            if (result.ok) {
                if (urlApi == "upload/files") window.location.href = "/"
            }

        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
        }
    }
    const sendCommentFunction = async (json, urlApi, token) => {

        fetch(`http://localhost:3000/${urlApi}`, {
            method: 'POST', // Método POST
            headers: {
                'Content-Type': 'application/json',
                'token': token // Especifica el tipo de contenido como JSON
            },
            body: JSON.stringify(json) // Convierte el objeto a una cadena JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                return response.json(); // Analiza la respuesta JSON
            })
            .then(data => {
                console.log('Respuesta del servidor:', data); // Maneja los datos de la respuesta
                if (data.ok) location.reload();
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud:', error); // Maneja cualquier error
            });

    }

    const deleteCommentFunction = (token, url) => {

        fetch(`http://localhost:3000/${url}`, {
            method: 'DELETE',
            headers: {
                'token': token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data); 
                if (data.ok) location.reload();
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud:', error); 
            });

    }


    const sesionShow = async (token) => {

        try {
            const response = await fetch('http://localhost:3000/showUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json(); // Convierte la respuesta en JSON
            setsesion(result)

        } catch (error) {
            console.error('error:', error);
        }
    }
    const apiGet = async (token, url) => {

        try {
            const response = await fetch(`http://localhost:3000/${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json(); // Convierte la respuesta en JSON
            setresponseGet(result)


        } catch (error) {
            console.error('error:', error);
        }
    }
    const showLike = async (token, url) => {

        try {
            const response = await fetch(`http://localhost:3000/${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json(); // Convierte la respuesta en JSON
            setLikeShow(result)


        } catch (error) {
            console.error('error:', error);
        }
    }
    const showComments = async (token, url) => {

        try {
            const response = await fetch(`http://localhost:3000/${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json(); // Convierte la respuesta en JSON
            setshowCommentsResult(result)


        } catch (error) {
            console.error('error:', error);
        }
    }


    return {
        responseForm,
        setresponseForm,
        register,
        sesionShow,
        sesion,
        setsesion,
        apiGet,
        responseGet,
        setresponseGet,
        sendBookFunction,
        showLike,
        likeShow,
        sendCommentFunction,
        comment,
        showComments,
        showCommentsResult,
        deleteCommentFunction
    }
}



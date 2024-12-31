import React from 'react'
import Zoom from 'react-reveal/Zoom';

export const Books = ({books, booksSearch}) => {
  
  return (
    <>
      <div className="container pb-5">
        
        <div className="row row-gap-4">
            {/* {booksSearch && (
              booksSearch.body.map(item => (
                <Zoom>
            <a href="/book/nombre" className="col-lg-4 col-md-6 col-sm-12 text-decoration-none translate">
              <article className='bg-light rounded shadow overflow-hidden'>
                <img src={`http://localhost:3000/showBooks/${item.photo_url}`} alt="" className='img-h' />
                <div className="card-body text-dark p-2 d-flex flex-column justify-content-between">
                  <p className='fs-6 p-0 fw-bold'>{item.title}</p>
                  <p className='fs-6 p-0'><span className='fw-bold'>Genero:</span> {item.gender}</p>
                  <p className='fs-6 p-0'><span className='fw-bold'>Autor:</span> {item.author}</p>
                </div>
              </article>
            </a>
          </Zoom>
              ))
            )}         */}
            {(booksSearch) ? (
              booksSearch.body.map(item => (
                <Zoom>
            <a href={`/book/${item.book_id}`} className="col-lg-4 col-md-6 col-sm-12 text-decoration-none translate">
              <article className='bg-light rounded shadow overflow-hidden'>
                <img src={`http://localhost:3000/showBooks/${item.photo_url}`} alt="" className='img-h' />
                <div className="card-body text-dark p-2 d-flex flex-column justify-content-between">
                  <p className='fs-6 p-0 fw-bold'>{item.title}</p>
                  <p className='fs-6 p-0'><span className='fw-bold'>Genero:</span> {item.gender}</p>
                  <p className='fs-6 p-0'><span className='fw-bold'>Autor:</span> {item.author}</p>
                </div>
              </article>
            </a>
          </Zoom>
              ))
            )
          
            :

            (
              books.body.map(item => (
                <Zoom>
            <a href={`/book/${item.book_id}`} className="col-lg-4 col-md-6 col-sm-12 text-decoration-none translate">
              <article className='bg-light rounded shadow overflow-hidden'>
                <img src={`http://localhost:3000/showBooks/${item.photo_url}`} alt="" className='img-h' />
                <div className="card-body text-dark p-2 d-flex flex-column justify-content-between">
                  <p className='fs-6 p-0 fw-bold'>{item.title}</p>
                  <p className='fs-6 p-0'><span className='fw-bold'>Genero:</span> {item.gender}</p>
                  <p className='fs-6 p-0'><span className='fw-bold'>Autor:</span> {item.author}</p>
                </div>
              </article>
            </a>
          </Zoom>
              ))
            )
          }        
        </div>
      </div>
    </>
  )
}

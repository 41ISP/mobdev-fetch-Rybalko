import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"

const Book = () => {
    const {id} = useParams()

const[book, setBook] = useState(undefined)
const [error, setErorr] = useState(null)
const [isLoading, setIsLoading] = useState(false)
      useEffect(()=>{
    
        const loadBooks = async() => {
            try{
        setIsLoading(true)

        //// book
        const res = await fetch("https://openlibrary.org/works/" + id + '.json' )

        if (!res.ok) {
        const errorData = await res.json()
    
        throw new Error( 'Что-то пошло не так')
        }
        const data = await res.json()

        ////author

 if (data.authors[0].author.key) {
    const authorRes = await fetch("https://openlibrary.org" + data.authors[0].author.key + '.json' )
 const authorData = await authorRes.json()
data.author = authorData.name
}
        /////genres

  if (data.genres && data.genres[0]) {
                    const genreRes = await fetch("https://openlibrary.org" + data.genres[0] + '.json')
                    const genreData = await genreRes.json()
                    data.genre = genreData.name
                }
        ////assembly
        
        // console.log(data)
        setBook(data)
        
        }  catch (error){
            console.error(error)
            setErorr(error.message)
        } finally{
           setIsLoading(false) 
        }
        
    }
        loadBooks() }, [id])
        if (isLoading) return <Loader />
if (!isLoading && error) return <p>{error}</p>


   if (book) return (
        <section className="book-page">
            <div className="book-page-cover">
                <img
                    id="bookCover"
                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                    alt=""
                />
            </div>
            <div className="book-page-content">
                <div className="section-label">КНИГА</div>
                <h1 id="bookTitle">{book.title}</h1>
                <div className="book-page-author" id="bookAuthor">
                    {book.author}
                </div>
                <div className="book-meta">
                    <span id="bookYear">{book.first_publish_date}</span>
                    <span>{book.genre}</span>
                </div>
                {book?.description?.value &&
                <div className="description">
                    <h3>Об этой книге</h3>
                    <p id="bookDescription"> {book.description.value} </p>
                </div>}
                <div className="modal-actions">
                    <button className="primary-button">Читать</button>
                    <button className="secondary-button">♡ Сохранить</button>
                </div>
            </div>
        </section>
    )
}

export default Book

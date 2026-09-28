import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import BookCard from "../components/BookCard"
import Loader from "../components/Loader"

const Search = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const queryParam = searchParams.get('q') || ''
    const [textField, setTextField] = useState(queryParam)
const[books, setBooks] = useState([])
const [error, setErorr] = useState(null)
const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{

    const loadBooks = async() => {
        try{
    setIsLoading(true)
    setErorr(null)
    const res = await fetch(

    "https://openlibrary.org/search.json" + '?q=' + queryParam + '&limit=20',
    )
    console.log(res)
    if (!res.ok) {
    const errorData = await res.json()

    throw new Error(errorData.detail[0].msg || 'Что-то пошло не так')
    }
    const data = await res.json()
    // console.log(data)
    setBooks(data.docs)
    
    }  catch (error){
        console.error(error)
        setErorr(error.message)
    } finally{
       setIsLoading(false) 
    }
    
}

    loadBooks() }, [queryParam])
    

     const handleSubmit =(e) => {
    e.preventDefault()
    if (textField.trim() === '') return
    navigate('/search?q=' + encodeURIComponent(textField.trim()))
}
    return (
        <section className="content">
            <div className="search-page-header">
                <div className="section-label">ПОИСК</div>
                <h1>Найдите свою следующую книгу</h1>
                <form onSubmit={handleSubmit} className="search" id="searchForm">
                    <span className="search-icon">⌕</span>
                    <input
                    value={textField}
                    onChange={(e) => setTextField(e.target.value)}
                        id="searchInput"
                        type="text"
                        placeholder="Название, автор или ISBN..."
                    />
                    <button type="submit">Найти</button>
                </form>
            </div>
            <div className="section-header">
                <div>
                    <div className="section-label">РЕЗУЛЬТАТЫ</div>
                    <h2 id="searchTitle">Результаты поиска</h2>
                </div>
                <span className="result-count" id="resultCount">
                    —
                </span>
            </div>
            {isLoading && <Loader />}
            {!isLoading && error && <p> {error}</p>}
            {!isLoading && !error && (<div className="book-grid" id="results">
            {books.map((e) => {
                const {key, ...props} = e
             return <BookCard {...props} bookKey={e.key} 
             key={e.key} />
})}
            </div> )}
        </section>
    )
}

export default Search

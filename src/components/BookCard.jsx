import { Link } from "react-router-dom"

const BookCard = ({title, author_name, cover_i, first_publish_year, bookKey})  => {
    return (
        <Link className="book-card" to={`/book/${bookKey.split('/')[2]}`}>
            <div className="book-image">
                <img
                    src={`https://covers.openlibrary.org/b/id/${cover_i}-L.j
pg`}
                    alt={title}
                />
                <button className="favorite">♡</button>
            </div>
            <div className="book-info">
                {title && <h3>{title}</h3>}
                {author_name && <p>{author_name.join(',')}</p>}
                {first_publish_year && (<span className="year">{first_publish_year}</span>)}
            </div>
        </Link>
    )
}

export default BookCard

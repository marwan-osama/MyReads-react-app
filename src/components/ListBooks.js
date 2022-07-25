import Title from "./Title";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

const ListBooks = ({ books, selectShelf }) => {
	return (
		<div className="list-books">
			<Title />
			<div className="list-books-content">
				<div>
					<Shelf
						title="Currently Reading"
						books={books.filter((book) => book.shelf === "currentlyReading")}
						selectShelf={selectShelf}
					/>
					<Shelf
						title="Read"
						books={books.filter((book) => book.shelf === "read")}
						selectShelf={selectShelf}
					/>
					<Shelf
						title="Want to read"
						books={books.filter((book) => book.shelf === "wantToRead")}
						selectShelf={selectShelf}
					/>
				</div>
			</div>
			<div className="open-search">
				<Link to="/search">Add a book</Link>
			</div>
		</div>
	);
};

export default ListBooks;

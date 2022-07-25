import Book from "./Book";

const Shelf = ({ title, books, selectShelf }) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map((book) => (
						<Book book={book} selectShelf={selectShelf} key={book.id} />
					))}
				</ol>
			</div>
		</div>
	);
};

export default Shelf;

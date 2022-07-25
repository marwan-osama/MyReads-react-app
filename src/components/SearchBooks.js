import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { search } from "../utils/BooksAPI";
import Book from "./Book";

const SearchBooks = ({ selectShelf, books }) => {
	const [query, setQuery] = useState("");
	const [resultBooks, setResultBooks] = useState([]);
	let [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const inputDebouncer = useRef(null);
	const loc = useLocation();

	const handleChange = async (e) => {
		setQuery(e.target.value.trimStart());
	};

	useEffect(() => {
		// set query state to query parameter on first render
		const initQuery = () => {
			const urlQuery = new URLSearchParams(loc.search).get("q");
			if (urlQuery) {
				setQuery(urlQuery);
			}
		};

		initQuery();
	}, []);

	useEffect(() => {
		setLoading(false);
	}, [resultBooks]);

	useEffect(() => {
		let mounted = true;

		setLoading(true);

		const searchBooks = async () => {
			const fetchedBooks = query ? await search(query, 20) : [];
			if (mounted && Array.isArray(fetchedBooks)) {
				fetchedBooks.forEach((noShelfBook) => {
					const bookWithShelf = books.find((b) => b.id === noShelfBook.id);
					noShelfBook.shelf = bookWithShelf ? bookWithShelf.shelf : "none";
				});
				setResultBooks(fetchedBooks);
			} else {
				setLoading(false);
			}
		};

		// input debouncing code
		clearTimeout(inputDebouncer.current);
		inputDebouncer.current = setTimeout(() => {
			inputDebouncer.current = null;
			setSearchParams({ q: query });
			searchBooks();
		}, 250);

		return () => {
			mounted = false;
		};
	}, [query, books]);

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link className="close-search" to="/">
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title, author, or ISBN"
						value={query}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">
					{query &&
						resultBooks.map((book) => (
							<Book book={book} selectShelf={selectShelf} key={book.id} />
						))}
				</ol>
			</div>
			{loading ? (
				<div className="loading-screen">
					<div className="rotor"></div>
				</div>
			) : (
				""
			)}
			{!loading && !resultBooks.length && (
				<p style={{ textAlign: "center", color: "gray" }}>
					There is no results
				</p>
			)}
		</div>
	);
};

export default SearchBooks;

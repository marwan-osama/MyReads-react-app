import "../css/App.css";
import { useEffect, useState } from "react";
import { getAll, update } from "../utils/BooksAPI";
import { Route, Routes } from "react-router-dom";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import BookDetails from "./BookDetails";

function App() {
	const [books, setBooks] = useState([]);

	const selectShelf = async (book, shelf) => {
		let booksCopy = [...books];
		const bookIndex = booksCopy.findIndex(
			(currentBook) => currentBook.id === book.id
		);
		if (bookIndex !== -1) {
			booksCopy[bookIndex].shelf = shelf;
		} else {
			book.shelf = shelf;
			booksCopy = [...books, book];
		}
		setBooks(booksCopy);
		const res = await update(book, shelf);
		return res;
	};

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			const response = await getAll();
			if (mounted) {
				setBooks(response);
			}
		};
		fetchData();
		return () => (mounted = false);
	}, []);

	return (
		<Routes>
			<Route
				exact
				path="/"
				element={<ListBooks books={books} selectShelf={selectShelf} />}
			/>
			<Route
				exact
				path="/search"
				element={<SearchBooks books={books} selectShelf={selectShelf} />}
			/>
			<Route exact path="/:id" element={<BookDetails books={books} />} />
		</Routes>
	);
}

export default App;

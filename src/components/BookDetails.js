import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { get } from "../utils/BooksAPI";
import fullStar from "../icons/star-full.svg";
import emptyStar from "../icons/star-empty.svg";

const BookDetails = () => {
	const { id } = useParams();
	const [book, setBook] = useState({});

	const nav = useNavigate();
	const loc = useLocation();

	const reviewStars = (num) => {
		let stars = [];
		for (let i = 0; i < 5; i++) {
			stars.push(
				<img
					key={i}
					src={stars.length < num ? fullStar : emptyStar}
					alt="star"
				></img>
			);
		}
		return <div>{stars}</div>;
	};

	const closePage = () => {
		nav(-1);
	};

	useEffect(() => {
		const fetchBook = () => {
			if (loc.state) {
				setBook(loc.state);
			} else {
				get(id).then((data) => {
					setBook(data);
				});
			}
		};
		fetchBook();
	}, [id, loc.state]);

	useEffect(() => {
		console.log("rerender");
	});

	return (
		<div className="book-details">
			<div className="book-thumbnail">
				<div
					style={{
						backgroundImage: `url(${
							book.imageLinks && book.imageLinks.thumbnail
						})`,
					}}
				></div>
			</div>
			<div className="book-info">
				<div className="book-info-top">
					<div className="book-title">
						<h2 className="book-name fs-xl d-g-c margin-reset">
							<strong>{book.title}</strong>
						</h2>
						<p className="book-author margin-reset l-g-c">
							{book.authors && book.authors.join(", ")}
						</p>
					</div>

					<div className="book-rating">
						<div className="rating-stars">
							{reviewStars(Math.round(book.averageRating))}
						</div>
						<p className="rating-count margin-reset fs-xxs">
							{book.ratingsCount
								? `${book.ratingsCount} Ratings`
								: "No Ratings"}
						</p>
					</div>
				</div>
				<p className="book-description fs-s">{book.description}</p>
				<button onClick={closePage} className="close-page">
					<strong className="fs-xs fw-xl">&#171; Go back</strong>
				</button>
			</div>
		</div>
	);
};

export default BookDetails;

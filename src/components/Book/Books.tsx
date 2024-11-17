import React, { useEffect, useState, useCallback } from "react";
import './Books.scss';
import { faArrowRightArrowLeft, faMagnifyingGlass, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { deleteAuthData, getAuthData, postAuthData, putAuthData } from "../../api/apiService";


const Books: React.FC = () => {
    const userObj = JSON.parse(sessionStorage.userInfo);
    const navigate = useNavigate();

    const [bookList, setBookList] = useState<any[]>([]);
    // @ts-ignore
    const [deletedBook, setDeletedBook] = useState<any>(null);
    // @ts-ignore
    const [bookExchanged, setBookExchanged] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchFilterValue, setSearchFilterValue] = useState<string>("Title");
    const [showAllBookFlag, setShowAllBookFlag] = useState<boolean>(false);
    const [itemOffset, setItemOffset] = useState<number>(0);

    const endOffset = itemOffset + 5;
    const currentItems = bookList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(bookList.length / 5);

    // Fetch books and handle pagination
    const fetchBooksList = useCallback(async () => {
        const url = showAllBookFlag
            ? `/api/v1/books/user?userId=${userObj.id}`
            : "/api/v1/books";
        try {
            const response = await getAuthData(url);
            setBookList(response?.data);
        } catch (error: any) {
            alert(error?.response?.data.message);
            console.error("Error fetching book list:", error);
        }
    }, [showAllBookFlag, userObj.id]);

    useEffect(() => {

        if (searchValue.length === 0) {
            fetchBooksList();
        }
    }, [fetchBooksList, searchValue]);

    const deleteBookHandler = async (book: any) => {
        try {
            const result = await deleteAuthData(`/api/v1/book/${book.id}?userId=${userObj.id}`)
            setDeletedBook(result?.data);
            fetchBooksList();
        } catch (error: any) {
            alert(error?.response?.data?.message || "An error occurred. Please try again.")
            console.error("Error deleting book:", error);
        }
    };

    const bookSearchHandler = async () => {
        try {
            const searchPayload = searchFilterValue === "Title" ? { title: searchValue }
                : searchFilterValue === "Author" ? { author: searchValue }
                    : { genre: searchValue };

            const result = await postAuthData(`/api/v1/search-books?page=0&size=5`, searchPayload);
            setBookList(result?.data.content);
        } catch (error) {
            console.error("Error searching books:", error);
        }
    };

    const bookExchageHandler = async (book: any) => {
        try {
            const result = await putAuthData(
                `/api/v1/book/${book.id}`,
                {
                    available: !book.available,
                    userId: userObj.id
                }
            );
            setBookExchanged(result?.data);
            fetchBooksList();
        } catch (error) {
            console.error("Error exchanging book:", error);
        }
    };

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * 5) % bookList.length;
        setItemOffset(newOffset);
    };

    const showAllBooksHandler = () => {
        setShowAllBookFlag((prevState) => !prevState);
    };

    return (
        <>
            <div>
                <div className="list-container">
                    <h2 className="mb-4">{showAllBookFlag ? "Your Books !!!" : "Available Books from other people !!!"}</h2>
                    <div className="search-container">
                        <div className="search-input-container">
                            <Dropdown as={ButtonGroup} className="dropdown-container">
                                <Button variant="danger" className="dropdown-dp">
                                    Search By {searchFilterValue}
                                </Button>
                                <Dropdown.Toggle
                                    split
                                    variant="danger"
                                    className="dropdown-dp"
                                    id="dropdown-split-basic"
                                />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSearchFilterValue("Title")}>Title</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSearchFilterValue("Author")}>Author</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSearchFilterValue("Genre")}>Genre</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <input
                                type="input"
                                placeholder="Search Books"
                                id="floatingSearch"
                                className="search-input"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <Button className="search-btn" onClick={bookSearchHandler}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Button>
                        </div>
                        <div>
                            <Button
                                className="btnShowAll"
                                variant="danger"
                                onClick={showAllBooksHandler}
                            >
                                {showAllBookFlag ? <p>Show All Books!</p> : <p>Show My Books!</p>}
                            </Button>
                        </div>
                    </div>
                    <table className="book-table">
                        <thead>
                            <tr className="book-heading mb-4">
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Author</th>
                                <th>Availability</th>
                                <th>Contact Book Owner</th>
                                <th>Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((book) => (
                                <tr className="book-data" key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.author}</td>
                                    <td>{book.available ? "Yes" : "No"}</td>
                                    <td>{book.user.phone}</td>
                                    <td>
                                        {showAllBookFlag ? (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className={book.available ? "exchange-btn" : "exchanged-btn"}
                                                onClick={() => bookExchageHandler(book)}
                                            >
                                                {book.available ? "Exchange" : "Exchanged"}
                                                <FontAwesomeIcon icon={faArrowRightArrowLeft} className="exchange-icon" />
                                            </Button>
                                        ) : (
                                            <div className="action-btn">
                                                {userObj.id === book.user.id ? (

                                                    (

                                                        <div>
                                                            <FontAwesomeIcon
                                                                icon={faPenToSquare}
                                                                className="edit-icon"
                                                                onClick={() => {
                                                                    navigate("/add-book", { state: { updatedBookData: book, editFlag: true } });
                                                                }}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                className="edit-icon"
                                                                onClick={() => deleteBookHandler(book)}
                                                            />
                                                        </div>


                                                    )

                                                ) : (

                                                    <div>

                                                        {book.available ? "Request for a book" : "Book is not available at the moment"}
                                                    </div>


                                                )

                                                }



                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=" next>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<previous "
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageClassName="page-item"
                        activeClassName="active"
                    />
                </div>
            </div>
        </>
    );
};

export default Books;

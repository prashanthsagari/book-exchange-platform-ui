import { useLocation, useNavigate } from "react-router-dom";
import './BookAdder.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form as BootstrapForm, Row, Col, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { postAuthData, putAuthData } from "../../api/apiService";

// Define initial form values type
interface BookFormValues {
    title: string;
    genre: string;
    author: string;
    location: string;
    condition: string;
    available: boolean;
}

const BookAdder: React.FC = () => {
    const propData = useLocation();
    const userObj = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
    const navigate = useNavigate();

    // State to handle success message visibility
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Determine if in edit mode
    const isEditMode = propData?.state?.editFlag;
    const updatedBookData = propData?.state?.updatedBookData || {};

    // Form initial values
    const initialValues: BookFormValues = {
        title: updatedBookData.title || "",
        genre: updatedBookData.genre || "",
        author: updatedBookData.author || "",
        location: updatedBookData.location || "",
        condition: updatedBookData.bookCondition || "",
        available: updatedBookData.available ?? true,
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        title: Yup.string().required("Book name is required"),
        genre: Yup.string().required("Genre is required"),
        author: Yup.string().required("Author name is required"),
        location: Yup.string().required("Location is required"),
        condition: Yup.string().required("Condition is required"),
        available: Yup.boolean().required("Availability is required"),
    });

    // Handler for form submission
    const handleFormSubmit = async (values: BookFormValues) => {
        const apiCall = isEditMode
            ? putAuthData(`/api/v1/book/${updatedBookData.id}`, {
                userId: userObj.id,
                ...values,
            })
            : postAuthData("/api/v1/book", {
                userId: userObj.id,
                ...values,
            });

        try {
            const response = await apiCall;
            if (response?.status === 200) {
                navigate("/books");
            }
        } catch (error: any) {
            console.error(`Error ${isEditMode ? "updating" : "adding"} book:`, error);
            // Show error message
            setErrorMessage(error?.response?.data?.message || "An error occurred. Please try again.");
            setShowError(true);

        }
    };

    // Helper component to render form fields with descriptions
    const renderFieldWithDescription = (
        name: string,
        placeholder: string,
        description: string,
        type: string = "input"
    ) => (
        <Row className="align-items-center mb-4">
            <Col sm={4}>
                <label className="font-monospace" style={{ color: "black" }}>{description}</label> {/* Description with black font */}
            </Col>
            <Col sm={8}>
                <div className="form-floating">
                    <Field
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className="form-control"
                        style={{ color: "red !important" }} // Input text color set to black
                    />
                    <ErrorMessage
                        name={name}
                        component="div"
                        className="error-message"
                    />
                </div>
            </Col>
        </Row>
    );


    return (
        <>

            <div className="book-container">
                <h1 className="mb-5">{isEditMode ? "Update Book" : "Add Your Book"}</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="get-start">
                                {/* Render fields with descriptions */}
                                {renderFieldWithDescription("title", "Enter Book Name", "Book Title: The name of the book you want to add.")}
                                {renderFieldWithDescription("genre", "Enter Genre", "Genre: Specify the genre of the book (e.g., Education, Non-Fiction).")}
                                {renderFieldWithDescription("author", "Enter Author", "Author: Provide the author's name.")}
                                {renderFieldWithDescription("location", "Enter Location", "Location: Indicate where the book is located.")}
                                {renderFieldWithDescription("condition", "Enter Book Condition", "Condition: Describe the condition of the book (e.g., New, Used).")}

                                {/* Availability Toggle */}
                                <Row className="align-items-center mb-4">
                                    <Col sm={4}>
                                        <label style={{ color: "black" }}>Availability</label>
                                    </Col>
                                    <Col sm={8}>
                                        <BootstrapForm.Check
                                            type="switch"
                                            id="availability-switch"
                                            label={values.available ? "Available" : "Not Available"}
                                            checked={values.available}
                                            style={{ color: "black !important" }}
                                            onChange={() => setFieldValue("available", !values.available)}
                                        />
                                    </Col>
                                </Row>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="btnAdd"
                                    variant="danger"
                                    style={{ width: "400px" }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Add"}
                                </Button>
                                {showError && (
                                    <Alert
                                        variant="error"
                                        onClose={() => setShowError(false)}
                                        dismissible
                                        style={{
                                            width: '200px',
                                            height: '50px',
                                            border: '1px solid #e30f0f',
                                            padding: '10px',
                                        }}
                                    >
                                        <Alert.Heading>Error!</Alert.Heading>
                                        
                                    </Alert>
                                )}
                                <p className="text-danger">{errorMessage}</p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>

    );
};

export default BookAdder;

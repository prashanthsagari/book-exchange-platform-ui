import React, { useState } from 'react';
import './Profile.scss';
import { putAuthData } from '../../api/apiService';
import { Alert } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Profile: React.FC = () => {
    const [userInfo] = useState(() => {
        const savedUserInfo = sessionStorage.getItem('userInfo');
        return savedUserInfo ? JSON.parse(savedUserInfo) : null;
    });

    const initialUser = {
        username: userInfo?.username || '',
        email: userInfo?.email || '',
        phone: userInfo?.phone || '',
        currentPassword: '',
        newPassword: '',
    };

    // State for user data and edit mode
    const [user, setUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);

    // State to handle success message visibility
    const [showSuccess, setShowSuccess] = useState(false);

    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
            .required('Phone is required'),
        currentPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password confirmation is required'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            .required('Password confirmation is required'),

    });

    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Save edited user data
    const saveChanges = async (values: typeof initialUser) => {
        try {
            setUser(values);
            // Simulate an API call for profile update
            await putAuthData('/api/v1/profile/update', values);
            setIsEditing(false);

            // Show success message
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error: any) {
            console.error('API Error:', error);
            var issue = document.getElementById('failed');
            if (issue !== null && issue !== undefined) {
                issue.textContent = error?.response?.data?.message || 'An error occurred';
            }
        }
    };

    return (
        <>
            {/* Show success message if showSuccess is true */}
            {showSuccess && (
                <Alert
                    variant="success"
                    onClose={() => setShowSuccess(false)}
                    dismissible
                    style={{
                        width: '300px',
                        height: '50px',
                        border: '1px solid #28a745',
                        padding: '10px',
                        margin: '0 auto'
                    }}
                >
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>User details updated successfully.</p>
                </Alert>
            )}

            <div className="profile-page">
                <div className="profile-container">
                    {isEditing ? (
                        // Edit form view with Formik
                        <Formik
                            initialValues={user}
                            validationSchema={validationSchema}
                            onSubmit={saveChanges}
                        >
                            {({ isSubmitting }) => (
                                <Form className="profile-edit-form">
                                    <div>
                                        <label htmlFor="username">Username:</label>
                                        <Field
                                            id="username"
                                            name="username"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="error-message"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="phone"
                                            placeholder="Phone"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="error-message"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="password"
                                            name="currentPassword"
                                            placeholder="Current Password"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="currentPassword"
                                            component="div"
                                            className="error-message"
                                        />
                                    </div>
                                    <div className='error text-center' id='failed'></div>
                                    <div>
                                        <Field
                                            type="password"
                                            name="newPassword"
                                            placeholder="newPassword"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="newPassword"
                                            component="div"
                                            className="error-message"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="confirmPassword"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="error-message"
                                        />
                                    </div>
                                    <div className="button-group">
                                        <button
                                            type="submit"
                                            className="save-button"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            type="button"
                                            className="cancel-button"
                                            onClick={toggleEditMode}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        // Display view
                        <div className="profile-info">
                            <h2>{user.username}</h2>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {user.phone}
                            </p>
                            <button
                                className="edit-button"
                                onClick={toggleEditMode}
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;

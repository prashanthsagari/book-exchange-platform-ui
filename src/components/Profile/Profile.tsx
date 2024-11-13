import React, { useState } from 'react'
import './Profile.scss'
import { putAuthData } from '../../api/apiService';
import { Alert } from 'react-bootstrap';

// // Define the types for the user profile
// interface UserProfile {
//     username: string;
//     email: string;
//     phone: string;
// }


const Profile: React.FC = () => {

    const [userInfo] = useState(() => {
        const savedUserInfo = sessionStorage.getItem('userInfo');
        return savedUserInfo ? JSON.parse(savedUserInfo) : null;
    });


    const initialUser: any = {
        username: userInfo.username,
        email: userInfo.email,
        phone: userInfo.phone
    };

    // State for user data and edit mode
    const [user, setUser] = useState<any>(initialUser);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedUser, setEditedUser] = useState<any>(initialUser);

    // State to handle success message visibility
    const [showSuccess, setShowSuccess] = useState(false);

    // Handle input changes in the form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setEditedUser(user); // Reset the edited fields to the current user data
    };

    // Save edited user data
    const saveChanges = async () => {
        try {
            setUser(editedUser);
            // alert(JSON.stringify(editedUser));

            // const books = await getAuthData('/api/v1/book-mgmt/books');
            // alert(JSON.stringify(books));

            // Simulate an API call for login
            await putAuthData('/api/v1/profile/update', editedUser);
            setIsEditing(false);
            // Show success message
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

        } catch (error: any) {
            console.error("API Error:", error);
        }
    };




    return (
        <>
            {/* {userInfo ? (
        <>
          <p>Username: {userInfo.username}</p>
          <p>ID: {userInfo.id}</p>
          
        </>
      ) : (
        <p>No user info available</p>
      )} */}

            {/* Show success message if showSuccess is true */}
            {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible style={{
                    width: '300px', // Set the width of the alert
                    height: '50px', // Set the height of the alert
                    border: '1px solid #28a745', // Border color matching success theme
                    padding: '10px', // Adjust padding if needed
                }}>
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>User details updated successfully.</p>
                </Alert>
            )}

            <div className="profile-page">
                <div className="profile-container">
                    {/* <div className="profile-picture">
                        <img src={user.profilePicture} alt={`${user.username}'s profile`} />
                    </div> */}

                    {isEditing ? (
                        // Edit form view
                        <div className="profile-edit-form">

                            <input
                                type="email"
                                name="email"
                                value={editedUser.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editedUser.phone}
                                onChange={handleInputChange}
                                placeholder="Phone"
                            />

                            <div className="button-group">
                                <button className="save-button" onClick={saveChanges}>Save</button>
                                <button className="cancel-button" onClick={toggleEditMode}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        // Display view
                        <div className="profile-info">
                            <h2>{user.username}</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <button className="edit-button" onClick={toggleEditMode}>Edit Profile</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile

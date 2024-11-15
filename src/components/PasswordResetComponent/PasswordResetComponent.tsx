import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { putData } from "../../api/apiService";
import './PasswordResetComponent.scss';
import { Link } from "react-router-dom";


interface PasswordResetFormValues {
    username: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}


const initialValues: PasswordResetFormValues = {
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

// Define the Yup validation schema
const validationSchema = Yup.object({
    currentPassword: Yup.string()
        .required("Current password is required"),
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must be at most 40 characters")
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
});

const PasswordResetComponent: React.FC = () => {

    const handleSubmit = async (values: PasswordResetFormValues, { setSubmitting, resetForm, setStatus }: any) => {
        try {
            // Make the API call
            const response = await putData('/api/v1/auth/reset-password', {
                username: values.username,
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });

            if (response.status === 200) {
                setStatus({ successMessage: "Password has been successfully reset." });
                setTimeout(() => {
                    resetForm();
                }, 3000);

            } else {
                setStatus({ errorMessage: response.data.message || "Password reset failed." });
            }
        } catch (error: any) {
            setStatus({
                errorMessage: error.response?.data?.message || "An error occurred. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="password-reset-container">
            <h2>Reset Password</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field
                                type="username"
                                id="username"
                                name="username"
                                placeholder="Enter username"
                                className="form-control"
                            />
                            <ErrorMessage name="username" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <Field
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                placeholder="Enter current password"
                                className="form-control"
                            />
                            <ErrorMessage name="currentPassword" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <Field
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="Enter new password"
                                className="form-control"
                            />
                            <ErrorMessage name="newPassword" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                className="form-control"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="error" />
                        </div>

                        {status && status.errorMessage && (
                            <div className="error">{status.errorMessage}</div>
                        )}
                        {status && status.successMessage && (
                            <div className="success">{status.successMessage}</div>
                        )}

                        <button type="submit" disabled={isSubmitting} className="btn">
                            {isSubmitting ? "Resetting..." : "Reset Password"}
                        </button>
                        <Link className='d-flex justify-content-center no-underline col-6 mt-4 mx-auto' to="/login">Login</Link>
                    </Form>
                )}
            </Formik>


        </div>
    );
};

export default PasswordResetComponent;

import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import './UserRegistration.scss';
import { postData } from '../../api/apiService';
import { Link } from 'react-router-dom';

// Validation schema for the form
const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Password confirmation is required'),
    phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
});

// Initial values for the form fields
const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
};

const Registration: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);


    // Handle form submission
    const handleSubmit = async (values: any) => {
        try {
            delete values.confirmPassword; // Remove confirmPassword before sending to API
            await postData('/api/v1/auth/signup', values);
            setSubmitted(true); // Update the state on successful submission
        } catch (error: any) {
            console.error('Error:', error);
            var issue = document.getElementById('failed');
            if (issue !== null && issue !== undefined) {
                issue.textContent = error?.response?.data?.message || 'An error occurred';
            }
        }
    };

    // InputField Component to reduce duplication
    const InputField = ({ label, name, type }: any) => (
        <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
            <label htmlFor={name} className='col-6 m-2'>
                {label}:
            </label>
            <Field
                type={type}
                name={name}
                id={name}
                className='col-6 form-control'
            />
            <ErrorMessage name={name} component='div' className='error text-center' />
        </div>
    );

    return (
        <div className='border border-primary'>
            <h3 className='text-center mt-4'>User Registration Form</h3>
            {submitted === false ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className='row justify-content-md-center align-items-center'>
                            {/* Reusable Input Fields */}
                            <InputField label="User Name" name="username" type="text" />
                            <InputField label="Email" name="email" type="email" />
                            <InputField label="Password" name="password" type="password" />
                            <InputField label="Confirm Password" name="confirmPassword" type="password" />
                            <InputField label="Phone" name="phone" type="text" />

                            {/* Submit Button */}
                            <div className='d-flex justify-content-center'>
                                <button type='submit' className='btn w-100'>
                                    Submit
                                </button>
                            </div>
                            <div className='error text-center' id='failed'></div>
                        </div>
                    </Form>
                </Formik>
            ) : (
                <div className='success text-center'>
                    User Registered Successfully.{' '}
                    <Link className='m-3' to='/login'>
                        Go to Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Registration;

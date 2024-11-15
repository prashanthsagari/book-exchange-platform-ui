import { ErrorMessage, Field, Formik, Form } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { postData } from '../../api/apiService';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
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



const Registration: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    let initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    };


    // write your validation logic here


    const handleSubmit = async (values: any) => {
        try {
            delete values.confirmPassword;

            // Simulate an API call for login
            const response = await postData('/api/v1/auth/signup', values);
            console.log('Response:', response.data);
            alert('User Registered.');
            setSubmitted(true);


        } catch (error: any) {
            alert('NOT REGITSTER');
            console.error('Error:', error);
        }
    };




    return (
        <>
            <div className='border border-primary'>
                <h3 className='text-center mt-4'>User Registration Form </h3>
                {submitted === false ? (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className='row justify-content-md-center align-items-center'>
                                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                                    <label htmlFor='username' className='col-4 m-2'>
                                        User Name:
                                    </label>
                                    <Field
                                        type='text'
                                        name='username'
                                        id='username'
                                        className='col-6'
                                    />
                                    <ErrorMessage
                                        name='username'
                                        component='div'
                                        className='error text-center'
                                    />
                                </div>

                                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                                    <label htmlFor='email' className='col-4 m-2'>
                                        Email:
                                    </label>
                                    <Field
                                        type='email'
                                        name='email'
                                        id='email'
                                        className='col-6'
                                    />
                                    <ErrorMessage
                                        name='email'
                                        component='div'
                                        className='error text-center'
                                    />
                                </div>

                                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                                    <label htmlFor='password' className='col-4 m-2'>
                                        Password:
                                    </label>
                                    <Field
                                        type='password'
                                        name='password'
                                        id='password'
                                        className='col-6'
                                    />
                                    <ErrorMessage
                                        name='password'
                                        component='div'
                                        className='error text-center'
                                    />
                                </div>

                                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                                    <label htmlFor='confirmPassword' className='col-4 m-2'>
                                        Confirm Password:
                                    </label>
                                    <Field
                                        type='password'
                                        name='confirmPassword'
                                        id='confirmPassword'
                                        className='col-6'
                                    />
                                    <ErrorMessage
                                        name='confirmPassword'
                                        component='div'
                                        className='error text-center'
                                    />
                                </div>

                                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                                    <label htmlFor='phone' className='col-4 m-2'>
                                        Phone:
                                    </label>
                                    <Field
                                        type='text'
                                        name='phone'
                                        id='phone'
                                        className='col-6'
                                    />
                                    <ErrorMessage
                                        name='phone'
                                        component='div'
                                        className='error text-center'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='btn btn-primary btn-sm col-6 m-4  align-items-center'
                                >
                                    Submit
                                </button>
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
        </>
    )
}

export default Registration

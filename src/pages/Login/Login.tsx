import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthToken, setAuthToken } from '../../utils/auth';
import { postData } from '../../api/apiService';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login: React.FC = () => {

  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      const response = await postData('/api/v1/auth/signin', values);
      if (response.status === 404) {
        var issue = document.getElementById('failed');
        if (issue !== null && issue !== undefined) {
          issue.textContent = response?.data?.message || 'An error occurred';
        }
      } else {
        // Store the token in sessionStorage
        setAuthToken(response.data);
        // Navigate to the dashboard
        navigate('/dashboard');
      }


    } catch (error: any) {
      var issue = document.getElementById('failed');
      if (issue !== null && issue !== undefined) {

        issue.textContent = error?.response?.data?.message || 'Service is down 503';
        issue.textContent += " " + error?.response?.data?.status || 'Error';
      }
      console.error("API Error:", error);
      clearAuthToken();
      navigate('/login');
    }
  };

  return (
    <>
      <div className='border border-primary mx-auto'>
        <h3 className='text-center mt-4'>User Login </h3>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='row justify-content-md-center align-items-center'>
              <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                <label htmlFor='username' className='col-4 m-2'>
                  Name:
                </label>
                <Field
                  type='text'
                  name='username'
                  autoComplete='off'
                  id='username'
                  placeholder="Username"
                  className='col-6'
                />
                <ErrorMessage
                  name='username'
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
                  autoComplete='off'
                  placeholder="Password"
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
              <div className='error text-center' id='failed'></div>
              <div className='row d-flex justify-content-center'>

                <button
                  type='submit'

                  className='btn btn-small col-12 align-items-center'
                >
                  Submit
                </button>
                <Link className='text-center col-12' to="/reset-password">Account Recovery</Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>

  );
};

export default Login;

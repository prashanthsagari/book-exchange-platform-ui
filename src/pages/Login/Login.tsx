import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
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


  // const [setIsLoggedIn] = useState<string | null>('false');
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {

  //   };

  //   fetchData();
  // }, []);

  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      // Simulate an API call for login
      const response = await postData('/api/v1/auth/signin', values);

      // Store the token in sessionStorage
      setAuthToken(response);
      // setIsLoggedIn('true');

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error: any) {
      var ab = document.getElementById('failed');
      if (ab !== null && ab !== undefined) {
        ab.textContent = error?.response?.data?.message || 'An error occurred';
        ab.textContent += " " + error?.response?.data?.status || 'Error';
      }
      console.error("API Error:", error);
      clearAuthToken();
      // setIsLoggedIn('false');
      // const history = createBrowserHistory();
      // history.go(0);
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
              <button
                type='submit'
                className='btn btn-primary btn-sm col-6 m-4  align-items-center'
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>

  );
};

export default Login;

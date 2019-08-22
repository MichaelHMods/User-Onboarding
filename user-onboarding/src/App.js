import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

//import dependencies
import { Form, Field, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// import components
import Forms from './component/Form'


//form 
const newUserOnboard = ({ errors, touched, values, status }) =>{
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (status) {
      setUser ([...user, status]);

      }
    }, [status]);
  
  return(
    <div className='user-form'>
      <h1>User Form</h1>

  <Form>
    <Field type='text' name='name' placeholder='Name'/>
    {touched.name && errors.name &&(
      <p className="error">{errors.name}</p>
    )}
    <Field type="email" name='email' placeholder='ex. email@provider.com'/>
    {touched.email && errors.email &&(
      <p className='error'>{errors.email}></p>
    )}
    <Field type="password" name='password' placeholder='PASSWORD'/>
    {touched.password && errors.password && (
      <p className='error'>{errors.password}</p>
    )}
    <label className="checkbox-container">
      Terms of Service
      <Field 
        type='checkbox'
        name='ToS'
        checked={values.ToS}
      />
      <span className='checkmark'/>
      </label>
    <button type="submit">Submit!</button>
    
  </Form>

{/* map */}
  {user.map(users =>
    <ul key={user.id}>
      <li>Name: {user.name}</li>
      <li>Email: {user.email}</li>
      <li>Password: {user.password}</li>
      
    </ul>
    )}

  </div>
  );
};
  const FormikNewUserForm = withFormik({
  mapPropsToValues({ name, email, password, ToS }) {
    return{
    ToS: ToS || false,
    name: name || '',
    email: email || '',
    password: password || '',

  };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("required field"),
    email: Yup.string().email().required("How would we sell it?"),
    password: Yup.string().required('for your security'),
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users', values)
      .then(res =>
        {
          setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
  })(newUserOnboard)

export default FormikNewUserForm;

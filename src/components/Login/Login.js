import './Login.scss';
import axios from 'axios';
import logo from '../../assets/logo.png'
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { FormField, Button, Form } from 'semantic-ui-react'


function Login({ handleLogin, backendPort }) {
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', event.target.username.value);
        formData.append('password', event.target.password.value);

        axios.post(`${backendPort}/perform_login`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true
        })
            .then((response) => {
                console.log("Login is successful", response.data);

                console.log(response.data)
                // potentially optional
                handleLogin(response.data);

                //save the user data to local storage
                localStorage.setItem('user', JSON.stringify(response.data));

                // code to retrieve user data from local storage
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                    console.log(user.userId); // Or however the userId is named in your user object
                }
                console.log(user)

                axios.get(`${backendPort}/users/api/auth/check`, { withCredentials: true })
                    .then(response => {
                        const isAuthenticated = response.data;
                        console.log(response.data)
                        if (isAuthenticated) {
                            console.log("User is authenticated");
                            navigate('/main');
                        } else {
                            console.log("User is not authenticated");
                        }
                    })
                    .catch(error => console.error('Error checking authentication:', error));
            })
            .catch((error) => {
                console.error("Login failed", error);
                // Handle login failure (e.g., display an error message)
            });
    };
    
    return (
        <div className='login'>
            <img className='logo' src={logo} alt="logo"/>
            <div className='formContainer'>
            <Form onSubmit={handleSubmit}>
                <h2>Art for your heart</h2>
                <FormField>
                <label>Username</label>
                <input placeholder='Username'  type="text" name= "username" />
                </FormField>
                <FormField>
                <label>Password</label>
                <input placeholder='Password'type="text" name='password' />
                </FormField>
                <Button type='submit'>Login</Button>
            </Form>
            <a onClick={() => navigate('/signup')}>Don't have account? Signup</a>
            </div>
        </div>
    );
}

export default Login;
import './Signup.scss';
import axios from 'axios';
import logo from '../../assets/logo.png'
import { useNavigate} from 'react-router-dom';
import { FormField, Button, Form, FormSelect, FormTextArea, FormCheckbox } from 'semantic-ui-react'

function Signup(){
    const navigate = useNavigate();

    async function handleSubmit (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', event.target.name.value);
        formData.append('username', event.target.username.value);
        formData.append('password', event.target.password.value);
        formData.append('age', parseInt(event.target.age.value));
        formData.append('height', event.target.height.value);
        formData.append('location', event.target.location.value);
        formData.append('gender', event.target.gender.value);
        formData.append('bio', event.target.bio.value);
        formData.append('realPhoto', event.target.realPhoto.files[0]);
        for (const file of event.target.artPhotos.files) {
            formData.append('artPhotos', file);
        }
        formData.append('interests', event.target.interests.value);
        formData.append('roles', JSON.stringify(['ROLE_USER']));

        axios.post(`${backendPort}/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
            .then((response) => {
                navigate('/');
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const options = [
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'n', text: 'Nonbinary', value: 'nonbinary' },
      ]
    return (
        <div className='signup'>
            <img className='logo'src={logo} alt="logo"/>
            <Form className='formContainer' onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <FormField>
                <label>Name</label>
                <input placeholder='name' type="text" name= "name" />
                </FormField>
                <FormField>
                <label>Username</label>
                <input placeholder='Username' type="text" name= "username" />
                </FormField>
                <FormField>
                <label>Password</label>
                <input placeholder='Password' type="text" name= "password" />
                </FormField>
                <FormField>
                    <label>Age</label>
                    <input placeholder='Age' type="number" name="age" />
                </FormField>
                <FormField>
                    <label>Height</label>
                    <input placeholder='Height' type="text" name="height" />
                </FormField>
                <FormField>
                    <label>Location</label>
                    <input placeholder='Location' type="text" name="location" />
                </FormField>
                <FormField>
                    <label>Gender</label>
                    <input placeholder='Gender' type="text" name="gender" />
                </FormField>
                <FormField>
                    <label>Bio (Tell Us About Yourself!)</label>
                    <input placeholder='Bio' type="text" name="bio" />
                </FormField>
                <FormField>
                    <label>Profile Photo</label>
                    <input type="file" name="realPhoto" accept="image/*" />
                </FormField>
                <FormField>
                    <label>Art Photos</label>
                    <input type="file" name="artPhotos" accept="image/*" multiple />
                </FormField>
                <FormField>
                    <label>Interests</label>
                    <input placeholder='Interests' type="text" name="interests"  />
                </FormField>
                <FormCheckbox label='I agree to the Terms and Conditions' />
                <Button type='submit'>Signup</Button>
            </Form>
        </div>
    );
}

export default Signup;
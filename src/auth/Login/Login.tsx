import { useContext, useState } from 'react';
import FormLayout from '../../components/FormLayout';
import Title from '../../components/Title';
import { toast } from 'react-toastify';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import User from '../Signup/Signup';
import { NavLink } from 'react-router-dom';

import { setToken } from '../TokenManager';
import { login } from '../../services/ApiService';
import { AppContext } from '../../App';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(AppContext);
    const navigate = useNavigate();

    function validate(): boolean {
        if (!email.includes('@')) {
            toast.error('email is invalid.');
            return false;
        }

        if (!password || password.length < 8) {
            toast.error('Password must contain at least 8 characters');
            return false;
        }

        return true;
    }

    function clearFields() {
        setEmail('');
        setPassword('');
    }

    function handleClick() {
        const isValid = validate();
        if (!isValid) {
            return;
        }
        login({
            email,
            password,
        })
            .then((user) => {
                setToken(user.token);
                if (context) {
                    context.setUser(user);
                }

                navigate('/');
                toast.success(`Welcome ${user.firstName}`);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    return (
        <>
            <Title mainText='Login' />

            <FormLayout>
                <form>
                    <div className='form-floating left-input2'>
                        <input
                            type='email'
                            className='form-control'
                            id='floatingInput'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor='floatingInput'>Email</label>
                    </div>
                    <div className='form-floating right-input2'>
                        <input
                            type='password'
                            className='form-control'
                            id='floatingPassword'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor='floatingPassword'>Password</label>
                    </div>

                    <div className='d-flex'>
                        <div>
                            <Link to={'/'}>
                                <button
                                    type='button'
                                    className='btn text-danger'
                                    id='cancel2'
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                        <div>
                            <button
                                type='button'
                                className='btn'
                                id='refresh2'
                                onClick={clearFields}
                            >
                                <i className='bi bi-arrow-clockwise text-primary'></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type='button'
                            className='btn text-white bg-primary'
                            id='submit2'
                            onClick={handleClick}
                            disabled={!email || !password}
                        >
                            Submit
                        </button>
                    </div>
                    <div>
                        <p>
                            Don't have an account?
                            <NavLink to='/register'>Sign up</NavLink>
                        </p>
                    </div>
                </form>
            </FormLayout>
        </>
    );
}

export default Login;

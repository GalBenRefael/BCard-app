import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import FormLayout from '../../components/FormLayout';
import { editUser, getUserById } from '../../services/ApiService';
import { toast } from 'react-toastify';
import { User } from '../../interfaces/User';
import './EditUser.css';

type Props = {};

const EditUser = (props: Props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
    const [isBiz, setIsbiz] = useState(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!id) return;
        getUserById(id).then((user) => {
            setUser(user);
            setFirstName(user.firstName as string);
            setMiddleName(user.middleName as string);
            setLastName(user.lastName as string);
            setPhone(user.phone as string);
            setImageUrl(user.imageUrl as string);
            setImageAlt(user.imageAlt as string);
            setState(user.state as string);
            setCountry(user.country as string);
            setCity(user.city as string);
            setStreet(user.street as string);
            setHouseNumber(user.houseNumber as string);
            setZip(user.zip as string);
            setIsbiz(!!user.isBiz);
        });
    }, [id]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!id) return;

        editUser({
            _id: id,
            firstName,
            middleName,
            lastName,
            phone,
            imageUrl,
            imageAlt,
            state,
            country,
            city,
            street,
            houseNumber,
            zip,
            isBiz,
            cards: user!.cards,
            favorites: user!.favorites,
        })
            .then((json) => {
                navigate('/');
                toast.success('User edited successfully.');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <>
            <Title mainText='Edit user' />
            <FormLayout>
                <form>
                    <div className='d-flex '>
                        <div className='form-floating left-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='City'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>
                                First Name: &#42;
                            </label>
                        </div>

                        <div className='form-floating right-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='Street'
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>Middle Name:</label>
                        </div>
                    </div>

                    <div className='d-flex '>
                        <div className='form-floating left-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>
                                Last Name: &#42;
                            </label>
                        </div>

                        <div className='form-floating right-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='Street'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>Phone:</label>
                        </div>
                    </div>

                    <div className='d-flex '>
                        <div className='form-floating left-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='Image Url'
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>
                                Image Url: &#42;
                            </label>
                        </div>

                        <div className='form-floating right-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='Image Alt'
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>Image Alt:</label>
                        </div>
                    </div>
                    <div className='d-flex '>
                        <div className='form-floating left-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='State'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>State: &#42;</label>
                        </div>

                        <div className='form-floating right-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='State'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>Country:</label>
                        </div>
                    </div>
                    <div className='d-flex '>
                        <div className='form-floating left-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='Country'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>City: &#42;</label>
                        </div>

                        <div className='form-floating right-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='Street'
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>Street:</label>
                        </div>
                    </div>
                    <div className='d-flex '>
                        <div className='form-floating left-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='City'
                                value={houseNumber}
                                onChange={(e) => setHouseNumber(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>
                                House Number: &#42;
                            </label>
                        </div>

                        <div className='form-floating right-input'>
                            <input
                                type='text'
                                className='form-control'
                                id='floatingInput'
                                placeholder='Street'
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>Zip:</label>
                        </div>
                    </div>
                    <div className='form-check box d-flex'>
                        <input
                            className='form-check me-2 mb-2'
                            type='checkbox'
                            checked={isBiz}
                            onChange={() => setIsbiz(!isBiz)}
                        ></input>
                        <label className='form-check-label mb-2'>
                            Sign up as Business
                        </label>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className='w-100 mb-2 btn btn-lg btn-primary border rounded-3 modal-submit-btn'
                        type='submit'
                        id='submit'
                    >
                        Edit
                    </button>
                </form>
            </FormLayout>
        </>
    );
};

export default EditUser;

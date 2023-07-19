import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { Link, useParams } from 'react-router-dom';
import { getCardById } from '../../services/ApiService';
import { CardProps } from '../../interfaces/Card';
import './BusinessPage.css';

const CardDetails = () => {
    const { id } = useParams();
    const [card, setCard] = useState<CardProps>();

    useEffect(() => {
        if (!id) return;
        getCardById(id).then((json) => {
            setCard(json);
        });
    }, []);
    return (
        <>
            <div className=''>
                <Title mainText='Business details' />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div>
                                <label>Title</label>
                                <h3>{card?.bizTitle}</h3>
                            </div>
                            <hr />
                            <div>
                                <label>Description</label>
                                <h3>{card?.bizDescription}</h3>
                            </div>
                            <hr />
                            <div>
                                <label>Address</label>
                                <h3>
                                    {card?.bizStreet}
                                    <br />
                                    {card?.bizCity}, {card?.bizZip}
                                </h3>
                            </div>
                            <hr />
                            <div>
                                <label>Phone</label>
                                <h3>{card?.bizPhone}</h3>
                            </div>
                            <hr />
                            <div>
                                <label>Website</label>
                                <h3>{card?.bizWeb}</h3>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <img
                                id='image'
                                src={card?.bizImage}
                                alt={card?.bizImageAlt}
                                className='img-fluid'
                            />
                        </div>
                    </div>
                </div>

                <div style={{ position: 'fixed', right: '5%', bottom: '20%' }}>
                    <Link to='/'>
                        <button className='btn btn-primary'>
                            Back to home
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CardDetails;

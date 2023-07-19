const { Card } = require('../models/cardModel');

const businessCards = [
    {
        bizTitle: 'Horse Riding',
        bizSubTitle: 'Most relaxing experience',
        bizDescription: 'Come and enjoy the beautiful views',
        bizPhone: '03-2578413',
        bizImage:
            'https://cdn.pixabay.com/photo/2023/06/22/03/58/animals-8080446_1280.jpg',
        bizImageAlt: 'Horses',
        bizEmail: 'horse@mail.com',
        bizWeb: 'www.horse.com',
        bizState: 'Israel',
        bizCountry: 'Israel',
        bizCity: 'Caesarea',
        bizStreet: '1st',
        bizHouseNo: '12',
        bizZip: '91311',
        bizNumber: 829765,
        favorite: false,
        // user_id: 'fakeId123',
    },
    {
        bizTitle: 'Flowers 4 U',
        bizSubTitle: 'best flowers EVER',
        bizDescription: 'Family business with 20+ years of experience',
        bizPhone: '04-6277381',
        bizImage:
            'https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_1280.jpg',
        bizImageAlt: 'image',
        bizEmail: 'biz2@mail.com',
        bizWeb: 'www.biz2.com',
        bizState: 'Israel',
        bizCountry: 'Israel',
        bizCity: 'Hadera',
        bizStreet: 'Hanasi',
        bizHouseNo: '28',
        bizZip: '38000',
        bizNumber: 123456,
        favorite: false,
        // user_id: 'fakeId456',
    },
    {
        bizTitle: 'The LAB',
        bizSubTitle: 'You brake We fix',
        bizDescription: 'biz description 3',
        bizPhone: '0502283478',
        bizImage:
            'https://cdn.pixabay.com/photo/2016/12/19/08/39/mobile-phone-1917737_640.jpg',
        bizImageAlt: 'image',
        bizEmail: 'biz3@mail.com',
        bizWeb: 'www.biz3.com',
        bizState: 'Israel',
        bizCountry: 'Israel',
        bizCity: 'Tel Aviv',
        bizStreet: 'Namir',
        bizHouseNo: '14',
        bizZip: '548779',
        bizNumber: 226637,
        favorite: false,
        // user_id: 'fakeId789',
    },
];

const initializProject = async () => {
    const allcards = await Card.find({});
    if (allcards.length <= 0) {
        Card.create(businessCards);
    }
};

initializProject();

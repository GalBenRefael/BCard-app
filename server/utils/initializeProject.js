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
    bizCategory: 'leisure',
  },
  {
    bizTitle: 'Flowers 4 U',
    bizSubTitle: 'best flowers EVER',
    bizCategory: 'flowers',
    bizDescription: 'Family business with 20+ years of experience',
    bizPhone: '04-6277381',
    bizImage:
      'https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_1280.jpg',
    bizImageAlt: 'image',
    bizEmail: 'biz2@mail.com',
    bizWeb: 'www.f4u.com',
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
    bizCategory: 'electronics',
    bizImage:
      'https://cdn.pixabay.com/photo/2016/12/19/08/39/mobile-phone-1917737_640.jpg',
    bizImageAlt: 'image',
    bizEmail: 'biz3@mail.com',
    bizWeb: 'www.the-lab.com',
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
  {
    bizTitle: 'The Italian',
    bizSubTitle: 'Pizza Italiano',
    bizDescription: 'The best pizza you',
    bizPhone: '050215846548',
    bizCategory: 'dining',
    bizImage:
      'https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_640.jpg',
    bizImageAlt: 'image',
    bizEmail: 'biz5@mail.com',
    bizWeb: 'www.the-italian.com',
    bizState: 'Israel',
    bizCountry: 'Israel',
    bizCity: 'Haifa',
    bizStreet: 'Derech Jaffa',
    bizHouseNo: '40',
    bizZip: '548779',
    bizNumber: 164487,
    favorite: false,
    // user_id: 'fakeId789',
  },
  {
    bizTitle: 'Panda',
    bizSubTitle: 'Asian Kitchen',
    bizDescription: 'Amazing food from the far east',
    bizPhone: '0502146548',
    bizCategory: 'dining',
    bizImage:
      'https://cdn.pixabay.com/photo/2016/03/05/23/01/prawn-1239427_640.jpg',
    bizImageAlt: 'image',
    bizEmail: 'biz6@mail.com',
    bizWeb: 'www.panda.com',
    bizState: 'Israel',
    bizCountry: 'Israel',
    bizCity: 'Tel Aviv',
    bizStreet: 'Bograshov',
    bizHouseNo: '34',
    bizZip: '548779',
    bizNumber: 160487,
    favorite: false,
    // user_id: 'fakeId789',
  },
  {
    bizTitle: 'Fidelity Construction',
    bizSubTitle: 'Remodel your house',
    bizDescription: 'biz description 3',
    bizPhone: '05055511478',
    bizCategory: 'construction',
    bizImage:
      'https://cdn.pixabay.com/photo/2017/08/03/21/37/construction-2578410_640.jpg',
    bizImageAlt: 'image',
    bizEmail: 'biz4@mail.com',
    bizWeb: 'www.fidelity.com',
    bizState: 'Israel',
    bizCountry: 'Israel',
    bizCity: 'Natanya',
    bizStreet: 'Hertzel',
    bizHouseNo: '30',
    bizZip: '548779',
    bizNumber: 657048,
    favorite: false,
    // user_id: 'fakeId789',
  },
];

const initializProject = async () => {
  // await Card.deleteMany({});
  const allcards = await Card.find({});
  if (allcards.length <= 0) {
    Card.create(businessCards);
  }
};

initializProject();

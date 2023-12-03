import localFont from 'next/font/local'

const gotham = localFont({
    src: [
        {
            path: './../public/fonts/Gotham/Gotham-Book.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './../public/fonts/Gotham/Gotham-Bold.otf',
            weight: '800',
            style: 'normal',
        },
        {
            path: './../public/fonts/Gotham/Gotham-Light.otf',
            weight: '300',
            style: 'normal',
        }
    ]
});

const greatVibes = localFont({
    src: [
        {
            path: './../public/fonts/GreatVibes/GreatVibes-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
    ]
});



export { gotham, greatVibes }
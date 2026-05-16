import { useSwiper } from 'swiper/react';

export default function SlideNextButton() {
    const swiper = useSwiper();

    return (
        <button onClick={() => swiper.slideNext()} className='swiper-button-next'>Slide to the next slide</button>
    );
}
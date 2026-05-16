import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import slide1 from '../../assets/img/videoprev1.png'

function HomeSwiper() {

    return (
        <>
            <Swiper style={{textAlign: 'center', maxWidth: '910px', borderRadius: '60px'}}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide style={{maxWidth: '910px'}}><img src={slide1} style={{width: '100%'}}/></SwiperSlide>
                <SwiperSlide style={{maxWidth: '910px'}}><img src={slide1} style={{width: '100%'}}/></SwiperSlide>
                <SwiperSlide style={{maxWidth: '910px'}}><img src={slide1} style={{width: '100%'}}/></SwiperSlide>
                <SwiperSlide style={{maxWidth: '910px'}}><img src={slide1} style={{width: '100%'}}/></SwiperSlide>
            </Swiper>
        </>

    );
}

export default HomeSwiper;
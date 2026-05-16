import "./about.css"
import Button from "../button/Button.tsx";
import child1 from "../../assets/img/child1.png"
interface AboutProps{
    infoOrder?: number
    textP1?: string
    text600?: string
    textP2?: string
    isFirst?: boolean
    btn?: boolean
    imgSource?: string

}
function About({infoOrder, textP1, text600, textP2, isFirst, btn, imgSource}: AboutProps) {
    let about;
    if (isFirst) {
         about =
             <section className="about">
                <div className="about__container container">
                    <div className="about__info" style={{order: infoOrder}}>
                        <div className="about__title">«BrassBook» - </div>
                        <div className="about__text about__text_accent">образовательная платформа, созданная<br /> для учеников классов медных духовых<br /> и ударных инструментов детских<br /> музыкальных школ и школ искусств<br /> Российской Федерации.</div>
                        <div className="about__text text">Платформа состоит из музыкальных дидактических материалов, созданных преподавателями<br /> Санкт-Петербургской детской школы искусств<br /> имени С.С. Прокофьева Азаматом Анваровичем<br /> Латыповым и Татьяной Александровной Савиновой.</div>
                    </div>

                    <div className="about__img"><img src={child1} alt="" /></div>
                </div>
            </section>
    } else {
        about =
            <section className="about" style={{padding: '90px 0'}}>
                <div className="about__container container">
                    <div className="about__info" style={{order: infoOrder}}>
                        <div className="text" style={{marginBottom: '48px'}}>{textP1} <span style={{fontWeight: 600}}>{text600}</span></div>
                        <div className="text" style={{marginBottom: '48px'}}>{textP2}</div>
                        {btn && <Button to={'/'} buttonText={'Попробовать'} className={'about__button button-type-2'}/>}
                    </div>

                    <div className="about__img"><img src={imgSource} alt="" /></div>
                </div>
            </section>
    }

    return (
        about
    );
}

export default About;
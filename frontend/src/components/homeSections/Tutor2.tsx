// Данный компонент на 100% не реиспользуемый
import piano from "../../assets/img/piano.png";
import icon1 from "../../assets/img/icon1.svg";
import icon3 from "../../assets/img/icon3.svg";
import tutor2 from "../../assets/img/tutor2.png";
import "./achivement.css";
import './tutor.css';
import './tutor-2.css';
import Button from "../button/Button.tsx";
function Tutor2() {
    return (
        <section className="tutor-2">
            <div className="piano"><img src={piano} alt=""/></div>
            <div className="tutor-2__content container">
                <a href="#" className="tutor">
                    <img src={tutor2} alt="" className="tutor__img"/>
                        <div className="tutor__name tutor__name_2">
                            <p className="tutor__last-name">Савинова</p>
                            <p className="tutor__other-name">Татьяна Александровна</p>
                            <p className="tutor__instr">Фортепиано</p>
                        </div>
                </a>
                <div className="tutor-2__achivements achivements">
                    <div className="achivement">
                        <div className="achivement__icon"><img src={icon3} alt=""/></div>
                        <div className="achivement__text">Концертмейстер проекта <br/>«Река талантов»<br/> Санкт-Петербургского<br/> Дома музыки</div>
                    </div>
                    <div className="achivement">
                        <div className="achivement__icon"><img src={icon1} alt=""/></div>
                        <div className="achivement__text">Лауреат всероссийских<br/> и международных конкурсов</div>
                    </div>
                    <div><Button to={'/'} buttonText={"Подробнее"} className={"button-type-1"}/></div>
                </div>
            </div>
        </section>
    );
}

export default Tutor2;
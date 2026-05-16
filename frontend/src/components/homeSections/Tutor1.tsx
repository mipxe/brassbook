// Данный компонент на 100% не реиспользуемый
import tube2 from "../../assets/img/tube2.png";
import icon1 from "../../assets/img/icon1.svg";
import icon2 from "../../assets/img/icon2.svg";
import tutor1 from "../../assets/img/tutor1.png";
import "./achivement.css";
import './tutor.css';
import './tutor-1.css';
import Button from "../button/Button.tsx";


function Tutor1() {
    return (
        <section className="tutor-1">
            <div className="tube-2"><img src={tube2} alt="" /></div>
            <div className="tutor-1__content container">
                <div className="tutor-1__achivements achivements">
                    <div className="achivement">
                        <div className="achivement__icon"><img src={icon1} alt="" /></div>
                        <div className="achivement__text">Лауреат всероссийских<br/>и международных конкурсов</div>
                        <a href="" className="achivement__button sign-buttons__button"></a>
                    </div>
                    <div className="achivement">
                        <div className="achivement__icon"><img src={icon2} alt="" /></div>
                        <div className="achivement__text">Победитель Всероссийского<br/> конкурса молодёжных проектов<br/>«Росмолодёжь»</div>
                    </div>
                    <div><Button to={'/'} buttonText={"Подробнее"} className={"button-type-1"}/></div>
            </div>
            <a href="#" className="tutor">
                <div className="tutor__img-container">
                    <img src={tutor1} alt="" className="tutor__img" />
                </div>
                <div className="tutor__name">
                    <p className="tutor__last-name">Латыпов</p>
                    <p className="tutor__other-name">Азамат Анварович</p>
                    <p className="tutor__instr">Труба</p>
                </div>
            </a>
            </div>
        </section>
    );
}

export default Tutor1;
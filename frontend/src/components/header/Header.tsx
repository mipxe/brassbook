import {NavLink} from 'react-router-dom';
import Button from "../button/Button.tsx";
import './header.css'
import './footer.css'


interface HeaderProps{
    logoStyle?: string
    linkStyle?: string
    headerContainerStyle?: string
    headerStyle?: string
}
function Header({headerStyle, headerContainerStyle, logoStyle, linkStyle}: HeaderProps) {
    let links;
    if (window.location.pathname === '/signin'){
        links =
        <ul className="nav__body">
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>О проекте</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Команда</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Галерея</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Связаться с нами</a></li>
        </ul>
    } 

    else if (window.location.pathname === '/signup'){
        links =
        <ul className="nav__body">  
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>О проекте</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Команда</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Галерея</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Связаться с нами</a></li>
        </ul>
    }

    else if (window.location.pathname === '/signupauth'){
        links =
        <ul className="nav__body">  
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>О проекте</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Команда</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Галерея</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Связаться с нами</a></li>
        </ul>
    }
    
    else {
        links =
        <ul className="nav__body">
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>О проекте</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Произведения</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Команда</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Публикации</a></li>
            <li><a href="#" className={"nav__link " + (linkStyle || '')}>Библиотека</a></li>
        </ul>
    }

    return (
        <header className={"header " + (headerStyle || '')}>
            <div className={"header__container " + (headerContainerStyle || '')}>
                <div className={"header__logo " + (logoStyle || '')}><NavLink to="/">
                    BrassBook
                </NavLink></div>
                <nav className="header__nav nav">
                    {links}
                </nav>
                {window.location.pathname === '/' && headerStyle !== 'footer' && <div className="header__btns">
                    <Button to={'/signin'} buttonText={"Войти"} className={'button-type-1 button-type-1_in-btn'}/>
                    <Button to={'/signup'} buttonText={"Зарегистрироваться"} className={'button-type-1 button-type-1_up-btn'}/>
                    <div className="header__burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>}
                {headerStyle === 'footer' && <div className={'footer__copyright'}>
                    ©2019-2024, Brassbook.Все права защищены
                </div>}
            </div>
        </header>
    )
}

export default Header
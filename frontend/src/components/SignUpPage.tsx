import Header from "./header/Header.tsx";
import SignUp from "./signUp/SignUp.tsx";
interface SignUpProps{
    type?: string
}
function SignUpPage({}: SignUpProps) {
    return(
        <>
            <Header headerStyle={'header_padding-34'} headerContainerStyle={'header__container_without-enter'} logoStyle={'header__logo_black'} linkStyle={'nav__link_black'}/>
            <SignUp />
        </>
    )
}

export default SignUpPage
import Header from "./header/Header.tsx";
import SignUpAuth from "./signUpAuth/signUpAuth.tsx";
interface SignUpProps{
    type?: string
}
function SignUpAuthPage({}: SignUpProps) {
    return(
        <>
            <Header headerStyle={'header_padding-34'} headerContainerStyle={'header__container_without-enter'} logoStyle={'header__logo_black'} linkStyle={'nav__link_black'}/>
            <SignUpAuth />
        </>
    )
}

export default SignUpAuthPage
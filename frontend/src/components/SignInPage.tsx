import Header from "./header/Header.tsx";
import SignIn from "./signIn/SignIn.tsx";
interface SignUpProps{
    type?: string
}
function SignInPage({}: SignUpProps) {
    return(
        <>
            <Header headerStyle={'header_padding-34'} headerContainerStyle={'header__container_without-enter'} logoStyle={'header__logo_black'} linkStyle={'nav__link_black'}/>
            <SignIn />
        </>
    )
}

export default SignInPage
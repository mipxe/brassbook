import User from "./User/User.tsx";
interface SignUpProps{
    type?: string
}
function UserPage({}: SignUpProps) {
    return(
        <>
            <User />
        </>
    )
}

export default UserPage
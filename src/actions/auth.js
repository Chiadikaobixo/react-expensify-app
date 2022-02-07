import { provider} from "../firebase/firebase";
import { getAuth, signInWithPopup, signOut} from "firebase/auth";

const auth = getAuth()

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogin = () => {
    return () => {
        return signInWithPopup(auth, provider)
    }
}
export const logout = () => ({
    type: 'LOGOUT'
})
export const startLogout = () => {
    return () => {
        return signOut(auth)
    }
}

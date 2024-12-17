import { User } from '../../types';
import { Navigate } from 'react-router-dom';

const useAuth = () => {
    const login = async (user: string, password: string): Promise<void> => {


        const url = "http://127.0.0.1:5000/api/v1/login"
        try {
            const response = await fetch(`${url}?email=${user}&password=${password}`)

            if (!response.ok) {
                throw new Error(`Login failed`);
            }

            const data = await response.json()
            const jwt = data.jwt
            const userId = data.user_id
            console.log(data)
            
            
            localStorage.setItem("jwt", jwt)
            localStorage.setItem("userId", userId)

            
            console.log("login success")
        } catch(e) {
            console.log("Some errors happen", e)
        }
            
    }

    return {login}

}

export default useAuth
import React, {useState} from "react"
import { TextField, Button, Box, Typography, Divider, Link } from "@mui/material"
import { APP_NAME } from "../../constants/constants"
import useAuth from "../../hooks/auth/useAuth"
import { User } from "../../types"
import { useNavigate } from "react-router-dom"

const LoginForm: React.FC = () => {

    const { login } = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await login(email, password)
            localStorage.setItem("email", email)
            navigate("/message")
        } catch (e) {
            console.log("Login failed" , e)
        }
    }

    return (
        <Box
            component="div"
            sx={{
                backgroundColor: "#fffef3",
                height: "100vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Box
                component="div"
                sx={{
                    bgcolor: "transparent",
                    position: "absolute",
                    width: "60%",
                    height: "80%",
                    // top: "10%",
                    // left: "20%"
                }}
            >
                <Typography
                    variant="h2" color="#506e4d" align="center" gutterBottom
                >
                    {APP_NAME}
                </Typography>
                <Typography
                    variant="h6" color="#ACBAA4" margin={3} gutterBottom
                >
                    Sign in to begin your adventure in discovering the fashion world
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="email"
                        variant="outlined"
                        label="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#DFE5D5",
                                borderWidth: "2px",
                                borderRadius: "20px"
                            },
                            width: "100%",
                            marginBottom: "15px",
                        }}
                    >

                    </TextField>

                    <TextField
                        required
                        id="password"
                        variant="outlined"
                        label="Enter your password"
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        sx={{

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#DFE5D5",
                                borderWidth: "2px",
                                borderRadius: "20px"
                            },
                            width: "100%",
                            marginBottom: "24px",
                        }}
                    >

                    </TextField>

                    <Button
                        id="loginBtn"
                        variant="contained"
                        color="success"
                        type="submit"

                        sx={{
                            width: "100%",
                            borderRadius: "20px",
                            marginBottom: "24px"
                        }}
                    >
                        Log in
                    </Button>
                </form>


                <Divider sx={{ marginBottom: "24px" }}> OR </Divider>

                <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}>
                    <Typography variant="body1" sx={{ color: "#ADBBA5", marginRight: 1 }}>
                        Don"t have an account?
                    </Typography>
                    <Link href="/register" color="#91A48B" sx={{ textDecoration: "none", fontWeight: "500", lineHeight: "1.5" }}>
                        Create account
                    </Link>
                </Box>

            </Box>

        </Box>
    )
}

export default LoginForm
import { Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import {useNavigate} from "react-router";
import UserContext from "../../contexts/userContext";

function Login() {
    const styles = {
        loginBox: {
            display: 'flex',
            flexDirection: 'column',
            border: 'solid',
            borderColor:'lightblue',
            width: '20%',
            borderRadius: '10px',
            padding: '50px',
            gap: '50px',
        },
        container:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%',
            width:'auto'
        }
    }

    const {setAuthenticated} = useContext(UserContext);
    const navigate = useNavigate();
    const [tcno, setTcno] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [tcnoError, setTcnoError] = useState<string>("");
    useEffect(() => {
        if (tcno?.length !== 11 && tcno.length !== 0) {
            setTcnoError("TC Kimlik No 11 haneli olmak zorundadır.")
        } else {
            setTcnoError("")
        }
    })
    const handleLogin = () => {
        setAuthenticated(true)
        navigate("/dashboard")
    
    }
    return (

        <Box sx={styles.container}>
            <Box sx={styles.loginBox}>
                <TextField label="TC Kimlik No:"
                    inputProps={{ maxLength: 11 }}
                    variant="outlined"
                    error={tcnoError.length !== 0}
                    helperText={tcnoError}
                    onChange={(e) => {
                        setTcno(e.target.value)
                    }} />
                <TextField type="password" label="Şifre:" 
                variant="outlined" 
                onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <Button variant="outlined" onClick={handleLogin}
                    disabled={tcno.length === 11 ? false : true}

                >Giriş Yap</Button>

            </Box>

        </Box>


    )


}


export default Login;
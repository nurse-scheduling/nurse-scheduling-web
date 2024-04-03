import {Box, TextField, Button, useMediaQuery, useTheme, Alert,Slide} from "@mui/material";
import React, {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router";
import UserContext from "../../contexts/userContext";
import {NurseType} from "../../types/NurseType";
import {login} from "../../apis/auth";

function Login() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const {setAuthenticated, setUser, setBasicAuth} = useContext(UserContext);
    const navigate = useNavigate();
    const [tcno, setTcno] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [tcnoError, setTcnoError] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (tcno?.length !== 11) {
            setTcnoError("TC Kimlik No 11 haneli olmak zorundadır.");
        } else {
            setTcnoError("");
        }
    }, [tcno.length]);


    const handleLogin = () => {
        const credentials = btoa(`${tcno}:${password}`);
        login(tcno, password)
            .then((data: NurseType) => {
                if (data.errorMessage) {
                    setErrorMessage(data.errorMessage);
                    return;
                }
                setUser(data);
                setAuthenticated(true);
                setBasicAuth(credentials);
                navigate("/dashboard");
            }).catch((err) => {
            console.error("Login error:", err);
        });
    };

    const styles = {
        loginBox: {
            display: "flex",
            flexDirection: "column",
            border: "solid",
            borderColor: "lightblue",
            width: isMobile ? "80%" : "20%",
            borderRadius: "10px",
            padding: isMobile ? "20px" : "50px",
            gap: "20px",
        },
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: isMobile ? "40vh" : "30vh",
            padding: isMobile ? "20px" : "50px",
            width: "auto",
            flexDirection: "column",
            gap: "5vh",
        },
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.loginBox}>
                <TextField
                    label="TC Kimlik No:"
                    inputProps={{maxLength: 11}}
                    variant="outlined"
                    error={tcnoError.length !== 0}
                    helperText={tcnoError}
                    onChange={(e) => {
                        setTcno(e.target.value);
                    }}
                />
                <TextField
                    type="password"
                    label="Şifre:"
                    variant="outlined"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Button
                    variant="outlined"
                    onClick={handleLogin}
                    disabled={tcno.length !== 11}
                >
                    Giriş Yap
                </Button>
            </Box>
            {errorMessage && <Slide direction="up" in={errorMessage.length>0} mountOnEnter unmountOnExit>
                <Alert severity="error" onClose={() => {setErrorMessage("")}}>{errorMessage}</Alert>
            </Slide>}
        </Box>
    );
}

export default Login;

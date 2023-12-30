import { Box, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../contexts/userContext";

function Login() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { setAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();
    const [tcno, setTcno] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [tcnoError, setTcnoError] = useState<string>("");

    useEffect(() => {
        if (tcno?.length !== 11 && tcno.length !== 0) {
            setTcnoError("TC Kimlik No 11 haneli olmak zorundadır.");
        } else {
            setTcnoError("");
        }
    }, [tcno.length]);

    const handleLogin = () => {
        setAuthenticated(true);
        navigate("/dashboard");
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
        },
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.loginBox}>
                <TextField
                    label="TC Kimlik No:"
                    inputProps={{ maxLength: 11 }}
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
        </Box>
    );
}

export default Login;

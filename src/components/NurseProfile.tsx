import {
    TextField,
    Grid,
    Avatar,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import React from "react";
  
  interface Props {
    nurse: {
      firstName: string;
      lastName: string;
      birthDate: string;
      department: string;
      profilePicture: string;
      [key: string]: string;
    };
  }
  
  function NurseProfile(props: Props) {
    const { nurse } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
    return (
      <Grid container spacing={2} marginTop={isMobile ? theme.spacing(10) : theme.spacing(2)}>
        <Grid
          item
          xs={12}
          md={isMobile ? 12 : 3}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            alt="Nurse"
            src={nurse.profilePicture}
            sx={{
                width: "55%", 
                height: "auto",
                border: "2px solid #555",
              }}
          />
        </Grid>
        <Grid item xs={12} md={isMobile ? 12 : 9} 
          
            container
            direction="column"
            alignItems={isMobile ? "center" : "flex-start"}
          >
            {Object.keys(nurse).map(
              (key) =>
                key !== "profilePicture" && (
                  <TextField
                    key={key}
                    id={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={nurse[key]}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{
                      width: "70%", // Set your desired width
                      marginTop: theme.spacing(1),
                      marginBottom: theme.spacing(1),
                    }}
                  />
                )
            )}
          
        </Grid>
        
      </Grid>
    );
  }
  
  export default NurseProfile;
  
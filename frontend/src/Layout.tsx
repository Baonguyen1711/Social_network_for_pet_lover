import React from 'react';
import { Box } from '@mui/material';


const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box
        component="header"
        sx={{
          height: "10vh",
          //backgroundColor: "#2196F3",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        Petionista
      </Box>  {/* Your header */}
      
      <Box display="flex" flexGrow={1}>

        {children}  {/* Your main content */}
      </Box>
    </Box>
  );
};

export default Layout;

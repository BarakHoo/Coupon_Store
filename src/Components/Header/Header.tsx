import React from "react";
import "./Header.css";
import { Typography, AppBar, Toolbar, Container, Box } from "@mui/material";

function Header(): JSX.Element {
    return (
        <AppBar position="static" className="Header">
            <Container>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography variant="h6" component="div">
                            John Coupon - Coupon Shop
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;

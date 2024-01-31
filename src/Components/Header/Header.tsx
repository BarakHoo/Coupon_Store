import React from "react";
import "./Header.css";
import { Typography, AppBar, Toolbar, Container, Box } from "@mui/material";

function Header(): JSX.Element {
    return (
        <AppBar position="static" className="Header">
            <Container>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/005/014/481/original/discount-tag-ii-icon-in-trendy-long-shadow-style-isolated-on-soft-blue-background-free-vector.jpg"
                            alt="John Coupon Logo"
                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
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

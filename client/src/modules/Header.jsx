import React from 'react'
import { Container, Typography} from "@mui/material"

const Header = () => {
    return (
        <Container fixed>
            <Typography variant='h3' align='center'>
                Welcome to Electricity Bills
            </Typography>
        </Container>
    )
}

export default Header
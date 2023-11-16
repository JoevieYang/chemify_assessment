import React, { useEffect, useState } from "react";
import classes from '../styles/MainPage.module.css';
import { Container, Paper , Text} from '@mantine/core';


export const AboutPage = () => {

    return (
        <Container className={classes.containBox}>
            <Paper shadow="xs" p="xl" style = {{marginTop: '100px'}}>
                <Text>This project is an assessment when I'm applying for
                    the inter placement of the company Chemify.</Text>
            </Paper>
        </Container>
    )
}
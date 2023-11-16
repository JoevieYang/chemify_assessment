import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from '../styles/NotFoundTitle.module.css';
import { Link } from 'react-router-dom';

export function NotFoundTitle() {
    return (
        <Container className={classes.root} fluid>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>You have found a secret place.</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
                been moved to another URL.
            </Text>
            <Group justify="center">
                <Button variant="subtle" size="md">
                    <Link to='/'>Take me back to home page</Link>

                </Button>
            </Group>
        </Container>
    );
}
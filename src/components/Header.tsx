import { useState } from 'react';
import { Container, Group, Burger} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from '../assets/chemifylogo.png';
import classes from '../styles/HeaderSimple.module.css';
import { Link } from 'react-router-dom';

const links = [
    { link: '/', label: 'Tasks' },
    { link: '/about', label: 'About' },
];

export const Header = () =>  {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
        // <a
        //     key={link.label}
        //     href={link.link}
        //     className={classes.link}
        //     data-active={active === link.link || undefined}
        //     onClick={(event) => {
        //         event.preventDefault();
        //         setActive(link.link);
        //     }}

        // >
        //     {link.label}
        // </a>
        <Link to={link.link}
            className={classes.link}
                data-active={active === link.link || undefined}
                onClick={(event) => {
                    // event.preventDefault();
                    setActive(link.link);
                }}
        >
            {link.label}</Link>
    ));


    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}> 
                <img src={logo} alt="logo_picture" style={{ height: '56px', width: '120px' }} ></img>  
                <Group gap={20} visibleFrom="s">
                    {items}
                </Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}
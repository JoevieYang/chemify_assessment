import React from 'react';
import '@mantine/core/styles.css';
import cx from 'clsx';
import BackgroundImg from './assets/backgound.jpg';
import './App.css';
import classes from './styles/ResponsiveContainer.module.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import { Header } from './components/Header';

import { MantineProvider, createTheme, Container, BackgroundImage } from '@mantine/core';

import { AboutPage } from './pages/AboutPage';
import { MainPage } from './pages/MainPage';
import { NotFoundTitle } from './pages/NotFoundPage';

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});


function App() {
  return (
     <MantineProvider theme={theme}>
      {/* <BackgroundImage
        src={BackgroundImg}
        radius="xs"
      > */}
      <Container fluid size="responsive" >
        <div className="App">
          
          <Router>
            <Header></Header>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="/notfound" element={<NotFoundTitle />}></Route>
            </Routes>
          </Router>
        </div>
      </Container>
      {/* </BackgroundImage> */}
    </MantineProvider>
    
  );
}




export default App;

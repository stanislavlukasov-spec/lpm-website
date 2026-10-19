import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/app.css'
import '../styles/Carousel.module.css'
import { GlobalStoreProvider } from '../components/store/global/store'
import { initialState as globalState, globalReducer } from '../components/store/global/reducer'
import theme from '../components/Settings/theme'
import "../styles/slick.css"
import Script from 'next/script'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'G-W5Z8MQ8H42'
}

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')

        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        if(process.env.NEXT_PUBLIC_NODE_ENV == 'prod') {
            TagManager.initialize(tagManagerArgs)
        }
    }, [])

    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></Script>

            <GlobalStoreProvider 
                initialState={globalState}
                reducer={globalReducer}>

                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>

            </GlobalStoreProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
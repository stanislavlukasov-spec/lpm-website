import { createTheme } from '@mui/material/styles'

let theme = createTheme({
    typography: {
        fontFamily: 'Lato, sans-serif'
    }
});

theme.palette.primary = {
    veryLight: '#f3e0eb',
    light: '#c5649e',
    main: '#A03C78',
    dark: '#7b2e5c',
    contrastText: '#fff'
}

theme.palette.secondary = {
    light: '#fff',
    main: '#fff',
    dark: '#f2f2f2',
    contrastText: '#A03C78'
}

theme.palette.third = {
    light: '#833163',
    main: '#67274d',
    dark: '#592143',
    contrastText: '#fff'
}

theme.palette.textGrey = "#555454"

theme.typography.h1 = {
    ...theme.typography.h1,
    fontWeight: 'bold',
    [theme.breakpoints.up('xs')]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2.8125rem',
    }
}

theme.typography.h2 = {
    ...theme.typography.h2,
    fontWeight: 'bold',
    [theme.breakpoints.up('xs')]: {
        fontSize: '1.4rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.8rem',
    }
}

theme.typography.h3 = {
    ...theme.typography.h3,
    fontWeight: 'bold',
    [theme.breakpoints.up('xs')]: {
        fontSize: '1.2rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.4rem',
    }
}

theme.typography.h4 = {
    ...theme.typography.h4,
    fontWeight: '500',
    lineHeight: 1.5,
    [theme.breakpoints.up('xs')]: {
        fontSize: '1rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.2rem',
    }
}

theme.typography.h5 = {
    ...theme.typography.h5,
    fontWeight: '500',
    lineHeight: 1.5,
    [theme.breakpoints.up('xs')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '0.9rem',
    }
}

theme.typography.body1 = {
    ...theme.typography.body1,
    [theme.breakpoints.up('xs')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '0.9rem',
    },
    color: theme.palette.grey[800]
}

theme.typography.button = {
    ...theme.typography.button,
    fontWeight: 400,
    textTransform: 'initial'
}

theme.shape.borderRadius = 20

theme.sections = {}
theme.sections.padding = {
    xs: '2rem 0 0 0',
    lg: '4rem 0 0 0'
}

console.log(theme)

export default theme
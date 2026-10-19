export const BREAKPOINT_XS = 'xs'
export const BREAKPOINT_SM = 'sm'
export const BREAKPOINT_MD = 'md'
export const BREAKPOINT_LG = 'lg'

export function getBreakPoint(props) {
    const {
        useMediaQuery = () => {},
        theme = {}
    } = props 

    let result = BREAKPOINT_XS
    const bpSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const bpMedium = useMediaQuery(theme.breakpoints.up('md'))
    const bpLarge = useMediaQuery(theme.breakpoints.up('lg'))

    if(bpSmall) result = BREAKPOINT_SM
    if(bpMedium) result = BREAKPOINT_MD
    if(bpLarge) result = BREAKPOINT_LG

    return result
}
import React, { useEffect, useRef  } from 'react'
import Container from '../Container'
import { CONTAINER_TYPE_FLEX } from '../Container/types'
import headerStyles from '../../styles/Headers.module.css'
import Logo from '../Logo'
import useMediaQuery from '@mui/material/useMediaQuery';
import { withTheme } from '@mui/styles';
import FilterHero from '../Filters/Hero'
import FindPropertyButton from '../Heros/FindPropertyButton'
import { join } from '../Helpers/joinClasses'
import LanguageSelector from '../LanguageSelector'
import { getBreakPoint, BREAKPOINT_LG } from '../BreakPoint'
import { setOpenFilters } from '../store/global/reducer'
import { useStore } from '../store/global/store'

export const HEADER_TYPE_INVERT = 'invert'
export const HEADER_SIZE_SMALL = 'small'
export const HEADER_SIZE_LARGE = 'large'

const ELEMENT_FILTERS_HERO = 'filtersHero'
const ELEMENT_LANGUAGE_SELECTOR = 'languageSelector'
const ELEMENT_FIND_PROPERTY_BUTTON = 'findPropertyButton'

const HeaderMain = props => {
    const {
        theme = {},
        type,
        size = HEADER_SIZE_LARGE
    } = props

    const inverted = type == HEADER_TYPE_INVERT
    const small = size == HEADER_SIZE_SMALL

    const [state, dispatch] = useStore()
    const bk = getBreakPoint({
        theme,
        useMediaQuery
    })

    const bpLarge = bk == BREAKPOINT_LG
    const bpXl = useMediaQuery(theme.breakpoints.up('xl'))
    const mounted = useRef(false)

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; }
    }, [])

    const getBreakPointElements = () => {
        let options = {
            [HEADER_SIZE_SMALL]: {
                bpXs: [
                    ELEMENT_FIND_PROPERTY_BUTTON
                ],
                bpXl: [
                    ELEMENT_FIND_PROPERTY_BUTTON,
                    ELEMENT_LANGUAGE_SELECTOR
                ]
            },
            [HEADER_SIZE_LARGE]: {
                bpXs: [
                    ELEMENT_FIND_PROPERTY_BUTTON
                ],
                bpXl: [
                    ELEMENT_FILTERS_HERO,
                    ELEMENT_LANGUAGE_SELECTOR
                ]
            }
        }

        let sizeOptions = options[size]

        return bpXl ? sizeOptions.bpXl : sizeOptions.bpXs
    }

    const breakPointElements = getBreakPointElements()

    return (
        <React.Fragment>
            <div 
                style={{ 
                    position: 'relative', 
                    background: inverted ? 'white' : theme.palette.primary.main 
                }}
                className={join(
                    headerStyles['header-main'], 
                    headerStyles[!bpLarge ? 'header-main-xs' : ''],
                    headerStyles['filled']
                )}>

                <Container 
                    small={small}
                    type={CONTAINER_TYPE_FLEX}>
                        
                    <div 
                        id="nav-content-color"
                        className={join(headerStyles['nav-content-color'], headerStyles[!bpXl ? 'container-flex-column' : 'container-flex-center-center'])}>

                        <div className={bpXl ? headerStyles['logo-link'] : headerStyles['logo-link-small']}> 
                            <Logo 
                                large={bpLarge}
                                white={!inverted}
                            />
                        </div>

                        <React.Fragment>
                            {breakPointElements.includes(ELEMENT_FILTERS_HERO) &&
                                <FilterHero 
                                    styles={{ maxWidth: '60rem' }}
                                    buttonStyles={{
                                        height: '3rem',
                                        padding: '0 2rem'
                                    }}
                                />
                            }

                            {breakPointElements.includes(ELEMENT_LANGUAGE_SELECTOR) &&
                                <LanguageSelector 
                                    className={headerStyles['language-selector']}
                                    inverted={inverted}
                                />
                            }

                        </React.Fragment>

                        {breakPointElements.includes(ELEMENT_FIND_PROPERTY_BUTTON) &&
                            <FindPropertyButton 
                                styles={bpXl 
                                    ? { width: 'auto' } 
                                    : { marginTop: '1rem' }
                                }
                                inverted={inverted}
                                filled={true}
                                onClick={() => dispatch(setOpenFilters(true))}
                            />
                        }
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withTheme(HeaderMain);
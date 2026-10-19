import React from 'react'
import cStyles from '../../styles/Filters.module.css'
import { useStore } from '../store/global/store'
import { withTheme } from '@mui/styles'

const FilterHero = props => {
    const [state] = useStore()

	const {
		theme = {}
    } = props
    
    return (
        <div className={cStyles['filters-container--hero']}>
            sdsdsd
        </div>
    )
}

export default withTheme(FilterHero);
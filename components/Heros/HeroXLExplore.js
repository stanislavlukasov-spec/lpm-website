import React from 'react'
import styles from '../../styles/Heros.module.css'
import { withTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Container from '../Container';
import { CONTAINER_TYPE_FLEX_CENTER_VERTICAL } from '../Container/types'
import ExploreImage from '../../public/images/heros/cyprus-property-hero.jpg'

import { SECTION_HERO_XL_EXPLORE } from '../pages/pageSections'
import { useStore } from '../store/global/store'
import getComponentCopy from '../store/global/getComponentCopy'
import Image from 'next/image'

const HeroXLExplore = props => {
	const [state] = useStore()

	const {
		theme = {}
	} = props
    
    const {
		country = ""
	} = state	
	
	const bpLarge = useMediaQuery(theme.breakpoints.up('lg'));
	const componentCopy = getComponentCopy({
		state,
		section: SECTION_HERO_XL_EXPLORE
	})

	const heroTextItem = componentCopy.heroText || ""
	const heroDescriptionItem = componentCopy.heroDescription || ""

	return (
		<div 
			className={bpLarge ? styles.heroLarge : styles.hero}>

			<Image 
				src={ExploreImage}
				layout="fill"
				alt=""
				className={styles.image}
				alt={heroDescriptionItem.replace('{country}', country)}
			/>

			<div id="filter" style={{ 
				backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main} , transparent)`,
				opacity: 0.8,
				zIndex: 2,
				width: '100%',
				height: '100%',
				position: 'absolute'}}>
				
			</div>

			<Container 
				className={styles.contentContainer}
				type={CONTAINER_TYPE_FLEX_CENTER_VERTICAL}>
				<div style={{ textAlign: 'center' }}>
					<Typography 
						component="h1" 
						variant="h1" 
						style={{
							color: 'white',
							textAlign: 'center'
						}}>

						{heroTextItem.replace('{country}', country)}
					</Typography>

					<Typography 
						component="p" 
						variant="h4" 
						style={{
							color: 'white',
							textAlign: 'center',
							fontWeight: 700,
							maxWidth: '40rem',
							margin: '1rem auto 0 auto',
						}}>

						{heroDescriptionItem.replace('{country}', country)}
					</Typography>
				</div>
			</Container>
        </div>
	)
}

export default withTheme(HeroXLExplore);
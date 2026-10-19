import React from 'react'
import styles from '../../styles/Heros.module.css'
import { withTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeroImage from '../../public/images/heros/cyprus-house-dark-min.jpg'
import Image from 'next/image'

const HeroSearchPage = props => {
	const {
		theme = {}
	} = props
	
	const bpLarge = useMediaQuery(theme.breakpoints.up('lg'))

	return (
		<div 
			className={bpLarge ? styles.searchPageLarge : styles.searchPageSmall}>

			<Image 
				src={HeroImage}
				layout="fill"
				alt=""
				className={styles.image}
				alt="Search"
			/>
        </div>
	)
}

export default withTheme(HeroSearchPage);
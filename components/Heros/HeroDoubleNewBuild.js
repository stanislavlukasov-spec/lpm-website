import React from 'react'
import cStyles from '../../styles/Heros.module.css'
import { withTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Container from '../Container';
import NewBuildImage from '../../public/images/heros/new-build-min.jpg'
import Section from '../Section'
import { HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY } from '../pages/pageSections'
import { useStore } from '../store/global/store'
import getComponentCopy from '../store/global/getComponentCopy'
import { VARIANT_PRIMARY } from '../Button';
import Button from '../Button';
import Link from 'next/link'
import { ROUTE_SEARCH_PAGE } from '../Settings/routes'
import { join } from '../Helpers/joinClasses'
import Image from 'next/image'

const HeroDoubleNewBuild = props => {
	const [state] = useStore()

	const {
		country = ""
	} = state

	const {
		theme = {}
	} = props
	
	const bpLarge = useMediaQuery(theme.breakpoints.up('lg'));

	const componentCopy = getComponentCopy({
		state,
		section: HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY
	})

	const RenderImage = () => (
		<Image 
			src={NewBuildImage}
			layout="fill"
			alt="new build properties"
			className={cStyles['hero-double--image']}
			alt={descriptionItem.replace('{country}', country)}
		/>
	)

	const descriptionItem = componentCopy.description || ""

	return (
		<Section>
			<Container>
				<div className={join(cStyles['hero-double--container'], cStyles[bpLarge ? 'hero-double--container-lg' : 'hero-double--container-sm'])}>
					{bpLarge &&
						<RenderImage />
					}
					
					<div className={join(cStyles['hero-double--text'], cStyles[!bpLarge ? 'hero-double--text-sm' : ''])}>
						<Typography 
							component="h3" 
							variant="h3">

							{componentCopy.title}
						</Typography>

						<Typography 
							component="p" 
							variant="body1"
							style={{ margin: '1.5rem 0'}}>

							{descriptionItem.replace('{country}', country)}
						</Typography>

						<Link 
							href={`${ROUTE_SEARCH_PAGE}?newBuild=true`}
							className={cStyles['no-underline']}>

							<Button 
								type={VARIANT_PRIMARY} 
								text={componentCopy.explore}
								style={{
									minWidth: '12rem'
								}}
							/>
						</Link>
					</div>
				</div>
			</Container>
		</Section>
	)
}

export default withTheme(HeroDoubleNewBuild);
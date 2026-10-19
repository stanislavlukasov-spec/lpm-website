import React from 'react'
import { withTheme } from '@mui/styles';
import Button from '../Button'
import { VARIANT_PRIMARY, VARIANT_SECONDARY } from '../Button'
import { SECTION_HERO_XL_EXPLORE } from '../pages/pageSections'
import { useStore } from '../store/global/store'
import getComponentCopy from '../store/global/getComponentCopy'
import SearchIcon from '@mui/icons-material/Search'

const FindPropertyButton = props => {
	const {
		theme = {},
		styles = {},
		onClick = () => {},
		inverted
	} = props

	const [state] = useStore()

	const componentCopy = getComponentCopy({
		state,
		section: SECTION_HERO_XL_EXPLORE
	})

	return (
		<Button 
			text={componentCopy.findProperty}
			startIcon={<SearchIcon />}
			type={inverted ? VARIANT_PRIMARY : VARIANT_SECONDARY }
			onClick={() => onClick()}
			styles={{
				marginBottom: '2rem',
				margin: 'auto',
				width: '100%',
				maxWidth: '80%',
				...theme.typography.body1,
				padding: '0.8rem 1.5rem',
				fontSize: '1rem',
				...styles
			}}
		/>
	)
}

export default withTheme(FindPropertyButton);
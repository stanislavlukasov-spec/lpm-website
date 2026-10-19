export default function getComponentCopy(props) {
	const {
		state = {},
		section = ""
	} = props

	const {
		copy = {},
		locale = {}
	} = state

	const componentCopy = copy[section] || {}
	return componentCopy[locale.code] || {}
}
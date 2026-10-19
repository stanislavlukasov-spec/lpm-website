import React from 'react'
import GlobalContext from './context'

export const useStore = () => React.useContext(GlobalContext)
export const globalUseStore = () => React.useContext(GlobalContext)
export const GlobalStoreProvider = ({ children, initialState, reducer }) => {
	const [globalState, dispatch] = React.useReducer(reducer, initialState)

	return (
		<GlobalContext.Provider value={[globalState, dispatch]}>
			{children}
		</GlobalContext.Provider>
	)
}
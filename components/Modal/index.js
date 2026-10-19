import React from 'react'
import { withTheme } from '@mui/styles'
import cStyles from '../../styles/Modal.module.css'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'

const ModalComponent = props => {
	const {
        children,
        open,
        handleClose,
        styles = {},
        modalClassName = "modal-content-container"
    } = props
    
    return (
        <Modal 
            open={open} 
            onClose={handleClose}
            classNames={{
                modal: modalClassName,
            }}>

            <div>
                {children}
            </div>
        </Modal>
    )
}

export default withTheme(ModalComponent);
export const HrefBlank = props => {
    return (
        <a 
            href={props.href} 
            onClick={e => e.preventDefault()}>
                
            {props.children}
        </a>
    )
}
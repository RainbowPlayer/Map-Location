const Button = ({ content, className, onClick }) => {
    return(
        <lable>
            <button onClick={onClick} className={className} >
                {content}
            </button>
        </lable>
    )
}

export default Button;
import Button from 'react-bootstrap/Button'

const EmojiButton = ({emoji, onClick}) => {
    return(
        <Button variant="light" onClick={ () => onClick(emoji) }>{emoji.character}</Button>
    )
}

export default EmojiButton
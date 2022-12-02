import Button from 'react-bootstrap/Button'

const EmojiCategory = ({category,onClick}) =>{
    return(
        <Button variant="warning" size="sm" onClick={() => onClick(category) }>{category}</Button>
    )
}
export default EmojiCategory;
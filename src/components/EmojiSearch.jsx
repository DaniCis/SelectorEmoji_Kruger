import Form from 'react-bootstrap/Form'
import { useState } from 'react';

const EmojiSearch = ({onSearch}) =>{
    const [value,setValue] = useState('')
    const handleChange= (e) =>{
        setValue(e.target.value);
        onSearch(e)
    }
    return(
        <Form.Control type="text" onChange={handleChange} value={value} placeholder="Search Emoji"/>
    )
}
export default EmojiSearch;
import { useState, useEffect, forwardRef, useRef } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import EmojiSearch from "./EmojiSearch";
import EmojiButton from "./EmojiButton";
import EmojiCategory from "./EmojiCategory";

export default forwardRef ((props, refInput) => {

    const [isOpen,setIsOpen] = useState(false)
    const [emojis,setEmojis] = useState([])
    const [categories,setCategories] = useState([])
    
    const containerRef = useRef(null)

    useEffect( () => {
        loadInfo()
        window.addEventListener("click", (e) => {
            if (!containerRef.current.contains(e.target)){
                setIsOpen(false);
            }
        });
    },[])

    const loadInfo = async () =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_URL}emojis?&access_key=${process.env.REACT_APP_KEY}`)
            if(response.ok){
                const responseJSON = await response.json()
                const categorias = responseJSON.map(emoji => emoji.group)
                const categoriasSR= categorias.filter((valor,indice) =>  categorias.indexOf(valor) === indice)
                setCategories(categoriasSR.slice(3,8))
                setEmojis(responseJSON.slice(0,70))
            }
        }catch(e){
            console.log(e)
        }
    }
    const searchCategories = async (cat) =>{
        try{
            console.log(cat)
            const response = await fetch(`${process.env.REACT_APP_URL}categories/${cat}?access_key=${process.env.REACT_APP_KEY}`)
            if(response.ok){
                const responseJSON = await response.json()
                setEmojis(responseJSON.slice(0,70))
            }
        }catch(e){
            console.log(e)
        }
    }
    const searchInfo = async (query) =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_URL}emojis?search=${query}&access_key=${process.env.REACT_APP_KEY}`)
            if(response.ok){
                const responseJSON = await response.json()
                if(responseJSON !== null)
                    setEmojis(responseJSON.slice(0,70))
            }
        }catch(e){
            console.log(e)
        }
    }
    const handleSearch = (e) =>{
        const query = e.target.value.toLowerCase()
        if (query !== null)
            searchInfo(query)
        else
            setEmojis(emojis)
    }
    const handleClickEmoji = (emoji) =>{
        const cursorPos = refInput.current.selectionStart
        const text = refInput.current.value
        const prev = text.slice(0,cursorPos)
        const next = text.slice(cursorPos)
        refInput.current.value = prev + emoji.character + next
        refInput.current.selectionStart = cursorPos + emoji.character.length
        refInput.current.selectionEnd = cursorPos + emoji.character.length
        refInput.current.focus()
    }

    return(
        <Container ref={containerRef}>
            <Row>
                <Col className="contenedorbtnSearchEmoji">
                    <Button className="btnSearchEmoji" variant="info" onClick={ () => setIsOpen(!isOpen)}>Add Emoji 😃</Button>
                </Col>
                { isOpen && ( 
                    <Container className="contenedorSearchEmoji">
                        <Row>
                            <Col xs={{span:10,offset:1}} md={{span:6,offset:3}} xl={{span:4, offset:4}}>
                                <EmojiSearch onSearch={handleSearch}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span:11,offset:1}} md={{span:7,offset:3}} xl={{span:4, offset:4}}>
                                {emojis.map(emoji => (
                                    <EmojiButton key={emoji.unicodeName} emoji={emoji} onClick={handleClickEmoji}/>
                                ))}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="contenedorCategoria" 
                                xs={{span:10,offset:1}} md={{span:7,offset:3}} xl={{span:4, offset:4}}>
                                {categories.map((category,index) => (
                                    <EmojiCategory key={index} category={category} onClick={()=>searchCategories(category)}/>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                )}
            </Row>
        </Container>
    )
})

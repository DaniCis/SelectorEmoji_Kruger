import { useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import EmojiPicker from './EmojiPicker';
import Container from 'react-bootstrap/Container'

const EmojiForm = () => {
    const refInput = useRef()

    const clearForm = () =>{
        refInput.current.value=''
    }
    return(
        <Container className='contenedorPrincipal'>
            <Row>
                <Col xs={{span:6,offset:3}} md={{span:4,offset:4}} lg={{span:6,offset:5}} xl={{span:4,offset:5}}>
                    <h4 className='title'>Emoji Selector</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={{span:8,offset:1}} md={{ span:6, offset: 3 }} xl={{span:4, offset:4}}>
                    <Form.Control className="input" type="text" placeholder='Enter text' ref={refInput}/>
                </Col>
                <Col>
                    <Button variant='danger' onClick={clearForm}>Clear</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <EmojiPicker ref={refInput}/>
                </Col>
            </Row>
        </Container>
    )
}
export default EmojiForm;
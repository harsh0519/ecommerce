import React from 'react'
import { Container, Image } from 'react-bootstrap'
import logo from '../../assets/logo.png'

function AdminFooter() {
    return <>
        <div style={{backgroundColor : "black",color : "white",height : "100%"}}>
            <Container className='text-center py-4'>
                <Image src={logo} width={80} height={80}/>
                <div className='mb-3'>THE CRAZY NIGHT</div>
                <hr />
                <div style={{fontSize : "0.7em"}}>Copyright &copy; 2024</div>
            </Container>
        </div>
    </>
}

export default AdminFooter
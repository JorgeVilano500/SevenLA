import Navbar from 'react-bootstrap/Navbar'
import NavbarDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { TfiAlignJustify } from "react-icons/tfi";
import Nav from 'react-bootstrap/Nav'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import '../../css/SidNav.css'

interface ColorProps {
    color: string, 
    onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void
    styleObj: {}
}

const pages = [
    {
        page: 'Home', 
        path: '/'
    },
    {
        page: 'Posts', 
        path: '/posts'
    }, 
    {
        page: 'Planned Dates', 
        path: '/wishlist'
    },
    {
        page: 'Planned Dates',
        path: '/dates'
    }

]

export function NavbarPage({color, onChangeHandler, styleObj}: ColorProps) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);



    return(
        <Navbar style={{height: '5rem', width: '100rem'}} bg='dark' variant='dark' expand='lg' >
            <Container>
                <Navbar.Brand onClick={showSidebar}>{<TfiAlignJustify />}</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/posts'>Posts</Nav.Link>
                        <Nav.Link href='/wishlist'>Wishlist</Nav.Link>
                        <Nav.Link href='/dates'>Dates</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}> 
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    <li>
                        <div className='themes'>
                            <button className='btn btn-1'></button>
                            <button className='btn btn-2'></button>
                            <button className='btn btn-3'></button>
                            <button className='btn btn-4'></button>
                            <button className='btn btn-5'></button>
                            <button className='btn btn-6'></button>

                        </div>
                    </li>

                </ul>
            </nav>
        </Navbar>
    )

}
import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col} from 'reactstrap'
import '../stylesheets/Home.css'

function Home(props) {
    return (
        <Container fluid={true}>
            <Row className='mt-5'>
                <Col>
                    <Link to="/client">
                        <button className="btn btn-primary tile">
                            <h2>Clients</h2>
                        </button>
                    </Link>
                </Col>

                <Col>
                    <Link to="/worker">
                        <button className="btn tile" style={{ backgroundColor: "#fb15c9", color: "white" }}>
                            <h2>Workers</h2>
                        </button>
                    </Link>
                </Col>

            </Row>

            <Row className='mt-5'>

                <Col>
                    <Link to="/agent">
                        <button className="btn tile" style={{ backgroundColor: "brown", color: "white" }}>
                            <h2>Agents</h2>
                        </button>
                    </Link>
                </Col>

                <Col>
                    <Link to="/machinery">
                        <button className="btn btn-dark tile">
                            <h2>Machineries</h2>
                        </button>
                    </Link>
                </Col>
            </Row>
                
            <Row className='mt-5'>
                <Col>
                    <Link to="/site">
                        <button className="btn btn-success tile">
                            <h2>Sites</h2>
                        </button>
                    </Link>
                </Col>

                <Col>
                    <Link to="/cp">
                        <button className="btn btn-danger tile">
                            <h2>Contact Person</h2>
                        </button>
                    </Link>
                </Col>

            </Row>

            <Row className='mt-5'>
                <Col>
                    <Link to="/agreement">
                        <button className="btn tile" style={{ backgroundColor: "#7a1d63", color: "white" }}> 
                            <h2>Agreements</h2>
                        </button>
                    </Link>
                </Col>
                <Col>
                    <Link to="/project">
                        <button className="btn btn-info tile">
                            <h2>Projects</h2>
                        </button>
                    </Link>
                </Col>
            </Row>
            
            {/*<div className="d-flex flex-row justify-content-around mb-5 mt-5">
                <Link to="/customer">
                    <button className="btn btn-primary tile">
                        <h2>Clients</h2>
                    </button>
                </Link>
                <Link to="/customer">
                    <button className="btn btn-primary tile">
                        <h2>Workers</h2>
                    </button>
                </Link>
                <Link to="/customer">
                    <button className="btn btn-primary tile">
                        <h2>Agents</h2>
                    </button>
                </Link>
                <Link to="/machinery">
                    <button className="btn btn-dark tile">
                        <h2>Machineries</h2>
                    </button>
                </Link>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <Link to="/workhouse">
                    <button className="btn btn-success tile">
                        <h2>Sites</h2>
                    </button>
                </Link>
                <Link to="/organization">
                    <button className="btn btn-danger tile">
                        <h2>Organizations</h2>
                    </button>
                </Link>
                <Link to="/agreement">
                    <button className="btn tile" style={{ backgroundColor: "#7a1d63", color: "white" }}> 
                        <h2>Agreements</h2>
                    </button>
                </Link>
                <Link to="/project">
                    <button className="btn btn-info tile">
                        <h2>Projects</h2>
                    </button>
                </Link>
            </div>*/}
        </Container>
    )
}

export default Home

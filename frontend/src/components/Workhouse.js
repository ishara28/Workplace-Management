import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardFooter, CardBody, CardHeader, CardText, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchWorkhouses} from '../redux/ActionCreators'


const mapStateToProps = (state) => ({
    Workhouses:state.Workhouses
})

const mapDispatchToProps = (dispatch) => ({
    fetchWorkhouses:()=>dispatch(fetchWorkhouses())
})

class Workhouse extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }

        this.update = this.update.bind(this)
    }
    

    componentDidMount(){
        this.props.fetchWorkhouses();
    }

    update(item){

    }
    

    render(){
        const menu = this.props.Workhouses.workhouses.map((item) => {
            return (
                <>
                    <Modal isOpen={this.state.modalUsername} toggle={this.toggleModalUsername}>
                        <ModalHeader toggle={this.toggleModalUsername}>Change username</ModalHeader>
                        <ModalBody>
                            <form onSubmit={values=>this.changeUsername(values)}>
                                <input type="text" className="form-control mb-3" id="username" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="username" required/>
                                <input type="password" className="form-control mb-3" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="password" required/>
                                <input type="text" className="form-control mb-3" id="newUsername" name="newUsername" value={this.state.newUsername} onChange={this.handleInputChange} placeholder="new username" required/>
                                <center>
                                    <button type="submit" class="btn btn-success">change</button>
                                </center>
                            </form>
                        </ModalBody>
                    </Modal>
                    <div key={item.w_id} className="col-12 mt-3">
                        <Card>
                            <CardHeader>index No: {item.index_no}</CardHeader>
                            <CardBody>
                                <CardText>Register Date: {item.reg_date}</CardText>
                                <CardText>Status: {item.status}</CardText>
                                <CardText>Telephone number: {item.telephone}</CardText>
                                <CardText>email: {item.email}</CardText>
                                <CardText>Address:<br/>{item.address}</CardText>
                                <CardText>Description:<br/>{item.description}</CardText>
                                <CardText>Customer id: {item.c_id}</CardText>
                            </CardBody>
                            <CardFooter>
                                <button type="button" className="btn btn-success mr-2">Update</button>
                                {item.status!="BLOCKED" && <button type="button" className="btn btn-primary mr-2">Block</button>}
                                {item.status!="REMOVED" && <button type="button" className="btn btn-danger">Remove</button>}                        
                            </CardFooter>
                        </Card>
                    </div>
                </>
            );
        });

        console.log(this.props.Workhouses.workhouses);
        return (
            <>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Workhouse</BreadcrumbItem>
                </Breadcrumb>

                <div className="col-12">
                  {menu}
                </div>
                 
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Workhouse))

/*<div className="container-fluid d-flex flex-row-reverse">
<button className="btn btn-success ml-2">Register</button>
                    <input type="text" className="form-control textbox" placeholder="Search by Id"/>
                    </div>*/
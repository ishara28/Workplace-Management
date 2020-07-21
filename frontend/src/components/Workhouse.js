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

class RenderItem extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            index_no:this.props.workhouses.index_no,
            reg_date:this.props.workhouses.reg_date,
            status:this.props.workhouses.status,
            telephone:this.props.workhouses.telephone,
            email:this.props.workhouses.email,
            address:this.props.workhouses.address,
            description:this.props.workhouses.description,
            c_id:this.props.workhouses.c_id,

            modalUpdate:false
        }

        this.toggleModalUpdate = this.toggleModalUpdate.bind(this);
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]:value
        })
    }
    
    toggleModalUpdate(){
        this.setState({
            modalUpdate:!this.state.modalUpdate
        })
    }

    update(item){
        /*this.setState({
            telephone:item.telephone
        })*/
        this.toggleModalUpdate();
        
    }

    handleSubmit(event){
        event.preventDefault();
        this.update();
    }

    render(){
        return (
            <>
                <Modal isOpen={this.state.modalUpdate} toggle={this.toggleModalUpdate}>
                    <ModalHeader toggle={this.toggleModalUpdate}>Update {this.state.index_no} Workhouse</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label>Telephone number</label>
                                <input type="text" className="form-control mb-3" id="telephone" name="telephone" value={this.state.telephone} onChange={this.handleInputChange}  required/>
                            </div>
                                
                            <div class="form-group">
                                <label>email</label>
                                <input type="email" className="form-control mb-3" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} required/>
                            </div>

                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control mb-3" id="address" name="address" value={this.state.address} onChange={this.handleInputChange} required/>
                            </div>
                                
                            <div class="form-group">
                                <label>Description</label>
                                <textarea type="text" className="form-control mb-3" id="description" name="description" value={this.state.description} onChange={this.handleInputChange} required/>
                            </div>
                                
                            <div class="form-group">
                                <label>Customer</label>
                                <select type="text" className="form-control mb-3" id="customer" name="customer" value={this.state.customer} onChange={this.handleInputChange} required>
                                    <option>{this.state.c_id}</option>
                                </select>
                            </div>

                            <center>
                                <button type="submit" class="btn btn-success mr-2">change</button>
                                <button type="button" className="btn btn-primary">cancel</button>
                            </center>
                        </form>
                    </ModalBody>
                </Modal>
                <div className="col-12 mt-3">
                        <Card>
                            <CardHeader>index No: {this.state.index_no}</CardHeader>
                            <CardBody>
                                <CardText>Register Date: {this.state.reg_date}</CardText>
                                <CardText>Status: {this.state.status}</CardText>
                                <CardText>Telephone number: {this.state.telephone}</CardText>
                                <CardText>email: {this.state.email}</CardText>
                                <CardText>Address:<br/>{this.state.address}</CardText>
                                <CardText>Description:<br/>{this.state.description}</CardText>
                                <CardText>Customer id: {this.state.c_id}</CardText>
                            </CardBody>
                            <CardFooter>
                                <button type="button" className="btn btn-success mr-2" onClick={(item)=>this.update(item)}>Update</button>
                                {this.props.status!="BLOCKED" && <button type="button" className="btn btn-primary mr-2">Block</button>}
                                {this.props.status!="REMOVED" && <button type="button" className="btn btn-danger">Remove</button>}                        
                            </CardFooter>
                        </Card>
                    </div>
            </>
        );
        
    }
    
}

class Workhouse extends Component { 
    componentDidMount(){
        this.props.fetchWorkhouses();
    }

    render(){
        const items = this.props.Workhouses.workhouses.map((item) => {
            return (
                <RenderItem workhouses={item} key={item.w_id}/>
            );
        });

        return (
            <>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Workhouse</BreadcrumbItem>
                </Breadcrumb>

                <div className="col-12">
                  {items}
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
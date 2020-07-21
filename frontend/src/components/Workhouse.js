import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardFooter, CardBody, CardHeader, CardText, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchWorkhouses} from '../redux/ActionCreators'
import axios from 'axios'
import {baseUrl} from '../shared/baseUrl'


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
            w_id:this.props.workhouses.w_id,
            index_no:this.props.workhouses.index_no,
            reg_date:this.props.workhouses.reg_date,
            status:this.props.workhouses.status,
            telephone:this.props.workhouses.telephone,
            email:this.props.workhouses.email,
            address:this.props.workhouses.address,
            description:this.props.workhouses.description,
            c_id:this.props.workhouses.c_id,

            reason:null,

            modalUpdate:false,
            modalBlock:false,
            modalRemove:false
        }

        this.toggleModalUpdate = this.toggleModalUpdate.bind(this);
        this.toggleModalBlock = this.toggleModalBlock.bind(this);
        this.toggleModalRemove = this.toggleModalRemove.bind(this);
        this.submitReason = this.submitReason.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.blockWorkhouse = this.blockWorkhouse.bind(this);
        this.removeWorkhouse = this.removeWorkhouse.bind(this);

        
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

    toggleModalBlock(){
        this.setState({
            modalBlock:!this.state.modalBlock
        })
    }

    toggleModalRemove(){
        this.setState({
            modalRemove:!this.state.modalRemove
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.toggleModalUpdate();

        return axios.post(baseUrl+'workhouse/update/'+this.state.w_id, {
            address: this.state.address,
            telephone: this.state.telephone,
            email: this.state.email,
            description: this.state.description,
            c_id: this.state.c_id,
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        
    }

    blockWorkhouse(){
        this.setState({
            status:"BLOCKED"
        })

        return axios.post(baseUrl+'workhouse/block/'+this.state.w_id, {
            reason:this.state.reason
        })
        .then((response) => {
            console.log(response);
        })
        .catch(err=>console.log(err));
    }

    removeWorkhouse(){
        this.toggleModalRemove();

        this.setState({
            status:"REMOVED"
        })

        return axios.post(baseUrl+'workhouse/remove/'+this.state.w_id)
        .then((response) => {
            console.log(response);
        })
        .catch(err=>console.log(err));
    }

    submitReason(event){
        event.preventDefault();
        this.toggleModalBlock();
        this.blockWorkhouse();
    }

    render(){
        return (
            <>
                <Modal isOpen={this.state.modalUpdate} toggle={this.toggleModalUpdate}>
                    <ModalHeader toggle={this.toggleModalUpdate}>Update {this.state.index_no} Workhouse</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Telephone number</label>
                                <input type="text" className="form-control mb-3" id="telephone" name="telephone" value={this.state.telephone} onChange={this.handleInputChange}  required/>
                            </div>
                                
                            <div className="form-group">
                                <label>email</label>
                                <input type="email" className="form-control mb-3" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} required/>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control mb-3" id="address" name="address" value={this.state.address} onChange={this.handleInputChange} required/>
                            </div>
                                
                            <div className="form-group">
                                <label>Description</label>
                                <textarea type="text" className="form-control mb-3" id="description" name="description" value={this.state.description} onChange={this.handleInputChange} required/>
                            </div>
                                
                            <div className="form-group">
                                <label>Customer</label>
                                <select type="text" className="form-control mb-3" id="customer" name="customer" value={this.state.customer} onChange={this.handleInputChange} required>
                                    <option>{this.state.c_id}</option>
                                </select>
                            </div>

                            <center>
                                <button type="submit" className="btn btn-success mr-2">Change</button>
                                <button type="button" className="btn btn-primary">Cancel</button>
                            </center>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalRemove} toggle={this.toggleModalRemove}>
                    <ModalHeader toggle={this.toggleModalRemove} className="text-danger">Warning!</ModalHeader>
                    <ModalBody>
                        Do you want to remove workhouse?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={this.toggleModalRemove}>Cancel</button>
                        <button className="btn btn-danger" onClick={this.removeWorkhouse}>Remove</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalBlock} toggle={this.toggleModalBlock}>
                    <ModalHeader toggle={this.toggleModalBlock} className="text-danger">Warning!</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.submitReason}>
                            <div className="form-group">
                                <label>Do you want to block workhouse?</label>
                                <textarea type="text" className="form-control mb-3" id="reason" name="reason" value={this.state.reason} onChange={this.handleInputChange} placeholder="Reason" required/>
                            </div>
                            <button type="submit" className="btn btn-danger mr-2">Block</button>
                            <button className="btn btn-success" onClick={this.toggleModalBlock}>Cancel</button>
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
                                <button type="button" className="btn btn-primary mr-2" onClick={this.toggleModalUpdate}>Update</button>
                                {this.state.status!=="ACTIVE" && <button type="button" className="btn btn-success mr-2">Active</button>}
                                {this.state.status!=="BLOCKED" && <button type="button" className="btn btn-danger mr-2" onClick={this.toggleModalBlock}>Block</button>}
                                {this.state.status!=="REMOVED" && <button type="button" className="btn btn-dark" onClick={this.toggleModalRemove}>Remove</button>}                     
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
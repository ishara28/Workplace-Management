import React, { Component } from 'react'
import {Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, CardText, CardFooter} from 'reactstrap'
import {Link, withRouter} from 'react-router-dom'
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios'
import {updateWorkhouse} from '../redux/ActionCreators'
import {connect} from 'react-redux'
import {Loading} from './LoadingComponent'

const mapDispatchToProps = (dispatch) => ({
    updateWorkhouse: (updated)=>dispatch(updateWorkhouse(updated))
})

export class OneWorkhouse extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            w_id:'',
            index_no:'',
            reg_date:'',
            status:'',
            telephone:'',
            email:'',
            address:'',
            description:'',
            c_id:'',
            error:'',
            isLoading:false,

            telephone2:'',
            email2:'',
            address2:'',
            description2:'',
            c_id2:'',

            reason:'',

            modalUpdate:false,
            modalBlock:false,
            modalRemove:false
        };
        this.toggleModalUpdate = this.toggleModalUpdate.bind(this);
        this.toggleModalBlock = this.toggleModalBlock.bind(this);
        this.toggleModalRemove = this.toggleModalRemove.bind(this);
        this.submitReason = this.submitReason.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.blockWorkhouse = this.blockWorkhouse.bind(this);
        this.removeWorkhouse = this.removeWorkhouse.bind(this);
    }
    

    componentDidMount(){
        this.setState({isLoading:true})

        return fetch(baseUrl + "workhouse/"+this.props.index_no)
        .then(
            response => {
              if (response.ok) {
                return response;
              } else {
                var error = new Error(
                  "Error " + response.status + ": " + response.statusText
                );
                error.response = response;
                throw error;
              }
            },
            error => {
              var errmess = new Error(error.message);
              throw errmess;
            }
          )
        .then(response => response.json())
        .then(workhouses => {
            if(workhouses.length===1){
                this.setState({
                    w_id:workhouses[0].w_id,
                    index_no:workhouses[0].index_no,
                    reg_date:workhouses[0].reg_date,
                    status:workhouses[0].status,
                    telephone:workhouses[0].telephone,
                    email:workhouses[0].email,
                    address:workhouses[0].address,
                    description:workhouses[0].description,
                    c_id:workhouses[0].c_id,
                    telephone2:workhouses[0].telephone,
                    email2:workhouses[0].email,
                    address2:workhouses[0].address,
                    description2:workhouses[0].description,
                    c_id2:workhouses[0].c_id,
                    isLoading:false
                })
            }else{
                this.setState({
                    error:"No workhouse with this index!",
                    isLoading:false
                });
            }           
        })
        .catch(error => this.setState({error:error.message, isLoading:false}));
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
        .catch(err=>this.setState({error:err}));
    }

    handleSubmit(event){
        event.preventDefault();
        this.toggleModalUpdate();
        this.setState({
            address2: this.state.address,
            telephone2: this.state.telephone,
            email2: this.state.email,
            description2: this.state.description,
            c_id2: this.state.c_id,
        });

        const updated = {
            w_id:this.state.w_id,
            index_no:this.state.index_no,
            reg_date:this.state.reg_date,
            status:this.state.status,
            address: this.state.address,
            telephone: this.state.telephone,
            email: this.state.email,
            description: this.state.description,
            c_id: this.state.c_id,
        };

        this.props.updateWorkhouse(updated); 
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

    render() {
        if(this.state.isLoading){
            return(
                <>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/workhouse">Workhouse</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.index_no}</BreadcrumbItem>
                    </Breadcrumb>
                    <Loading/>
                </>
            )
        }
        else{
            if(this.state.error!==''){
                return(
                    <>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/workhouse">Workhouse</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.index_no}</BreadcrumbItem>
                        </Breadcrumb>
                        <h1>{this.state.error}</h1>
                    </>
                )
            }else{
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
                                        
                                    {/*meka blanna*/} 
                                    {/*<div className="form-group">
                                        <label>Customer</label>
                                        <select type="text" className="form-control mb-3" id="customer" name="customer" value={this.state.customer} onChange={this.handleInputChange} required> 
                                            <option selected>{this.state.c_id}</option>
                                        </select>
                                    </div>*/}

                                    <center>
                                        <button type="submit" className="btn btn-success mr-2">Change</button>
                                        <button type="button" className="btn btn-primary" onClick={this.toggleModalUpdate}>Cancel</button>
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

                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/workhouse">Workhouse</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.index_no}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12 mt-3 mb-3">
                        <Card>
                            <CardHeader className="bg-dark text-white">index No: {this.state.index_no}</CardHeader>
                            <CardBody>
                                <CardText>Register Date: {this.state.reg_date}</CardText>
                                <CardText>Status: {this.state.status}</CardText>
                                <CardText>Telephone number: {this.state.telephone2}</CardText>
                                <CardText>email: {this.state.email2}</CardText>
                                <CardText>Address:<br/>{this.state.address2}</CardText>
                                <CardText>Description:<br/>{this.state.description2}</CardText>
                                <CardText>Customer id: {this.state.c_id2}</CardText>
                            </CardBody>
                            <CardFooter className="bg-warning">
                                <button type="button" className="btn btn-primary mr-2" onClick={this.toggleModalUpdate}>Update</button>
                                {this.state.status!=="ACTIVE" && <button type="button" className="btn btn-success mr-2">Active</button>}
                                {this.state.status!=="BLOCKED" && <button type="button" className="btn btn-danger mr-2" onClick={this.toggleModalBlock}>Block</button>}
                                {this.state.status!=="REMOVED" && <button type="button" className="btn btn-dark" onClick={this.toggleModalRemove}>Remove</button>}                     
                            </CardFooter>
                        </Card>
                    </div>
                    </>
                )
            }
        }
        
    }
}

export default withRouter(connect(null,mapDispatchToProps)(OneWorkhouse))

import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchWorkhouses} from '../redux/ActionCreators'
import axios from 'axios'
import {baseUrl} from '../shared/baseUrl'
import {Loading} from './LoadingComponent'
import {RenderItem} from './WorkhouseRenderItem'

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
            modalRegister: false,
            searchedItem:null
        }

        this.toggleModalRegister = this.toggleModalRegister.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.changeSearchedItem = this.changeSearchedItem.bind(this);
    }
    

    componentDidMount(){
        this.props.fetchWorkhouses();
    }

    toggleModalRegister(){
        this.setState({
            modalRegister: !this.state.modalRegister
        })
    }

    submitRegister(event){
        event.preventDefault();
        this.toggleModalRegister();

        return axios.post(baseUrl+'workhouse/register',{
            address: this.state.address,
            telephone: this.state.telephone,
            email: this.state.email,
            description: this.state.description,
            c_id: this.state.c_id
        })
        .then((response) => {
            console.log(response);
        })
        .catch(err=>console.log(err));
    }

    changeSearchedItem(event){
        this.setState({
            searchedItem: event.target.value
        })
    }

    render(){
        
            if(this.props.Workhouses.isLoading){
                return(
                    <>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Workhouse</BreadcrumbItem>
                        </Breadcrumb>
                                   
                        <Loading />
                    </>
                );
            }else if(this.props.Workhouses.errMess){
                return(
                    <>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Workhouse</BreadcrumbItem>
                        </Breadcrumb>
                        
                        <h1>{this.props.Workhouses.errMess}</h1>
            
                    </>
                );
            }else{
                const items = this.props.Workhouses.workhouses.map((item) => {
                    return (
                        <RenderItem workhouses={item} key={item.w_id}/>
                    );
                });

                return (
                    <>
                        <Modal isOpen={this.state.modalRegister} toggle={this.toggleModalRegister}>
                            <ModalHeader toggle={this.toggleModalRegister}>Register Workhouse</ModalHeader>
                            <ModalBody>
                                <form onSubmit={this.submitRegister}>
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
                                        
                                    {/*<div className="form-group">
                                        <label>Customer</label>
                                        <select type="text" className="form-control mb-3" id="customer" name="customer" value={this.state.customer} onChange={this.handleInputChange} required>
                                            <option>{this.state.c_id}</option>
                                        </select>
                                    </div>*/}
        
                                    <center>
                                        <button type="submit" className="btn btn-success mr-2">Register</button>
                                        <button type="button" className="btn btn-primary" onClick={this.toggleModalRegister}>Cancel</button>
                                    </center>
                                </form>
                            </ModalBody>
                        </Modal>
        
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Workhouse</BreadcrumbItem>
                        </Breadcrumb>

                        <div className="row">
                            <div className="col-6">
                                <div className="container-fluid d-flex flex-row">
                                    <form className="form-inline">
                                        <div className="form-group ml-3">
                                            <input type="text" className="form-control" value={this.state.searchedItem} onChange={this.changeSearchedItem} placeholder="Search by Index no"/>
                                        </div>
                                        <Link to={`workhouse/${this.state.searchedItem}`}><button type="button" className="btn btn-info ml-2">Search</button></Link>
                                    </form>
                                </div> 
                            </div>

                            <div className="col-6">
                                <div className="container-fluid d-flex flex-row-reverse">
                                    <button className="btn btn-success mr-3" onClick={this.toggleModalRegister}>Register</button>
                                </div> 
                            </div>    
                        </div>                  
        
                        <div className="col-12">
                        {items}
                        </div>
                    </>
                )
            }
        
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Workhouse))
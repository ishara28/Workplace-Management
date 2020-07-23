import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateMachinery,activeMachinery, blockMachinery, removeMachinery} from '../redux/ActionCreators'

const mapDispatchToProps = (dispatch) => ({
    updateMachinery:(machinery)=>dispatch(updateMachinery(machinery)),
    activeMachinery:(m_id)=>dispatch(activeMachinery(m_id)),
    blockMachinery:(m_id,reason)=>dispatch(blockMachinery(m_id,reason)),
    removeMachinery:(m_id)=>dispatch(removeMachinery(m_id))
})

class RenderItem extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            m_id:this.props.machineries.m_id,
            index_no:this.props.machineries.index_no,
            reg_id:this.props.machineries.reg_id,
            reg_date:this.props.machineries.reg_date,
            status:this.props.machineries.status,
            description:this.props.machineries.description,
            category:this.props.machineries.category,
            c_id:this.props.machineries.c_id,

            reason:null,

            modalUpdate:false,
            modalBlock:false,
            modalRemove:false
        }

        this.toggleModalUpdate = this.toggleModalUpdate.bind(this);
        this.toggleModalBlock = this.toggleModalBlock.bind(this);
        this.toggleModalRemove = this.toggleModalRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.blockMachinery = this.blockMachinery.bind(this);
        this.removeMachinery = this.removeMachinery.bind(this);
        this.activeMachinery = this.activeMachinery.bind(this);

        
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
        const updated = {
            m_id:this.state.m_id,
            index_no:this.state.index_no,
            reg_id:this.state.reg_id,
            reg_date:this.state.reg_date,
            status:this.state.status,
            description:this.state.description,
            category:this.state.category,
            c_id:this.state.c_id,
        }

        this.props.updateMachinery(updated); 
    }

    activeMachinery(){
        this.setState({
            status:"ACTIVE"
        })

        this.props.activeMachinery(this.state.m_id);
    }

    removeMachinery(){
        this.toggleModalRemove();

        this.setState({
            status:"REMOVED"
        })

        this.props.removeMachinery(this.state.m_id);
    }

    blockMachinery(event){
        event.preventDefault();
        this.toggleModalBlock();

        this.setState({
            status:"BLOCKED"
        })

        this.props.blockMachinery(this.state.m_id,this.state.reason);
    }

    render(){
        return (
            <>
                <Modal isOpen={this.state.modalUpdate} toggle={this.toggleModalUpdate}>
                    <ModalHeader toggle={this.toggleModalUpdate}>Update {this.state.index_no} Machinery</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Register ID</label>
                                <input type="text" className="form-control mb-3" id="reg_id" name="reg_id" value={this.state.reg_id} onChange={this.handleInputChange}  required/>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input type="text" className="form-control mb-3" id="category" name="category" value={this.state.category} onChange={this.handleInputChange} required/>
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
                                <button type="submit" className="btn btn-success mr-2">Change</button>
                                <button type="button" className="btn btn-primary" onClick={this.toggleModalUpdate}>Cancel</button>
                            </center>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalRemove} toggle={this.toggleModalRemove}>
                    <ModalHeader toggle={this.toggleModalRemove} className="text-danger">Warning!</ModalHeader>
                    <ModalBody>
                        Do you want to remove machinery?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={this.toggleModalRemove}>Cancel</button>
                        <button className="btn btn-danger" onClick={this.removeMachinery}>Remove</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalBlock} toggle={this.toggleModalBlock}>
                    <ModalHeader toggle={this.toggleModalBlock} className="text-danger">Warning!</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.blockMachinery}>
                            <div className="form-group">
                                <label>Do you want to block machinery?</label>
                                <textarea type="text" className="form-control mb-3" id="reason" name="reason" value={this.state.reason} onChange={this.handleInputChange} placeholder="Reason" required/>
                            </div>
                            <button type="submit" className="btn btn-danger mr-2">Block</button>
                            <button className="btn btn-success" onClick={this.toggleModalBlock}>Cancel</button>
                        </form>   
                           
                    </ModalBody>
                </Modal>
                
                <tr>
                    <td>{this.props.machineries.index_no}</td>
                    <td>{this.props.machineries.reg_date}</td>
                    <td>{this.props.machineries.reg_id}</td>
                    <td>{this.props.machineries.status}</td>
                    <td>{this.props.machineries.category}</td>
                    <td>{this.props.machineries.description}</td>
                    <td>{this.props.machineries.c_id}</td>
                    <td>
                        <button type="button" className="btn btn-primary mr-2" onClick={this.toggleModalUpdate}>Update</button>
                        {this.state.status!=="ACTIVE" && <button type="button" className="btn btn-success m-2" onClick={this.activeMachinery}>Active</button>}
                        {this.state.status!=="BLOCKED" && <button type="button" className="btn btn-danger m-2" onClick={this.toggleModalBlock}>Block</button>}
                        {this.state.status!=="REMOVED" && <button type="button" className="btn btn-dark m-2" onClick={this.toggleModalRemove}>Remove</button>}
                    </td>
                </tr>
            </>
        );
        
    }
    
}

export default withRouter(connect(null,mapDispatchToProps)(RenderItem));
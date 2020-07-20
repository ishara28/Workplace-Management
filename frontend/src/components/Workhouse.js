import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardTitle} from 'reactstrap';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchWorkhouses} from '../redux/ActionCreators'

const mapStateToProps = (state) => ({
    Workhouses:state.Workhouses
})

const mapDispatchToProps = (dispatch) => ({
    fetchWorkhouses:()=>dispatch(fetchWorkhouses())
})

function RenderItem({item}){
    return(
        <Card>
            <CardTitle>{item.index_no}</CardTitle>
        </Card>
    )
}

class Workhouse extends Component {
    componentDidMount(){
        this.props.fetchWorkhouses();
    }

    menu = this.props.Workhouses.workhouses.map((item) =>{
        return(
            <div key={item.w_id} className="col-12 col-md-5 m-1">
                <RenderItem item={item}/>
            </div>
        )
    });

    

    render(){
        console.log(this.props.Workhouses.workhouses);
        return (
            <>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Workhouse</BreadcrumbItem>
                </Breadcrumb>

                <div className="row">
                    {this.menu} 
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
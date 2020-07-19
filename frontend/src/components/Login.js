import React,{Component} from 'react'
import '../stylesheets/Welcome.css'
import { updateUsername } from '../redux/ActionCreators'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return{
        username: state.username
    }
}

const mapDispatchToProps = dispatch => ({
    updateUsername: username => dispatch(updateUsername(username))
})

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             password:''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]:value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        
        this.props.updateUsername(this.state.username);
    }

    render(){
        return (
            <div className="mainContainer bg-dark">
                <div className="container-fluid bg-primary">
                    <div className="text-center text-white font-weight-bold">
                        <h1 className="p-4">Workplace Management System</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="container bg-light formbox">
                        <h2 className="text-center"><b>Login</b></h2>
                        <hr className="bg-success horizontal_line"/>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" className="form-control mb-3" id="username" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="username" required/> 
                            <input type="password" className="form-control mb-3" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="password" required/>
                            <center>
                                <button className="btn btn-success btn_login_register">Login</button>
                            </center>
                        </form>
                    </div>
                </div>            
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
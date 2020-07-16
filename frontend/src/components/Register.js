import React,{Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             password:'',
             conf_password:'',
             secret_key:''
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
    }

    render(){
        return (
            <div className="container bg-light formbox">

                <h4 className="text-center"><b>Register</b></h4>
                            
                <hr className="bg-success horizontal_line"/>

                <form onSubmit={this.handleSubmit}>
                    <input type="username" className="form-control mb-3" id="username" name="username" value={this.username} onChange={this.handleInputChange} placeholder="username" required/>
                        
                    <input type="password" className="form-control mb-3" id="password" name="password" value={this.password} onChange={this.handleInputChange} placeholder="password" required/>

                    <input type="password" className="form-control mb-3" id="conf_password" name="conf_password" value={this.conf_password} onChange={this.handleInputChange} placeholder="confirm password" required/>

                    <input type="secret_key" className="form-control mb-3" id="secret_key" name="secret_key" value={this.secret_key} onChange={this.handleInputChange} placeholder="secret key" required/>
    
                    <center>
                        <button type="submit" class="btn btn-success btn_login_register">Sign Up</button>
                    </center>

                </form>
            </div>
        )
    }
}

export default Register
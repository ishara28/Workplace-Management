import React,{Component} from 'react'

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
    }

    render(){
        return (
            <div className="container bg-light formbox">

                <h4 className="text-center"><b>Login</b></h4>
                
                <hr className="bg-primary horizontal_line"/>

                <form onSubmit={this.handleSubmit}>
                    <input type="username" className="form-control mb-3" id="username" name="username" value={this.username} onChange={this.handleInputChange} placeholder="username" required/>
                        
                    <input type="password" className="form-control mb-3" id="password" name="password" value={this.password} onChange={this.handleInputChange} placeholder="password" required/>

                    <center>
                        <button type="submit" class="btn btn-primary btn_login_register">Login</button>
                    </center>

                </form>
            </div>
        )
    }
}

export default Login
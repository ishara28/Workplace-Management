import React,{useState} from 'react'
import '../stylesheets/Welcome.css'
import Register from './Register'
import Login from './Login'

function Welcome() {
    const [registertab,set_registertab] = useState(true);
    
    return (
        <div className="mainContainer bg-dark">
            <div className="container-fluid bg-primary">
                <div className="text-center text-white font-weight-bold topBarText">
                    Workplace Management System
                </div>
            </div>
            <div class="row">

                <div class="col">
                    <div className="container bg-light tabBtnPane">
                        <button type="button" class="btn btn-success tabBtn" disabled={registertab} onClick={()=>set_registertab(true)}>Register</button><br/>
                        <button type="button" class="btn btn-primary tabBtn" disabled={!registertab} onClick={()=>set_registertab(false)}>Login</button>
                    </div>
                </div>

                <div class="col-8">
                    {registertab && <Register/>}
                    {!registertab && <Login/>}
                </div>
                
            </div>            
        </div>
    )
}

export default Welcome
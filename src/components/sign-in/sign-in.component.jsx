import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import './sign-in.styles.scss'
import {auth,signInWithGoogle} from '../../firebase/firebase.utils'


class SignIn extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }
    handleSubmit = async event=>{
        event.preventDefault()
        const {email,password} = this.state
        try{
            await auth.signInWithEmailAndPassword(email,password)
        }
        catch(error){
            console.log(error)
        }
        this.setState({
            email:'',password:''
        })
    }
    
    handleChange = (event)=>{
        const {name,value} = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        label="email"
                        required
                    />
                    <FormInput 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.handleChange} 
                        label = "password"
                        required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
                        Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
export default SignIn
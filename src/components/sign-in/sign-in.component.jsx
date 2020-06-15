import React, {Component} from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.components'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './sign-in.styles';
  
class SignIn extends Component {
    constructor(){
        super()

        this.state = {
            email : '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: '' });
        
        } catch (error) {
            console.error(error)
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({[name] : value})
    }

    render(){
        return(
            <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <ButtonsBarContainer>
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
        )
    }
}


export default SignIn
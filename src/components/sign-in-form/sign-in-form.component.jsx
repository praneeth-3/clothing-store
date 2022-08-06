import { useState } from "react";
import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase.utils";
import Button, {BUTTON_TYPE_CLASS} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {ButtonsContainer, SignInContainer} from './sign-in-form.styles'

const defaultFormFields = {
    'email': '',
    'password': ''
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch (error) {
            switch(error.code){
                case "auth/wrong-password": {
                    alert("incorrect password");
                    break;
                }
                case "auth/user-not-found": {
                    alert("no user associated with this email");
                    break;
                }
                default:
                    console.log(`Error signing in. (${error})`);
            }
        }
    }
    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    data-test-id='sign-in-email'
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email} />

                <FormInput
                    data-test-id='sign-in-password'
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password} />
                
                <ButtonsContainer>
                    <Button data-test-id='sign-in-button' type="submit">SIGN IN</Button>

                    <Button data-test-id='google-sign-in-button' type="button" buttonType={BUTTON_TYPE_CLASS.google} onClick={signInWithGoogle}>
                        GOOGLE SIGN IN
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;
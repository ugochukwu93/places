import React, { useState, useContext } from 'react'
import './Auth.css'
import Card from '../../shared/components/UIElements/Card'
// import '../../places/pages/PlaceForm.css'
import Input from '../../shared/components/FormElements/Input'
import { useForm } from '../../shared/components/Hooks/form-hook'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/Utils/validators';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-content'

export default function Auth() {
const [isLogin, setIsLogin] = useState(true)

const [formState, inputHandler, setFormData] = useForm({
    email: {
        value: "",
        isValid: false,
    },
    password: {
        value: "",
        isValid: false,
    },
}, false);

const switchModeHandler = ()=> {
    if (!isLogin) {
        setFormData({
                ...formState.inputs,
                name: undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid
        );
    } else {
        setFormData({
            ...formState.inputs,
            name: {
                value: "",
                isValid: false
            }
        }, false);
    }
     setIsLogin(prevMode => !prevMode);
}
const authSubmitHandler = event => {
    event.preventDefault();
    auth.login()
    console.log(formState.inputs)
};
const auth = useContext(AuthContext);
  return (

        <Card className="authentication">
          <h2>Login Required</h2>
          <hr/>
          <form onSubmit={authSubmitHandler}>
              {!isLogin && (
                  <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Your Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                  />
              )}
        <Input
            id="email"
            label="E-Mail"
            type="email"
            element="input"
            errorText="Please enter a valid Email."
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
            // value= {formState.inputs.email.value}
            // valid={formState.inputs.email.isValid}
        />
        <Input
            id="password"
            label="Password"
            type="password"
            element="input"
            errorText="Please enter a valid Password at least 8 characters."
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(8)]}
            // value= {formState.inputs.password.value}
            // valid={formState.inputs.password.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "LOGIN" : "SIGNUP"}
        </Button>
    </form>
        <Button 
         inverse 
         onClick={switchModeHandler}
        >
         SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
        </Button>
    </Card>
    
  )
}

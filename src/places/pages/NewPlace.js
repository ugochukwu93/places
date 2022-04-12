import React from 'react';

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/Utils/validators';
import Button from '../../shared/components/FormElements/Button'
import './PlaceForm.css'
import {useForm } from '../../shared/components/Hooks/form-hook'


const NewPlace = () => {
  const [formState, inputHandler] = useForm({
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
  })
  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs) //send this to the backend
  }
  

  return <form className='place-form' onSubmit={placeSubmitHandler}>
    <Input 
      id= "title"
      element="input" 
      type="text" 
      label='title' 
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title."
      onInput={inputHandler}
    />
    <Input
      id="description"
      element="textarea" 
      type="text" 
      label='Title' 
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText="Please enter a valid description (at least 5 characters)."
      onInput={inputHandler}
    />
    <Input
      id="address"
      element="input" 
      type="text" 
      label='Address' 
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid Address."
      onInput={inputHandler}
    />
    <Button type='submit' disabled={!formState.isValid}>
      ADD PLACE
    </Button>
  </form>
};

export default NewPlace;
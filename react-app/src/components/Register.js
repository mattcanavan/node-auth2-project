import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

import schema from "../validation/formSchema";

///// INITAL VALUES /////
const initalFormValues = {
    username: "",
    password: "",
}
const initalFormErrors = {
    username: "",
    password: "",
}
const initialDisabled = true


export default function Register() {
  const [formErrors, setFormErrors] = useState(initalFormErrors);
  const [formValues, setFormValues] = useState(initalFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);


  ///// EVENT HANDLERS /////
  const onChange = event => {
    const { name, value } = event.target;
    validate(name, value);
    setFormValues({ ...formValues, [name]: value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      username: formValues.username,
      password: formValues.password,
    };

    axios
      .post("http://localhost:5100/api/auth/register", newUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error...", error);
      });
  };

  ///// HELPERS /////
  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => {
          //if validation is successful do not save an error message
          setFormErrors({ ...formErrors, [name]: "" });
        }) 
      .catch((error) => {
        setFormErrors({ ...formErrors, [name]: error.errors[0] });
      });
  };

  ///// SIDE EFFECTS /////
  useEffect(() => {
    schema.isValid(formValues)
    .then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <form className="login" onSubmit={onSubmit}>
        <div className="login-container">
          <h3>Username: </h3>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formValues.username}
            onChange={onChange}
          />
          <br />

          <h3>Password: </h3>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formValues.password}
            onChange={onChange}
          />
          <br />

          <button className="login-button" disabled={disabled}>
            Submit
          </button>
          <div className="login-errors">
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
          </div>
        </div>
      </form>
    </div>
  );
}

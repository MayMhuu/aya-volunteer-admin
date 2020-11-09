import React, { Component } from 'react';
import {Form as FormIO } from 'react-formio';
import axios from 'axios';


export default class RegisterVolunteer extends Component {
    submitFormData (submission) {
        console.log ('submitted keys' + Object.keys(submission.data));

        const config = {
            method: "POST",
            url: 'https://ayavapp.herokuapp.com/volunteer/register',
            headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ3Mjc2MzAsImV4cCI6MTYwNDgxNDAzMH0.jtQ2rClZ5Dxhoce8H54AGSvbsDN8tGGNXcnTQtMqeYQ" },
            data : submission.data
        }

        axios(config)
            .then((result) => {
                console.log('response data' + result.data.data)
            })
    }

    render() {
        return (

            <FormIO
                form="https://soaigljodahrapg.form.io/register"
                onSubmit={submission => this.submitFormData(submission)}
            />
        )
    }
}



import React, { Component } from 'react'
import axios from 'axios'

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10% 30%'
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0'
}

const inputStyle = {
    padding: '1em',
    fontSize: '20px',
    margin: '10px 0px'
}

export class AccountCreation extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            //Account Information
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            passwordMatch: 'hidden',
            //Restaurant Information
            restaurantName: '',
            restaurantPhone: '',
            restaurantAddress: '',
            restaurantCuisine: '',
            restaurantCity: '',
            restaurantPostalCode: '',
            restaurantProvince: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.passwordValidate = this.passwordValidate.bind(this);
    }

    //Handles when fields in the input are changed
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value 
        })
    }

    //Handle when the "submit" button on the form is pressed
    async handleSubmit(event) {
        event.preventDefault();
        let info = '';
        if (this.props.userType === "user") {

        } else { 
            //restaurant owner information from the field
            const name = this.state.fullName.split(" ");
            let middleName = name.length === 3 ? name[1] : "";
            info = 
            {
                firstName: name[0],
                middleName: middleName,
                lastName: name[name.length-1],
                email: this.state.email,
                password: this.state.password,
                restaurantID: Math.floor((Math.random()*1000)+1)  //random placeholder value for now as the field is required
            }
            const res = await axios.post('/owners/add', info)
            .catch((error) => {
                console.log(error);
                alert("This email address is already in use");
            });
            
            if(res !== undefined) {
                
                let restaurantInfo = 
                {
                    //fields for the restaurant information in the database 
                    ownerID: res.data._id,
                    ratings: [],
                    name: this.state.restaurantName,
                    logoURL: " ",
                    imageURLs: " ",
                    phoneNumber: this.state.restaurantPhone,
                    address: this.state.restaurantAddress,
                    city: this.state.restaurantCity,
                    province: this.state.restaurantProvince,
                    postalCode: this.state.restaurantPostalCode,
                    cuisineTypes: [this.state.restaurantCuisine],
                    description: " ",
                    menuItemIDs: []
                }
                console.log(restaurantInfo);
                axios.post('/restaurants/add', restaurantInfo)
                .then(console.log("Added the restaurant"))           
                .catch((error) => {
                    console.log(error);
                    alert("Error with registration: " + error);
                });
            }
        }

    }

    passwordValidate(event) {
        const confirmPassword = event.target.value;
        if (this.state.password === confirmPassword) {
            this.setState({
                passwordMatch: 'hidden'
            })
        }
        else {
            this.setState({
                passwordMatch: 'visible'
            })
        }
    }

    UserForm = () => {
        return (
            <div style={containerStyle}>
                <h2 style={{fontSize: '2em'}}>Account Information</h2>
                <input 
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="phoneNumber"
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Phone Number"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    required={true}
                    style={inputStyle}
                    onChange={this.passwordValidate}
                />
                <p style={{color: 'red', visibility: `${this.state.passwordMatch}`}}>Passwords Do Not Match</p>
            </div>
        )
    }

    RestaurantForm = () => {
        return (
            <div style={containerStyle}>
                <h2 style={{fontSize: '2em'}}>Restaurant Information</h2>
                <input 
                    name="restaurantName"
                    type="text"
                    placeholder="Restaurant Name"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantPhone"
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Restaurant Phone"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantAddress"
                    type="text"
                    placeholder="Restaurant Address"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantCity"
                    type="text"
                    placeholder="City"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantPostalCode"
                    type="text"
                    placeholder="Postal Code"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantProvince"
                    type="text"
                    placeholder="Province"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantCuisine"
                    type="text"
                    placeholder="Restaurant Cuisine"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

    render() {
        if (this.props.userType === "user") {
            return (
                <form style={formStyle} onSubmit={this.handleSubmit}>
                    <this.UserForm />
                    <div style={containerStyle}>
                        <input
                            name="submit"
                            type="submit"
                            value="Create Account"
                            style={inputStyle}
                        />
                    </div>
                </form>
            )
        } else {
            return (
                <form style={formStyle} onSubmit={this.handleSubmit}>
                    <this.UserForm />
                    <this.RestaurantForm />
                    <div style={containerStyle}>
                        <input
                            name="submit"
                            type="submit"
                            value="Register Restaurant"
                            style={inputStyle}
                        />
                    </div>
                </form>
            )
        }
    }
    
} export default AccountCreation

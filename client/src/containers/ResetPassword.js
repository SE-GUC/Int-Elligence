/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import {
	LinkButtons,
	updateButton,
	homeButton,
	loginButton,
	HeaderBar,
	forgotButton,
	inputStyle,
	SubmitButtons
} from '../containers';

const loading = {
	margin: '1em',
	fontSize: '24px'
};

const title = {
	pageTitle: 'Password Reset Screen'
};

export default class ResetPassword extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			password: '',
			updated: false,
			isLoading: true,
			error: false
		};
	}

	async componentDidMount() {
		// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		// axios.get('/routes/api/users/SpecificFormSortedByFormId',{headers: { "Authorization": localStorage.getItem('jwtToken') }})
		console.log(this.props.match.params.token);
		await axios
			.get('/routes/api/users/reset/' + this.props.match.params.token)
			.then((response) => {
				console.log(response);
				if (response.data.message === 'password reset link a-ok') {
					this.setState({
						name: response.data.name,
						updated: false,
						isLoading: false,
						error: false
					});
				}
			})
			.catch((error) => {
				alert(error.response.data.errmsg || error.response.data)
				this.setState({
					updated: false,
					isLoading: false,
					error: true
				});
			});
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	updatePassword = (e) => {
		console.log(this.state.name);
		e.preventDefault();
		axios
			.put('/routes/api/users/updatePasswordViaEmail', {
				name: this.state.name,
				password: this.state.password,
				resetPasswordToken: this.props.match.params.token
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.message === 'password updated') {
					this.setState({
						updated: true,
						error: false
					});
				} else {
					this.setState({
						updated: false,
						error: true
					});
				}
			})
			.catch((err) => alert(err.response.data.errmsg || err.response.data));
	};

	render() {
		const { password, error, isLoading, updated } = this.state;

		if (error) {
			return (
				<div>
					<HeaderBar title={title} />
					<div style={loading}>
						<h4>Problem resetting password. Please send another reset link.</h4>
						<LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
						<LinkButtons buttonStyle={forgotButton} buttonText="Forgot Password?" link="/forgotPassword" />
					</div>
				</div>
			);
		}
		if (isLoading) {
			return (
				<div>
					<HeaderBar title={title} />
					<div style={loading}>Loading User Data...</div>
				</div>
			);
		}
		return (
			<div>
				<HeaderBar title={title} />
				<form className="password-form" onSubmit={this.updatePassword}>
					<TextField
						style={inputStyle}
						id="password"
						label="password"
						onChange={this.handleChange('password')}
						value={password}
						type="password"
					/>
					<SubmitButtons buttonStyle={updateButton} buttonText="Update Password" />
				</form>

				{updated && (
					<div>
						<p>Your password has been successfully reset, please try logging in again.</p>
						<LinkButtons buttonStyle={loginButton} buttonText="Login" href="/login" />
					</div>
				)}
				<LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
			</div>
		);
	}
}

ResetPassword.propTypes = {
	// eslint-disable-next-line react/require-default-props
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		})
	})
};

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import "./SignUp.css";

const SignUp = () => {
	const { createUser } = useContext(AuthContext);
	const [error, setError] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		const confirm = form.confirm.value;

		console.log(email, password, confirm);
		if (password.length > 1 && password.length < 6) {
			setError("Password Should be 6 characters or more.");
			return;
		}
		if (password !== confirm) {
			setError("Didn't match confirm password");
			return;
		}

		createUser(email, password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				form.reset();
			})
			.catch((error) => console.error(error));
	};
	return (
		<div className="form-container">
			<h1 className="form-title">Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="1" />
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="2" />
				</div>
				<div className="form-control">
					<label htmlFor="confirm">Confirm Password</label>
					<input type="password" name="confirm" id="3" />
				</div>
				<p className="textError">{error}</p>
				<div className="btn-container">
					<input
						className="btn-submit"
						type="submit"
						value="Sign Up"
					/>
				</div>
			</form>
			<p>
				Already have an account <Link to="/login">Login</Link>
			</p>
		</div>
	);
};

export default SignUp;

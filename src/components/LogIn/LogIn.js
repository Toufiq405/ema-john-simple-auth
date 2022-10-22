import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import "./LogIn.css";

const LogIn = () => {
	const { signIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		signIn(email, password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				form.reset();
				navigate(from, { replace: true });
			})
			.catch((error) => console.error(error));
	};
	return (
		<div className="form-container">
			<h1 className="form-title">Login</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="1" />
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="2" />
				</div>
				<div className="btn-container">
					<input className="btn-submit" type="submit" value="Login" />
				</div>
			</form>
			<p>
				New to ema john <Link to="/signup">Create A new Account</Link>
			</p>
		</div>
	);
};

export default LogIn;

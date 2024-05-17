import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	Image,
	Grid,
	GridRow,
	GridColumn,
	FormField,
	Button,
	Form,
} from "semantic-ui-react";
import landingpagebanner from "../../assets/landingpagebanner.png";
import womanlaughing from "../../assets/womanlaughing.png"
import hobbies from "../../assets/hobbies.png"
import man from "../../assets/man.jpg"
import "./Login.scss";

function Login({ handleLogin }) {
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append("username", event.target.username.value);
		formData.append("password", event.target.password.value);

		axios
			.post("http://localhost:8080/perform_login", formData, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				withCredentials: true,
			})
			.then((response) => {
				console.log("Login is successful", response.data);

				console.log(response.data);
				// potentially optional
				handleLogin(response.data);

				//save the user data to local storage
				localStorage.setItem("user", JSON.stringify(response.data));

				// code to retrieve user data from local storage
				const user = JSON.parse(localStorage.getItem("user"));
				if (user) {
					console.log(user.userId); // Or however the userId is named in your user object
				}

				axios
					.get("http://localhost:8080/users/api/auth/check", {
						withCredentials: true,
					})
					.then((response) => {
						const isAuthenticated = response.data;
						if (isAuthenticated) {
							console.log("User is authenticated");
							navigate("/main");
						} else {
							console.log("User is not authenticated");
						}
					})
					.catch((error) =>
						console.error("Error checking authentication:", error)
					);
			})
			.catch((error) => {
				console.error("Login failed", error);
			});
	}

	return (
		<>
			<div className="navbar">
				<ul>
					<li>
						<a onClick={() => navigate("/")}>Home</a>
					</li>
					<li>
						<a onClick={() => navigate("/signup")}>Sign Up</a>
					</li>
				</ul>
			</div>
			<div className="hero-image"></div>
			<div className="home-cards">
				<h1>ABOUT US</h1>
				<Grid columns="equal" divided className="padding-bottom">
					<GridRow>
						<GridColumn className="flex">
							<Card>
								<Image
									src={man}
									alt= "two artists meeting"
									wrapped
									ui={false}
								/>
								<CardContent>
									<CardHeader>
										Meet Other Local Artists
									</CardHeader>
									<CardDescription>
										See images of a wide variety of art and
										mediums from local artists near you.
									</CardDescription>
								</CardContent>
							</Card>
						</GridColumn>
						<GridColumn className="flex">
							<Card>
								<Image
									src={womanlaughing}
									alt='single artist smiling'
									wrapped
									ui={false}
								/>
								<CardContent>
									<CardHeader>
										Focus On What's Inside
									</CardHeader>
									<CardDescription>
										At Art For Your Heart, you don't see
										real images of people until after you've
										spent time chatting with them.
									</CardDescription>
								</CardContent>
							</Card>
						</GridColumn>
						<GridColumn className="flex">
							<Card>
								<Image
									src={hobbies}
									alt='artist painting'
									wrapped
									ui={false}
								/>
								<CardContent>
									<CardHeader>Share Your Hobbies</CardHeader>
									<CardDescription>
										Customize your profile and tailor the
										information you share with others.
									</CardDescription>
								</CardContent>
							</Card>
						</GridColumn>
					</GridRow>
				</Grid>
				<h1>LOGIN</h1>
				<div className="login">
					<div className="formContainer">
						<Form onSubmit={handleSubmit}>
							<FormField>
								<label>Username</label>
								<input
									placeholder="Username"
									type="text"
									name="username"
								/>
							</FormField>
							<FormField>
								<label>Password</label>
								<input
									placeholder="Password"
									type="text"
									name="password"
								/>
							</FormField>
							<Button type="submit">Login</Button>
						</Form>
						<div className="flex">
							<a onClick={() => navigate("/signup")}>
								Need an account? Sign up now!
							</a>
						</div>
					</div>
				</div>
			</div>
            <div className="footer">
                <p>Made by Sarai Escobar and Jazmin Tweedle</p>
            </div>
		</>
	);
}

export default Login;

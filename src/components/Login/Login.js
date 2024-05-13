import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardMeta,
	Icon,
	Image,
	Grid,
	GridRow,
	GridColumn,
	FormField,
	Button,
	Form,
	FormSelect,
	FormTextArea,
	FormCheckbox,
} from "semantic-ui-react";
import landingpagebanner from "../../assets/landingpagebanner.png";
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
				console.log(user);

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
				// Handle login failure (e.g., display an error message)
			});
	}

	return (
		<>
			<div className="navbar">
				<ul>
					<li>
						<a onClick={() => navigate("/about")}>Home</a>
					</li>
					<li>
						<a onClick={() => navigate("/about")}>About</a>
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
									alt= "two artists meeting"
									src="https://cdn.discordapp.com/attachments/1235236556185407530/1238468515531456512/jazzytweety_two_artists_laughing_and_painting_together_d746ab99-4d59-40d1-b4e2-3288869231d2.png?ex=663f652f&is=663e13af&hm=2ffc675c4f3866414e29ae0ff92e0937815bcfb621596ae352d4949ef9f54cc8&"
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
									alt='single artist smiling'
									src="https://cdn.discordapp.com/attachments/1235236556185407530/1238468615775326258/jazzytweety_sketched_image_of_woman_laughing_and_smiling_bca984ef-7aa3-42e7-94f9-2725c46077c6.png?ex=663f6547&is=663e13c7&hm=2feaca7d56f5f65f4e56c94935399f312199279172df9cbd647fa6c2886de27b&"
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
									alt='artist painting'
									src="https://cdn.discordapp.com/attachments/1235236556185407530/1238468692598329374/jazzytweety_picture_of_different_hobbies_c4748f99-117b-4117-be53-71486ce2267a.png?ex=663f6559&is=663e13d9&hm=dbbbb8d35b70ef778ad8aa2a0eced15ed18d89cdde867428e289a68168fd9ad2&"
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
						<a onClick={() => navigate("/signup")}>
							Don't have account? Signup
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;

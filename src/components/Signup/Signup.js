import "./Signup.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
	FormField,
	Button,
	Form,
	FormCheckbox,
	Grid,
	GridRow,
	GridColumn,
} from "semantic-ui-react";

function Signup() {
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData();
		formData.append("name", event.target.name.value);
		formData.append("username", event.target.username.value);
		formData.append("password", event.target.password.value);
		formData.append("age", parseInt(event.target.age.value));
		formData.append("height", event.target.height.value);
		formData.append("location", event.target.location.value);
		formData.append("gender", event.target.gender.value);
		formData.append("bio", event.target.bio.value);
		formData.append("realPhoto", event.target.realPhoto.files[0]);
		for (const file of event.target.artPhotos.files) {
			formData.append("artPhotos", file);
		}
		formData.append("interests", event.target.interests.value);
		formData.append("roles", JSON.stringify(["ROLE_USER"]));

		axios
			.post("http://localhost:8080/users", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			})
			.then((response) => {
				navigate("/");
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const options = [
		{ key: "f", text: "Female", value: "female" },
		{ key: "m", text: "Male", value: "male" },
		{ key: "n", text: "Nonbinary", value: "nonbinary" },
	];
	return (
		<>
			<div className="navbar">
				<ul>
					<li>
						<a onClick={() => navigate("/")}>Home</a>
					</li>
					<li>
						<a onClick={() => navigate("/about")}>About</a>
					</li>
					<li>
						<a onClick={() => navigate("/signup")}>Sign Up</a>
					</li>
				</ul>
			</div>
			<div className="signup">
				<h1>SIGN UP</h1>
				<Grid>
					<GridRow columns={2}>
						<GridColumn>
							<div className="flex">
								<img className="sign-up-image" src="https://cdn.discordapp.com/attachments/1235236556185407530/1238482315768893470/jazzytweety_artists_laughing_together_featuring_pink_purple_red_61bfd094-5c33-4c9d-85c5-2b7963020372.png?ex=663f7209&is=663e2089&hm=eee26f2864d929059f6c4d3c6a8ca163bd34e1383fea7cfd6dd76d7b143f36a4&"></img>
							</div>
						</GridColumn>
						<GridColumn>
							<div className="flex">
								<Form
									className="sign-up-form"
									onSubmit={handleSubmit}
								>
									<FormField>
										<label>Name</label>
										<input
											placeholder="name"
											type="text"
											name="name"
										/>
									</FormField>
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
									<FormField>
										<label>Age</label>
										<input
											placeholder="Age"
											type="number"
											name="age"
										/>
									</FormField>
									<FormField>
										<label>Height</label>
										<input
											placeholder="Height"
											type="text"
											name="height"
										/>
									</FormField>
									<FormField>
										<label>Location</label>
										<input
											placeholder="Location"
											type="text"
											name="location"
										/>
									</FormField>
									<FormField>
										<label>Gender</label>
										<input
											placeholder="Gender"
											type="text"
											name="gender"
										/>
									</FormField>
									<FormField>
										<label>
											Bio (Tell Us About Yourself!)
										</label>
										<input
											placeholder="Bio"
											type="text"
											name="bio"
										/>
									</FormField>
									<FormField>
										<label>Profile Photo</label>
										<input
											type="file"
											name="realPhoto"
											accept="image/*"
										/>
									</FormField>
									<FormField>
										<label>Art Photos</label>
										<input
											type="file"
											name="artPhotos"
											accept="image/*"
											multiple
										/>
									</FormField>
									<FormField>
										<label>Interests</label>
										<input
											placeholder="Interests"
											type="text"
											name="interests"
										/>
									</FormField>
									<FormCheckbox label="I agree to the Terms and Conditions" />
									<Button type="submit">Signup</Button>
								</Form>
							</div>
						</GridColumn>
					</GridRow>
				</Grid>
			</div>
		</>
	);
}

export default Signup;

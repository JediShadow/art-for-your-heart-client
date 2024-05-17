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
								<img className="sign-up-image" alt='image of two artists together' src="https://cdn.midjourney.com/c01e1bad-f694-45b9-9aa0-d9beba8db721/0_3.webp"></img>
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
										<label htmlFor="profilePhoto">Profile Photo</label>
										<input
											id="profilePhoto"
											type="file"
											name="realPhoto"
											accept="image/*"
										/>
									</FormField>
									<FormField>
										<label htmlFor="artPhotos">Art Photos</label>
										<input
											id="artPhotos"
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
									<FormCheckbox id="agreeTerms" label="I agree to the Terms and Conditions" />
   										 <label htmlFor="agreeTerms">I agree to the Terms and Conditions</label>
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

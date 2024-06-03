import "./Profile.scss";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Card,
	Icon,
	Image,
	Grid,
	GridRow,
	GridColumn,
} from "semantic-ui-react";

function Profile({ user, setUser }) {
	const [formData, setFormData] = useState({
		name: user.name,
		username: user.username,
		age: user.age,
		gender: user.gender,
		location: user.location,
		height: user.height,
		interests: user.interests,
		bio: user.bio,
	});

	const handleLogout = () => {
		setUser(null);
		return <Navigate to="/" />;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	async function handleSubmit(event) {
		event.preventDefault();

		const updatedUserData = {
			name: event.target.name.value,
			username: event.target.username.value,
			age: parseInt(event.target.age.value),
			height: event.target.height.value,
			location: event.target.location.value,
			gender: event.target.gender.value,
			bio: event.target.bio.value,
			interests: [event.target.interests.value],
			password: "vango",
			roles: ["ROLE_USER"],
		};
		axios
			.put(
				`http://localhost:8080/users/${user.stringId}`,
				updatedUserData,
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log("User updated successfully:", response.data);
			})
			.catch((error) => {
				console.error("Failed to update user:", error);
			});
	}

	return (
		<div className="profile">
			<div className="title-flex padding-top">
				<h1>PROFILE</h1>
			</div>
			<div>
				<Grid columns={2}>
                    <GridRow>
                        <GridColumn className="flex-center">
					<div>
						<h3>My Card</h3>
						<Card>
							<Image src={user.realPhoto} wrapped ui={false} />
							<CardContent>
								<CardHeader>{user.name}</CardHeader>
								<CardMeta>
									<span className="date">{user.age}</span>
								</CardMeta>
								<CardDescription>{user.bio}</CardDescription>
							</CardContent>
							<CardContent extra>
								<a>
									<Icon name="user" />
									{user.location}
								</a>
							</CardContent>
						</Card>
					</div>
                    </GridColumn>
                    <GridColumn>
					<div className="ui container flex-center">
						<div className="ui card">
							<div className="content">
								<div className="header">User Information</div>
							</div>
							<div className="content">
								<form className="ui form" onSubmit={handleSubmit}>
									<div className="formflex">
										<div className="field">
											<label htmlFor="Name">Name</label>
											<input
												type="text"
												name="name"
												placeholder="Name"
												value={formData.name}
												onChange={handleChange}
											/>
										</div>
										<div className="field">
											<label htmlFor="username">Username</label>
											<input
												type="text"
												name="username"
												placeholder="Username"
												value={formData.username}
												onChange={handleChange}
											/>
										</div>
										<div className="field">
											<label htmlFor="age">Age</label>
											<input
												type="text"
												name="age"
												placeholder="Age"
												value={formData.age}
												onChange={handleChange}
											/>
										</div>
										<div className="field">
											<label htmlFor="gender">Gender</label>
											<input
												type="text"
												name="gender"
												placeholder="Gender"
												value={formData.gender}
												onChange={handleChange}
											/>
										</div>
									</div>

									<div className="formflex">
										<div className="field">
											<label htmlFor="location">Location</label>
											<input
												type="text"
												name="location"
												placeholder="Location"
												value={formData.location}
												onChange={handleChange}
											/>
										</div>
										<div className="field">
											<label htmlFor="height">Height</label>
											<input
												type="text"
												name="height"
												placeholder="Height"
												value={formData.height}
												onChange={handleChange}
											/>
										</div>
										<div className="field">
											<label htmlFor="interests">Interests</label>
											<input
												type="text"
												name="interests"
												placeholder="Interests"
												value={formData.interests}
												onChange={handleChange}
											/>
										</div>
										<div className="field">
											<label htmlFor="bio">Bio</label>
											<textarea
												name="bio"
												placeholder="Bio"
												value={formData.bio}
												onChange={handleChange}
											/>
										</div>
									</div>
									<button className="ui button" type="submit">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
                    </GridColumn>
                    </GridRow>
				</Grid>
			</div>

			<button className="button-logout" onClick={handleLogout}>
				<span className="material-symbols-outlined">logout</span>
			</button>
		</div>
	);
}

export default Profile;

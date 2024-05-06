import './Profile.scss';
import axios from 'axios';
import React, { useState } from 'react';
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
  } from 'semantic-ui-react'
  

//user. items : bio, gender, height, interests, realPhoto, 
function Profile({user, handleLogout}){
    const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

    console.log(user)
    return (
        <div className='profile'>
            <div className="title-flex">
            <h2>My Profile</h2></div>
            <div className='profile-flex'>

            <div>
                <h3>My Card</h3>
            <Card>
                <Image src={user.realPhoto} wrapped ui={false} />
                <CardContent>
                <CardHeader>{user.name}</CardHeader>
                <CardMeta>
                    <span className='date'>{user.age}</span>
                </CardMeta>
                <CardDescription>
                    {user.bio}
                </CardDescription>
                </CardContent>
                <CardContent extra>
                <a>
                    <Icon name='user' />
                    {user.location}
                </a>
                </CardContent>       
                {/* <button className='button-logout' onClick={handleLogout}><span class="material-symbols-outlined">
logout
</span></button>      */}
            </Card></div>

<div class="ui container">
  <div class="ui card">
    <div class="content">
      <div class="header">User Information</div>
    </div>
    <div class="content">
      <form class="ui form">

        <div className='formflex'>
      <div class="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" value={user.name} readOnly/>
        </div>
        <div class="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" value={user.username} readOnly/>
        </div>
        <div class="field">
          <label>Age</label>
          <input type="text" name="age" placeholder="Age" value={user.age} readOnly/>
        </div>
        <div class="field">
          <label>Gender</label>
          <input type="text" name="gender" placeholder="Gender" value={user.gender} readOnly/>
        </div>
        </div>

        <div className='formflex'>
        <div class="field">
          <label>Location</label>
          <input type="text" name="location" placeholder="Location" value={user.location} readOnly/>
        </div>
        <div class="field">
          <label>Height</label>
          <input type="text" name="height" placeholder="Height" value={user.height} readOnly/>
        </div>
        <div class="field">
          <label>Interests</label>
          <input type="text" name="interests" placeholder="Interests" value={user.interests} readOnly/>
        </div>
        <div class="field">
          <label>Bio</label>
          <textarea name="bio" placeholder="Bio" readOnly>{user.bio}</textarea>
        </div>
        </div>
        <button class="ui button" type="submit" disabled>Submit</button>
      </form>
    </div>
  </div>
</div>
</div>
        </div>

        
    );
}

export default Profile;
import './Main.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
  } from 'semantic-ui-react'


function Main({user}){
    const localUser = JSON.parse(localStorage.getItem('user'));
    console.log("user for likes", user)
    const [toSwipe,setToSwipe] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    async function handleLike (){

        axios.post("http://localhost:8080/likes", {
            likerId: localUser.stringId,
            likeeId: toSwipe[currentIndex].id
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then((response) => {
                let data = response.data;
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            });

        console.log("love is in the air")
        if (currentIndex < toSwipe.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }else {
            setCurrentIndex(0); // Reset to the beginning of the array
        }
    }
    
    const handleDislike = () => {
        if (currentIndex < toSwipe.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }else {
            setCurrentIndex(0); // Reset to the beginning of the array
        }
    };

    //code to implement swiping
    useEffect(() => {
        getPeople();
    }, []);

    async function getPeople () {
        
        axios.get(`http://localhost:8080/users/main?userId=65df6cad153d9d1bf6d95989`, {
    },{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
        .then((response) => {
            let data = response.data;
            setToSwipe(data)
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => prevIndex - 1);
    };

    return (
        <div className='main'>
            <div>Art for your heart</div>
        {toSwipe && toSwipe.length > 0 && (
                <Card>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                    <CardContent>
                        <CardHeader>{toSwipe[currentIndex].name}</CardHeader>
                        <CardMeta>
                            <span className='date'>Joined in 2015</span>
                        </CardMeta>
                        <CardDescription>
                            {toSwipe[currentIndex].bio}
                        </CardDescription>
                    </CardContent>
                    <CardContent extra>
                        <a>
                            <Icon name='user' />
                            22 Friends
                        </a>
                    </CardContent>
                </Card>
            )}
            <div className='button-container'>
            <button className='button-dislike'onClick={handleDislike}>
                <span class="material-symbols-outlined">close</span>
            </button>
            <button className='button-like' onClick={handleLike}>
                <span class="material-symbols-outlined">favorite</span>
            </button>
            </div>

        </div>
    );
}

export default Main;
import './Main.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Modal from '../Modal/Modal';
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react';


function Main({setMatches, modal, setModal, modalPerson, setModalPerson, messageCount}) {
    const [toSwipe, setToSwipe] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState(false); // State to track if liked
    async function handleLike() {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.post("http://localhost:8080/likes", {
            headers: {
                'Content-Type': 'application/json',
            },
            likerId: user.stringId,
            likeeId: toSwipe[currentIndex].stringId

        }, {
            withCredentials: true
        })
            .then((response) => {
                let data = response.data;
                setLiked(true)
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            });

        console.log("love is in the air")
        if (currentIndex < toSwipe.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            setCurrentIndex(0); // Reset to the beginning of the array
        }
    }

    const handleDislike = () => {
        if (currentIndex < toSwipe.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            setCurrentIndex(0); // Reset to the beginning of the array
        }
    };

    //code to implement swiping
    useEffect(() => {
        getPeople();
    }, []);

    async function getPeople() {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await axios.get(`http://localhost:8080/users/main?userId=${user.stringId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            let data = response.data;
            setToSwipe(data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            if (user && user.stringId) {
                axios.get(`http://localhost:8080/likes/matches?userId=${user.stringId}`)
                    .then((response) => {
                        let data = response.data;
                        setMatches(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        // Fetch matches again if liked state changes
        if (liked) {
            axios
                .get(`http://localhost:8080/likes/matches?userId=${user.stringId}`)
                .then((response) => {
                    let data = response.data;
                    setMatches(data);
                    console.log('Yay');
                    setLiked(false); // Reset liked state after fetching matches
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [liked]);

    const handleClick=(person)=>{
        setModal(true)
        setModalPerson(person)
        console.log(person)
    }
    const closeModal = () => {
        setModal(false); 
    }
    
    return (
        <div className='main'>
            <div className="title-flex">
            <h1>DASHBOARD</h1>
            </div>
            <div className='main-card-flex'>
        {toSwipe && toSwipe.length > 0 && (
                <Card onClick={() =>handleClick(toSwipe[currentIndex])}>
                    <Image
                        alt='users art photo'
                        src={toSwipe[currentIndex].artPhotos !== null ? toSwipe[currentIndex].artPhotos[0] : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'}
                        wrapped ui={false}/>
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
                            {toSwipe[currentIndex].location}
                        </a>
                    </CardContent>
                </Card>
            )}
            <div className='button-container'>
                <button className='button-dislike' onClick={handleDislike}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                <button className='button-like' onClick={handleLike}>
                    <span className="material-symbols-outlined">favorite</span>
                </button>
            </div>
            </div>
            {modal && <Modal closeModal={() => setModal(false)} modalPerson={modalPerson} messageCount={messageCount} />}
        </div>
    );
}

export default Main;
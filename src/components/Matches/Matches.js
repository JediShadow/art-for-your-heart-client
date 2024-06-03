import "./Matches.scss";
import Modal from "../Modal/Modal";
import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Card,
	Icon,
	Image,
	GridColumn,
	Grid,
    GridRow
} from "semantic-ui-react";

function Matches({
	matches,
	modal,
	setModal,
	modalPerson,
	setModalPerson,
	messageCount,
}) {
	const handleClick = (person) => {
		setModal(true);
		setModalPerson(person);
	};
	const closeModal = () => {
		setModal(false);
	};
	return (
		<div className="matches">
			<div className="title-flex padding-top">
				<h1>MATCHES</h1>
			</div>
			<Grid className="matches-grid">
				{matches ? (
					<>
						{matches.map((person, index) => {
							return (
								//to format how many cards at width
									<Card onClick={() => handleClick(person)}>
										<Image 
                                            className="matches-image"
											src={
												person.artPhotos !== null
													? person.artPhotos[0]
													: "https://react.semantic-ui.com/images/avatar/large/matthew.png"
											}
											// wrapped
											// ui={false}
										/>
										<CardContent>
											<CardHeader key={index}>
												{person.name}
											</CardHeader>
											<CardMeta>
												<span className="date">
													{person.age}, {person.location}
												</span>
											</CardMeta>
											<CardDescription>
												{person.bio}
											</CardDescription>
										</CardContent>
										{/* <CardContent extra>
											<a>
												<Icon name="user" />
												{person.location}
											</a>
										</CardContent> */}
									</Card>
							);
						})}
					</>
				) : (
					<p>NO MATCHES</p>
				)}
			</Grid>
			{modal && (
				<Modal
					closeModal={() => setModal(false)}
					modalPerson={modalPerson}
					messageCount={messageCount}
				/>
			)}
		</div>
	);
}

export default Matches;

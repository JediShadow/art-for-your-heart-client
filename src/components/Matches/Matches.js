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
			<div className="title-flex">
				<h2>Matches</h2>
			</div>
			<Grid>
                <GridRow>
				{matches ? (
					<>
						{matches.map((person, index) => {
							return (
								//to format how many cards at width
								<GridColumn
									key={index}
									mobile={8}
									tablet={4}
									computer={4}
								>
									<Card onClick={() => handleClick(person)}>
										<Image
											src={
												person.artPhotos !== null
													? person.artPhotos[0]
													: "https://react.semantic-ui.com/images/avatar/large/matthew.png"
											}
											wrapped
											ui={false}
										/>
										<CardContent>
											<CardHeader key={index}>
												{person.name}
											</CardHeader>
											<CardMeta>
												<span className="date">
													{person.age}
												</span>
											</CardMeta>
											<CardDescription>
												{person.bio}
											</CardDescription>
										</CardContent>
										<CardContent extra>
											<a>
												<Icon name="user" />
												{person.location}
											</a>
										</CardContent>
									</Card>
								</GridColumn>
							);
						})}
					</>
				) : (
					<p>no matches</p>
				)}
                </GridRow>
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

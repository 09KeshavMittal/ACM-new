import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router";
import DetailSidebar from "components/Events/EventDetails/DetailSideBar";
import "../../../assets/css/events/eventDetails.css";
import { fetchSingleEvent } from "api/event";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/slices/mainSlice";

export default function EventDetails() {
	const { eventId } = useParams();
	const dispatch = useDispatch();
	const [event, setEvent] = React.useState({});

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setLoading(true));
			const event = await fetchSingleEvent(eventId);
			if (event) {
				setEvent(event);
				dispatch(setLoading(false));
			}else{
				dispatch(setLoading(false));
			}
		};
		fetchData();
	}, [dispatch, eventId]);

	return (
		<Container className="px-5 mt-4 eventDetails__content" fluid="xs">
			<Container fluid="xs">
				<Row className="m-0">
					<Col lg="6" className="px-0 eventDetails__imageCol bg-white shadow">
						<img
							className="eventImage"
							src={
								event?.poster &&
								"https://usict.acm.org" + event?.poster?.slice(1)
							}
							alt="event_poster"
						/>
					</Col>
					<Col lg="6" className="p-0 bg-white shadow  ">
						<DetailSidebar event={event} />
					</Col>
				</Row>
			</Container>
			{/* Description part will be shown only when speakers or partners or eventDecription of length >100 is present */}

			{event?.speakers || event?.partners || event?.eventDescription ? (
				<>
					<h2 className="mt-5 ">Description</h2>
					<hr />

					{/* Speakers and Partners */}

					<div className="speakersAndPartners mb-4">
						{event?.speakers && (
							<h3>
								<i class="bx bx-user-voice"></i>
								<span>Speakers : </span>
								{ReactHtmlParser(event?.speakers)}
							</h3>
						)}
						{event?.partners && (
							<h3>
								<i class="bx bx-group"></i>
								<span>Partners : </span>
								{ReactHtmlParser(event?.partners)}
							</h3>
						)}
					</div>

					{/* Event Description */}

					<p>{event?.eventDescription}</p>
				</>
			) : null}
		</Container>
	);
}

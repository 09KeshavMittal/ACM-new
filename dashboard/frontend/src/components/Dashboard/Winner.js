import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import { CardImg } from "react-bootstrap";
import winner from "./AllWinner";

const Header = () => {
  const [winners, setWinners] = useState(winner);

  return (
    <>
        <Container className="winnercontainer" fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row >
              {winners.map((data) => {
                return (
                  <Col className="winnercard p-3" sm={6} lg="6" xl="3" key={data.winId}>
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row className="winnerrow" >
                          <Col className="pt-3">
                            <CardImg
                              top
                              src={data.img}
                              alt="Card image cap"
                              className="userimg rounded-circle md-8 "
                            />
                            <CardTitle
                              tag="h3"
                              className="text-uppercase text-muted pt-3"
                            >
                              {data.name}
                            </CardTitle>
                            <CardFooter className="text-muted">
                              {data.eventName}
                            </CardFooter>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      
    </>
  );
};

export default Header;

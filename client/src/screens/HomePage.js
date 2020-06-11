import React, { Component, Fragment} from 'react';
import {
    Container, 
    Col,
    Row,
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardBody
} from 'reactstrap';
import BackgroundImage from "../static/vegetables-and-tomatoes-on-cutting-board-255501.jpg";

class HomePage extends React.Component {
    state = {
        techs: []
    }

    render() {
        return(
            <Fragment>
                <header id="hero">
                        <div className="hero-img">
                            <img src={BackgroundImage} />
                        </div>
                        <Row id="hero-content">
                            <figure className="col-md-6 col-lg-6" id="hero-img">
                                {/* <img src={BackgroundImage} alt="shopping-list-image" /> */}
                            </figure>
                            <div className="col-md-6 col-lg-6 hero-text">
                                <div className="text">
                                    <h1>Shopping List</h1>
                                    <h4>A simple and easy to use shopping list</h4>
                                </div>
                            </div>
                        </Row>
                </header>

                <section id="about-project">
                    <Container>
                        <h2 className="text-center">Technologies</h2>
                        <TechList techs={techs} />
                    </Container>
                </section>
            </Fragment>
        );
    }
}

function TechList(props){
 
    const techContainer = (
        <Row>
        {props.techs.map((tech) =>
            <Col sm="12" md="3">
                <Card key={tech.id}>
                    <CardImg src={tech.image} className="img-fluid" /> 
                    <CardBody>
                    <CardTitle><h5>{tech.name}</h5></CardTitle>
                    <CardText>{tech.desc}</CardText>
                    </CardBody>
                </Card>
            </Col>
            )}
        </Row>
    );

    return(
        <Container>{techContainer}</Container>
    );
}

const techs = [
    {
        "id": 0,
        "name" : "MongoDB",
        "image" : require("../static/mongodb.png"),
        "desc" : "A popular NoSQL database"
    },
    {
        "id": 1,
        "name" : "Express",
        "image" : require("../static/expressjs.png"),
        "desc" : " Used for creating a server and APIs"
    },
    {
        "id": 2,
        "name" : "React.js",
        "image" : require("../static/reacticon.png"),
        "desc" : " A flexible JS library for creating UI's"
    },
    {
        id: 3,
        name : "Node.js",
        image : require('../static/nodejs.png'),
        desc : "An open-source server environment"
    }
];

export default HomePage;
import React, { Fragment} from 'react';
import {
    Container, 
    // Col,
    Row
    // Card,
    // CardImg,
    // CardText,
    // CardTitle,
    // CardBody
} from 'reactstrap';
import BackgroundImage from "../static/desk-laptop-notebook-pen-3059.jpg";
import AppFooter from '../components/AppFooter';

class HomePage extends React.Component {
    render() {
        return(
            <Fragment>
                <header id="hero">
                        <div className="hero-img">
                            <img src={BackgroundImage} alt="backgroundimage" />
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
                        {/* <TechList techs={techs} /> */}
                    </Container>
                </section>
                <AppFooter />
            </Fragment>
        );
    }
}

export default HomePage;
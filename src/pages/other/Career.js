import { Fragment } from "react";
import { Form, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import BannerOne from "../../wrappers/banner/BannerOne";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import { Button, Col, Container, Row } from "react-bootstrap";

const Career = () => {
    let { pathname } = useLocation();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        
    };
    return (
        <Fragment>
            <SEO
                titleTemplate="About us"
                description="About page of MARP Bangladesh."
            />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Career", path: process.env.PUBLIC_URL + pathname }
                    ]}
                />

                <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
                    <Row  className="text-center">
                        <Col>
                            <h1>Career Opportunities</h1>
                            <p>We don't have any openings right now. <br/>Please drop your CV down below, we will contact with you if there is any opportunity for you.</p>
                           
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <div className="button-box">
                                <div className="login-toggle-btn">
                                    <form onSubmit={handleSubmit}>
                                        {/* <input
                                            className="m-3"
                                            type="text"
                                            name="user-name"
                                            placeholder="Enter Your Name"
                                        />
                                        <input
                                        className="m-3"
                                            type="email"
                                            name="user-email"
                                            placeholder="Enter Your Email"
                                        /> */}
                                        <input
                                            className="m-3"
                                            name="user-cv"
                                            placeholder="Upload your CV"
                                            type="file"
                                        />
                                        <div className="button-box m-3">
                                            <button type="submit" className="btn btn-secondary">
                                                <span>Submit</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </LayoutOne>
        </Fragment>
    );
};

export default Career;


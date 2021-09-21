import React from "react";
import {Component} from "react";
import {Container} from "react-bootstrap";

/**
 * Describes the privacy and policy of needmedi.com 
 */
export class Privacy extends Component {
    /**
     * Renders the Privacy component
     * @returns { JSX.Element } Privacy Component
     */
    render () {
        return (
        <Container>
            <h2>Privacy Policy</h2>
            <ol>
                <li>
                    <h4>What type of Information do we collect?</h4>
                    <p>When you sign up to needmedi.com, we only collect your Email and Name. When you use our Geolocation services, we do not save your location.</p>
                </li>
                <br />
                <li>
                    <h4>How do we use your personal info?</h4>
                    <p>We use your info, only to create an account in our database, so that we can track the reviews that you make.</p>
                </li>
                <br />
                <li>
                    <h4>Do we share you're data with any third parties?</h4>
                    <p>We currently do not use any third party application, which uses your info.</p>
                </li>
                <br />
                <li>
                    <h4>Do we use Cookies?</h4>
                    <p>Cookies are small text files that stored in your browser or device by websites, apps, online media, and advertisement.</p>
                    <p>Our website uses cookies for authenticating users.</p>
                </li>
                <br />
            </ol>

        </Container>
    )
    }

}
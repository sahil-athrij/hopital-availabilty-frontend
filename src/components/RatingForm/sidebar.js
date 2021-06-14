import {Component} from "react";
import {RatingQueryForm} from "./RatingQueryForm";
import './sidebar.css'

export class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar bg-grey p-0 p-md-4">
                <div className="space-50"/>
                <form action="/search/" onSubmit="submitForm()">
                    <RatingQueryForm/>
                    <div className="mb-3" id="bottomsearch">
                        <b>
                            <button type="submit"
                                    className="btn input-left input-right bg-dark btn-dark">Search
                            </button>
                        </b>
                    </div>
                </form>
                🇮🇳
                <div className="space-50"/>
            </div>
        );
    }
}
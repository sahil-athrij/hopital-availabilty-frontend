import {Component} from "react";
import './tab.css'
import {Button, NavLink} from "react-bootstrap";

export class TabButton extends Component {
    render() {
        return (<NavLink className="u-link"
                        type="button"
                        role="tab"
                        aria-controls={this.props.control_id}
        >{this.props.name}
        </NavLink>)
    }
}

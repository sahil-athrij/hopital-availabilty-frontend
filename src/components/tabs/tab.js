import {Component} from "react";
import {Link} from "react-router-dom";
import './tab.css'

export class TabButton extends Component {
    render() {
        return (<Link href="" className="u-link"
                      type="button"
                      role="tab"
                      aria-controls={this.props.control_id}
        >{this.props.name}
        </Link>)
    }
}

import {Component} from "react";

export default class ResponsiveComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        if (window.innerWidth < 500 && this.state.width > 500)
            this.setState({width: 500});
        else if (window.innerWidth > 500 && this.state.width < 500)
            this.setState({width: 500});

    };

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}



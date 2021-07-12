import React from "react";


export interface ResponsiveProps {

}

export interface ResponsiveState {
    width: number
}

export  class ResponsiveComponent<P extends ResponsiveProps, S extends ResponsiveState, SS = any>
    extends React.Component <P, S, SS> {
    state: S

    constructor(props: P) {
        super(props);
        // @ts-ignore
        this.state = {width: window.innerWidth};
    }

    hashChange = () => {
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        window.addEventListener("popstate", this.hashChange, false);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
        window.removeEventListener("popstate", this.hashChange, false);

    }

    handleWindowSizeChange = () => {
        if (window.innerWidth < 500 && this.state.width > 500)
            this.setState({width: 500});
        else if (window.innerWidth > 500 && this.state.width < 500)
            this.setState({width: 500});

    };

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}



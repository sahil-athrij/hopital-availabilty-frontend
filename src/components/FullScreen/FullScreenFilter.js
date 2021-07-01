import ResponsiveComponent from "../ResponsiveComponent";
import {Container} from "react-bootstrap";

import './location.css'
import './filters.css'
import {StarRatingInput} from "../inputs/StarRatingInput";
import {DoubleSliderRatingInput, SliderRatingInput} from "../inputs/SliderRatingInput";
import {setParam} from "../../api/QueryCreator";


export class FilterBox extends ResponsiveComponent {
    state = {
        selected: 0,

    }

    setPersistence() {
        setParam("loc", this.state.value, 'Select Location')
        setParam('lat', this.state.lat)
        setParam('lng', this.state.lng)
    }


    render() {
        return (
            <>
                <div className="filter-list-holder text-left">
                    <div className={"filter-element " + (this.state.selected === 0 ? "active" : '')}
                         onClick={() => this.setState({selected: 0})}
                    >
                        By Care
                    </div>
                    <div className={"filter-element " + (this.state.selected === 1 ? "active" : '')}
                         onClick={() => this.setState({selected: 1})}
                    >
                        By Oxygen
                    </div>
                    <div className={"filter-element " + (this.state.selected === 2 ? "active" : '')}
                         onClick={() => this.setState({selected: 2})}
                    >
                        By Budget
                    </div>
                    <div className={"filter-element " + (this.state.selected === 3 ? "active" : '')}
                         onClick={() => this.setState({selected: 3})}
                    >
                        by Beds
                    </div>
                    <div className={"filter-element " + (this.state.selected === 4 ? "active" : '')}
                         onClick={() => this.setState({selected: 4})}
                    >
                        <b>
                            Sort
                        </b>
                    </div>
                </div>
                <div className="text-left p-3 d-flex filter-holder flex-column">
                    {this.state.selected === 0 ?
                        <>

                            <div className="star-holder">
                                <StarRatingInput name="care_rating" label="General Care Quality"/>
                            </div>

                            <div className="pt-4 star-holder">
                                <StarRatingInput name="covid_rating" type="covid" label="Coivd Care  Quality"/>
                            </div>
                        </>

                        :
                        this.state.selected === 1 ?
                            <>

                                <div className="star-holder">
                                    <StarRatingInput name="oxygen_rating" type="oxygen"
                                                     label="Oxygen Infrastructure  Quality"/>
                                </div>

                                <div className="star-holder pt-4">
                                    <SliderRatingInput name="oxygen_availability"
                                                       label="Probability of getting Oxygen"/>
                                </div>
                            </>
                            :
                            this.state.selected === 2 ?
                                <>

                                    <div className="star-holder">
                                        <StarRatingInput name="financial_rating" type="financial"
                                                         label="Affordability and Value for Money"/>
                                    </div>

                                    <div className="star-holder pt-4">
                                        <DoubleSliderRatingInput name="cost_availability"
                                                                 label="Average Daily Cost"/>
                                    </div>
                                </> :
                                this.state.selected === 3 ?
                                    <>
                                        <div className="star-holder ">
                                            <SliderRatingInput name="icu_availability"
                                                               label="Probability of getting ICU bed"/>
                                        </div>
                                        <div className="star-holder pt-4">
                                            <SliderRatingInput name="ventilator_availability"
                                                               label="Probability of getting Ventilators"/>
                                        </div>
                                    </> :

                                    <div>5</div>

                    }
                </div>
            </>
        )
    }

}

export class FullScreenFilter extends ResponsiveComponent {

    render() {
        return (<div
            className="d-flex fixed-top w-100 h-100 translucent-background  header align-items-end flex-column"
        >
            <button className="w-100 h-20 "
                 onClick={
                     this.props.close
                 }/>
            <Container fluid={true} className="bg-white pt-2 top-radius-round d-flex align-items-start">
                <Container fluid={true} className="py-3 justify-content-start small-border-full">
                    <div className="h5 m-0 font-weight-bolder">
                        FILTERS
                    </div>
                </Container>
                <Container fluid={true}
                           className="h-100 w-110  justify-content-start align-items-start p-0 small-border-full ">
                    <FilterBox name="loc" close={() => {
                        this.props.close()
                    }}/>
                </Container>
            </Container>
            <Container fluid={true} className="bg-white justify-content-between p-3 filter-button-holder">
                <button className="btn btn-light w-50 p-2">
                    clear filters
                </button>
                <button className="btn btn-dark w-50 p-2">
                    Apply
                </button>
            </Container>

        </div>)
    }
}



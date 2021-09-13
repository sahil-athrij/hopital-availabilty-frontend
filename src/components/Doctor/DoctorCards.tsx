import React, {Component} from "react";
import {Doctor, DoctorObject} from "../../api/model";



import { Container } from "react-bootstrap";

interface SearchCardsProps  {
    model: DoctorObject
    key:number
}


class Cards extends Component<SearchCardsProps,{}> {

    render() {
       console.log(this.props.model)

        return (
           <div>
               doctor
           </div>

        )
    }

}



interface SearchResultsProp  {
    models: DoctorObject[] 
}

interface SearchResultsState {
    
   
}


export class DoctorCards extends Component<SearchResultsProp, SearchResultsState> {

    constructor(props: SearchResultsProp) {
        super(props);

    }




    render() {

            return(
                 <Container fluid={true} className='m-0 p-0'>
                {this.props.models.map((model, i) => {
                        return <Cards key={i} model={model}/>
                    }
                )}
                
            </Container>
            )
        }

    

};


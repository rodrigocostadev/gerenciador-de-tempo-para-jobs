// import React from "react";

function ListLaps (props){

    // if(props.maiorValor){
        
    // }

    // function maxNumber(props){
    //     props.lap.map( item => )
    // }

    return(
        <ul>
            {/* {props.lap.map( item => */}
            {props.countLapF2.map( item =>
                <li key={item.id}>
                    {item}
                </li>)
            }
        </ul>
    )
}

export default ListLaps
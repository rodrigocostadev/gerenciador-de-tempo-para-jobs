import React, {useEffect, useState} from "react";


function ListLaps (props){

    let numberLap = 1
    let indice = 0
    // const [indiceState, setIndiceState] = useState(0)

    // useEffect(() => {
    //     console.log("Renderizou")
    // },[indiceDestaque])

    let maiorValor = Math.max.apply(null, props.msResult );
    let indiceMaiorValor = props.msResult.indexOf(maiorValor)

    // console.log(props.msResult)
    // console.log(indiceMaiorValor)
    // console.log(maiorValor)

    if (indiceMaiorValor == -1){
        indiceMaiorValor = 0
    }

    // if (maiorValor == ""){
    //     maiorValor = 0
    // }

    // const [indiceDestaque, setIndiceDestaque] = useState(indiceMaiorValor)


   

    // let menorValor = Math.min.apply(null, props.countLapF2 );
    // let indiceMenorValor = props.msResult.indexOf(menorValor)
    // console.log(indiceMenorValor)


    


    // function maxNumber(){
    //     document.getElementById(maiorValor).style.color = "red"     
    // }
    // maxNumber()

    // console.log(props.countLapF2)
    console.log(maiorValor)
    console.log(indiceMaiorValor)
    // console.log(indiceDestaque)
    // console.log(indice)
    // console.log(props.countLapF2[indiceMaiorValor])

    // if(props.countLapF2 ){
    //     props.countLapF2[indiceMaiorValor].className = "Green"
    // }

    // if (indiceMaiorValor){
    // const [indiceDestaque, setIndiceDestaque] = useState(indiceMaiorValor)
    // }
    


    return(
        <ul>
            {/* {props.lap.map( item => */}
            {props.countLapF2.map( item =>
                <li key={item.id} id= {indice++}>
                    Lap{numberLap++} ---  {item}
                </li>)
            }
            
        </ul>

    )
}

// return(
//     <ul>
//         {/* {props.lap.map( item => */}
//         {props.countLapF2.map( (item, index) =>
//             <li key={item.id} id= {index ++} className={index++ == indiceDestaque? 'green' : ''}>
//                 Lap{numberLap++}  {item}
//             </li>)
//         }
        
//     </ul>

// )

export default ListLaps
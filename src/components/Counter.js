import React, { useEffect, useState } from "react";
import ListLaps from "./ListLaps";

function Counter (){

    const [displayMiliSeconds, setDisplayMiliSeconds] = useState(0)
    const [miliSeconds, setMIliSeconds] = useState(0)

    const [displaySeconds, setDisplaySeconds] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const [displayMinutes, setDisplayMinutes] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [displayHours, setDisplayHours] = useState(0)
    const [hours, setHours] = useState(0)

    //pega o intervalo entre play/pause e play/reset "reset que roda a função pause"
    const [intervalo, setIntervalo] = useState()

    //calcula o intervalo de volta Lap
    const[miliSecondsLap, setMillisecondsLap] = useState(0)

    const[lapF2, setLapF2] = useState([])

    // console.log(Date.parse)

    useEffect(() => {
        timerFunction()
    },[miliSeconds])


    function timerFunction(){   
        
        // Mili Seconds
        if (miliSeconds >= 10){
            setDisplayMiliSeconds("")
        }else if(miliSeconds < 10){
            setDisplayMiliSeconds("0")
        }

        if (miliSeconds === 100){
            setDisplayMiliSeconds(0)
            setMIliSeconds(0)
            setSeconds((prevSeconds) => prevSeconds + 1)
            // setMIliSeconds((prevMinutes) => prevMinutes + 1  )
            setDisplaySeconds(0)     
        }
        
        //Seconds
        if (seconds >= 10){
            setDisplaySeconds("")
        }else if(seconds < 10){
            setDisplaySeconds("0")
        }
        if (seconds === 60){
            setSeconds(0)
            setMinutes((prevMinutes) => prevMinutes + 1  )
            setDisplaySeconds(0)     
        }

        //Minutes
        if (minutes === 10){
            setDisplayMinutes("")
        }
        if (minutes === 60){
            setMinutes(0)
            setHours((prevHours) => prevHours + 1  )
            setDisplayMinutes(0)
        }    

        //Hours
        if (hours === 10){
            setDisplayHours("")
        }    
    }

    function increment(){
        // setSeconds((prevSeconds) => prevSeconds + 1  )
        setMIliSeconds((prevMiliSeconds) => prevMiliSeconds + 1  )
        setMillisecondsLap((prevMiliSecondsLap) => prevMiliSecondsLap + 1  )
    }


    function play(){              

        // Elimina a execução em paralelo de outras funções contadoras, assim DEIXANDO DE ACELERAR O CONTADOR
        if(!intervalo){
            setIntervalo(setInterval(() => {
                increment()
                timerFunction()
            }, 10))   
        }
    }

    function pause(){
        
        // Elimina a execução em paralelo de outras funções contadoras, assim DEIXANDO DE ACELERAR O CONTADOR
        if(intervalo){
            clearInterval(intervalo)
            setIntervalo()
        }
    }

    function reset(){
        pause()
        setMIliSeconds(0)
        setDisplayMiliSeconds(0)
        setSeconds(0)
        setDisplaySeconds(0)
        setMinutes(0)
        setDisplayMinutes(0)
        setHours(0)
        setDisplayHours(0)
        // setIntervalo()
        timerFunction()
        // setLap([])
        setCountLapF2([])
        setMillisecondsLap(0)
        setLapF2([])
        setMsResult([])
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// 2 TENTATIVA DE CALCULAR VOLTA COM MILISECONDSLAP /////////////////////////////////////////////////

    //Mostra o tempo de volta calculado
    const [countLapF2, setCountLapF2] =useState([])

    //Guarda o valor da volta em MS para calcular a maior e menor volta no arquivo listLap.js
    const [ msResult, setMsResult] = useState([])

    let NEWLAPF2 = miliSecondsLap 


    function lapFunction2(){        

        setLapF2([...lapF2,NEWLAPF2])

        //metodo pop pega a ultima string do array 
        let lastStringLapF2 = lapF2.pop()  

        if(lastStringLapF2 === undefined){
            lastStringLapF2 = 0
        }         

        let finalMsResult = miliSecondsLap - lastStringLapF2        

        // console.log(lastStringLapF2)
        // console.log(miliSecondsLap)
        // console.log(lapF2)

        // tive que transformar numero "finalMsResult"( intervalo de volta, ou milisecondsLap )em string 
        // para pegar os 2 ultimos digitos com o metodo slice 
        let miliSecondsF2 = String(finalMsResult).slice(-2)
        let secondsF2 = Math.floor(finalMsResult / 100)
        let minutesF2 = Math.floor(secondsF2 / 60)
        let hoursF2 = Math.floor(minutesF2 / 60)
        let secondsRest = secondsF2 % 60

        //variaveis responsaveis por ser 0 (0 que fica a frente) se o contador for menor do que 10
        let DisplayMiliSecondsF2
        let DisplaySecondsF2
        let DisplayMinutesF2
        let DisplayHoursF2

        //Miliseconds
        if(miliSecondsF2 === 0){
            DisplayMiliSecondsF2 = 0
        }else{ DisplayMiliSecondsF2 = ""}

        //Seconds
        if(secondsRest < 10){
            DisplaySecondsF2 = 0
        }else{ DisplaySecondsF2 = ""}

        //Minutes
        if(minutesF2 < 10){
            DisplayMinutesF2 = 0
        }else{ DisplayMinutesF2 = ""}
        
            // laço de repetição para evitar que apareça mais de 60 nos minutos no contador de voltas, 
            // ex: apareceria 2 horas e 67 minutos, com o laço aparece 2 horas e 7 minutos
        for( let i = 0; i < 60 ; i++){
            if(minutesF2 >= 60){
                DisplayMinutesF2 = 0
                minutesF2 = (minutesF2 - 60)
                // console.log("laço")
            }
        }

        //Hours
        if(hoursF2 < 10){
            DisplayHoursF2 = 0
        }else{ DisplayHoursF2 = ""}

        let finalResult = "" + DisplayHoursF2 + hoursF2 + ":" + DisplayMinutesF2 + minutesF2 + ":" + DisplaySecondsF2 + secondsRest + "," + DisplayMiliSecondsF2 + miliSecondsF2

        //Guarda o valor da volta em MS para calcular a maior e menor volta no arquivo listLap.js
        setMsResult([...msResult, finalMsResult])
        // console.log(msResult)
        
        // setCountLapF2([...countLapF2, finalMsResult]) 
        setCountLapF2([...countLapF2, finalResult]) 

        // console.log(countLapF2)
        // console.log(finalMsResult)
    }

    const [estado, setEstado] = useState(false)
    const [valueButton, setValueButton] = useState("Play")

    const BotaoPlayPause = () => {        
        
            if(estado === false ){
                setEstado(true)
                play()
                // console.log("play")
                setValueButton("Pause")
            }else if ( estado === true){
                setEstado(false)
                pause()
                // console.log("pause")
                setValueButton(" Play ")
            }
        
    }
    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



















    /////////////////////////////// Aqui ficava a função lapfunction antiga juntamente com as variaveis anteriores a ela  /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return(
        <div className="display" >
            <h1>{displayHours}{hours} : {displayMinutes}{minutes} : {displaySeconds}{seconds} ,{displayMiliSeconds}{miliSeconds}</h1>
            <div className="container">
                <button onClick={BotaoPlayPause} >{valueButton}</button>
                {/* <button onClick={play}>Play</button> */}
                {/* <button onClick={pause} >Pause</button> */}
                {/* <BotaoPlayPause onClick={alternarEstado}>{estado ==='play' ? 'playT' : 'pauseT'}</BotaoPlayPause> */}
                <button onClick={lapFunction2} > Lap </button>
                {/* <button onClick={playPause} >Play</button> */}
                <button onClick={reset} >Reset</button>            
                {/* <button onClick={lapFunction} > Lap </button> */}
                {/* <p>{lap}</p> */}
                {/* <ListLaps lap = {lap}  ></ListLaps> */}
                {/* <ListLaps countLap = {countLap}  ></ListLaps> */}
            </div>            
            <ListLaps countLapF2 = {countLapF2} msResult = {msResult} ></ListLaps>
            <div className="credits" >
                <p>Criado e Desenvolvido por <a target="blank" href="https://linktr.ee/rodrigocostadev">Rodrigo Costa</a></p>
            </div>
        </div>
    )
    
}

export default Counter


















//Daqui pra baixo foi a primeira função lap function criada para pegar as voltas, porem essa maneira nao funcionou de maneira correta

/////////////////////////////  Função lap function antiga juntamente com as variaveis anteriores   /////////////////////////////////////////////////////

    // // mostra o tempo de volta sem ser calculado, tempo do relogio contador
    // const[lap, setLap] = useState([])
    // let NEWLAP = "" + displayHours + hours + ":" + displayMinutes + minutes + ":" + displaySeconds + seconds + ":" + displayMiliSeconds + miliSeconds

    // // Pega o tempo atual para diminuir   ////////////////////////////////AQUI ESTA O PRPBLEMA COM O 0, NO DISPLAY QUE FICA NA FRENTE
    // // let lastTimeMS = displayMiliSeconds + miliSeconds
    // // let lastTimeS = displaySeconds + seconds
    // // let lastTimeM = displayMinutes + minutes
    // // let lastTimeH = displayHours + hours
    // // let NEWLAP = lastTimeH + lastTimeM + lastTimeS + lastTimeMS

    // let lastTimeMS = miliSeconds
    // let lastTimeS = seconds
    // let lastTimeM = minutes
    // let lastTimeH = hours      

    // //Mostra o tempo de volta calculado
    // const [countLap, setCountLap] =useState([])

    // const [displayCounterLapH, setDisplayCounterLapH] = useState(0)
    // // const [counterLapH, setCounterLapH] = useState(0)
    // const [displayCounterLapM, setDisplayCounterLapM] = useState(0)
    // // const [counterLapM, setCounterLapM] = useState(0)
    // const [displayCounterLapS, setDisplayCounterLapS] = useState(0)
    // // const [counterLapS, setCounterLapS] = useState(0)                /// criar como outro nome
    
    // const [displayCounterLapMS, setDisplayCounterLapMS] = useState(0)
    // // const [counterLapMS, setCounterLapMS] = useState(0)
    // // counterLapMS

    // function lapFunction(){

    //     // let newLap = new LapClass (lap)
    //     setLap([...lap,NEWLAP])


    //     /////////   PEGA A ULTIMA STRING DO ARRAY DE VOLTAS : LAP " sem calcular volta"  ////////
    //     let lastStringLap = lap.pop()    
    //     // let lastStringLap = lap[lap.length - 1]   


    //     // DEFINIR COMO INICIAL PARA SUBTRAIR
    //     function subNewlap(){        
    //         if(lastStringLap == undefined){
    //             lastStringLap = "00:00:00:00"
    //         }                      
    //     }
    //     subNewlap()
        
    //     //PEGA OS NUMEROS DAS STRINGS
    //     // let previousTimeMS = lastStringLap.substring(9,11)
    //     // let previousTimeS = lastStringLap.substring(6,8)
    //     // let previousTimeM = lastStringLap.substring(3,5)
    //     // let previousTimeH = lastStringLap.substring(0,2) 
    //     // let previousTimeMS = lastStringLap.substring(lastStringLap.length - 2)

    //     let previousTimeMS = parseInt(lastStringLap.substring(9,11))
    //     let previousTimeS = parseInt(lastStringLap.substring(6,8))
    //     let previousTimeM = parseInt(lastStringLap.substring(3,5))
    //     let previousTimeH = parseInt(lastStringLap.substring(0,2) )

    //     //////////////////////////////////////////////corrigir /////////////////////////////////////////////////////////////////
    //     let counterLapH = lastTimeH - previousTimeH
    //     let counterLapM = lastTimeM - previousTimeM
    //     let counterLapS = lastTimeS - previousTimeS 
    //     // let counterLapH = null
    //     // let counterLapM = null
    //     // let counterLapS = null
    //     let counterLapMS = lastTimeMS - previousTimeMS  

    //     //CONTADOR DE VOLTAS (CALCULANDO)
    //     //Hours
    //     // if(lastTimeH < previousTimeH){
    //     //     // previousTimeH = "00"
    //     //     // counterLapH = (100 - parseInt(previousTimeH)) + parseInt(lastTimeH)
    //     //     counterLapH = (100 - previousTimeH) + parseInt(lastTimeH)
    //     // } 


    //     //Minutes
    //     if(lastTimeM < previousTimeM){
    //         // previousTimeM = "00"
    //         // counterLapM = (100 - parseInt(previousTimeM)) + parseInt(lastTimeM)
    //         counterLapM = (60 - previousTimeM) + parseInt(lastTimeM)
    //     }
    //     //Seconds
    //     if(lastTimeS < previousTimeS){
    //         // previousTimeS = "00"
    //         // counterLapS = (100 - parseInt(previousTimeS)) + parseInt(lastTimeS)
    //         counterLapS = (60 - previousTimeS) + parseInt(lastTimeS)
    //     }        
    //     // Mili Seconds
    //     if(lastTimeMS < previousTimeMS){
    //         // previousTimeMS = "00"
    //         // counterLapMS = previousTimeMS - lastTimeMS  
    //         // counterLapMS = (100 - parseInt(previousTimeMS)) + parseInt(lastTimeMS)
    //         counterLapMS = (100 - previousTimeMS) + parseInt(lastTimeMS)
    //     }         
        
    //     console.log(lastTimeS)
    //     console.log(previousTimeS)
    //     // console.log(counterLapMS)
    //     // console.log( toString(lastTimeMS) + 100 )

    //     //Hours
    //     if (counterLapH >= 10){
    //         setDisplayCounterLapH("")
    //     }else if(counterLapH < 10){
    //         setDisplayCounterLapH("0")
    //     }

    //     //Minutes
    //     if (counterLapM >= 10){
    //         setDisplayCounterLapM("")
    //     }else if(counterLapM < 10){
    //         setDisplayCounterLapM("0")
    //     }

    //     //Seconds
    //     if (counterLapS >= 10){
    //         setDisplayCounterLapS("")
    //     }else if(counterLapS < 10){
    //         setDisplayCounterLapS("0")
    //     }
    //     // if (counterLapS == 60){
    //     //     setCounterLapM((prevsetCounterLapM) => prevsetCounterLapM + 1  )
    //     //     setCounterLapS(0)
    //     // }

    //     //Mili Seconds
    //     if (counterLapMS >= 10){
    //         setDisplayCounterLapMS("")
    //     }else if(counterLapMS < 10){
    //         setDisplayCounterLapMS("0")
    //     }

    //     // if (counterLapMS > 100){
    //     //     counterLapS = 0
    //     // }



       
    //     if (counterLapM < 60 && counterLapH > 0 ){
    //         counterLapH = 0
    //     }
    //     if (counterLapM == 60){
    //         counterLapH ++
    //         counterLapM = 0
    //     }


        
    //     if (counterLapS < 60 && counterLapM > 0 ){
    //         counterLapM = 0
    //     }
    //     if (counterLapS == 60){
    //         counterLapM ++
    //         counterLapS = 0
    //     }


        
    //     // if (counterLapMS == 100){
    //     //     counterLapS ++
    //     //     counterLapMS = 0
    //     //     // setCounterLapS((prevsetCounterLapS) => prevsetCounterLapS + 1  )
    //     //     // setCounterLapS(+1)
    //     // } 
        
    //     //se os milisegundos forem menores que 100 e os segundos menores que 0, segundos igual a 0.
    //     //Isso é a correção de um bug, que quando o contador passava de 100 MS (o que seria 1 segundo) e o intervalo (volta) 
    //     // era de alguns MS e tambem era menor que 1 segundo, ele adicionava 1 segundo, 
    //     // fazendo com que a conta não fechasse ao somar todas as voltas comparando com o tempo do contador
    //     if (counterLapMS < 99 && counterLapS > 0 ){
    //         counterLapS = 0
    //     } else if (counterLapMS == 100){
    //         counterLapS ++
    //         counterLapMS = 0
    //     }


    //     // console.log(counterLapMS)
    //     console.log(counterLapS)


    //     // if (counterLapMS < 10){
    //     //     setDisplayCounterLapMS("0")
    //     // }else{
    //     //     setDisplayCounterLapMS("")
    //     // }




    //     // if (counterLapMS == 100){
    //     //     counterLapMS = 0
    //     //     counterLapS ++
    //     //     // setDisplayMiliSeconds(0)
    //     //     // setMIliSeconds(0)
    //     //     // setSeconds((prevSeconds) => prevSeconds + 1)
    //     //     // // setMIliSeconds((prevMinutes) => prevMinutes + 1  )
    //     //     // setDisplaySeconds(0)     
    //     // }

    //     ////////////////////////////// problemas nos displaycounterlap... //////////////////////////////////////////////
    //     let counterDisplayLap = "" + displayCounterLapH + counterLapH + ":" + displayCounterLapM + counterLapM + ":" + displayCounterLapS + counterLapS + ":" + displayCounterLapMS + counterLapMS

        

        

    //     setCountLap([...countLap, counterDisplayLap])


    //     // console.log(counterDisplayLap)
    //     // console.log(countLap)
    //     // console.log(lastStringLap)
        

    //     // console.log(lapMS)
    //     // console.log(lapH)    



    //     // let subNewlap = NEWLAP - lastStringLap

    //     // console.log(lastStringLap.substring(9,11))

    //     // console.log(maiorValor)
    //     // console.log(lastStringLap)
    //     // console.log(lap)    
    //     // console.log(lap.findLastIndex())
    //     // console.log(lastIndexOf(lap))  
    //     // console.log(NEWLAP)  
    //     // console.log(maxNumber)
    //     // console.log(teste3)
    //     // console.log(teste4)
        
        

    //     // let a = "00:00:00:26"
    //     // let b = "00:00:00:16"
    //     // let aFormatado = parseInt(a)
    //     // let bFormatado = parseInt(b)

    //     // console.log(aFormatado)
    //     // console.log(aFormatado - bFormatado)


    //             // addItem()

    //     // O apply funciona como se você tivesse passado os valores do array como parâmetros da função max, 
    //     // e equivaleria a se digitar Math.max(0,12,13,2.... O primeiro parâmetro equivale ao escopo a ser usado na função, 
    //     // e neste caso, como é indiferente, passamos null, que representa o escopo global.
    //     // let maiorValor = Math.max.apply(lap)
    //     // let menorValor = Math.min.apply(lap)
    //     // let maxNumber = lap.filter( item => item.Math.max.apply(lap))

    //     // let maxNumber = lap.filter( item => Math.max.apply(item))

        
        
    // }

    // // function lapFunction(text){
    // //     let NEWLAP = new LapClass (text)
    // //     setLap([...lap, NEWLAP])
    // //     // console.log(lap)
    // // }



    // // return(
    // //     <div>
    // //         <h1>{displayHours}{hours} : {displayMinutes}{minutes} : {displaySeconds}{seconds} : {displayMiliSeconds}{miliSeconds}</h1>
    // //         <button onClick={play}>Play</button>
    // //         <button onClick={pause} >Pause</button>
    // //         {/* <button onClick={playPause} >Play</button> */}
    // //         <button onClick={reset} >Reset</button>
    // //         <button onClick={lapFunction} > Lap </button>
    // //         {/* <p>{lap}</p> */}
    // //         {/* <ListLaps lap = {lap}  ></ListLaps> */}
    // //         <ListLaps countLap = {countLap}  ></ListLaps>
    // //     </div>
    // // )
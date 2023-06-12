import React, { useEffect, useState } from "react";



function Counter (){

    const [displaySeconds, setDisplaySeconds] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const [displayMinutes, setDisplayMinutes] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [displayHours, setDisplayHours] = useState(0)
    const [hours, setHours] = useState(0)

    const [intervalo, setIntervalo] = useState()
    const [validador, setValidador] = useState(null)


    useEffect(() => {
        timerFunction()
    },[seconds])

    function timerFunction(){             
        if (seconds == 10){
            setDisplaySeconds("")
        }
        if (minutes == 10){
            setDisplayMinutes("")
        }
        if (hours == 10){
            setDisplayHours("")
        }
        if (seconds >= 10){
            setDisplaySeconds("")
        }else if(seconds < 10){
            setDisplaySeconds("0")
        }
        if (seconds == 60){
            setSeconds(0)
            setMinutes((prevMinutes) => prevMinutes + 1  )
            setDisplaySeconds(0)     
        }
        if (minutes == 60){
            setMinutes(0)
            setHours((prevHours) => prevHours + 1  )
            setDisplayMinutes(0)
        }        
    }

    function increment(){
        setSeconds((prevSeconds) => prevSeconds + 1  )
    }

    //Arrumar validador para não aumentar velocidade do contador apos ser clicado mais de 1 vez
    function pause(){
        if(validador){
            clearInterval(intervalo)
            clearInterval(validador)
            setValidador(null)
        }
        
    }

        //Arrumar validador para não aumentar velocidade do contador apos ser clicado mais de 1 vez
    function play(){
        if(!validador){
            setValidador(
            setIntervalo(setInterval(() => {
                increment()
                timerFunction()
            }, 1000))   )
        }
         
    }

    function reset(){
        pause()
        setSeconds(0)
        setDisplaySeconds(0)
        setMinutes(0)
        setDisplayMinutes(0)
        setHours(0)
        setDisplayHours(0)
        timerFunction()
    }


    return(
        <div>
            <h1>{displayHours}{hours} : {displayMinutes}{minutes} : {displaySeconds}{seconds}</h1>
            <button onClick={play}>Play</button>
            <button onClick={pause} >Pause</button>
            <button onClick={reset} >Reset</button>
        </div>
    )
    
}

export default Counter

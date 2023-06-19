import React, { useEffect, useState } from "react";



function Counter (){

    const [displayMiliSeconds, setDisplayMiliSeconds] = useState(0)
    const [miliSeconds, setMIliSeconds] = useState(0)

    const [displaySeconds, setDisplaySeconds] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const [displayMinutes, setDisplayMinutes] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [displayHours, setDisplayHours] = useState(0)
    const [hours, setHours] = useState(0)

    const [intervalo, setIntervalo] = useState()

    let lap
    // let isPlaying = false

    useEffect(() => {
        timerFunction()
    },[miliSeconds])

    function timerFunction(){   
        
        //Mili Seconds
        if (miliSeconds >= 10){
            setDisplayMiliSeconds("")
        }else if(miliSeconds < 10){
            setDisplayMiliSeconds("0")
        }

        if (miliSeconds == 100){
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
        if (seconds == 60){
            setSeconds(0)
            setMinutes((prevMinutes) => prevMinutes + 1  )
            setDisplaySeconds(0)     
        }

        //Minutes
        if (minutes == 10){
            setDisplayMinutes("")
        }
        if (minutes == 60){
            setMinutes(0)
            setHours((prevHours) => prevHours + 1  )
            setDisplayMinutes(0)
        }    

        //Hours
        if (hours == 10){
            setDisplayHours("")
        }    
    }

    function increment(){
        // setSeconds((prevSeconds) => prevSeconds + 1  )
        setMIliSeconds((prevMiliSeconds) => prevMiliSeconds + 1  )
    }

    // function playPause(){

    //     isPlaying? play() : pause()
    // }

    function play(){      

        // Elimina a execução em paralelo de outras funções contadoras, assim DEIXANDO DE ACELERAR O CONTADOR
        if(!intervalo){
            setIntervalo(setInterval(() => {
                increment()
                timerFunction()
            }, 100))   
        }

        // isPlaying = true
        
        // setIntervalo(setInterval(() => {
        //     increment()
        //     timerFunction()
        // }, 1000))
    }

    function pause(){       
        
        // Elimina a execução em paralelo de outras funções contadoras, assim DEIXANDO DE ACELERAR O CONTADOR
        if(intervalo){
            clearInterval(intervalo)
            setIntervalo()
        }

        // isPlaying = false
        // clearInterval(intervalo)
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
        setIntervalo()
        timerFunction()
    }

    function lapFunction(){

        lap = ("" + displayHours + hours + ":" + displayMinutes + minutes + ":" + displaySeconds + seconds + ":" + displayMiliSeconds + miliSeconds)

        console.log(lap)        
        
    }


    return(
        <div>
            <h1>{displayHours}{hours} : {displayMinutes}{minutes} : {displaySeconds}{seconds} : {displayMiliSeconds}{miliSeconds}</h1>
            <button onClick={play}>Play</button>
            <button onClick={pause} >Pause</button>
            {/* <button onClick={playPause} >Play</button> */}
            <button onClick={reset} >Reset</button>
            <button onClick={lapFunction}> Lap </button>
        </div>
    )
    
}

export default Counter

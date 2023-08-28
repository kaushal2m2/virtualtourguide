import {useState, useEffect} from 'react'
import Typewriter from 'typewriter-effect';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

// const Process = ({loc, res, setRes}) => {
//     // useEffect(() =>{
//     //     setRes("W")
//     //     console.log("e")
//     // }, [])

//     // function load () {
//     //     // try {
//     //     //     console.log("s")
//     //     //     const response = await fetch("/api/generate", {
//     //     //         method: "POST",
//     //     //         headers: {
//     //     //             "Content-Type": "application/json",
//     //     //         },
//     //     //         body: loc,
//     //     //     })
//     //     //     console.log(response)
//     //     //     const data = await response.json();
//     //     //     if (response.status !== 200) {
//     //     //         throw new Error(`Request failed with status ${response.status}`);
//     //     //     }
//     //     //     setRes(data.result);
//     //     //     console.log("wow")
//     //     // } catch(error) {
//     //     //     // Consider implementing your own error handling logic here
//     //     //     console.error(error);
//     //     //     // alert(error.message);
//     //     // }
//     //     setRes("WSP")
//     // }
    
//     // console.log(res)
//     // const r = res;
//     const {text} = useTypewriter({
//         words: ['Hello', 'World', 'Simple', 'Typewriter'],
//         loop: {}
//     })


//     return (
//     <div>
//         <h1 className='text-3xl font-bold'>
//             {text}
//         </h1>
//         <Cursor/>
//     </div>
//     )
// }

function Guide ({coordinates}) {
    const geocoder = new google.maps.Geocoder();

    const [loc, setLoc] = useState('')
    const [prm, setPrm] = useState('')
    const [once, setOnce] = useState(false)
    const [res, setRes] = useState()
    const [load, setLoad] = useState(true)

    geocoder.geocode({ location: coordinates }).then((response) =>{
        setLoc(response.results[6].formatted_address)
        if(loc != ''){
        setPrm(`Pretend you are a tour guide in ${loc}. 
        What would you tell a tourist who is new to the area? 
        Give a history and important sites and events in ${loc}, 
        and write it in a conversation form, 
        as if you are lecturing/talking to the tourist`)
        //console.log(prm)
        setOnce(true)
        }
    })

    useEffect(() => {
        ld()
    }, [once])

    async function ld(){
        if(loc === ''){
            return;
        }
        //console.log(JSON.stringify({prm, }))
        try {
            const response = await fetch("http://localhost:8080/api/v1/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prm, }),
            })

            const data = await response.json();
            console.log("data",data)
            if (response.status !== 200) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            setRes(data.result);
            setLoad(false)
        } catch(error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            // alert(error.message);
        }
    }  

    if(load){
        return (<div>Loading...</div>)
    }

    return (
        <div className='px-8 py-8 w-[30%] h-fixed overflow-y-auto'>
            {/* <Process loc={loc} res={res} setRes={setRes}/> */}
            {res}
        </div>
    )
}

export default Guide
import { useState, useEffect } from 'react'
import Typewriter from 'typewriter-effect';

function filter(text) {
    const arr = text.split(" ");
    const lineSize = 50;
    const ans = [];
    var curr = "";
    for (var i = 0; i < arr.length; i++) {
        if (curr.length + arr[i].length > lineSize) {
            ans.push(curr);
            curr = "";
        }
        if (arr[i].length > lineSize) {
            var temp = arr[i];
            while (temp.length > lineSize) {
                ans.push(temp.substring(0, lineSize));
                temp = temp.substring(lineSize);
            }
            curr = temp + " ";
            continue;
        }
        curr += arr[i] + " ";
    }
    var ret = "";
    ans.map((line) => { ret += line + "\n" });
    return ret;
}

function Guide({ coordinates }) {
    const geocoder = new google.maps.Geocoder();

    const [loc, setLoc] = useState('')
    const [prm, setPrm] = useState('')
    const [once, setOnce] = useState(false)
    const [res, setRes] = useState()
    const [load, setLoad] = useState(true)

    geocoder.geocode({ location: coordinates }).then((response) => {
        setLoc(response.results[6].formatted_address)
        if (loc != '') {
            setPrm(`I'm visiting ${loc}. 
            What can you tell a tourist who is new to the area? 
            Give a history and important sites and events in ${loc}`)
            setOnce(true)
        }
    })

    useEffect(() => {
        //ld()
        //switched to hard coded response for now
        setRes("Cupertino,locatedintheheartofSiliconValley,isavibrantcityinSantaClaraCounty, California. Known for its innovative technology companies, beautiful landscapes, and diverse community, Cupertino offers a range of attractions for visitors.  History: Cupertino's history dates back to the mid-19th century when it was primarily an agricultural region. The area saw significant growth during the early 20th century, attracting settlers who established orchards and vineyards. In the 1950s, Cupertino")
        setLoad(false)
    }, [once])

    async function ld() {
        if (loc === '') {
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prm, }),
            })

            const data = await response.json();
            if (response.status !== 200) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            setRes(data.result);
            setLoad(false)
        } catch (error) {
            console.error(error);
        }
    }

    if (load) {
        return (<div>Loading...</div>)
    }

    return (
        <div className='px-8 py-8 w-[30%] h-fixed overflow-y-auto bg-guide-back'>
            <span className='text-black font-bold font-poppins'>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.changeDelay(50)
                            .typeString(filter(res))
                            .start();
                    }}
                />
            </span>
        </div>
    )
}

export default Guide
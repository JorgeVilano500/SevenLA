import { useState } from "react"
import { create } from "ipfs-http-client"
interface ColorProps {
    color: string, 
    onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void
    styleObj: {}
    client: () => void
}

const client = create();


export function LandingPage({color, onChangeHandler, styleObj, client}: ColorProps) {
    const [test, setTest] = useState<T>()
    return(
        <div className="container" style={styleObj}>
            {/* Have to place here if the user is logged in they are gonna be seeing a troll page, if Liz or I are logged in then it'll work */}
            Hello beautiful Its a work in progress but it'll work soon 
            {/* <input
      onChange={onChangeHandler}
      value={color}
      type='text'
    /> */}
            <input 
            type='file'
            onClick={async (e:  React.FormEvent<HTMLInputElement>) => {
                setTest(e.currentTarget.value)
                const {cid} = await client.add(test)

                console.log(cid);
            }}
            />



        </div>
    )
}
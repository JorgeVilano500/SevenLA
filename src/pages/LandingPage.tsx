import { useState, useRef, useEffect } from "react"
import { create } from "ipfs-http-client"
interface ColorProps {
    color: string | undefined | null, 
    onChangeHandler: (e: React.FormEvent<HTMLButtonElement>) => void
    styleObj: {}
    // client: () => void
    currentAccount: string
    uploadImage: (description: string) => Promise<void>
    captureFile: (e: FormEvent<HTMLInputElement>) => void
    images: string[]
}



export function LandingPage({ images, color, onChangeHandler, styleObj, client, currentAccount, uploadImage, captureFile}: ColorProps) {

 
    let imageDescription = useRef()
    const [test, setTest] = useState<T>()
    return(
        <div className="container" style={styleObj}>
            <div className="row">

            {/* Have to place here if the user is logged in they are gonna be seeing a troll page, if Liz or I are logged in then it'll work */}
            Hello beautiful Its a work in progress but it'll work soon <br />
            {/* <input
      onChange={onChangeHandler}
      value={color}
      type='text'
    /> */}
    {currentAccount} <br />
            {/* <input 
            type='file'
            onClick={async (e:  React.FormEvent<HTMLInputElement>) => {
                setTest(e.currentTarget.value)
                // const {cid} = await client.add(test)
                console.log(client)
                // console.log(cid);
            }} */}

            {/* /> */}
            <h2>Share Images</h2>
            <form  onSubmit={(e) => {
                e.preventDefault()
                const description = imageDescription.value
                uploadImage(description)
            }}>
                <input
                    type='file'
                    accept='.jpg, .jpeg, .png, .bmp, .gif' onChange={captureFile}
                    />
                <div className="form-group mr-sm-2">
                    <br></br>
                    <input 
                    required
                    id='imageDescription'
                    type='text'
                    ref={(input) => {imageDescription = input}}
                    className='form-control'
                    placeholder="Image Description"
                    />
                </div>
                <button type="submit" className='btn btn-primary btn-block btn-lg'>Upload</button>

            </form>
        

                </div>
                

            
                {images && images.map((image, key) => (
                    <div className="card mt-4 mb-4" key={key}>
                    <ul id="imageList" className="list-group list-group-flush">
                        <li>
                            <p><img src={`https://gateway.ipfs.io/ipfs/${image.hash}`} style={{maxHeight: '420px', maxWidth: '100%', objectFit: 'cover'}} /></p>
                            <p>{image.description}</p>
                        </li>

                    </ul>

                </div>
                ) )}
            
        </div>
    )
}
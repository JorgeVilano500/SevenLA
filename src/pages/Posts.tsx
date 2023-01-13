type ImagesType = {
   images: never[]
}


export function Posts({images} : ImagesType) {
    return(
        <div>
            This will be where we are able to post and put stuff online. We could do stuff from our dates or just random stuff we want each other to see. 
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
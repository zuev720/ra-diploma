import React from "react";

export function Image(props) {
    const image = (props.images)
        ? props.images.find((image) => image)
        : 'https://img.cliparto.com/pic/xl/189538/3144285-seamless-texture-different-soles-of-shoes.jpg';

    const handleImageError = (e) => {
       e.target.src = 'https://img.cliparto.com/pic/xl/189538/3144285-seamless-texture-different-soles-of-shoes.jpg';
    }

    return(
        <img src={image} className={props.className} alt={props.title} onError={handleImageError}/>
    )
}
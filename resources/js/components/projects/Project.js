import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function Project({ title, link, image, text, technologies }) {
    return (
        <h1>A project</h1>
        // <article className="project">
        //     <div className="previewWrapper">
        //         <a className="preview" href="#">
        //             <img className="previewImage" src={image} alt="Project preview" />
        //             <span className="previewLink">Visit</span>
        //         </a>
        //     </div>
        //     <div className="description">

        //     </div>
        // </article>

        //         {projects.map(data => (
        //     <Project 
        //         key={Math.random()}
        //         text={data.text}
        //         image={data.image}
        //         link={data.link}
        //         color={data.color} 
        //         title={data.title}
        //     />
        // ))}
    );
}
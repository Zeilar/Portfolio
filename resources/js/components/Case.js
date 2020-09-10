import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function Case({ title, link, image, text, technologies }) {
    return (
        <article className="case">
            <div className="previewWrapper">
                <a className="preview" href="#">
                    <img className="previewImage" src={image} alt="Case preview" />
                    <span className="previewLink">Visit</span>
                </a>
            </div>
            <div className="description">

            </div>
        </article>
    );
}
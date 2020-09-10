import React, { useState, useRef, useEffect, useCallback } from 'react';
import Hero from './Hero';
import Case from './Case';

export default function Main() {
    const cases = [
        {
            text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet porro id dolore reiciendis placeat nulla corrupti? Sit ipsam nam, beatae unde hic dolore voluptatibus, fugiat, quo suscipit sint assumenda quasi iusto dicta in similique! Aliquam facilis voluptates nostrum quae adipisci reprehenderit eius, tempore aliquid placeat molestiae nulla aperiam aspernatur quidem.',
            image: 'https://i.imgur.com/6wDpmnF.png',
            link: 'https://zforum.angelin.dev',
            color: 'rgb(0, 127, 255)',
            title: 'Z Forum',
        }
    ];
    return (
        <main id="main">
            <Hero />
            {cases.map(data => (
                <Case 
                    key={Math.random()}
                    text={data.text}
                    image={data.image}
                    link={data.link}
                    color={data.color} 
                    title={data.title}
                />
            ))}
        </main>
    );
}
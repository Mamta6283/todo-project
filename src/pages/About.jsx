import React from 'react';
import usePageTitle from '../hooks/usePageTitle';

function About(props) {
    usePageTitle("Todo App- about")
    return (
        <div>
            <h1>About</h1>
        </div>
    );
}

export default About;
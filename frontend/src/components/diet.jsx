import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Diet = () => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Access the environment variable
    const [story, setStory] = useState('');

    const generateStory = async () => {
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    contents: [
                        {
                            parts: [{ text: 'Write a story about a magic backpack.' }],
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Check if response and data are defined
            if (response.data && response.data.contents && response.data.contents.length > 0) {
                const generatedText = response.data.contents[0].parts[0]?.text; // Safe access
                setStory(generatedText || 'No story generated.');
            } else {
                setStory('No content generated.');
            }
        } catch (error) {
            console.error('Error generating story:', error);
            setStory('Error generating story.');
        }
    };

    useEffect(() => {
        generateStory();
    }, []);

    return (
        <div>
            <h1>Generated Story</h1>
            <p>{story}</p>
        </div>
    );
};

export default Diet;

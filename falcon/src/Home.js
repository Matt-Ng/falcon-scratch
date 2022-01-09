import React from 'react';
import './App.css';
import {Link, useNavigate} from 'react-router-dom';
import Falcon from './falcon.png';

function Home() {

    const navigate = useNavigate();
    const toRandomStart = () => {
        navigate('/start', {state: {id: "-1"}});
    }
    // TODO nonrandom start

    return (
        <div id = "entire-page">
            <section className='sec1'>
            <span ><a className = "randomizeButton" onClick = {() => {toRandomStart()}}>Randomize</a></span>
            </section>
            

            <div className='boxes'>
            <div className='box'>
                <div>
                    <svg>
                    <rect width="100%" height="100%" fill = "#55595c"></rect>
                    <text x="40%" y="50%" fill="#eceeef" dy="10%">Deutsch</text>
                    </svg>
                </div>
                <div>
                    <p>Schau, als ich im Gefängnis war, war ich zurückhaltend</p>
                </div>
                <div>
                    <button>Try</button>
                </div>
            </div>
    
            <div className='box'>
                <div>
                    <svg>
                    <rect width="100%" height="100%" fill = "#55595c"></rect>
                    <text x="40%" y="50%" fill="#eceeef" dy="10%">English</text>
                    </svg>
                </div>
                <div>
                    <p>A well-organized paragraph supports or develops a single controlling idea, which is expressed in a sentence called the topic sentence. A topic sentence has several important functions:
                        it substantiates or supports an essay’s thesis statement; it unifies the content of a paragraph and directs the order of the sentences; and it advises the reader of the subject to be 
                        discussed and how the paragraph will discuss it. </p>
                </div>
                <div>
                    <button>Try</button>
                </div>
            </div>
            <div className='box'>
                <div>
                    <svg>
                    <rect width="100%" height="100%" fill = "#55595c"></rect>
                    <text x="40%" y="50%" fill="#eceeef" dy="10%">Thumbnail</text>
                    </svg>
                </div>
                <div>
                    <p>A well-organized paragraph supports or develops a single controlling idea, which is expressed in a sentence called the topic sentence. A topic sentence has several important functions:
                        it substantiates or supports an essay’s thesis statement; it unifies the content of a paragraph and directs the order of the sentences; and it advises the reader of the subject to be 
                        discussed and how the paragraph will discuss it. </p>
                </div>
                <div>
                    <button>Try</button>
                </div>
            </div>
            <div className='box'>
                <div>
                    <svg>
                    <rect width="100%" height="100%" fill = "#55595c"></rect>
                    <text x="40%" y="50%" fill="#eceeef" dy="10%">Thumbnail</text>
                    </svg>
                </div>
                <div>
                    <p>A well-organized paragraph supports or develops a single controlling idea, which is expressed in a sentence called the topic sentence. A topic sentence has several important functions:
                        it substantiates or supports an essay’s thesis statement; it unifies the content of a paragraph and directs the order of the sentences; and it advises the reader of the subject to be 
                        discussed and how the paragraph will discuss it. </p>
                </div>
                <div>
                    <button>Try</button>
                </div>
            </div>
            
        

            </div>

        </div>
    )
}

export default Home;

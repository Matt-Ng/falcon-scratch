import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Falcon from './falcon.png';

function Home() {

  return (
    <div>
        <section className='sec1'>
            <div>
                <h1>Falcon Scratch</h1>
                <p></p>
                <span><Link to="/start">Randomize</Link></span>
            </div>
        </section>

        <div className='boxes'>
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

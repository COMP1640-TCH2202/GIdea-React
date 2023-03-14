import React from 'react';
import '../Idea/Idea.scss'

import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { BsFillChatFill, BsFillShareFill, BsFillSaveFill } from "react-icons/bs";
const Idea = () => {
    return (
        <div className='ideaContainer'>
            <div className='voteSection'>
                <div className='upvote'>
                    <GoArrowUp/>
                </div>
                <div className='voteNumber'>
                    100
                </div>
                <div className='downvote'>
                    <GoArrowDown/>
                </div>
            </div>
            <div className='ideaContent'>
                <div className='publishedTime'>
                    Post 2 hours ago
                </div>
                <div className='titleSection'>
                    <h3 className='ideaTitle'>
                        Idea Title
                    </h3>
                </div>
                <div className='ideaDetail'> {/*  Show Idea Content (img, paragraph)  */}
                   
                </div>
            </div>
            <div className='btn-group'>
                <button className='ideaBtn'>
                    <BsFillChatFill style={{fontSize:'24px', paddingRight: '8px'}}/>
                    Comments
                </button>
                <button className='ideaBtn'>
                    <BsFillShareFill style={{fontSize:'24px', paddingRight: '8px'}}/>
                    Share
                </button>
                <button className='ideaBtn'>
                    <BsFillSaveFill style={{fontSize:'24px', paddingRight: '8px'}}/>
                    Save
                </button>
            </div>
        </div>
    );
}

export default Idea;

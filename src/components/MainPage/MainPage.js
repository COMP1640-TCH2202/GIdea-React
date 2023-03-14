import React from 'react';
import '../MainPage/MainPage.scss'
import Navbar from '../Navbar/Navbar';
import Idea from '../Idea/Idea';
import { AiFillStar } from "react-icons/ai";
import { BsRocketTakeoffFill, BsFire } from "react-icons/bs";

const MainPage = () => {
    return (
        <>
            <div>
                <Navbar />
                <div className='container' >
                    <div className='ideaSortOptions my-3 bg-secondary-subtle'>
                        <div className='optionList p-3'>
                            <button className='optionBtn'>
                                <AiFillStar className='optionIcon' />
                                Popular
                            </button>
                            <button className='optionBtn'>
                                <BsRocketTakeoffFill className='optionIcon' />
                                Most View
                            </button>
                            <button className='optionBtn'>
                                <BsFire className='optionIcon'/>
                                New
                            </button>
                        </div>
                    </div>
                    <Idea />
                    <Idea />
                    <Idea />
                    <Idea />
                </div>
            </div>
        </>
    );
}

export default MainPage;

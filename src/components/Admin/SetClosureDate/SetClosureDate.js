import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { DatePicker } from 'antd';
const SetClosureDate = () => {
    const {RangePicker} = DatePicker
    return (
        <div>
            <Navbar />
            <div className='container' >
                <h1 className='text-center'>Date Management</h1>

                <h2>Final Submission</h2>
                    <RangePicker
                        showTime 
                        size='large'
                    />
                <h2 className='mt-5'>Final Closure Date</h2>
                    <RangePicker
                        showTime
                        size='large'
                    />
            </div>
        </div>
    );
}

export default SetClosureDate;

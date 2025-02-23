import React from 'react';
import './TestObject.css';

export default function TestObject() {
    return (
        <div className='object-container'>
            <div class='card-container'>
                <div class='card'>
                    <div class='face front'>Mặt Trước</div>
                    <div class='face back'>Mặt Sau</div>
                </div>
            </div>

            <div class='cube-container'>
                <div class='face front'>Front</div>
                <div class='face back'>Back</div>
                <div class='face left'>Left</div>
                <div class='face right'>Right</div>
                <div class='face top'>Top</div>
                <div class='face bottom'>Bottom</div>
            </div>
        </div>
    )
}

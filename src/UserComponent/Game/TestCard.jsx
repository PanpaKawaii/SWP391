import React from 'react';
import './TestCard.css';

export default function TestCard() {
    return (
        <div className='card-cube-container'>
            <div class='testcard-container'>
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

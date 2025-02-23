import React from 'react';
import './TestObject.css';

export default function TestObject() {
    return (
        <div className='object-container'>
            <div class='scene-card'>
                <div class='card'>
                    <div class='face front'>Mặt Trước</div>
                    <div class='face back'>Mặt Sau</div>
                </div>
            </div>

            <div class="scene-cube">
                <div class='cube'>
                    <div class='face front'>Front</div>
                    <div class='face back'>Back</div>
                    <div class='face left'>Left</div>
                    <div class='face right'>Right</div>
                    <div class='face top'>Top</div>
                    <div class='face bottom'>Bottom</div>
                </div>
            </div>

            <div class="scene-pyramid">
                <div class="pyramid">
                    <div class="face front">Red</div>
                    <div class="face left">Green</div>
                    <div class="face right">Blue</div>
                    <div class="face bottom">Yellow</div>
                </div>
            </div>
        </div>
    )
}

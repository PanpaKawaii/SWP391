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

            <div class='scene-cube'>
                <div class='cube'>
                    <div class='face front'>Front</div>
                    <div class='face back'>Back</div>
                    <div class='face left'>Left</div>
                    <div class='face right'>Right</div>
                    <div class='face top'>Top</div>
                    <div class='face bottom'>Bottom</div>
                </div>
            </div>

            <div class='scene-pyramid'>
                <div class='pyramid'>
                    <div class='face front'>Red</div>
                    <div class='face left'>Green</div>
                    <div class='face right'>Blue</div>
                    <div class='face bottom'>Yellow</div>
                </div>
            </div>

            <div class='scene-dodecahedron'>
                <div class='dodecahedron'>
                    <div class='face f1'>
                        {/* <button style={{ backgroundColor: 'red', width: '120px' }}> */}
                            Face1
                        {/* </button> */}
                    </div>
                    <div class='face f2'>Face2</div>
                    <div class='face f3'>Face3</div>
                    <div class='face f4'>Face4</div>
                    <div class='face f5'>Face5</div>
                    <div class='face f6'>Face6</div>
                    <div class='face f7'>Face7</div>
                    <div class='face f8'>Face8</div>
                    <div class='face f9'>Face9</div>
                    <div class='face f10'>Face10</div>
                    <div class='face f11'>Face11</div>
                    <div class='face f12'>Face12</div>
                </div>
            </div>
        </div>
    )
}

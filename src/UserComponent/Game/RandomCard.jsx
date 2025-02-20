import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './RandomCard.css';

import PokerCard from '../../assets/imageGAMEs/PokerCard.png';

export default function RandomCard() {

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const [Count, setCount] = useState(1);
    const [DisplayCard, setDisplayCard] = useState(false);

    const [List, setList] = useState([
        'Trần Sơn Triều',
        'Mai Phạm Nồng Hậu',
        'Phạm Tiến Mạnh',
        'Nguyễn Văn Minh Thoại',
        'Trần Quang Duy',
        'Ngô Hướng Thiên',
        'Trần Quang Khoa',
        'Lê Minh Khoa',
        'Phạm Đức Nghĩa',
        'Lê Huy Vũ',
        'Nguyễn Quang Minh',
        'Nguyễn Thị Yến Vy',
        'Lê Đức Lộc',
        'Nguyễn Song Toàn',
        'Đặng Ngọc Hải Triều',
        'Nguyễn Quốc Sơn',
        'Nguyễn Đức Anh Minh',
        'Lưu Thế Vinh',
        'Trương Kim Hằng',
        'Nguyễn Trung Kiên',
        'Huỳnh Quốc Việt',
        'Đoàn Tín Nghĩa',
        'Phan Tuấn An',
        'Nguyễn Tấn Phát',
    ]);
    const [ChosenList, setChosenList] = useState([]);

    const serveCard = async () => {
        const card = document.getElementById('poker-cards');
        card.style.margin = '0';

        const button = document.getElementById('active-button');
        button.style.marginLeft = '500px';

        await sleep(500);
        setDisplayCard(true);
    };

    const splitCard = async () => {
        const NotInclude = List.filter(item => !ChosenList.includes(item));
        setChosenList([...ChosenList, NotInclude[Math.floor(Math.random() * NotInclude.length)]])

        const card = document.getElementById(`poker-card-${Count - 1}`);
        card.style.marginTop = '400px';
        card.style.marginLeft = `${(Count - 3) * 500}px`;
    };

    // const displayName = async (index) => {
    //     if (index + 1 === Count) return;

    //     const card = document.getElementById(`poker-card-${index}`);
    //     card.style.transition = 'all 2s ease';
    //     card.style.transform = 'rotateY(1980deg)';
    //     card.style.background = 'none';
    //     card.style.backgroundColor = '#fff';
    //     await sleep(1400);

    //     const name = document.getElementById(`chosen-name-${index}`);
    //     name.style.transform = 'rotateY(180deg)';
    //     name.style.color = '#000';
    // }

    const displayName = async (index) => {
        if (index + 1 === Count) return;

        const card = document.getElementById(`poker-card-${index}`);
        card.style.transition = 'all 2s ease';
        card.style.transform = 'rotateY(1980deg)';
        await sleep(1400);

        const name = document.getElementById(`chosen-name-${index}`);
        name.style.display = 'block';
    }

    const resetCount = async () => {
        setCount(0);
        setChosenList([])
        await sleep(0);
        setCount(1);
    }

    return (
        <div className='randomcard-container'>
            <div className='header'>
                <h1><b>RANDOM POKER</b></h1>
            </div>

            <div className='randomcard-content'>

                <div className='poker-card' id='poker-cards'></div>

                {
                    // DisplayCard && [...Array(Count)].map((_, index) => (
                    //     <div
                    //         key={index}
                    //         id={`poker-card-${index}`}
                    //         className='poker-card'
                    //         style={{ zIndex: `${5 - index}` }}
                    //         onClick={() => displayName(index)}
                    //     >
                    //         {/* Index: {index} - Count: {Count}
                    //     <br /> */}
                    //         <p
                    //             id={`chosen-name-${index}`}
                    //         >{ChosenList[index]}</p>
                    //     </div>
                    // ))
                }

                {
                    DisplayCard && [...Array(Count)].map((_, index) => (
                        <div
                            key={index}
                            id={`poker-card-${index}`}
                            className='poker-card'
                            style={{ zIndex: `${5 - index}` }}
                            onClick={() => displayName(index)}>

                            <div className='face front'>
                                <div className='text-card'>
                                    <p
                                        id={`chosen-name-${index}`}>
                                        {ChosenList[index]}
                                    </p>
                                </div>
                            </div>

                            <div className='face back'>
                            </div>

                        </div>
                    ))
                }

                <div id='active-button'>
                    {!DisplayCard ?
                        <Button className='btn' onClick={serveCard}>SERVE CARDS</Button>
                        :
                        <>
                            {Count <= 5 ?
                                <Button className='btn' onClick={() => { setCount(Count => Count + 1), splitCard() }}>SPLIT CARD</Button>
                                :
                                <Button className='btn btn-deactivate'>SPLIT CARD</Button>
                            }
                            <Button className='btn btn-reset' onClick={resetCount}>RESET</Button>
                        </>
                    }
                </div>

            </div>
        </div>
    )
}

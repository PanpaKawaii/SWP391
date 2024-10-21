import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import './BookingPodDetailContent.css';

import { imagePODs } from '../assets/listPODs';
import { imageSTOREs } from '../assets/listSTOREs';
import { imageUTILITIEs } from '../assets/listUTILITIes';

import QRcode from '../BackgroundImage/QRcode.jpg'

export default function BookingPodDetailContent() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [SLOTs, setSLOTs] = useState([]);
    const [STOREs, setSTOREs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                setBOOKINGs(bookingData);

                const podResponse = await fetch('https://localhost:7166/api/Pod');
                if (!podResponse.ok) throw new Error('Network response was not ok');
                const podData = await podResponse.json();
                setPODs(podData);

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                const utilityResponse = await fetch('https://localhost:7166/api/Utility');
                if (!utilityResponse.ok) throw new Error('Network response was not ok');
                const utilityData = await utilityResponse.json();
                setUTILITIes(utilityData);

                const slotResponse = await fetch('https://localhost:7166/api/Slot');
                if (!slotResponse.ok) throw new Error('Network response was not ok');
                const slotData = await slotResponse.json();
                setSLOTs(slotData);

                const storeResponse = await fetch('https://localhost:7166/api/Store');
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                setSTOREs(storeData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Lấy Id của Pod được chọn
    const PodId = useParams();
    const Pod = PODs ? PODs.find(obj => { return obj.id == PodId.Id; }) : null;

    // Lấy những Utility của Pod đó
    const AvailableUTILITIes = UTILITIes ? UTILITIes.filter(utility => utility.pods && utility.pods.some(pod => pod.id === Pod.id)) : [];

    // Lấy những Slot của Pod đó
    const AvailableSLOTs = SLOTs ? SLOTs.filter(slot => slot.podId === Pod?.id) : [];

    // Lấy Type của Pod đó
    const thisTYPE = TYPEs ? TYPEs.find(type => type.id === Pod?.typeId) : null;

    // Lấy Store của Pod đó
    const thisSTORE = STOREs ? STOREs.find(store => store.id === Pod?.storeId) : null;



    const [MaxID, setMaxID] = useState(null);
    const [date, setDate] = useState('');
    const [SlotId, setSlotId] = useState('');
    const [Confirm, setConfirm] = useState(false);

    const [bookingsHaveTheSameDateAndSlot, setBookingsHaveTheSameDateAndSlot] = useState(null);

    // Những Slot được chọn từ AvailableSLOTs
    const selectedSlots = AvailableSLOTs ? AvailableSLOTs.filter(slot => SlotId.includes(slot.id)) : [];
    console.log('SlotId: ', SlotId)

    // Những Booking có cùng Date được chọn
    const bookingsHaveTheSameDate = BOOKINGs ? BOOKINGs.filter(booking =>
        booking.date.substring(0, 10) === date
    ).map(booking => booking.id) : [];
    console.log('bookingsHaveTheSameDate: ', bookingsHaveTheSameDate)

    // Những Booking có cùng Date và cùng Slot được chọn
    const aaaaaaa = selectedSlots ? selectedSlots.filter(slot => (slot.bookings).some(booking => bookingsHaveTheSameDate.includes(booking.id))) : [];

    useEffect(() => {
        setBookingsHaveTheSameDateAndSlot(aaaaaaa)
        console.log('SameDateSlot: ', aaaaaaa)
        console.log('SameDateSlot: ', aaaaaaa.length)
    }, [SlotId]);





    // Lấy những Slot được chọn
    const thisSLOT = AvailableSLOTs ? AvailableSLOTs.filter(slot => String(SlotId).includes(String(slot.id))) : null;

    const Booking = async () => {
        if (!MaxID) {
            console.error('Please wait for the system');
            return;
        }
        if (!Pod || !id) {
            console.error('Pod or UserId is not defined');
            return;
        }
        if (!date || SlotId.length === 0) {
            console.error('Date or SlotId is not defined');
            return;
        }
        if (Confirm == false) {
            console.error('You have not confirmed yet');
            return;
        }

        const bookingData = {
            id: MaxID + 1,
            date: date,
            status: 'Chờ xác nhận',
            feedback: '',
            podId: Pod.id,
            slotIds: SlotId.map(id => parseInt(id, 10)),
            userId: id,
        };
        console.log('Booking data:', bookingData);
        console.log('Confirm status:', Confirm);

        const token = localStorage.getItem('token');
        console.log('Token data:', token);

        try {
            const response = await fetch('https://localhost:7166/api/Booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setConfirm(false);
            console.log('Booking successful:', result);
        } catch (error) {
            console.error('Error during booking:', error);
        }
    };

    useEffect(() => {
        if (date && SlotId) {
            Booking(date, SlotId);
        }
    }, [Confirm]);

    const [Amount, setAmount] = useState(0);
    const [IsPopupOpen, setIsPopupOpen] = useState(false);
    const [IsQROpen, setIsQROpen] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();
        // const date = e.target.BookingDate.value;
        // setDate(date);
        setIsPopupOpen(true);

        const fetchMaxBookingId = async () => {
            try {
                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                const MaxID = bookingData.reduce((max, booking) => Math.max(max, booking.id), 0);
                setMaxID(MaxID);
                console.log('Max Booking ID:', MaxID);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        await fetchMaxBookingId();
        console.log({ date, SlotId, IsPopupOpen, Confirm });
        window.location.href = '#popupConfirm';
    };

    const handleConfirm = () => {
        setIsQROpen(true)
        setConfirm(true);
    };


    return (

        //[Store] (Id, Name, Address, Contact, Status)
        //[Pod] (Id, Name, Image, Description, Rating, Status, TypeId, StoreId)
        //[Type] (Id, Name, Capacity)
        //[Utility] (Id, Name, Image, Description)
        //[Slot] (Id, Name, StartTime, EndTime, Price, Status, PodId)
        //[Booking] (Id, Date, Status, Feedback, PodId, UserId)

        <div className='POD-booking-pod-detail'>
            <div className='booking-pod-detail-container'>
                {Pod ? (
                    <>
                        <h1><b>{Pod.name}</b></h1>
                        <div className='image-detail'>
                            <div className='image-detail-pod'>
                                <img src={imagePODs.find(image => image.id === Pod.id)?.image} alt={Pod.name}></img>
                            </div>
                            <div className='image-detail-2'>
                                <div className='image-detail-2-item-store'>
                                    <img src={imageSTOREs.find(image => image.id === Pod.storeId)?.image} alt={Pod.name}></img>
                                </div>
                                {AvailableUTILITIes && AvailableUTILITIes.slice(0, 3).map((utility) => (
                                    <div key={utility.id} className='image-detail-2-item-utility' style={{ "--available-utilities-length": Math.ceil((AvailableUTILITIes.length/4)), "--available-utilities-slice": AvailableUTILITIes.slice(0, 3).length }}>
                                        <img src={imageUTILITIEs.find(image => image.id === utility.id)?.image} alt={utility.name}></img>
                                    </div>
                                ))}
                                {AvailableUTILITIes && AvailableUTILITIes.slice(3, 6).map((utility) => (
                                    <div key={utility.id} className='image-detail-2-item-utility' style={{ "--available-utilities-length": Math.ceil((AvailableUTILITIes.length/4)), "--available-utilities-slice": AvailableUTILITIes.slice(3, 6).length }}>
                                        <img src={imageUTILITIEs.find(image => image.id === utility.id)?.image} alt={utility.name}></img>
                                    </div>
                                ))}
                                {/* <div className='image-detail-2-item'>
                                    <img src={imageUTILITIEs.find(image => image.id === Pod.id)?.image} alt={Pod.name}></img>
                                </div> */}
                            </div>
                        </div>

                        <div className='detail-container'>
                            <div className='short-detail'>
                                <h3><b>{thisSTORE ? `${thisSTORE.name}: ${thisSTORE.address} / Hotline: ${thisSTORE.contact}` : 'Store not found'}</b></h3>
                                <p>{thisTYPE ? `${thisTYPE.name} / Sức chứa: ${thisTYPE.capacity} người` : 'Type not found'}</p>

                                <div className='favorite'>
                                    <div className='favorite-title'>
                                        <h3><b><i className='fa-solid fa-heart'></i> Yêu thích <i className='fa-solid fa-heart'></i></b></h3>
                                    </div>
                                    <div className='favorite-text'>
                                        <p><b>Khách đánh giá đây là một trong những căn phòng được yêu thích nhất trên InnoSpace</b></p>
                                    </div>
                                    <div className='favorite-rating'>
                                        <h3>{Pod.rating}</h3>
                                        {Array.from({ length: Pod.rating }, (_, index) => (
                                            <span key={index} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                        ))}
                                    </div>
                                    <p></p>
                                </div>

                                <h4><b>Tiện nghi có sẵn:</b></h4>
                                {AvailableUTILITIes.map((utility) => (
                                    <li key={utility.id}><i className='fa-solid fa-wifi'></i> {utility.name}: {utility.description}</li>
                                ))}
                                <i class="fa-regular fa-lightbulb"></i>


                                
                                <i class="fa-solid fa-plug"></i>
                                <i class="fa-solid fa-microphone-lines"></i>
                                <i class="fa-solid fa-tv"></i>

                                <i class="fas fa-coffee-maker"></i>
                                <i class="fas fa-coffee"></i>
                                <i class="fa-solid fa-mug-saucer"></i>

                                <i class="fa-regular fa-snowflake"></i>

                                <h4><b>Mô tả về POD:</b></h4>
                                <p>{Pod.description}</p>
                            </div>

                            <div className='payment-card'>
                                <Card>
                                    <Card.Body>

                                        <h4><b>Amount: {Amount > 1000000 ? (Amount / 1000000) + ' triệu đồng' : Amount > 1000 ? (Amount / 1000) + ' ngàn đồng' : Amount + ' đồng'}</b></h4>

                                        <Form className='form-card' onSubmit={handleBooking}>
                                            <Form.Group controlId='BookingDate' className='form-group'>
                                                <Form.Control className='input' type='date' onChange={(e) => {
                                                    const selectedDate = e.target.value;
                                                    setDate(selectedDate);
                                                    console.log(selectedDate);
                                                }} required />
                                            </Form.Group>

                                            <Form.Group controlId='BookingSlot' className='form-group'>
                                                {AvailableSLOTs.map((slot, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            const selectedSlot = AvailableSLOTs.find(s => s.id === slot.id);
                                                            setAmount(prevAmount => prevAmount + (selectedSlot.price * (selectedSlot.selected ? 1 : -1)));
                                                            selectedSlot.selected = !selectedSlot.selected; // Toggle selection
                                                            console.log(selectedSlot.selected ? `Selected: ${slot.id}` : `Deselected: ${slot.id}`);
                                                            setSlotId(prevSlotId => {
                                                                const isSelected = prevSlotId.includes(slot.id);
                                                                if (isSelected) {
                                                                    return prevSlotId.filter(id => id !== slot.id); // Remove if already selected
                                                                } else {
                                                                    return [...prevSlotId, slot.id]; // Add if not selected
                                                                }
                                                            });
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: slot.selected ? '#d3f9d8' : '#fff',
                                                            padding: '10px',
                                                            margin: '5px 0',
                                                            border: slot.selected ? '1px solid #d3f9d8' : '1px solid #ccc',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00 (${slot.price / 1000}.000đ)`}
                                                    </div>
                                                ))}
                                            </Form.Group>

                                            <Form.Group controlId='DateValidation' className='form-group'>
                                                {(() => {
                                                    const selectedDate = new Date(date);
                                                    const currentDate = new Date();
                                                    currentDate.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison

                                                    if (selectedDate < currentDate) {
                                                        return (
                                                            <Form.Text className='text-danger'>
                                                                Please select a date from today onwards.
                                                            </Form.Text>
                                                        );
                                                    } else if (selectedDate > new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)) {
                                                        return (
                                                            <Form.Text className='text-warning'>
                                                                Bookings are only available for the next 30 days.
                                                            </Form.Text>
                                                        );
                                                    }
                                                    return null;
                                                })()}
                                            </Form.Group>

                                            {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length !== 0 && <p>Slot không khả dụng</p>}
                                            {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length === 0 && SlotId.length > 0 && new Date(date) > new Date().setHours(0, 0, 0, 0) && <Button type='submit' className='btn'>SELECT</Button>}

                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <hr />

                        <div className='big-rating'>
                            <h1><b>{Pod.rating}<span style={{ color: 'gold' }}><i className='fa-solid fa-star'></i></span></b></h1>
                            <h4>Được khách hàng yêu thích</h4>
                            <p>Một trong căn phòng nhà được yêu thích nhất trên InnoSpace dựa trên điểm xếp hạng, đánh giá và độ tin cậy</p>
                        </div>

                        <div>
                            <h3>Bookings for this Pod:</h3>
                            {BOOKINGs && BOOKINGs.filter(booking => booking.podId === Pod.id).map((booking, index) => (
                                <div key={index} style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    margin: '10px 0'
                                }}>
                                    <p><strong>Date:</strong> {booking.date}</p>
                                    <p><strong>Date:</strong> {booking.date.substring(0, 10)}</p>
                                    <p><strong>Date:</strong> {date}</p>
                                    <p><strong>Status:</strong> {booking.status}</p>
                                    <p><strong>Feedback:</strong> {booking.feedback || 'No feedback yet'}</p>
                                </div>
                            ))}
                        </div>

                    </>
                ) : (
                    <p>Pod not found.</p>
                )}


                {/*
                [Store] (Id, Name, Address, Contact, Status)
                [Pod] (Id, Name, Image, Description, Rating, Status, TypeId, StoreId)
                [Type] (Id, Name, Capacity)
                [Utility] (Id, Name, Image, Description)
                [Slot] (Id, Name, StartTime, EndTime, Price, Status, PodId)
                [Booking] (Id, Date, Status, Feedback, PodId, UserId)
                */}

                {IsPopupOpen && date && SlotId && (
                    <div id='popupConfirm' className='overlay'>
                        <div className='popup'>
                            <div className='confirm-information'>

                                <h2><b>{Pod.name}</b></h2>
                                <img src={imagePODs.find(image => image.id === Pod.id)?.image} alt={Pod.name}></img>
                                {/* <img src={Pod.image} alt={Pod.name}></img> */}

                                <h5><b>{thisSTORE ? `${thisSTORE.name}: ${thisSTORE.address}` : 'Store not found'}</b></h5>
                                <p>{thisTYPE ? `${thisTYPE.name} / Sức chứa: ${thisTYPE.capacity} người` : 'Type not found'}</p>

                                <h5><b>Ngày nhận phòng: {date}</b></h5>
                                <p>Giờ nhận phòng: </p>
                                {thisSLOT && thisSLOT.map(slot => (
                                    <p key={slot.id}>{`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00 (${slot.price / 1000}.000đ)`}</p>
                                ))}

                                <div className='button-confirm-amount'>
                                    <h2><b>Amount: {Amount / 1000}.000đ</b></h2>
                                    <Button type='submit' className='btn' onClick={handleConfirm}>CONFIRM</Button>
                                </div>

                                <a className='close' href='#' onClick={() => { setIsPopupOpen(false); setIsQROpen(false); }}>&times;</a>
                            </div>
                            <div className='payment-qrcode'>
                                <h1><b>Payment</b></h1>
                                {IsQROpen && (
                                    <img src={QRcode} alt='QRcode'></img>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

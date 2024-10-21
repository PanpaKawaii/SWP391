import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './AboutContent.css'

import adminhome from '../BackgroundImage/adminhome.jpg'
import location from '../BackgroundImage/location.jpg'
import building from '../BackgroundImage/building.jpg'
import videoSrc from '../BackgroundImage/VIDEO.mp4';

export default function AboutContent() {
    return (
        <div className='POD-about'>

            {/* <div className='video-container'>
                <video className='fit' autoPlay muted loop>
                    <source src={videoSrc} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
            </div> */}

            <div className='video-container'>
                <h1><b>Nơi làm việc lý tưởng cho sự sáng tạo và hiệu quả</b></h1>
                <p><i>Tự hào mang đến cho bạn giải pháp tối ưu để làm việc tại bất kỳ đâu, với không gian linh hoạt và dịch vụ chất lượng cao.</i></p>
                <video className='fit' autoPlay muted loop>
                    <source src={videoSrc} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className='about-container'>

                <div className='introduction-container'>
                    <div className='introduction-solution'>
                        <h1><b>Giải pháp tất cả trong một</b></h1>
                        <h5>Với InnoSpace, bạn sẽ có tất cả những gì bạn cần để quản lý nơi làm việc hỗn hợp của mình tại một nơi.</h5>
                        <img src={adminhome} alt='adminhome' />
                    </div>

                    <div className='introduction-convenient'>
                        <div className='convenient-item'>
                            <h3><i className='fa-regular fa-circle-check' style={{ color: '#53737e' }}></i> <b>Bàn làm việc linh hoạt</b></h3>
                            <p>Đơn giản hóa việc đặt bàn cho không gian làm việc linh hoạt và hợp tác.</p>
                        </div>
                        <div>
                            <h3><i className='fa-regular fa-circle-check' style={{ color: '#83999f' }}></i> <b>Đặt phòng họp</b></h3>
                            <p>Xem và đặt phòng có sẵn khi lên lịch họp nhóm.</p>
                        </div>
                        <div>
                            <h3><i className='fa-regular fa-circle-check' style={{ color: '#53737e' }}></i> <b>Thông tin văn phòng</b></h3>
                            <p>Nhận dữ liệu thời gian thực về việc sử dụng không gian làm việc, tình trạng sử dụng và nhiều hơn nữa.</p>
                        </div>
                        <div>
                            <h3><i className='fa-regular fa-circle-check' style={{ color: '#83999f' }}></i> <b>Quản lý khách</b></h3>
                            <p>Tối ưu hóa quy trình đăng ký cho khách với nền tảng kỹ thuật số.</p>
                        </div>
                        <div>
                            <h3><i className='fa-regular fa-circle-check' style={{ color: '#53737e' }}></i> <b>Quản lý chính sách</b></h3>
                            <p>Xác định, tùy chỉnh và triển khai chính sách làm việc kết hợp một cách dễ dàng.</p>
                        </div>
                        <div>
                            <h3><i className='fa-regular fa-circle-check' style={{ color: '#83999f' }}></i> <b>Quản lý nghỉ phép</b></h3>
                            <p>Quản lý yêu cầu nghỉ phép và phê duyệt của nhân viên một cách dễ dàng.</p>
                        </div>
                    </div>

                </div>

                <div>
                    <h1><b>Vì sao chọn InnoSpace</b></h1>
                    <div className='reason-container'>
                        <img src={location} alt='location' />
                        <div>
                            <div className='reason-item'>
                                <h4><b>Không gian làm việc đa dạng: </b></h4>
                                <p>Đáp ứng nhu cầu đa dạng từ các sinh viên, freelancer đến doanh nghiệp nhỏ, với lựa chọn đa dạng từ phòng làm việc cá nhân đến không gian làm việc nhóm.</p>
                            </div>
                            <div className='reason-item'>
                                <h4><b>Quản lý đặt chỗ thông minh: </b></h4>
                                <p>Giao diện thân thiện, cho phép bạn dễ dàng tìm kiếm và đặt chỗ theo nhu cầu, thời gian và ngân sách.</p>
                            </div>
                            <div className='reason-item'>
                                <h4><b>Dịch vụ toàn diện: </b></h4>
                                <p>Hỗ trợ quản lý lịch làm việc, thanh toán trực tuyến và cung cấp các gói dịch vụ linh hoạt kèm các tiện ích.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='community-container'>
                    <div className='community-text'>
                        <h1><b>Cộng đồng và kết nối</b></h1>
                        <p>InnoSpace không chỉ đơn thuần là một nền tảng đặt chỗ làm việc, mà còn là một cộng đồng sáng tạo, năng động và đầy cảm hứng. Với mục tiêu kết nối những cá nhân và doanh nghiệp có chung niềm đam mê phát triển, chúng tôi không chỉ cung cấp một không gian hiện đại với đầy đủ tiện nghi, mà còn tạo ra một môi trường thân thiện, nơi mọi người có thể dễ dàng giao lưu, chia sẻ kiến thức và kinh nghiệm.</p>
                        <p>Chúng tôi hiểu rằng việc làm việc một mình đôi khi có thể hạn chế sự sáng tạo và hiệu quả, vì thế InnoSpace không chỉ là nơi để bạn đến làm việc, mà còn là nơi bạn có thể gặp gỡ những con người cùng chung chí hướng, cùng nhau phát triển và khám phá những cơ hội mới. Những thành viên của cộng đồng chúng tôi không chỉ là những người làm việc độc lập, mà còn là các startup, doanh nghiệp nhỏ và những nhóm dự án đang cố gắng biến ý tưởng của mình thành hiện thực.</p>
                        <p>Bên cạnh việc cung cấp các dịch vụ đặt chỗ linh hoạt, chúng tôi còn tổ chức các sự kiện thường xuyên, từ hội thảo, hội nghị cho đến những buổi gặp gỡ không chính thức, nhằm tạo cơ hội cho các thành viên kết nối và học hỏi từ nhau. Đây là nơi mà sự sáng tạo không bị giới hạn bởi không gian hay thời gian, mà thay vào đó là một cộng đồng luôn sẵn lòng hỗ trợ lẫn nhau trong hành trình phát triển.</p>
                        <p>Tại InnoSpace, chúng tôi tin rằng sự thành công của mỗi cá nhân và doanh nghiệp không chỉ phụ thuộc vào ý tưởng mà còn dựa vào sức mạnh của cộng đồng và sự hợp tác. Vì vậy, chúng tôi luôn cam kết mang đến một môi trường làm việc hiệu quả, nơi mà không chỉ công việc được thực hiện mà còn là nơi mà những giấc mơ lớn được nuôi dưỡng và phát triển cùng nhau.</p>
                    </div>
                    <img className='building-img' src={building} alt='location' />
                </div>
            </div>

            <div className='ready-container'>
                <div className='ready-text'>
                    <h3><b>Bạn đã sẵn sàng để cách mạng hóa nơi làm việc của mình với InnoSpace chưa?</b></h3>
                    <h5>Hãy đón nhận tương lai làm việc cùng InnoSpace và khai phá toàn bộ tiềm năng của bạn.</h5>
                </div>
                <div className='booking-button'>
                    <Link to={`../booking/pod`}>
                        <Button className='btn'>HÃY TRẢI NGHIỆM NÀO!</Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

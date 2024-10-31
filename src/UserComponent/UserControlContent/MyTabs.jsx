import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

function MyTabs() {
    return (
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3" style={{ height: 'auto' }}>
            <Tab eventKey="home" title="Home">
                <p>Đây là nội dung của tab Home.</p>
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <p>Đây là nội dung của tab Profile.</p>
            </Tab>
            <Tab eventKey="contact" title="Contact">
                <p>Đây là nội dung của tab Contact.</p>
            </Tab>
        </Tabs>
    );
}

export default MyTabs;

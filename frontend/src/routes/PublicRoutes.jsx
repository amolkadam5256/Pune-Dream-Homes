// src/routes/PublicRoutes.jsx
import { Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/public/Home';
import PDH_Prime from '../pages/public/PDH_Prime';
import SalesEnquiry from '../pages/public/help/SalesEnquiry';
import ChatWithUs from '../pages/public/help/ChatWithUs';
import HelpCenter from '../pages/public/help/HelpCenter';
import Ready_to_move from '../pages/public/buy/ready_to_move';

function PublicRoutes() {
    return (
        <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="mb-prime" element={<PDH_Prime />} />
            <Route path="help/center" element={<HelpCenter />} />
            <Route path="help/sales-enquiry" element={<SalesEnquiry />} />
            <Route path="help/chat" element={<ChatWithUs />} />
            <Route path="buy/ready-to-move" element={<Ready_to_move />} />
            {/* <Route path="property/:id" element={<PropertyDetails />} /> */}
            {/* <Route path="about" element={<About />} /> */}
            {/* <Route path="contact" element={<Contact />} /> */}
            
        </Route>
    );
}

export default PublicRoutes;
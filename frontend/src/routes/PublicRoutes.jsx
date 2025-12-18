// src/routes/PublicRoutes.jsx
import { Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/public/Home';

function PublicRoutes() {
    return (
        <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="property/:id" element={<PropertyDetails />} /> */}
            {/* <Route path="about" element={<About />} /> */}
            {/* <Route path="contact" element={<Contact />} /> */}
        </Route>
    );
}

export default PublicRoutes;
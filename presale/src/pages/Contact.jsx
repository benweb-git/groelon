import React from 'react';
import { useHomeDetails } from '../hooks/useHomeDetails';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const Contact = () => {
     const homeDetails = useHomeDetails();
    return (
        <>
        <div id='home' className="flex flex-col min-h-screen bg-gray-900 text-white">
          <Header homeDetails={homeDetails}/>
           <>
           <ContactForm/>
           </>
          <Footer homeDetails={homeDetails}/>
        </div>
        </>
    );
};

export default Contact;
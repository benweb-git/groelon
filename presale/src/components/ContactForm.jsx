import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { create_contact,messageClear } from '../store/reducers/contactReducer';

const ContactForm = () => {
    const dispatch = useDispatch()
    const { successMessage, errorMessage } = useSelector(state => state.contact);

     const [stateInfo, setStateInfo] = useState({
            subject: "",
            email: "",
            textMessage: "",
           
          
        })

        const handleState = (e) => {
            setStateInfo({
                ...stateInfo,
                [e.target.name]: e.target.value
            })
        }


         const submitForm = (e) => {
                e.preventDefault()
                if(stateInfo.email&&stateInfo.subject&&stateInfo.textMessage){
                  dispatch(create_contact(stateInfo))
                }else{
                    toast.error("ALL FIELDS ARE REQUIRED"); 
                }
              
        
            }

            useEffect(() => {
                if (successMessage) {
                    toast.success(successMessage);
                    setStateInfo({
                        subject: "",
                        email: "",
                        textMessage: "",   
                    })
                    dispatch(messageClear());
                }
                if (errorMessage) {
                    toast.error(errorMessage); 
                    dispatch(messageClear());
                }
            }, [successMessage, errorMessage, dispatch]);

    return (
      <>
        <section className="bg-gray-900 text-white flex justify-center items-center rounded-lg">
        <div className="py-8 lg:py-16 px-4 mx-auto w-5/6 md:w-3/5 ">
            <h2 className="mb-4 text-xl md:text-3xl tracking-tight font-bold text-center ">Contact Us</h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-200 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need More details About this Presale, Let us know.</p>
            <form onSubmit={submitForm}  className="space-y-8">
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-200">Your email*</label>
                    <input onChange={handleState} value={stateInfo.email}  type="email" name='email' className="shadow-sm bg-transparent border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder:text-gray-200" placeholder="name@mail.com" required/>
                </div>
                <div>
                    <label for="subject" className="block mb-2 text-sm font-medium text-gray-200 dark:text-gray-300">Subject*</label>
                    <input onChange={handleState} value={stateInfo.subject}   type="text" name='subject' className="shadow-sm bg-gray-700 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder:text-gray-200" placeholder="Let us know how we can help you" required/>
                </div>
                <div className="sm:col-span-2">
                    <label for="textMessage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                    <textarea onChange={handleState} value={stateInfo.textMessage}  name='textMessage'  rows="6" className="block p-2.5 w-full text-sm text-gray-200 bg-gray-700 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-200 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a message..."></textarea>
                </div>
                <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-gray-200 bg-gray-800 hover:bg-gray-600 hover:text-gray-100 rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
            </form>
        </div>
        </section>
      </>
    );
};

export default ContactForm;
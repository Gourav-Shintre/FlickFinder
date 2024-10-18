import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    // Include 'to_name' field for the template
    const emailData = {
      ...data,
      to_name: 'FlickFinder Support',  // Set a fixed recipient name or get it from a field
    };

    emailjs.send('service_6imv41g', 'template_ze67z2s', emailData, 'Z-9K9X0cPD_R5vW3t')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success('Your message has been sent successfully!'); 
        reset(); 
      }, (err) => {
        console.log('FAILED...', err);
        toast.error('Failed to send message. Please try again.'); 
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
        <h2 className="text-4xl font-bold dark:text-gray-100">Contact</h2>
        <p className="pt-6 pb-6 text-base max-w-2xl text-center m-auto dark:text-gray-400">
          Want to contact us? Choose an option below and we'll be happy to show you how we can transform your company's web experience.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid md:grid-cols-2 lg:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-8 lg:gap-x-8 lg:gap-y-16">
        <div>
          <h2 className="text-lg font-bold dark:text-gray-100">Contact Us</h2>
          <p className="max-w-sm mt-4 mb-4 dark:text-gray-400">Have something to say? We are here to help. Fill up the form or send an email or call us.</p>
          <div className="flex items-center mt-8 space-x-2 text-dark-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"></path>
            </svg><span>Pune Maharashtra India</span>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
            </svg>
            <a href="mailto:gouravshintre002@gmail.com">gouravshintre002@gmail.com</a>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path>
            </svg>
            <a href="tel:9960843039">+91 9960843039</a>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="checkbox" id="botcheck" className="hidden" style={{ display: 'none' }} name="botcheck" />
            
            {/* From Name Field */}
            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                autoComplete="false"
                name="from_name"
                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 ${errors.name ? 'border-red-500' : 'focus:border-gray-600'} ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0`}
                {...register("from_name", { required: 'Full Name is required' })}
              />
              {errors.from_name && <p className="text-red-500 text-sm">{errors.from_name.message}</p>}
            </div>
            
            {/* Email Field */}
            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">Email Address</label>
              <input
                id="email_address"
                type="email"
                placeholder="Email Address"
                name="user_email"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 ${errors.email ? 'border-red-500' : 'focus:border-gray-600'} ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0`}
                {...register("user_email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.user_email && <p className="text-red-500 text-sm">{errors.user_email.message}</p>}
            </div>

            {/* Message Field */}
            <div className="mb-5">
              <textarea
                name="message"
                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 ${errors.message ? 'border-red-500' : 'focus:border-gray-600'} ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0`}
                placeholder="Your Message"
                {...register("message", { required: "Message is required" })}
                rows="4"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full px-4 py-3 bg-black dark:bg-gray-800 text-white rounded-md focus:ring-4 focus:ring-gray-200 font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;

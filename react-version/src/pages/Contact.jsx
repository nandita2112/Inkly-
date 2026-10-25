import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import FormField from '../components/FormField.jsx';
import useForm from '../hooks/useForm.js';
import { validateContact } from '../utils/validators.js';
import { useToast } from '../context/ToastContext.jsx';

const initialValues = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { show } = useToast();

  // The custom hook handles state, validation and submission.
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validateContact,
    () => {
      setSent(true);
      show('Message sent. We will reply soon.');
    }
  );

  return (
    <>
      <PageHero eyebrow="GET IN TOUCH" title={<>Let’s start a <span>conversation.</span></>}>
        Have an idea, question or feedback? We’d love to hear from you.
      </PageHero>

      <section className="contact-layout">
        <div className="contact-info">
          <small className="eyebrow">CONTACT US</small>
          <h2>We’d love to hear from you.</h2>
          <p>Whether you’re a reader, writer or simply someone with an interesting idea, reach out.</p>
          <div className="contact-item"><b>EMAIL</b><p>hello@inkly.com</p></div>
          <div className="contact-item"><b>LOCATION</b><p>New Delhi, India</p></div>
          <div className="contact-item"><b>COMMUNITY</b><p>Join thousands of curious readers.</p></div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <FormField label="Your Name" name="name" placeholder="Enter your name"
            value={values.name} onChange={handleChange} error={errors.name} />
          <FormField label="Email Address" name="email" type="email" placeholder="Enter your email"
            value={values.email} onChange={handleChange} error={errors.email} />
          <FormField label="Subject" name="subject" placeholder="What can we help with?"
            value={values.subject} onChange={handleChange} error={errors.subject} />
          <FormField label="Your Message" name="message" as="textarea" placeholder="Write your message..."
            value={values.message} onChange={handleChange} error={errors.message} />
          <button type="submit" className="gradient-btn">Send Message →</button>
          {sent && <p className="form-success">Message sent successfully ✓</p>}
        </form>
      </section>

      <section className="cta-band">
        <h2>Have a story to tell?</h2>
        <p>Join Inkly and share it with the world.</p>
      </section>
    </>
  );
}

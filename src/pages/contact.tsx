import { useState } from 'react';
import Head from 'next/head';
import { ContactForm } from '@/models/contact-form';
import { JelaApi } from '@/api/jela-api';

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await JelaApi.submitContactForm(formData); // Use JelaApi to submit form data
      alert('Message sent!');
    } catch (error) {
      alert('Failed to send message.');
    }
  };

  return (
    <>
      <Head>
        <title>Contact Me</title>
      </Head>
      <main>
        <h1>Contact Me</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <label>
            Message:
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </main>
    </>
  );
};

export default ContactPage;

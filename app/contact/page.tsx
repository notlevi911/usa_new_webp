import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Request a quote — United Supply Agency',
  description: 'Tell us the parts, quantities and relay type for your railway signalling relay components order.',
};

export default function ContactPage() {
  return <ContactClient />;
}

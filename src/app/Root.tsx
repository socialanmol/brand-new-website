import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header, { GetStartedModal } from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../pages/whatsappfloat';

export default function Root() {
  const [showModal, setShowModal] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onGetStarted={() => setShowModal(true)} />
      <main style={{ flex: 1 }}>
        <Outlet context={{ openGetStarted: () => setShowModal(true) }} />
      </main>
      <Footer />
      <WhatsAppFloat />
      {showModal && <GetStartedModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

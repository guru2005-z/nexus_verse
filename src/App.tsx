import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { IeeeHub } from './pages/IeeeHub';
import { NexusVerse } from './pages/NexusVerse';
import { Register } from './pages/Register';
import { TicketView } from './pages/TicketView';
import { Certificate } from './pages/Certificate';
import { Admin } from './pages/Admin';
import { LegalPage } from './pages/LegalPage';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Page 1: IEEE Events Hub */}
          <Route path="/" element={<IeeeHub />} />

          {/* Page 2: NEXUS VERSE Event Site */}
          <Route path="/nexus-verse" element={<NexusVerse />} />

          {/* Registration & Payments */}
          <Route path="/nexus-verse/register" element={<Register />} />

          {/* Ticket View */}
          <Route path="/nexus-verse/ticket/:id" element={<TicketView />} />

          {/* Certificate Download & Verification */}
          <Route path="/nexus-verse/certificate" element={<Certificate />} />

          {/* Admin Dashboard */}
          <Route path="/admin" element={<Admin />} />

          {/* Legal Pages for Razorpay Gateway compliance */}
          <Route path="/terms-conditions" element={<LegalPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/refund-policy" element={<LegalPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

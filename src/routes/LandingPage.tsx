// src/routes/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-primary text-white px-4">
      <h1 className="text-5xl font-bold mb-4">ZENTRIX</h1>
      <p className="text-xl mb-8">Plan Smart. Stay Ahead.</p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-white text-navy rounded-lg font-medium hover:opacity-90 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-white text-navy rounded-lg font-medium hover:opacity-90 transition"
        >
          Register
        </Link>
      </div>
    </section>
  );
};

export default LandingPage;

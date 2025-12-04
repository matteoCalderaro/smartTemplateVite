import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import applications from '../data/applications'; // Import data

// Import components
import SuiteCarousel from '../components/SuiteCarousel';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VideoPlayer from '../components/VideoPlayer';
import Form from '../components/Form';
import Footer from '../components/Footer';
import Strengths from '../components/Strengths';
import FounderMessage from '../components/FounderMessage';
import SuiteTitle from '../components/SuiteTitle';

export default function Home({ heroContent, strengthsContent, videoPaths }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>BiSmart - La Suite di Applicazioni Intelligenti</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${router.basePath}/media/favicon.ico`} />
        <style>{`.is-loading { visibility: hidden; }`}</style>
      </Head>

      <Navbar />

      <HeroSection content={heroContent} />

      <main id="main-content">
        <VideoPlayer videos={videoPaths} />
        <Strengths content={strengthsContent} />
        <Form />
        <FounderMessage />
        <SuiteTitle />
        <SuiteCarousel />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export async function getStaticProps() {
  // Find the 'voice-to-insights' application to populate the homepage
  const homeApplication = applications.find(app => app.path === 'voice-to-insights');

  if (!homeApplication) {
    // Fallback or error handling if the main application is not found
    return {
      notFound: true,
    };
  }

  return {
    props: {
      heroContent: homeApplication.heroContent,
      strengthsContent: homeApplication.strengthsContent,
      videoPaths: homeApplication.videoPaths,
    },
  };
}

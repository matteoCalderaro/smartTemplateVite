import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import applications from '../data/applications'; // Import data

// Import components
import SuiteCarousel from '../components/SuiteCarousel';
import HomePageApplications from '../components/HomePageApplications';


import HeroSection from '../components/HeroSection';
import Form from '../components/Form';
import Footer from '../components/Footer';
import Strengths from '../components/Strengths';
import FounderMessage from '../components/FounderMessage';
import IntegrationsSection from '../components/IntegrationsSection';
import SuiteTitle from '../components/SuiteTitle';
import useMediaQuery from '../hooks/useMediaQuery';

export default function Home({ heroContent, strengthsContent, videoPaths }) {
  const router = useRouter();
  const isMobile = useMediaQuery(991);
  return (
    <>
      <Head>
        <title>BiSmart - La Suite di Applicazioni Intelligenti</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${router.basePath}/media/favicon.ico`} />
        <style>{`.is-loading { visibility: hidden; }`}</style>
      </Head>

      <HeroSection content={heroContent} />

      <main id="main-content">
        {isMobile ? <Strengths content={strengthsContent} clickableCards={true} /> : <HomePageApplications /> }
        <IntegrationsSection />
        <Form />
        <FounderMessage />
        <SuiteTitle />
        <SuiteCarousel />
      </main>

      <Footer />

    </>
  );
}

export async function getStaticProps() {
  // Find the 'home' application to populate the homepage
  const homeApplication = applications.find(app => app.path === 'home');

  if (!homeApplication) {
    // Fallback or error handling if the main application is not found
    return {
      notFound: true,
    };
  }

      return {
      props: {
        heroContent: {
          ...homeApplication.heroContent,
          isHome: true,
        },
        strengthsContent: homeApplication.strengthsContent,
        videoPaths: homeApplication.videoPaths,
      },
    };}

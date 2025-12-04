import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import applications from '../data/applications';

// Import components used in index.js for consistent layout
import SuiteCarousel from '../components/SuiteCarousel';


import HeroSection from '../components/HeroSection';
import Form from '../components/Form';
import Footer from '../components/Footer';
import Strengths from '../components/Strengths';
import FounderMessage from '../components/FounderMessage';
import SuiteTitle from '../components/SuiteTitle';
import VideoPlayer from '../components/VideoPlayer';

export default function ApplicationPage({ heroContent, strengthsContent, videoPaths }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`BiSmart - ${heroContent.brand}`}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${router.basePath}/media/favicon.ico`} />
        <style>{`.is-loading { visibility: hidden; }`}</style>
      </Head>



      <HeroSection content={heroContent} />

      <main id="main-content">
        <VideoPlayer videos={videoPaths} />
        <Strengths content={strengthsContent} />
        {/* <Form /> */}
        {/* <FounderMessage /> */}
        <SuiteTitle />
        <SuiteCarousel />
      </main>

      <Footer />

    </>
  );
}


export async function getStaticPaths() {
  const paths = applications
    .filter(app => !app.isHome) // Exclude the home object from dynamic paths
    .map((app) => ({
      params: { path: app.path },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const application = applications.find((app) => app.path === params.path);

  if (!application) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      heroContent: application.heroContent,
      strengthsContent: application.strengthsContent,
      videoPaths: application.videoPaths,
    },
  };
}

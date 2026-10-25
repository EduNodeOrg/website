import React, { Component } from "react";
import "./style.css";
import Hometwo from "./Hometwo";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import NavBar from "../NavBar"
import { Helmet } from "react-helmet-async"
import Footer from "../Footer/Footer"

const title = "EduNode | Learn Blockchain Development & IT Skills Online";
const description = "Learn blockchain development with hands-on Stellar, Web3, Soroban and Ethereum courses — plus IT masterclasses in Python, SQL, AI and cybersecurity.";
const shareUrl = "https://edunode.org/";
const image = "https://edunode.org/en.png";

const siteLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://edunode.org/#organization',
      name: 'EduNode',
      url: 'https://edunode.org/',
      email: 'hi@edunode.org',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://edunode.org/#logo',
        url: 'https://edunode.org/en.png',
        width: 1024,
        height: 1024,
      },
      sameAs: [
        'https://x.com/edunodeorg',
        'https://www.linkedin.com/company/edunodeorg/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://edunode.org/#website',
      url: 'https://edunode.org/',
      name: 'EduNode',
      description: 'Educational platform for becoming a blockchain developer, with courses in Stellar, Web3, Soroban, Ethereum and Hyperledger, plus IT masterclasses.',
      publisher: { '@id': 'https://edunode.org/#organization' },
      inLanguage: 'en',
    },
  ],
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };

  }


  
  render() {
   
    const {  isAuthenticated, isVerified } = this.props.auth
    if (isAuthenticated && !isVerified) {

      return <Navigate to="/VerifyEmail" />
    }
    if (isVerified) {

      return <Navigate to="/dashboard" />
    }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={shareUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={image} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(siteLd)}</script>
      </Helmet>
      <NavBar />


      <Hometwo/>
      <br></br>
      <Footer/>

    </>
  );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Home)

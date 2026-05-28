import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavBar from '../../NavBar';
import zkpimg from './zkp_diagram.png';
import me from '../me.jpg';
import keybase from './keybaseicon.png';
import Typography from '@material-ui/core/Typography';
import {
  FacebookShareCount,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { Helmet } from 'react-helmet-async';
import './style.css';

export default class ZKP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
    };
  }

  render() {
    const shareUrl = 'https://edunode.org/blog/zero-knowledge-proofs';
    const title = 'Zero-Knowledge Proofs on the Stellar Network: The Future of Privacy';

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
          <meta
            name="description"
            content="Explore Zero-Knowledge Proofs on Stellar for enhanced privacy, scalability, and interoperability in financial applications."
          />
        </Helmet>
        <NavBar />

        <img src={zkpimg} className="header-image" alt="Zero-Knowledge Proofs" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
        <Container>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            Zero-Knowledge Proofs on the Stellar Network: The Future of Privacy
          </Typography>

          <Row>
            <Col xs={12} sm={8} className="main-section">
              <p>
                Imagine living in a world where trust, privacy, and efficiency coexist seamlessly. Zero-knowledge proofs (ZK Proofs) make this possible, ensuring that privacy, scalability, and interoperability go hand in hand. By leveraging ZK Proofs on the Stellar Network, we can increase privacy for unbanked people across the globe, enhance scalability for cross-border payment systems, and improve interoperability for cash-to-crypto applications.
              </p>

              <h4>What are zero-knowledge proofs?</h4>
              <p>
                ZK Proofs are a breakthrough in cryptographic technology. They allow one party (the <strong>prover</strong>) to prove to another (the <strong>verifier</strong>) that a statement is true without revealing any information beyond the validity of the statement itself.
              </p>
              <p>
                For example, on the Stellar network, a verifier could ensure that the prover's wallet contains more than X USDC without knowing the exact amount. This technology, researched for over four decades, is now becoming a reality on blockchain networks.
              </p>

              <h4>Key Concepts of ZK Proofs</h4>
              <p>
                The foundation of ZK Proofs rests on three main properties:
                <br />
                <strong>Completeness:</strong> If the statement is true, a prover can convince a verifier.
                <br />
                <strong>Soundness:</strong> A cheating prover cannot convince a verifier of a false statement.
                <br />
                <strong>Zero-Knowledge:</strong> Only the statement's truth is revealed, nothing else.
              </p>

              <h4>Zero-Knowledge Proofs on Stellar</h4>
              <p>
                Stellar aims to surpass other networks by utilizing the full capabilities of modern computing. By placing cryptographic processes into dedicated "slots" within each block, the Stellar core protocol can handle larger volumes of transactions without slowing down. This approach is highly beneficial for validators and operators, especially when handling large volumes of transactions, as it alleviates the typical computational burden.
              </p>

              <h4>Real-World Use Cases</h4>
              <p>
                The integration of ZK Proofs into the Stellar ecosystem opens up several exciting use cases:
              </p>
              <p>
                <strong>1. zkTokens (Confidential Tokens):</strong> These tokens are protected by zero-knowledge proofs to enable private transactions and balances while maintaining public ledger transparency.
                <br />
                <strong>2. zkLogin (Zero-Knowledge Login Systems):</strong> Enables users to prove ownership of a credential without sending any secrets over the wire, replacing traditional passwords and enhancing security.
                <br />
                <strong>3. zkKYC (Selective Disclosure Compliance):</strong> Allows users to complete verification with a trusted provider and selectively disclose aspects of that verification, balancing compliance with privacy.
                <br />
                <strong>4. zkVoting (Zero-Knowledge Voting):</strong> Provides transparency and privacy in governance, ensuring that an individual's vote remains private while the process remains transparent and verifiable.
                <br />
                <strong>5. zkVM (Zero-Knowledge Virtual Machines):</strong> Moving computation off-chain and verifying a proof on-chain, which is more efficient than computing a complete series of transactions on every node.
              </p>

              <h4>Prototyping Privacy Pools</h4>
              <p>
                The Stellar ecosystem is actively exploring Privacy Pools, a protocol that incorporates Association Set Providers (ASPs) to define inclusion criteria intended to mitigate illicit use. This enables participants to selectively associate with sets of other participants who meet their chosen compliance standards, achieving privacy guarantees using cryptographic zero-knowledge techniques.
              </p>
              <p>
                As Stellar continues to evolve, the integration of ZK Proofs will undoubtedly play a crucial role in shaping the future of decentralized finance and blockchain privacy.
              </p>

              <h4>Resources</h4>
              <p>
                [1] Zero-Knowledge Proofs on Stellar{' '}
                <a href="https://stellar.org/learn/zero-knowledge-proof">
                  https://stellar.org/learn/zero-knowledge-proof
                </a>
              </p>
              <p>
                [2] 5 Real-World Zero-Knowledge Use Cases{' '}
                <a href="https://stellar.org/blog/developers/5-real-world-zero-knowledge-use-cases">
                  https://stellar.org/blog/developers/5-real-world-zero-knowledge-use-cases
                </a>
              </p>
              <p>
                [3] Prototyping Privacy Pools on Stellar{' '}
                <a href="https://stellar.org/blog/ecosystem/prototyping-privacy-pools-on-stellar">
                  https://stellar.org/blog/ecosystem/prototyping-privacy-pools-on-stellar
                </a>
              </p>

              <div className="Demo__container">
                <div className="Demo__some-network">
                  <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <div>
                    <FacebookShareCount
                      url={shareUrl}
                      className="Demo__some-network__share-count"
                    >
                      {(count) => count}
                    </FacebookShareCount>
                  </div>
                </div>

                <div className="Demo__some-network">
                  <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <div className="Demo__some-network__share-count">&nbsp;</div>
                </div>

                <div className="Demo__some-network">
                  <LinkedinShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </div>
            </Col>

            <Col xs={12} sm={4} className="sidebar-section">
              <Card style={{ width: '9rem' }}>
                <Card.Img variant="top" src={me} />
                <Card.Body>
                  <Card.Title>Olvis Gil</Card.Title>
                  <Card.Text>
                    <p>
                      Founder at <a href="https://www.mozartpay.com/">mozartpay.com</a> and <a href="https://edunode.org/">edunode.org</a>
                    </p>
                  </Card.Text>
                  <a href="https://keybase.io/olvis_experio">
                    <img style={{ width: '25px' }} src={keybase} alt="keybase" />
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

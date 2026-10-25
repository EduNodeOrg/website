import React, { Component } from "react";
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { clearErrors } from "../../actions/errorActions";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../NavBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { GLOSSARY_TERMS, slugify } from './terms';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
});

const GlassAccordion = styled(Accordion)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px !important',
  color: '#b8c5d6',
  marginBottom: '12px',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#00d4ff',
  },
  '& .MuiAccordionSummary-content .MuiTypography-root': {
    color: '#ffffff',
    fontWeight: 600,
  },
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));

// DefinedTermSet structured data — lets search engines and AI answer
// engines parse every term definition directly.
const glossaryLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'EduNode Web3 & Blockchain Glossary',
  url: 'https://edunode.org/glossary',
  description:
    'A glossary of popular Web3, blockchain, and Stellar terms — from smart contracts and DeFi to Soroban, Horizon, and the Stellar Consensus Protocol.',
  hasDefinedTerm: GLOSSARY_TERMS.map(({ term, definition }) => ({
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    url: `https://edunode.org/glossary/${slugify(term)}`,
  })),
};

class Glossary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : 'anonymous',
          showAddGlossary: false,
          newWord: '',
          newDefinition: '',
          search: '',
          expanded: typeof window !== 'undefined' && window.location.hash
            ? window.location.hash.slice(1)
            : null,
        };
      }

      handleAddGlossaryClick = () => {
        this.setState({ showAddGlossary: true });
      };

      handleWordChange = (event) => {
        this.setState({ newWord: event.target.value });
      };

      handleDefinitionChange = (event) => {
        this.setState({ newDefinition: event.target.value });
      };

      handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
      };

      handleAccordionChange = (slug) => (_event, isExpanded) => {
        this.setState({ expanded: isExpanded ? slug : null });
      };

      handleSubmit = () => {
        const { email, newWord, newDefinition } = this.state;

        // Validate the inputs
        if (!email || !newWord || !newDefinition) {
          return;
        }

        // Create the request body
        const requestBody = {
          email,
          word: newWord,
          definition: newDefinition,
        };

        // Send a POST request to store the glossary entry
        fetch('https://edunode.herokuapp.com/api/glossary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => response.json())
          .then(() => {
            // Clear the input fields and hide the add glossary form
            this.setState({ newWord: '', newDefinition: '', showAddGlossary: false });
          })
          .catch((error) => {
            console.error('Error storing glossary entry:', error);
          });
      };

    render() {
        const { showAddGlossary, newWord, newDefinition, search, expanded } = this.state;
        const query = search.trim().toLowerCase();
        const filteredTerms = GLOSSARY_TERMS
          .filter(({ term, definition }) =>
            !query ||
            term.toLowerCase().includes(query) ||
            definition.toLowerCase().includes(query)
          )
          .sort((a, b) => a.term.localeCompare(b.term));

        const letters = [...new Set(filteredTerms.map(({ term }) => term[0].toUpperCase()))];
        let lastLetter = null;

        return (
            <>
            <Helmet>
              <meta charSet="utf-8" />
              <title>Web3 & Blockchain Glossary | EduNode</title>
              <link rel="canonical" href="https://edunode.org/glossary" />
              <meta
                name="description"
                content="A glossary of popular Web3, blockchain, and Stellar terms — from smart contracts and DeFi to Soroban, Horizon, and the Stellar Consensus Protocol."
              />
              <meta property="og:type" content="website" />
              <meta property="og:title" content="Web3 & Blockchain Glossary | EduNode" />
              <meta
                property="og:description"
                content="Clear definitions of Web3, blockchain, and Stellar terms — smart contracts, DeFi, Soroban, trustlines, and more."
              />
              <meta property="og:url" content="https://edunode.org/glossary" />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:title" content="Web3 & Blockchain Glossary | EduNode" />
              <meta
                name="twitter:description"
                content="Clear definitions of Web3, blockchain, and Stellar terms — smart contracts, DeFi, Soroban, trustlines, and more."
              />
              <script type="application/ld+json">{JSON.stringify(glossaryLd)}</script>
            </Helmet>
            <NavBar />
            <PageContainer>
              <main>
                <Box sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
                  <Container maxWidth="sm">
                    <SectionTitle variant="h3" component="h1">
                      Web3 & Blockchain Glossary
                    </SectionTitle>
                    <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 2 }}>
                      Plain-language definitions of popular Web3, blockchain, and Stellar
                      ecosystem terms — each linked to deeper EduNode courses and articles.
                    </Typography>
                  </Container>
                </Box>
                <Container sx={{ pb: 8 }} maxWidth="md">
                  <TextField
                    fullWidth
                    placeholder="Search terms..."
                    value={search}
                    onChange={this.handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#00d4ff' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: '#00d4ff' },
                        '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                      },
                      '& .MuiInputBase-input::placeholder': { color: '#b8c5d6', opacity: 1 },
                    }}
                  />

                  <Box
                    component="nav"
                    aria-label="Jump to letter"
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}
                  >
                    {letters.map((letter) => (
                      <Box
                        component="a"
                        key={letter}
                        href={`#letter-${letter}`}
                        sx={{
                          color: '#00d4ff',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          px: 1,
                          py: 0.25,
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          '&:hover': { borderColor: '#00d4ff' },
                        }}
                      >
                        {letter}
                      </Box>
                    ))}
                  </Box>

                  <Typography sx={{ color: '#b8c5d6', mb: 2 }}>
                    {filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'}
                  </Typography>

                  {filteredTerms.map(({ term, definition, links }, index) => {
                    const slug = slugify(term);
                    const letter = term[0].toUpperCase();
                    const letterMarker =
                      letter !== lastLetter ? ((lastLetter = letter), letter) : null;
                    return (
                      <React.Fragment key={term}>
                        {letterMarker && (
                          <Box
                            id={`letter-${letterMarker}`}
                            component="h2"
                            sx={{
                              color: '#00d4ff',
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              letterSpacing: '2px',
                              mt: index === 0 ? 0 : 3,
                              mb: 1.5,
                              scrollMarginTop: '100px',
                            }}
                          >
                            {letterMarker}
                          </Box>
                        )}
                        <GlassAccordion
                          id={slug}
                          expanded={expanded === slug}
                          onChange={this.handleAccordionChange(slug)}
                          sx={{ scrollMarginTop: '100px' }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`glossary-panel-${index}-content`}
                            id={`glossary-panel-${index}-header`}
                          >
                            <Typography>{term}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography component="div">
                              {definition}{' '}
                              <Box
                                component="a"
                                href={`/glossary/${slug}`}
                                sx={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                              >
                                Learn more →
                              </Box>
                              {links && links.length > 0 && (
                                <Box component="span" sx={{ display: 'block', mt: 1 }}>
                                  {links.map((link) => (
                                    <Box
                                      component="a"
                                      key={link.href}
                                      href={link.href}
                                      sx={{
                                        color: '#00d4ff',
                                        textDecoration: 'none',
                                        mr: 2,
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        '&:hover': { textDecoration: 'underline' },
                                      }}
                                    >
                                      {link.label} →
                                    </Box>
                                  ))}
                                </Box>
                              )}
                            </Typography>
                          </AccordionDetails>
                        </GlassAccordion>
                      </React.Fragment>
                    );
                  })}

                  <Box sx={{ mt: 6, textAlign: 'center' }}>
                    {showAddGlossary ? (
                      <Box
                        sx={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          p: 3,
                          textAlign: 'left',
                        }}
                      >
                        <TextField
                          fullWidth
                          placeholder="Enter word"
                          value={newWord}
                          onChange={this.handleWordChange}
                          sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#ffffff',
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00d4ff' },
                              '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                            },
                            '& .MuiInputBase-input::placeholder': { color: '#b8c5d6', opacity: 1 },
                          }}
                        />
                        <TextField
                          fullWidth
                          placeholder="Enter definition"
                          value={newDefinition}
                          onChange={this.handleDefinitionChange}
                          sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#ffffff',
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00d4ff' },
                              '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                            },
                            '& .MuiInputBase-input::placeholder': { color: '#b8c5d6', opacity: 1 },
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={this.handleSubmit}
                          sx={{
                            background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '25px',
                            px: 4,
                            '&:hover': {
                              background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={this.handleAddGlossaryClick}
                        sx={{
                          background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '25px',
                          px: 4,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                          },
                        }}
                      >
                        Add your own Glossary term
                      </Button>
                    )}
                  </Box>
                </Container>
              </main>
            </PageContainer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth
})

Glossary = connect(
    mapStateToProps
)(Glossary)

export default Glossary = reduxForm({
    form: "postReduxForm",
    clearErrors,
})(Glossary)

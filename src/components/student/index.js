import React from 'react';
import NavBar from "../NavBar"
import Footer from '../Footer/Footer';
import { Box, Typography, Paper, Container } from '@mui/material';
import PageMeta from '../PageMeta';

class StudentsPage extends React.Component {
  render() {
    return (
      <>
      <PageMeta
        title="For Students — Learn IT, Coding & Blockchain | EduNode"
        description="A student's guide to EduNode: self-paced IT, coding, AI and blockchain courses with free starter lessons, hands-on projects, and verifiable certificates."
        path="/for-students"
      />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)', pb: 8 }}>
      <NavBar />
      <Box mt={4}> {/* For margin top */}
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, background: 'rgba(26, 31, 58, 0.85)', border: '1px solid rgba(123, 47, 247, 0.3)' }}>
            <Typography variant="h3" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
            Harnessing EduNode for Students: A Complete Guide
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            Welcome, students! We understand that each of you has unique learning goals and preferences. That's why we've crafted this guide to help you leverage the benefits of EduNode, a learning platform focused on practical technology skills. Here's how you can use EduNode to optimize your learning journey:
            </Typography>

            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              1. Focused, Technical Learning Opportunities
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            EduNode offers 33 certified tracks across coding &amp; data (Python, SQL, JavaScript, Rust, Git), IT, cloud &amp; security, AI assistants &amp; automation, and blockchain, DLT &amp; crypto (Bitcoin, Ethereum, Stellar, rollups, smart contract auditing). The first two lessons of every masterclass are free — no account needed.
            </Typography>

            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              2. Learn at Your Own Pace
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            EduNode lessons are written, self-paced walkthroughs — read fast or slow, re-read the hard parts, and take notes as you go. There are no video lectures to pause or rewind: every lesson includes worked examples, an exercise with a suggested solution, and a knowledge check.
            </Typography>
            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              3. Interactive and Engaging Content
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            Courses are built around doing: coding challenges, quizzes, real-life project assignments, and community journals. This not only helps you grasp complex concepts but also enables you to apply what you've learned.
            </Typography>
            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              4. Practitioner-Authored Curriculum
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            Every course is written and reviewed by Olvis E. Gil Rios — founder of EduNode and OG Technologies EU, a Vienna blockchain, payments and cybersecurity consultancy — and updated when the underlying technology changes. Community journals let you learn from other builders' perspectives too.
            </Typography>

            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              5. Skill Development and Portfolio Building
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            Every track ends with a real project you can show — a reporting pipeline, a deployed app, a smart contract audit — plus a verifiable certificate of completion. These stand out in college applications, internships, and job searches.
            </Typography>
            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              6. Tools and Resources
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            <p>Here you can find some tools that you can leverage:</p>
           <p>Certified course catalog: <a href="https://edunode.org/certified-courses" style={{ color: '#00d4ff' }}>https://edunode.org/certified-courses</a> </p>
           <p>All courses: <a href="https://edunode.org/courses" style={{ color: '#00d4ff' }}>https://edunode.org/courses</a> </p>
           <p>Guides and articles: <a href="https://edunode.org/blog" style={{ color: '#00d4ff' }}>https://edunode.org/blog</a> </p>
           <p>Web3 glossary: <a href="https://edunode.org/glossary" style={{ color: '#00d4ff' }}>https://edunode.org/glossary</a> </p>
            </Typography>
            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              7. Track Your Progress
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            EduNode's built-in tracking tools let you monitor your lesson completions, identify areas of improvement, and adapt your study strategies accordingly. This helps you stay focused, motivated, and on the path to reaching your learning goals.

To get started, pick a masterclass and try the first two lessons free — no signup required. If you want the full tracks and certificates, Pro unlocks everything for €6.99 per month.

Learning is a lifelong journey, and with EduNode, you get to navigate this journey on your own terms. Embrace the opportunities, engage with the community, and most importantly, enjoy the process! Your educational adventure awaits on EduNode.
            </Typography>
          </Paper>
        </Container>
      </Box>
      </Box>
      <Footer />
    </>
    );
  }
}

export default StudentsPage;
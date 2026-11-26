import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import NavBar from "../NavBar"
import Footer from '../Footer/Footer';
import PageMeta from "../PageMeta";

function EduNodeGuide() {
  return (
    <>
      <PageMeta
        title="For Teachers — Tech Curriculum for Your Classroom | EduNode"
        description="Teach IT, coding, AI and blockchain with EduNode: ready-made expert curriculum, student progress tracking, and verifiable certificates for educators."
        path="/for-teachers"
      />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)', pb: 8 }}>
      <NavBar />
      <Box mt={4}> {/* For margin top */}
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, background: 'rgba(26, 31, 58, 0.85)', border: '1px solid rgba(123, 47, 247, 0.3)' }}>
            <Typography variant="h3" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
              Leveraging EduNode for Educators: A Comprehensive Guide
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
              Welcome teachers! We understand that navigating a new educational platform might seem daunting, so we've put together a comprehensive guide to help you effectively utilize EduNode. EduNode is a revolutionary platform that enables teachers like yourself to connect with students across the globe, expand your teaching resources, and achieve your pedagogical goals.
            </Typography>

            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              1. Expanding Your Reach
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
              With EduNode, you have the unique opportunity to extend your teaching beyond the four walls of a classroom. You can create and publish online courses, reaching students from different regions and backgrounds. This way, you are not only contributing to making education more accessible, but you're also expanding your influence as an educator.
            </Typography>

            {/* Add other sections here */}

            
            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              2. Tools and Resources
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
           <p>Here you can find some tools that you can leverage:</p>  
           <p>Here you can create a new course: <a style={{ color: '#00d4ff' }} href="https://edunode.org/course">https://edunode.org/course</a> </p> 
           <p>Here you can create a new post: <a style={{ color: '#00d4ff' }} href="https://edunode.org/post">https://edunode.org/post</a> </p> 
           Additionally, feel free to use our Chat Feature if you need support creating new courses: <a style={{ color: '#00d4ff' }} href="https://edunode.org/chat">https://edunode.org/chat</a>

            </Typography>
            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              3.  Interactive Teaching
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            EduNode offers a variety of tools that can make your lessons interactive and engaging. You can use multimedia content, quizzes, discussion forums, and real-time feedback options to facilitate active learning. These tools can help maintain student interest and cater to different learning styles.
            </Typography>
            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              4.  Personalized Learning Paths
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            Understanding that each student is unique, EduNode allows you to customize your courses to meet the specific needs and pace of individual learners. You can easily adjust the difficulty level, change the course content, and provide personalized feedback. This way, you're able to ensure that all your students are on track and fully engaged.
            </Typography>

            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              5.  Collaborating with Other Educators
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            EduNode is not just a platform for you and your students; it's also a community of educators. You can collaborate with teachers from all over the world, sharing experiences, strategies, and resources. This can help enrich your teaching practices and expose you to a diversity of pedagogical approaches.
            </Typography>

            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              6.  Enhancing Your Professional Development
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
            EduNode provides a wealth of resources and courses dedicated to teachers' professional development. You can learn about the latest educational research, pedagogical strategies, and technological tools. By continuously learning and growing, you can enhance your teaching effectiveness and career advancement.
            </Typography>


            <Typography variant="h5" gutterBottom mt={4} sx={{ color: '#fff' }}>
              7. Easy Tracking and Assessment
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
              EduNode provides robust tracking and assessment tools. You can easily monitor students' progress, identify areas where they're struggling, and adjust your teaching accordingly. EduNode's analytical tools also provide insights into the effectiveness of your teaching methods and course materials, helping you continually improve your practice.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
              To get started, sign up on the EduNode platform, set up your profile, and familiarize yourself with its features. There's also a detailed help section and a responsive customer support team if you need assistance.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#b8c5d6' }}>
              Remember, teaching is a journey. As you embrace EduNode, you're embarking on a new adventure to reshape and enhance how you connect with and inspire your students. Enjoy the journey!
            </Typography>
          </Paper>
        </Container>
      </Box>
      </Box>
      <Footer />
    </>
  );
}

export default EduNodeGuide;


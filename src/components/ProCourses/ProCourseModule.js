import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import solidity from 'react-syntax-highlighter/dist/esm/languages/prism/solidity';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { getCourse } from './data';
import { hasProAccess } from './membership';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('solidity', solidity);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);

const PageContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(6),
}));

const LessonCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.8)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const QuizCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.8)',
  border: '1px solid rgba(0, 212, 255, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(4),
}));

function LessonBlock({ block }) {
  switch (block.type) {
    case 'heading':
      return (
        <Typography variant="h5" sx={{ color: '#00d4ff', fontWeight: 'bold', mt: 3, mb: 1.5 }}>
          {block.text}
        </Typography>
      );
    case 'paragraph':
      return (
        <Typography variant="body1" sx={{ color: '#d5deeb', lineHeight: 1.8, mb: 2 }}>
          {block.text}
        </Typography>
      );
    case 'list':
      return (
        <Box component="ul" sx={{ color: '#d5deeb', pl: 3, mb: 2 }}>
          {block.items.map((item, i) => (
            <Typography component="li" variant="body1" key={i} sx={{ mb: 0.75, lineHeight: 1.7 }}>
              {item}
            </Typography>
          ))}
        </Box>
      );
    case 'code':
      return (
        <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden' }}>
          <SyntaxHighlighter
            language={block.language || 'javascript'}
            style={oneDark}
            customStyle={{ margin: 0, fontSize: '0.85rem' }}
          >
            {block.code}
          </SyntaxHighlighter>
        </Box>
      );
    case 'callout':
      return (
        <Alert
          severity="info"
          sx={{
            mb: 2,
            background: 'rgba(123, 47, 247, 0.15)',
            border: '1px solid rgba(123, 47, 247, 0.4)',
            color: '#d5deeb',
            '& .MuiAlert-icon': { color: '#00d4ff' },
          }}
        >
          {block.text}
        </Alert>
      );
    default:
      return null;
  }
}

function Quiz({ quiz, onPass }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const allAnswered = quiz.every((_, i) => answers[i] !== undefined);
  const allCorrect = quiz.every((q, i) => answers[i] === q.correctIndex);

  const handleCheck = () => {
    if (!allAnswered) {
      alert('Please answer all questions.');
      return;
    }
    setChecked(true);
  };

  return (
    <Box>
      {quiz.map((q, qi) => {
        const isCorrect = checked && answers[qi] === q.correctIndex;
        const isWrong = checked && answers[qi] !== q.correctIndex;
        return (
          <Box key={qi} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
              {qi + 1}. {q.question}
            </Typography>
            <RadioGroup
              value={answers[qi] !== undefined ? answers[qi] : ''}
              onChange={(e) => {
                setAnswers({ ...answers, [qi]: Number(e.target.value) });
                setChecked(false);
              }}
            >
              {q.options.map((opt, oi) => (
                <FormControlLabel
                  key={oi}
                  value={oi}
                  control={
                    <Radio
                      sx={{
                        color: '#7b2ff7',
                        '&.Mui-checked': { color: '#00d4ff' },
                      }}
                    />
                  }
                  label={opt}
                  sx={{
                    color:
                      checked && oi === q.correctIndex
                        ? '#00ff88'
                        : isWrong && answers[qi] === oi
                        ? '#ff6666'
                        : '#b8c5d6',
                  }}
                />
              ))}
            </RadioGroup>
            {checked && q.explanation && (
              <Alert
                severity={isCorrect ? 'success' : 'warning'}
                sx={{
                  mt: 1,
                  background: isCorrect ? 'rgba(0, 200, 100, 0.1)' : 'rgba(255, 170, 0, 0.1)',
                  color: '#d5deeb',
                  '& .MuiAlert-icon': { color: isCorrect ? '#00ff88' : '#ffaa00' },
                }}
              >
                {q.explanation}
              </Alert>
            )}
          </Box>
        );
      })}

      {!allCorrect || !checked ? (
        <Button
          variant="contained"
          onClick={handleCheck}
          sx={{
            background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Check answers
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onPass}
          sx={{
            background: 'linear-gradient(45deg, #00cc66, #00ff88)',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Continue
        </Button>
      )}
    </Box>
  );
}

function UpgradePanel({ course }) {
  const navigate = useNavigate();
  return (
    <LessonCard sx={{ textAlign: 'center', py: 6 }}>
      <LockIcon sx={{ fontSize: 48, color: '#7b2ff7', mb: 2 }} />
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
        {course.title} is a Pro course
      </Typography>
      <Typography variant="body1" sx={{ color: '#b8c5d6', mb: 3, maxWidth: 480, mx: 'auto' }}>
        This course is included with EduNode Pro (€6.99/mo) along with NFT certificates,
        advanced course materials, and priority support.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/pricing')}
        sx={{
          background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
          color: '#fff',
          fontWeight: 'bold',
          px: 4,
        }}
      >
        Upgrade to Pro
      </Button>
    </LessonCard>
  );
}

function ProCourseModule({ courseId, auth }) {
  const { step } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseId);

  if (!course) {
    return <Typography sx={{ color: '#fff', p: 4 }}>Course not found.</Typography>;
  }

  const stepIndex = Number(step) - 1;
  const module = course.modules[stepIndex];
  if (!module || Number.isNaN(stepIndex)) {
    return <Navigate to={`/courses/${course.id}`} replace />;
  }

  if (!auth || !auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isPro = hasProAccess(auth.user);
  const locked = course.proOnly && !isPro;
  const progress = Math.round(((stepIndex + 1) / course.modules.length) * 100);
  const isLast = stepIndex === course.modules.length - 1;

  const handlePass = () => {
    navigate(isLast ? `/courses/${course.id}/done` : `/courses/${course.id}/${stepIndex + 2}`);
  };

  return (
    <PageContainer>
      <Helmet>
        <title>{`${module.title} | ${course.title} | EduNode`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <NavBar />
      <ContentContainer maxWidth="md">
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: '#8fa3bf' }}>
            {course.title} — Module {stepIndex + 1} of {course.modules.length}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              mt: 1,
              backgroundColor: 'rgba(123, 47, 247, 0.2)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
              },
            }}
          />
        </Box>

        {locked ? (
          <UpgradePanel course={course} />
        ) : (
          <>
            <LessonCard elevation={0}>
              <Chip
                label={`Module ${stepIndex + 1}`}
                size="small"
                sx={{
                  background: 'rgba(123, 47, 247, 0.3)',
                  color: '#00d4ff',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              />
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 2 }}>
                {module.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#8fa3bf', mb: 3 }}>
                {module.summary}
              </Typography>
              {module.lessons.map((block, i) => (
                <LessonBlock key={i} block={block} />
              ))}
            </LessonCard>

            <QuizCard elevation={0}>
              <Typography variant="h5" sx={{ color: '#00d4ff', fontWeight: 'bold', mb: 3 }}>
                Knowledge check
              </Typography>
              <Quiz key={`${course.id}-${step}`} quiz={module.quiz} onPass={handlePass} />
            </QuizCard>
          </>
        )}
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProCourseModule);

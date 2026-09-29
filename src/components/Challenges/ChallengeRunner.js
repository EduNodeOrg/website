import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CodeMirror from '@uiw/react-codemirror';
import { rust } from '@codemirror/lang-rust';
import './gameChallenge/styles.css';

const highlightText = (text) => {
  const regex = /\*\*(.*?)\*\*/g;
  return text.split(regex).map((chunk, index) => {
    if (index % 2 === 1) {
      return <strong key={index}>{chunk}</strong>;
    }
    return chunk;
  });
};

// Shared stepper/editor used by both curated and game challenges.
// Each step's `required` snippets must all appear in the editor value.
// onPass(grade) fires once the user finishes with >= config.passGrade.
export default function ChallengeRunner({ config, onPass, onFail }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editorValues, setEditorValues] = useState(
    Array(config.steps.length).fill('')
  );
  const [activeStep, setActiveStep] = useState(0);
  const [grade, setGrade] = useState(0);

  const steps = config.steps;
  const step = steps[activeStep];

  const handleEditorChange = (value) => {
    const updated = [...editorValues];
    updated[activeStep] = value;
    setEditorValues(updated);
  };

  const isCorrect = (value) =>
    step.required.every((snippet) => value.includes(snippet));

  const handleNext = () => {
    const correct = isCorrect(editorValues[activeStep]);
    const newGrade = grade + (correct ? 1 : 0);
    if (correct) setGrade(newGrade);
    else alert('Your answer incorrect. Please review it!');

    if (activeStep === steps.length - 1) {
      if (newGrade >= config.passGrade) {
        onPass(newGrade);
      } else {
        onFail
          ? onFail(newGrade)
          : alert(
              `Sorry you only have ${newGrade} answers right! You didn't pass the challenge! Please do it again ! `
            );
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="page-container">
      <div className="split-view">
        <div className="left-panel">
          <img
            src={config.hero}
            style={{ width: '550px', height: '300px' }}
            alt={config.title}
          />
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((s, index) => (
              <Step key={s.label}>
                <StepLabel>{s.label}</StepLabel>
                <StepContent>
                  <pre className="text">{highlightText(s.content)}</pre>
                  {config.stepImages[index] && (
                    <img
                      src={config.stepImages[index]}
                      alt={`Step ${index + 1}`}
                    />
                  )}
                  <div>
                    <div>
                      <Button
                        type="button"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="right-panel">
          <CodeMirror
            height="60vh"
            extensions={[rust()]}
            value={editorValues[activeStep]}
            onChange={handleEditorChange}
            theme="dark"
          />
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Show Answer
          </Button>
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <pre>{step.answer}</pre>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

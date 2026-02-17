import { useState, useEffect } from 'react';

export const useTypingEffect = (phrases, typingSpeed = 150) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(typingSpeed);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
        setCurrentSpeed(50);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setCurrentSpeed(typingSpeed);
      }
    };

    const timer = setTimeout(handleType, currentSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, currentSpeed, phrases, typingSpeed]);

  return text;
};

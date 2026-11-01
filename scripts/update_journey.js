const fs = require('fs');

let j = fs.readFileSync('components/home/HomeJourney.tsx', 'utf8');

// Fix snap 4
j = j.replace('/media/3uG2U_zO8c1I/a444ba74a6/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg', '/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg');

// Fix video
j = j.replace('/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4', '/media/_cJaO-ryO6ev/af9e004679/b942a5_93358f1b7c434434b226b19e9ee0705b.mp4');

// Add activeStep state
const stateCode = `  const [activeStep, setActiveStep] = React.useState<number>(0);
`;
j = j.replace('export default function HomeJourney() {\n  \n  return (', `export default function HomeJourney() {\n${stateCode}\n  return (`);

// Replace steps
const stepRegex = /<ol className="tp-chat__steps">[\s\S]*?<\/ol>/;
const newSteps = `<ol className="tp-chat__steps">
  <li className="tp-chat__step cursor-pointer" data-active={activeStep === 0 ? "true" : "false"} data-done={activeStep > 0 ? "true" : "false"} onClick={() => setActiveStep(0)}>
    <span className="tp-chat__num font-plush" aria-hidden="true">1</span>
    <h3 className="font-plush tp-chat__title">Choose your breed</h3>
    <p className="tp-chat__text">Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.</p>
  </li>
  <li className="tp-chat__step cursor-pointer" data-active={activeStep === 1 ? "true" : "false"} data-done={activeStep > 1 ? "true" : "false"} onClick={() => setActiveStep(1)}>
    <span className="tp-chat__num font-plush" aria-hidden="true">2</span>
    <h3 className="font-plush tp-chat__title">Get photos & details</h3>
    <p className="tp-chat__text">Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
  </li>
  <li className="tp-chat__step cursor-pointer" data-active={activeStep === 2 ? "true" : "false"} data-done={false} onClick={() => setActiveStep(2)}>
    <span className="tp-chat__num font-plush" aria-hidden="true">3</span>
    <h3 className="font-plush tp-chat__title">Secure & safe delivery</h3>
    <p className="tp-chat__text">Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>
  </li>
</ol>`;

j = j.replace(stepRegex, newSteps);

// Update data-show on message groups
j = j.replace('data-step="0" data-show="true"', 'data-step="0" data-show={activeStep === 0 ? "true" : "false"}');
j = j.replace('data-step="1" data-show="true"', 'data-step="1" data-show={activeStep === 1 ? "true" : "false"}');
j = j.replace('data-step="2" data-show="true"', 'data-step="2" data-show={activeStep === 2 ? "true" : "false"}');

fs.writeFileSync('components/home/HomeJourney.tsx', j);
console.log('Successfully updated HomeJourney.tsx!');

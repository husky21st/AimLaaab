import fontTextJson from '../../../public/fontText.json';

export const assets = [
  { name: "RocknRoll One", url: "https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap", 
    metadata: {font: {testString: `
    ${fontTextJson.text.join('')}
    0123456789
    ABCDEFGHIJKLMNOPQRSTUVWXYZ
    abcdefghijklmnopqrstuvwxyz
    .,/\`~:;'-_=+!@#$%^&*()~{}[]`.replace(/\s/g, '')}}
  },
  { name: "highPointSE", url: "SE/highPoint.mp3"  },
  { name: "normalPointSE", url: "SE/normalPoint.mp3" },
  { name: "missTargetSE", url: "SE/missTarget.mp3" },
  { name: "lostPointSE", url: "SE/lostPoint.mp3" },
  { name: "fontT", url: "fontText.json"},
]
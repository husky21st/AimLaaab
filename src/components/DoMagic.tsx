import { VFC, useEffect, useRef, useState } from 'react';
import fontTextJson from '../../public/fontText.json';

const DoMagic: VFC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;
    paragraph.style.fontFamily = 'RocknRoll One';
    paragraph.style.fontSize = '0px';
    paragraph.style.visibility = 'hidden';
  }, []);

  return (
    <p ref={paragraphRef} style={{color: 'transparent'}} aria-hidden="true">
      {`
        ${fontTextJson.text.join('')}
        0123456789
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
        abcdefghijklmnopqrstuvwxyz
        .,/\`~:;'-_=+!@#$%^&*()~{}[]`.replace(/\s/g, '')}
    </p>
  );
};

export default DoMagic;

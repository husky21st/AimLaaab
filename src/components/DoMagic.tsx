import { VFC, useEffect, useRef, useState } from 'react';
import fontTextJson from '../../public/fontText.json';

const DoMagic: VFC = () => {
  const [active, loadFont] = useState<boolean>(true);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;
    loadFont(false);
  }, [active]);
  //useEffect(() => {
  //  const paragraph = paragraphRef.current;
  //  if (!paragraph) return;
  //  paragraph.style.fontFamily = 'RocknRoll One';
  //  paragraph.style.fontSize = '1px';
  //  //paragraph.style.visibility = 'hidden';
  //}, []);
  return (
    <>
    {active && <p ref={paragraphRef} id='magic' aria-hidden="true">
      {`
        ${fontTextJson.text.join('')}
        0123456789
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
        abcdefghijklmnopqrstuvwxyz
        .,/\`~:;'-_=+!@#$%^&*()~{}[]`.replace(/\s/g, '')}
    </p>}
    </>
  );
};

export default DoMagic;

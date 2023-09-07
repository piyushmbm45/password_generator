import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function Gen() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [length, setLength] = useState(12);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState('');

  const strPass = useMemo(
    () => generateRandString(length, isNum, isChar),
    [length, isNum, isChar]
  );

  useEffect(() => {
    setPassword(strPass);
  }, [length, isNum, isChar, strPass]);

  const onClickCopy = useCallback(() => {
    inputRef.current?.select();
    navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className=" flex justify-center">
      <div className="rounded-md bg-red-300 text-center m-1 p-1 w-1/2 h-28">
        <div className=" m-1 flex justify-center mb-2">
          <input
            type="text"
            className="rounded-l-md p-3 w-11/12"
            ref={inputRef}
            value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-indigo-600 rounded-r-md p-3 w-1/12"
            onClick={onClickCopy}
          >
            copy
          </button>
        </div>
        <div className="m-2 flex align-middle justify-center mt-2">
          <label htmlFor="length">
            <input
              min={0}
              max={30}
              type="range"
              onChange={(e) => setLength(Number(e.target.value))}
              className=" align-middle pr-1"
            />
            Length({length})
          </label>
          <label htmlFor="input" className=" mr-1">
            <input
              className=" ml-1 mr-1"
              type="checkbox"
              name="Numbers"
              checked={isNum}
              id="num"
              aria-label="numbers"
              onChange={(e) => setIsNum(e.target.checked)}
            ></input>
            Numbers
          </label>
          <label htmlFor="input">
            <input
              className=" mr-1"
              type="checkbox"
              name="Characters"
              id="char"
              checked={isChar}
              aria-label="characters"
              onChange={(e) => setIsChar(e.target.checked)}
            ></input>
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

function generateRandString(length: number, isNum: boolean, isChar: boolean) {
  let str = '';
  for (let i = 0; i < length; i++) {
    if (isNum && isChar) {
      str += alphabet.concat(nums, char)[Math.floor(Math.random() * 66)];
    } else if (isChar) {
      str += alphabet.concat(char)[Math.floor(Math.random() * 56)];
    } else if (isNum) {
      str += alphabet.concat(nums)[Math.floor(Math.random() * 62)];
    } else {
      str += alphabet[Math.floor(Math.random() * 52)];
    }
  }
  return str;
}

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const char = ['@', '#', '$', '%'];

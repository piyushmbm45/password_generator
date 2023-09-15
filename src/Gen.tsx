import { faCopy, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function Gen() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [length, setLength] = useState(12);
  const [counter, setCounter] = useState(0);
  const [check, setChecks] = useState({
    isNum: false,
    isSymbol: false,
    isUpper: false,
    isLower: true,
    isStartAlpha: true,
  });
  const [password, setPassword] = useState('');

  const { str: strPass, strength } = useMemo(() => {
    const { str, strength } = generateRandString(
      length,
      check.isNum,
      check.isSymbol,
      check.isLower,
      check.isStartAlpha,
      check.isUpper
    );
    return { str, strength };
  }, [length, check, counter]);

  const onRefresh = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    setPassword(strPass);
  }, [length, check, strPass]);

  const onClickCopy = useCallback(() => {
    inputRef.current?.select();
    navigator.clipboard.writeText(password);
  }, [password]);

  const handleCheckbox = (e: any, key: string) => {
    setChecks({ ...check, [key]: e.target.checked });
  };

  return (
    <div className=" flex justify-center shadow-sm">
      <div className="rounded-md bg-red-300 text-center m-1 p-1 w-1/2 h-auto">
        <div className=" m-1 flex justify-center mb-2 shadow-md">
          <input
            type="text"
            className="rounded-l-md p-3 w-1/2 md:w-11/12"
            ref={inputRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span
            className=" bg-white p-3"
            style={{
              color:
                strength === 'Weak'
                  ? 'red'
                  : strength === 'Moderate'
                  ? 'orange'
                  : 'green',
            }}
          >
            {strength}
          </span>
          <button
            className="bg-indigo-600 p-3 w-1/2 md:w-1/12"
            onClick={onClickCopy}
          >
            <FontAwesomeIcon icon={faCopy} color="white" size="lg" />
          </button>
          <button
            className="bg-indigo-600 rounded-r-md p-3 w-1/2 md:w-1/12"
            onClick={onRefresh}
          >
            <FontAwesomeIcon icon={faRefresh} color="white" size="lg" />
          </button>
        </div>
        <div className="m-2 flex items-baseline justify-start mt-2 flex-col">
          <label htmlFor="length">
            <input
              min={6}
              max={30}
              type="range"
              onChange={(e) => setLength(Number(e.target.value))}
              className=" align-middle pr-1"
            />
            Length({length})
          </label>
          <label htmlFor="input">
            <input
              className="mr-1"
              type="checkbox"
              name="Numbers"
              checked={check.isNum}
              id="num"
              aria-label="numbers"
              onChange={(e) => handleCheckbox(e, 'isNum')}
            ></input>
            Numbers
          </label>
          <label htmlFor="input">
            <input
              className=" mr-1"
              type="checkbox"
              name="Symbols"
              id="char"
              checked={check.isSymbol}
              aria-label="symbols"
              onChange={(e) => handleCheckbox(e, 'isSymbol')}
            ></input>
            Symbols
          </label>
          <label htmlFor="input">
            <input
              className=" mr-1"
              type="checkbox"
              name="LowerCase"
              id="char"
              checked={check.isLower}
              aria-label="Lowercase"
              onChange={(e) => handleCheckbox(e, 'isLower')}
            ></input>
            Lower Case
          </label>
          <label htmlFor="input">
            <input
              className=" mr-1"
              type="checkbox"
              name="Uppercase"
              id="char"
              checked={check.isUpper}
              aria-label="Upper case"
              onChange={(e) => handleCheckbox(e, 'isUpper')}
            ></input>
            Upper case
          </label>
          {(check.isLower || check.isUpper) && (
            <label htmlFor="input">
              <input
                className=" mr-1"
                type="checkbox"
                name="is Begin with Alphabet"
                id="char"
                checked={check.isStartAlpha}
                aria-label="characters"
                onChange={(e) => handleCheckbox(e, 'isStartAlpha')}
              ></input>
              Start with alphabet
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

function generateRandString(
  length: number,
  isNum: boolean,
  isChar: boolean,
  isLower: boolean,
  isStartAlpha: boolean,
  isUpper: boolean
) {
  const nums = '0123456789';
  const symbols = '!@#$%^&*()_-+=[]{}|\\:;"<>,.?/';
  const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
  const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let charSet = '';
  let alphaSet = '';

  if (isNum) charSet += nums;
  if (isChar) charSet += symbols;
  if (isLower) charSet += smallLetters;
  if (isUpper) charSet += capitalLetters;

  if (isLower) alphaSet += smallLetters;
  if (isUpper) alphaSet += capitalLetters;

  if (!charSet) {
    return { str: '', strength: 'Weak' };
  }

  let str = '';
  const charSetLength = charSet.length;
  const alphabetLength = alphaSet.length;

  for (let i = 0; i < length; i++) {
    if (i === 0 && isStartAlpha) {
      str += alphaSet[Math.floor(Math.random() * alphabetLength)];
    } else {
      str += charSet[Math.floor(Math.random() * charSetLength)];
    }
  }

  // Strength of password
  let strength = 'Weak';
  if (isLower && isUpper && isNum && isChar && length >= 8) {
    strength = 'Strong';
  } else if ((isLower || isUpper) && isChar && length >= 6) {
    strength = 'Moderate';
  }

  console.log(`Strength of password: ${strength}`);
  return { str, strength };
}

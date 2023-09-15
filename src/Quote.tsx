import { useEffect, useState } from 'react';

export function Quote() {
  const [quotes, setQuotes] = useState([]);
  const [currQuote, setCurrQuote] = useState({
    text: 'इससे पहले कि सपने सच हों आपको सपने देखने होंगे।',
    author: 'APJ Abdul Kalam',
  });

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = () => {
    setQuotes([]);
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setQuotes(data);
      })
      .catch(() => {});
  };

  const onClick = () => {
    document.body.setAttribute(
      'style',
      `background-color: rgb(${getRandomNum(0, 255)}, ${getRandomNum(
        0,
        255
      )}, ${getRandomNum(0, 255)})`
    );
    const quotesLength = quotes.length;
    setCurrQuote(quotes[Math.floor(Math.random() * quotesLength)]);
  };

  return (
    <div className=" flex justify-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {currQuote.text}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {currQuote.author.split(',')[0]}
        </p>

        <button
          onClick={onClick}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

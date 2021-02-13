const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  loading();
  const apiUrl =
    'https://type.fit/api/quotes?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    let number = Math.floor(Math.random() * data.length);
    if (data[number].author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data[number].author;
      quoteText.innerText = data[number].text;
    }

    if (data[number].text > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    // Stop loader, Show quote
    complete();
  } catch (error) {
    console.log('whoops, no quote', error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();

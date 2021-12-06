import React, { useState, useEffect } from "react";
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";

const initialQuote = {
  text: "Quote",
  author: "Author",
};

function App() {
  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);

  //useefect para arrancar su primera renderizada automatica
  //use efect no acepta async acincronismo en sus argumentos
  // se declara en la funcion es asinc y antes del fetch se llama await

  const updateQuote = async () => {
    setLoading(true);
    const url = "https://www.breakingbadapi.com/api/quote/random";
    const res = await fetch(url);
    const [newQuote] = await res.json();
    const { quote: text, author } = newQuote;
    setQuote({
      text,
      author,
    });
    setLoading(false);
  };

  useEffect(() => {
    updateQuote();
  }, []);

  return (
    <div className="app">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="logo breaking bad"
      />
      <button onClick={() => updateQuote()}>Get Another</button>

      {loading ? <Spinner /> : <Quote quote={quote} />}
    </div>
  );
}

export default App;

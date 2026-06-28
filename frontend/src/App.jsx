import { shortner} from './services/service'
import './App.css'
import { useState } from 'react'

function App() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const data = {
        url: input
      }
      const response = await shortner(data)
      console.log(response)
      setUrl(response)
    } catch (error) {
      setError(error.response.data.message)
      throw error.response.data.message
    } finally {
      setInput("")
      setLoading(false)
    }
  }

  if (loading) {
  return (
    <div className="status-container">
      <div className="loader"></div>
      <h2>Generating your short URL...</h2>
    </div>
  );
}

if (!loading && error) {
  return (
    <div className="status-container">
      <h2 className="error-text">{error}</h2>
    </div>
  );
}

if (!loading && url) {
  return (
    <div className="app">
      <div className="result">
        <h3>Your hort UrL</h3>

        <a
          href={url.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url.shortUrl}
        </a>

        <button
          className="copy-btn"
          onClick={() => navigator.clipboard.writeText(url.shortUrl)}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
}
 
return (
  <div className="app">
    <div className="hero">
      <h1>Simplify your links.</h1>

      <p>
        A professional-grade URL shortener built for speed,
        reliability, and precision analytics.
      </p>

      <form
        className="url-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Paste your long URL here..."
        />

        <button type="submit">
          Shorten
        </button>
      </form>
    </div>
  </div>
);
}

export default App

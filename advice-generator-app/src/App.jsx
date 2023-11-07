import React, { useState, useEffect } from "react";

function App() {
  let deferredPrompt;

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Prevent the browser's default installation prompt
      deferredPrompt = event;
    });
  }, []);

  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);

  const searchAdvice = async () => {
    const url = "https://api.adviceslip.com/advice";
    try {
      const response = await fetch(url, {
        method: "GET",
        cache: "reload",
      });
      if (response.ok) {
        const data = await response.json();
        setAdvice(data);
        setError(null); // Clear any previous error
      } else {
        setError("Oops. I'm short of words."); // Set error message
      }
    } catch (error) {
      console.error("Error fetching advice data:", error);
      setError("An error occurred while fetching data."); // Set a generic error message
    }
  };

  useEffect(() => {
    // Initialize with a default advice
    searchAdvice(advice);
  }, []);

  return (
    <>
      <div className="advice-box bg-neutral-DarkGrayishBlue w-11/12 rounded-lg absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 pt-8 pb-12 pl-6 pr-6">
        {advice ? (
          <>
            <h1 className="text-primary-NeonGreen text-center uppercase text-xs font-medium pb-6">
              Advice # {advice.slip.id}
            </h1>
            <div className="advice-box--advice">
              <p className="text-primary-LightCyan text-center pb-8 text-2xl font-bold">
                "{advice.slip.advice}"
              </p>
            </div>
          </>
        ) : (
          <p className="text-primary-LightCyan text-center pb-8 text-2xl">
            Loading...
          </p>
        )}

        <div className="partition">
          <img
            src="/images/pattern-divider-mobile.webp"
            alt="divider"
            className="mobile-divider w-full mb-8"
          />
          <img
            src="/images/pattern-divider-desktop.webp"
            alt="divider"
            className="desktop-divider w-full mb-8"
          />
        </div>
        <div
          className="dice w-16 h-16 rounded-full bg-primary-NeonGreen absolute -bottom-8 left-2/4 -translate-x-2/4 hover:cursor-pointer"
          onClick={searchAdvice}
        >
          <img
            src="/images/icon-dice.webp"
            alt="dice"
            className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          />
        </div>
      </div>
      <span className="absolute bottom-2 left-2/4 -translate-x-2/4 w-full">
        Challenge by
        <a
          href="https://www.frontendmentor.io"
          target="_blank"
          rel="noopener noreferrer"
          className="link text-primary-NeonGreen hover:text-primary-LightCyan"
        >
          Frontend Mentor
        </a>
        . Coded by
        <a
          href="https://www.github.com/DavidOG03"
          target="_blank"
          rel="noopener noreferrer"
          className="link text-primary-NeonGreen hover:text-primary-LightCyan"
        >
          David_OG
        </a>
      </span>
      {deferredPrompt && (
        <button onClick={() => {
          deferredPrompt.prompt(); // Show the installation prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the installation prompt');
            }
            deferredPrompt = null; // Reset the deferredPrompt variable
          });
        }}>
          Install App
        </button>
      )}
    </>
  );
}

export default App;

export function hideDisclaimerCard() {
  document.getElementById("disclaimer")?.classList.remove("visible")
  document.getElementById("disclaimer")?.classList.add("invisible")
}

export function showDisclaimerCard() {
  document.getElementById("disclaimer")?.classList.remove("invisible")
  document.getElementById("disclaimer")?.classList.add("visible")
}

export function DisclaimerCard() {
  return (
    <div onClick={hideDisclaimerCard} id="disclaimer" className="invisible fixed top-0 pt-14 sm:pt-0 sm:flex w-screen h-screen bg-[#00000050] hover:cursor-pointer z-1">
      <div onClick={(e) => e.stopPropagation()} className="relative m-auto bg-black p-8 sm:p-12 text-gray-100 max-w-2xl hover:cursor-default">
        <div tabIndex={0} onClick={hideDisclaimerCard} onKeyDown={(e) => (e.key === "Enter") && (hideDisclaimerCard())} className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 sm:w-14 rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)] focus:bg-[var(--dark-accent)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </div>
        
        <div className="text-neutral-200">
          <p>©2025 Talldle.</p>   
          <br />    
          <p>
            This website utilizes Google Analytics solely for internal purposes to understand demographics and preferences.
            Google Analytics employs cookies to track interactions which are sent to and stored by Google servers.
            By using this website, you consent to the processing of data about you with the purposes and manner above.
            To opt-out of analytics tracking, you can install Google Analytics Opt-out Browser Add-on at
            <a href="https://tools.google.com/dlpage/gaoptout" className="underline"> https://tools.google.com/dlpage/gaoptout</a>.
          </p>    
        </div>
      </div>
    </div>
  );
}
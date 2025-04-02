export function hideCreditsCard() {
  document.getElementById("credits")?.classList.remove("visible")
  document.getElementById("credits")?.classList.add("invisible")
}

export function showCreditsCard() {
  document.getElementById("credits")?.classList.remove("invisible")
  document.getElementById("credits")?.classList.add("visible")
}

export function CreditsCard() {
  return (
    <div onClick={hideCreditsCard} id="credits" className="invisible fixed top-0 pt-14 sm:pt-0 sm:flex w-screen h-screen bg-[#00000050] hover:cursor-pointer z-1">
      <div onClick={(e) => e.stopPropagation()} className="relative m-auto bg-black p-8 sm:p-12 text-gray-100 max-w-2xl hover:cursor-default">
        <div tabIndex={0} onClick={hideCreditsCard} onKeyDown={(e) => (e.key === "Enter") && (hideCreditsCard())} className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 sm:w-14 rounded-full p-2 hover:cursor-pointer hover:bg-[var(--dark-accent)] focus:bg-[var(--dark-accent)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </div>
        
        <div className="text-neutral-200">
          <h1 className="text-2xl sm:text-4xl font-bold underline">Credits</h1>
          <br />
          <p>Inspired by <i>Wordle</i>, created by Josh Wardle, <i>Talldle</i> is made by <b>Andrew Collins</b> and <b>Riley Wong</b>.</p>
          <br />
          <p>
            Contact us at <a href="mailto:acollins2@scu.edu" className="underline">acollins2@scu.edu</a> and <a href="mailto:rnwong@scu.edu" className="underline">rnwong@scu.edu</a> for any questions.
          </p>
          <br />
          <p>Thanks for playing!</p>
        </div>
      </div>
    </div>
  );
}
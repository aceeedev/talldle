export function showCopyAnnouncement() {
  document.getElementById("announcement")?.classList.add("opacity-100")
  document.getElementById("announcement")?.classList.remove("opacity-0")
  setTimeout(() => {
    document.getElementById("announcement")?.classList.remove("opacity-100")
    document.getElementById("announcement")?.classList.add("opacity-0")
  }, 2000)
}

export function CopyAnnouncement() {
  return (
    <div id="announcement" className="opacity-0 fixed top-4 left-1/2 transform -translate-x-1/2 z-2 pointer-events-none duration-250">
      <div className="m-auto bg-black py-2 px-4 sm:py-4 sm:p-6 text-sm sm:text-xl border-2 border-[var(--dark-accent)] rounded text-neutral-200">
        Copied to Clipboard
      </div>
    </div>
  );
}
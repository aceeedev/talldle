import { ReactNode } from 'react';

export function RowDiv ({ rows, isActive = false, children} : { rows: number, isActive? : boolean, children : ReactNode}) {  
  
  const myClasses = `flex flex-col gap-0.5 sm:gap-1 overflow-clip hover:cursor-pointer ${isActive ? 'column-glow' : ''}`
  const myStyle = {background: "linear-gradient(to right, transparent 45%, var(--color-yellow-400) 45%, var(--color-yellow-400) 55%, transparent 55%)"}

  if (rows == 2) {
    return (<div className={`row-span-2 ${myClasses}`} style={myStyle}>
      {children}
    </div> )
  }
  if (rows == 3) {
    return (<div className={`row-span-3 ${myClasses}`} style={myStyle}>
      {children}
    </div> )
  }
  if (rows == 4) {
    return (<div className={`row-span-4 ${myClasses}`} style={myStyle}>
      {children}
    </div> )
  }
  if (rows == 5) {
    return (<div className={`row-span-5 ${myClasses}`} style={myStyle}>
      {children}
    </div> )
  }
  if (rows == 6) {
    return (<div className={`row-span-6 ${myClasses}`} style={myStyle}>
      {children}
    </div> )
  }
  return (<div>Error</div> )
}

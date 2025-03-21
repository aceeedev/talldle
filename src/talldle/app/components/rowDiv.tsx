import { ReactNode } from 'react';

export function RowDiv ({ rows, children} : { rows: number, children : ReactNode}) {  
  
  const myClasses = "flex flex-col gap-0.5 sm:gap-1 bg-[var(--dark-accent)] overflow-clip hover:cursor-pointer"
  const myStyle = {background: "linear-gradient(to right, transparent 45%, var(--color-yellow-300) 45%, var(--color-yellow-300) 55%, transparent 55%)"}
  // const myStyle = {
  //   background: `linear-gradient(
  //     to right,
  //     transparent 20%,
  //     var(--color-yellow-300) 20%, var(--color-yellow-300) 30%,
  //     transparent 30%, transparent 70%, 
  //     var(--color-yellow-300) 70%, var(--color-yellow-300) 80%,
  //     transparent 80%
  //   )`
  // };

  if (rows == 2) {
    return (<div className={`row-span-2 ${myClasses}`} style={myStyle}>
      {children}
    </div> )
  }
  if (rows == 3) {
    return (<div className={`row-span-3 ${myClasses}`}>
      {children}
    </div> )
  }
  if (rows == 4) {
    return (<div className={`row-span-4 ${myClasses}`}>
      {children}
    </div> )
  }
  if (rows == 5) {
    return (<div className={`row-span-5 ${myClasses}`}>
      {children}
    </div> )
  }
  if (rows == 6) {
    return (<div className={`row-span-6 ${myClasses}`}>
      {children}
    </div> )
  }
  return (<div>Error</div> )
}

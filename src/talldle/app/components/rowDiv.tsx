import { ReactNode } from 'react';

export function RowDiv ({ rows, children} : { rows: number, children : ReactNode}) {  
  
  const myClasses = "flex flex-col gap-1.5 sm:gap-3 border-2 sm:border-4 border-yellow-300 bg-[var(--dark-accent)] overflow-clip hover:cursor-pointer"

  if (rows == 2) {
    return (<div className={`row-span-2 ${myClasses}`}>
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

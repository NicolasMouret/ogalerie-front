"use client";

import { useState } from 'react';

import { MdReportGmailerrorred, MdReport } from 'react-icons/md';

interface SignalButtonProps {
  className?: string;
  size?: string;
  sizeIcon?: string;
}

function SignalButton({ className, sizeIcon, size }: SignalButtonProps) {
    const [isSignaled, setIsSignaled] = useState(false)

    function onOff() {
        setIsSignaled(!isSignaled)
    }

  return <button className={`${className}`} onClick={onOff}>
    {isSignaled ? <span className={`${size ? `text-${size}` : `text-xs`}`}><MdReport className={`${isSignaled && "animate-ping"} ${sizeIcon ? `text-${sizeIcon}` : `text-xl`} inline mr-1`}/>Signalé</span> : 
                <span className={`${size ? `text-${size}` : `text-xs`}`}><MdReportGmailerrorred className={`${sizeIcon ? `text-${sizeIcon}` : `text-xl`} inline mr-1`}/>Signaler</span>}
    </button>;
}

export default SignalButton;
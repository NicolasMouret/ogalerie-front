"use client";

import { useState } from 'react';

import { MdReportGmailerrorred, MdReport } from 'react-icons/md';

function SignalButton() {
    const [isSignaled, setIsSignaled] = useState(false)

    function onOff() {
        setIsSignaled(!isSignaled)
    }

  return <button onClick={onOff}>
    {isSignaled ? <span><MdReport className={`${isSignaled && "animate-ping"} inline text-3xl`}/>Signalé</span> : 
                <span><MdReportGmailerrorred className="inline text-3xl"/>Signaler</span>}
    </button>;
}

export default SignalButton;
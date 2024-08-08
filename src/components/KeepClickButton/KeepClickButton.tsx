import React, {ReactNode, useEffect, useState} from 'react';
import './style.css'

const ClickDurationComponent = ({keep, onClick, children}: {
    keep: number,
    onClick: () => void,
    children: ReactNode
}) => {
    const [clickStartTime, setClickStartTime] = useState<number | null>(null);
    const [keepDone, setKeepDone] = useState(false);

    useEffect(() => {
        if (clickStartTime !== null) {
            const interval = setInterval(() => {
                const clickDuration = new Date().getTime() - clickStartTime;
                if (clickDuration >= keep) {
                    setKeepDone(true);
                    clearInterval(interval);
                }
            }, 10);

            return () => clearInterval(interval);
        }
        return
    }, [clickStartTime, keep]);

    const handleMouseDown = () => {
        setKeepDone(false);
        setClickStartTime(new Date().getTime());
    };

    const handleMouseUp = () => {
        setKeepDone(false);
        if (clickStartTime !== null) {
            const clickDuration = new Date().getTime() - clickStartTime;
            if (clickDuration >= keep) {
                onClick();
            }
        }
        setClickStartTime(null);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={'keep_btn'}
        >
            <div className={`keep_btn_bg ${keepDone ? 'done' : ''}`}/>
            {children || 'click me'}
        </div>
    );
};

export default ClickDurationComponent;
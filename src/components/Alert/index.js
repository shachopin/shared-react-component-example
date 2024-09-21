import "./style.css";
import React from 'react';

const Alert = ({ isDefaultShown = false, timeout = 1500, type, message }) => {
  const [isShown, setIsShown] = React.useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = React.useState(false);
  //此题和debounce无关
  let timeoutId = null;

  React.useEffect(() => {
    setIsShown(true);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDefaultShown, timeout, timeoutId]);

  const closeAlert = () => {
    setIsLeaving(true);  //start fading using animation frame
    timeoutId = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false); //totally gone
    }, timeout); //therefore the timeout needs to be equal to the fading animation time to make it look better
  };

  return (
    isShown && (
      <div
        className={`alert ${type} ${isLeaving ? 'leaving' : ''}`}
        role="alert"
      >
        <button className="close" onClick={closeAlert} />
        {message}
      </div>
    )
  );
};


export default Alert;
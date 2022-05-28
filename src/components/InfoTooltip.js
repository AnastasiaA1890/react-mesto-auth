import React from "react";
import SuccessfullyIcon from '../images/successfully-icon.svg';
import FailedIcon from '../images/failed-icon.svg';

function InfoTooltip(props) {
  const className = props.isOpen ? 'popup_opened' : '';
  return (
    <div className={`popup ${className}`}>
      <div className='popup__container-info'>
        <button onClick={props.onClose} type="button" aria-label="Кнопка закрытия окна" className="popup__close-button"/>
        {props.isSuccessful ? (
          <>
            <img src={SuccessfullyIcon} alt="Successfully Icon" className='popup__tooltip-img'/>
            <p className='popup__tooltip-text'>You have successfully registered!</p>
          </>
        ) : (
          <>
            <img src={FailedIcon} alt="Successfully Icon" className='popup__tooltip-img'/>
            <p className='popup__tooltip-text'>Something went wrong! Try again.</p>
          </>
        )
        }
      </div>
    </div>
  )
}

export default InfoTooltip;

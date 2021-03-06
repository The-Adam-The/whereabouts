import { useState } from 'react';

const LogInForm = ({displayGamePage, setUserName}) => {
    
    const [tempUserName, setTempUserName] = useState('')

    const handleInput = (event) => {
        setTempUserName(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setUserName(tempUserName)
        displayGamePage()
    }

    return(
        <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
            <p className="form-title">Enter your name to start the game</p>
            <input className="enter-name" type="text" placeholder="" value={tempUserName} onChange={handleInput}/>
            <input className="start-game-btn std-btn purple-btn" type="submit" value="Start Game"/>
        </form>
        </div>
    );
};

export default LogInForm;
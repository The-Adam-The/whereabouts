import dartboard from '../images/dart_with_background.png';
import AccuracyBar from './AccuracyBar';

const ScoreBreakdown = ({userScores, totalScore, displayLogInPage}) => {

    const scoresList = userScores.map((score, index) => {
        return <ul key={index}>
        <h4>Question {index + 1}</h4>
        <li>Points: {score.points}</li>
        <li>{score.distance}km from location</li>
        </ul>
    })

    
    return(
        <div className="scores-breakdown">
            <div className="scores-left-aside">
                <h2>Score Breakdown</h2>
                    <section className="rounds-breakdown">
                        <ul>
                            {scoresList}
                        </ul>
                    </section>
            </div>
            <div className="scores-aside">
                <section className="totals">
                    <h3>Total</h3>
                    <AccuracyBar/>
                    <p>Accuracy {totalScore.total.averageAccuracy}%</p>
                    <p>{totalScore.total.points} points</p>
                    <p>{totalScore.total.averageDistance}km in total from locations</p>  
                </section>
                    <p className="image-text" >Not done?</p>
                    <img src={dartboard} alt="dartboard" className='dartboard-image'/>
                    <button onClick={displayLogInPage} className="new-game-button">Play again</button>
            </div>
        </div>
    );
};

export default ScoreBreakdown;
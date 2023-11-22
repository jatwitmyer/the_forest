import React, {useEffect, useState} from "react";
import UserCharacterCard from "./UserCharacterCard"

function Account( {user} ) {
  const [allAchievements, setAllAchievements] = useState([])
  const [achievementFks, setAchievementFks] = useState([])

  useEffect(() => {
    fetch('/achievements')
    .then(r => r.json())
    .then(data => setAllAchievements(data))
  }, [])
  
  useEffect(() => {
    fetch(`/users_achievements_by_user/${user.id}`)
    .then(r => r.json())
    .then(uas => {
      const achievement_fks = uas.map(userAchievement => userAchievement.achievement_fk)
      setAchievementFks(achievement_fks)
      }) 
  }, [user.id])

  const yourAchievements = (achievementFks.map(achievementFk => allAchievements.filter(item => item.id === achievementFk)[0]))
  console.log(yourAchievements)

  const renderedAchievements = yourAchievements.map(a => <div key={a.id}><p>{a.id}. {a.name}</p><p>{a.summary}</p></div>)

  return (
    <div className="account">
      <h1>Account Details</h1>
      <p>Username: {user.username}</p>
      <button>Edit Username and Password</button>
      <button>Delete Account</button>
      <h3>Your Achievements: </h3>
      {renderedAchievements}
    </div>
  )
}

export default Account

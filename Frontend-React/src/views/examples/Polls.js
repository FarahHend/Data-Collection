import React from "react";

const polls = [
  {
    id: 2,
    question: "Which programming language do you prefer?",
    choices: [
      { id: 1, option: "JavaScript", percent: 50 },
      { id: 2, option: "Python", percent: 25 },
      { id: 3, option: "Java", percent: 15 },
      { id: 4, option: "C++", percent: 10 },
    ],
  },
  {
    id: 3,
    question: "What is your favorite food?",
    choices: [
      { id: 1, option: "Pizza", percent: 35 },
      { id: 2, option: "Burger", percent: 25 },
      { id: 3, option: "Sushi", percent: 20 },
      { id: 4, option: "Pasta", percent: 20 },
    ],
  },
];

export default function Polls() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      {polls.map((poll) => (
        <div key={poll.id} style={{ width: "700px", margin: "10px", padding: "10px", border: "2.5px solid #ccc", borderRadius: "15px" }}>
          <h2>{poll.question}</h2>
          {poll.choices.map((choice) => (
            <div key={choice.id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <div style={{ width: "500px", height: "25px", backgroundColor: "#f0f0f0", borderRadius: "10px", position: "relative" }}>
                <div style={{ width: `${choice.percent}%`, height: "100%", backgroundColor: "#2ecc71", borderRadius: "10px" }}></div>
                <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>{choice.option}</span>
              </div>
              <span style={{ marginLeft: "5px" }}>{choice.percent}%</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

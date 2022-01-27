const sports: string[] = ['Cricket', 'Football', 'Tennis', 'BasketBall'];


function randomDate(start:Date, end:Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const Profiles: any = [
  {
    sportstype: sports[Math.floor(Math.random() * 4)],
    bmi: Math.floor(Math.random() * 99) + 1,
    Running_Speed: Math.floor(Math.random() * 99) + 1,
    agility: Math.floor(Math.random() * 99) + 1,
    Reaction_Time: Math.floor(Math.random() * 99) + 1,
    balance: Math.floor(Math.random() * 99) + 1,
    strength: Math.floor(Math.random() * 99) + 1,
    aggression: Math.floor(Math.random() * 99) + 1,
    anticipation_index: Math.floor(Math.random() * 99) + 1,
    peripheral_vision: Math.floor(Math.random() * 99) + 1,
    assessment_date: randomDate(new Date(2021, 12, 12), new Date()),
    result: 'Recommended',
    parameters: [],
  },
  {
    sportstype: sports[Math.floor(Math.random() * 4)],
    bmi: Math.floor(Math.random() * 99) + 1,
    Running_Speed: Math.floor(Math.random() * 99) + 1,
    agility: Math.floor(Math.random() * 99) + 1,
    Reaction_Time: Math.floor(Math.random() * 99) + 1,
    balance: Math.floor(Math.random() * 99) + 1,
    strength: Math.floor(Math.random() * 99) + 1,
    aggression: Math.floor(Math.random() * 99) + 1,
    anticipation_index: Math.floor(Math.random() * 99) + 1,
    peripheral_vision: Math.floor(Math.random() * 99) + 1,
    assessment_date: randomDate(new Date(2021, 12, 12), new Date()),
    result: 'Not Recommended',
    parameters: ['balance', 'strength', 'peripheral_vision'],
  },
  {
    sportstype: sports[Math.floor(Math.random() * 4)],
    bmi: Math.floor(Math.random() * 99) + 1,
    Running_Speed: Math.floor(Math.random() * 99) + 1,
    agility: Math.floor(Math.random() * 99) + 1,
    Reaction_Time: Math.floor(Math.random() * 99) + 1,
    balance: Math.floor(Math.random() * 99) + 1,
    strength: Math.floor(Math.random() * 99) + 1,
    aggression: Math.floor(Math.random() * 99) + 1,
    anticipation_index: Math.floor(Math.random() * 99) + 1,
    peripheral_vision: Math.floor(Math.random() * 99) + 1,
    assessment_date: randomDate(new Date(2021, 10, 10), new Date()),
    result: 'Recommended',
    parameters: [],
  },
  {
    sportstype: sports[Math.floor(Math.random() * 4)],
    bmi: Math.floor(Math.random() * 99) + 1,
    Running_Speed: Math.floor(Math.random() * 99) + 1,
    agility: Math.floor(Math.random() * 99) + 1,
    Reaction_Time: Math.floor(Math.random() * 99) + 1,
    balance: Math.floor(Math.random() * 99) + 1,
    strength: Math.floor(Math.random() * 99) + 1,
    aggression: Math.floor(Math.random() * 99) + 1,
    anticipation_index: Math.floor(Math.random() * 99) + 1,
    peripheral_vision: Math.floor(Math.random() * 99) + 1,
    assessment_date: randomDate(new Date(2021, 11, 11), new Date()),
    result: 'Not Recommended',
    parameters: ['agility', 'Running_Speed'],
  },
  {
    sportstype: sports[Math.floor(Math.random() * 4)],
    bmi: Math.floor(Math.random() * 99) + 1,
    Running_Speed: Math.floor(Math.random() * 99) + 1,
    agility: Math.floor(Math.random() * 99) + 1,
    Reaction_Time: Math.floor(Math.random() * 99) + 1,
    balance: Math.floor(Math.random() * 99) + 1,
    strength: Math.floor(Math.random() * 99) + 1,
    aggression: Math.floor(Math.random() * 99) + 1,
    anticipation_index: Math.floor(Math.random() * 99) + 1,
    peripheral_vision: Math.floor(Math.random() * 99) + 1,
    assessment_date: randomDate(new Date(2021, 11, 11), new Date()),
    result: 'Recommended',
    parameters: [],
  },
  {
    sportstype: sports[Math.floor(Math.random() * 4)],
    bmi: Math.floor(Math.random() * 99) + 1,
    Running_Speed: Math.floor(Math.random() * 99) + 1,
    agility: Math.floor(Math.random() * 99) + 1,
    Reaction_Time: Math.floor(Math.random() * 99) + 1,
    balance: Math.floor(Math.random() * 99) + 1,
    strength: Math.floor(Math.random() * 99) + 1,
    aggression: Math.floor(Math.random() * 99) + 1,
    anticipation_index: Math.floor(Math.random() * 99) + 1,
    peripheral_vision: Math.floor(Math.random() * 99) + 1,
    assessment_date: randomDate(new Date(2021, 11, 11), new Date()),
    result: 'Not Recommended',
    parameters: ['Reaction_Time', 'anticipation_index'],
  },
  {
    sportstype: sports[Math.floor(Math.random() * 4)],
    bmi: Math.floor(Math.random() * 99) + 1,
    Running_Speed: Math.floor(Math.random() * 99) + 1,
    agility: Math.floor(Math.random() * 99) + 1,
    Reaction_Time: Math.floor(Math.random() * 99) + 1,
    balance: Math.floor(Math.random() * 99) + 1,
    strength: Math.floor(Math.random() * 99) + 1,
    aggression: Math.floor(Math.random() * 99) + 1,
    anticipation_index: Math.floor(Math.random() * 99) + 1,
    peripheral_vision: Math.floor(Math.random() * 99) + 1,
    assessment_date: randomDate(new Date(2021, 12, 12), new Date()),
    result: 'Not Recommended',
    parameters: ['agility', 'strength' , 'bmi', 'peripheral_vision'],
  }
];

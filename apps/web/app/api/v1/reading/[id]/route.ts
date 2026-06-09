import { NextResponse } from 'next/server'

const PASSAGE_DETAILS: Record<string, {
  id: string; title: string; content: string; level: string; length: string
  topic: string; wordCount: number; imageUrl: string | null
  questions: Array<{ id: string; question: string; options: string[]; correctAnswer: string }>
}> = {
  '1': {
    id: '1', title: 'My Neighborhood', level: 'A2', length: 'medium', topic: 'daily life', wordCount: 280, imageUrl: null,
    content: 'I live in a small neighborhood. It is quiet, clean, and friendly. My house is on a street with many trees. In the morning, I often hear birds singing. My neighbors are very kind. Mrs. Lee lives next door. She always smiles and says hello. Mr. Kim lives across the street. He has a small dog named Bori. On weekends, we sometimes have a small party in the park. Everyone brings food and drinks. The children play together while the adults talk. I like my neighborhood because it feels like a big family.',
    questions: [
      { id: 'q1', question: 'Where does the writer live?', options: ['In a big city', 'In a small neighborhood', 'In an apartment', 'On a farm'], correctAnswer: 'In a small neighborhood' },
      { id: 'q2', question: 'Who lives next door?', options: ['Mr. Kim', 'Mrs. Lee', 'Bori', 'The children'], correctAnswer: 'Mrs. Lee' },
      { id: 'q3', question: 'What does Mr. Kim have?', options: ['A cat', 'A bird', 'A dog', 'A fish'], correctAnswer: 'A dog' },
      { id: 'q4', question: 'When do they have parties?', options: ['Every day', 'On weekdays', 'On weekends', 'In the morning'], correctAnswer: 'On weekends' },
      { id: 'q5', question: 'How does the writer feel about the neighborhood?', options: ['Sad', 'Angry', 'Like a big family', 'Bored'], correctAnswer: 'Like a big family' },
      { id: 'q6', question: 'What do the children do at the party?', options: ['Cook food', 'Play together', 'Sleep', 'Study'], correctAnswer: 'Play together' },
      { id: 'q7', question: 'What can the writer hear in the morning?', options: ['Cars', 'Birds singing', 'Music', 'People talking'], correctAnswer: 'Birds singing' },
    ],
  },
  '2': {
    id: '2', title: 'A Morning in the Kitchen', level: 'A2', length: 'medium', topic: 'daily life', wordCount: 310, imageUrl: null,
    content: 'Anna gets up early every day. She walks into the kitchen and turns on the light. The kitchen is small, but it is clean and bright. She opens the fridge and takes out eggs, milk, and butter. She also gets bread from the cupboard. First, she cracks two eggs into a bowl and mixes them with milk. Then, she puts butter in a pan and turns on the stove. When the butter melts, she pours the egg mixture into the pan. While the eggs cook, she puts two slices of bread in the toaster. After a few minutes, breakfast is ready. She puts the eggs on a plate and the toast next to them. She pours a glass of orange juice and sits down at the table. She enjoys her breakfast while looking out the window at the garden.',
    questions: [
      { id: 'q1', question: 'What time does Anna get up?', options: ['Late', 'Early', 'At noon', 'At night'], correctAnswer: 'Early' },
      { id: 'q2', question: 'What does she take from the fridge?', options: ['Bread and juice', 'Eggs, milk, and butter', 'Fruits and vegetables', 'Meat and fish'], correctAnswer: 'Eggs, milk, and butter' },
      { id: 'q3', question: 'How many eggs does she use?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Two' },
      { id: 'q4', question: 'What does she do while the eggs cook?', options: ['Read a book', 'Put bread in the toaster', 'Watch TV', 'Go outside'], correctAnswer: 'Put bread in the toaster' },
      { id: 'q5', question: 'What does she drink with breakfast?', options: ['Coffee', 'Tea', 'Orange juice', 'Water'], correctAnswer: 'Orange juice' },
      { id: 'q6', question: 'Where does she sit to eat?', options: ['On the sofa', 'At the table', 'On the bed', 'Outside'], correctAnswer: 'At the table' },
      { id: 'q7', question: 'What does she look at while eating?', options: ['TV', 'A book', 'The garden', 'Her phone'], correctAnswer: 'The garden' },
    ],
  },
  '3': {
    id: '3', title: 'A Day at the Zoo', level: 'B1', length: 'long', topic: 'animals', wordCount: 450, imageUrl: null,
    content: 'On Saturday morning, Mia went to the zoo with her mother and younger brother, Ben. They arrived early because the zoo was very popular and often got crowded. The first thing they saw was the elephant enclosure. A large elephant was eating leaves from a tree. Ben was amazed by how big the elephant was. Next, they walked to the monkey area. The monkeys were jumping around and making funny noises. Ben laughed and tried to copy their sounds. After that, they visited the reptile house where they saw snakes, lizards, and a large crocodile. Mia thought the crocodile looked scary. For lunch, they sat on a bench near the lake and ate sandwiches. Ducks swam on the lake and some came close hoping for bread. In the afternoon, they watched the dolphin show. The dolphins jumped through hoops and splashed water on the audience. It was the highlight of the day. Before leaving, they stopped at the gift shop and bought a small stuffed monkey for Ben. On the way home, Ben fell asleep in the car. Mia smiled and thought it had been a perfect day.',
    questions: [
      { id: 'q1', question: 'Who went to the zoo with Mia?', options: ['Her father and brother', 'Her mother and brother', 'Her friends', 'Her teacher'], correctAnswer: 'Her mother and brother' },
      { id: 'q2', question: 'Why did they arrive early?', options: ['To get free tickets', 'Because it gets crowded', 'To see the dolphins first', 'Because it closes early'], correctAnswer: 'Because it gets crowded' },
      { id: 'q3', question: 'What was the elephant doing?', options: ['Sleeping', 'Drinking water', 'Eating leaves', 'Walking around'], correctAnswer: 'Eating leaves' },
      { id: 'q4', question: 'What did Ben try to copy?', options: ['The dolphins', 'The elephant', 'The monkey sounds', 'The ducks'], correctAnswer: 'The monkey sounds' },
      { id: 'q5', question: 'Where did they eat lunch?', options: ['In a restaurant', 'On a bench near the lake', 'In the car', 'At the gift shop'], correctAnswer: 'On a bench near the lake' },
      { id: 'q6', question: 'What was the highlight of the day?', options: ['The reptile house', 'The elephant', 'The dolphin show', 'The gift shop'], correctAnswer: 'The dolphin show' },
      { id: 'q7', question: 'What did they buy at the gift shop?', options: ['A book', 'A t-shirt', 'A stuffed monkey', 'A dolphin toy'], correctAnswer: 'A stuffed monkey' },
      { id: 'q8', question: 'What happened to Ben on the way home?', options: ['He cried', 'He sang songs', 'He fell asleep', 'He ate snacks'], correctAnswer: 'He fell asleep' },
      { id: 'q9', question: 'How did Mia feel about the day?', options: ['Tired', 'Disappointed', 'It was perfect', 'Bored'], correctAnswer: 'It was perfect' },
    ],
  },
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const passage = PASSAGE_DETAILS[id]
  if (!passage) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Không tìm thấy bài đọc.' } }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: passage })
}

// Seed data: A1-A2 Reading Passages with comprehension questions

export interface ReadingQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

export interface ReadingPassage {
  id: string
  title: string
  content: string
  level: string
  length: string
  topic: string
  wordCount: number
  questionCount: number
  imageUrl: string | null
  createdAt: string
  questions: ReadingQuestion[]
}

const A1_PASSAGES: ReadingPassage[] = [
  {
    id: 'r1', title: 'My Family', level: 'A1', length: 'short', topic: 'family', wordCount: 95, questionCount: 5, imageUrl: null, createdAt: '2026-01-01T00:00:00Z',
    content: 'My name is Mai. I am ten years old. I live in Hanoi with my family. There are four people in my family: my father, my mother, my brother and me. My father is a doctor. He works in a big hospital. My mother is a teacher. She teaches English at a school. My brother is eight years old. He is a student too. We are a happy family.',
    questions: [
      { id: 'q1', question: 'How old is Mai?', options: ['Eight', 'Nine', 'Ten', 'Eleven'], correctAnswer: 'Ten' },
      { id: 'q2', question: 'How many people are in Mai\'s family?', options: ['Three', 'Four', 'Five', 'Six'], correctAnswer: 'Four' },
      { id: 'q3', question: 'What does her father do?', options: ['Teacher', 'Doctor', 'Farmer', 'Driver'], correctAnswer: 'Doctor' },
      { id: 'q4', question: 'What does her mother teach?', options: ['Math', 'Science', 'English', 'History'], correctAnswer: 'English' },
      { id: 'q5', question: 'How old is Mai\'s brother?', options: ['Six', 'Seven', 'Eight', 'Ten'], correctAnswer: 'Eight' },
    ],
  },
  {
    id: 'r2', title: 'A Day at School', level: 'A1', length: 'short', topic: 'school', wordCount: 110, questionCount: 5, imageUrl: null, createdAt: '2026-01-02T00:00:00Z',
    content: 'I get up at six o\'clock every morning. I wash my face and brush my teeth. Then I have breakfast with my family. I usually eat bread and drink milk. I go to school at seven o\'clock. My school is near my house, so I walk there. School starts at seven thirty. I have four lessons in the morning. My favourite subject is English. I like my teacher because she is very kind.',
    questions: [
      { id: 'q1', question: 'What time does she get up?', options: ['Five', 'Six', 'Seven', 'Eight'], correctAnswer: 'Six' },
      { id: 'q2', question: 'What does she usually eat for breakfast?', options: ['Rice', 'Noodles', 'Bread and milk', 'Eggs'], correctAnswer: 'Bread and milk' },
      { id: 'q3', question: 'How does she go to school?', options: ['By bus', 'By bike', 'She walks', 'By car'], correctAnswer: 'She walks' },
      { id: 'q4', question: 'How many lessons does she have in the morning?', options: ['Three', 'Four', 'Five', 'Six'], correctAnswer: 'Four' },
      { id: 'q5', question: 'Why does she like her teacher?', options: ['She is young', 'She is kind', 'She is tall', 'She is funny'], correctAnswer: 'She is kind' },
    ],
  },
  {
    id: 'r3', title: 'My Best Friend', level: 'A1', length: 'short', topic: 'friends', wordCount: 105, questionCount: 5, imageUrl: null, createdAt: '2026-01-03T00:00:00Z',
    content: 'My best friend is Lan. She is eleven years old. We are in the same class at school. Lan has long black hair and big brown eyes. She is very kind and always helps me with my homework. Lan likes reading books and drawing pictures. She can draw very well. On weekends, we often go to the park together. We play games and talk about many things. I am very happy to have a friend like Lan.',
    questions: [
      { id: 'q1', question: 'How old is Lan?', options: ['Ten', 'Eleven', 'Twelve', 'Thirteen'], correctAnswer: 'Eleven' },
      { id: 'q2', question: 'What colour are Lan\'s eyes?', options: ['Black', 'Blue', 'Brown', 'Green'], correctAnswer: 'Brown' },
      { id: 'q3', question: 'What does Lan like doing?', options: ['Singing', 'Dancing', 'Reading and drawing', 'Swimming'], correctAnswer: 'Reading and drawing' },
      { id: 'q4', question: 'Where do they go on weekends?', options: ['The cinema', 'The park', 'The library', 'The market'], correctAnswer: 'The park' },
      { id: 'q5', question: 'How does the writer feel about Lan?', options: ['Sad', 'Angry', 'Happy', 'Worried'], correctAnswer: 'Happy' },
    ],
  },
  {
    id: 'r4', title: 'Shopping Day', level: 'A1', length: 'short', topic: 'shopping', wordCount: 100, questionCount: 5, imageUrl: null, createdAt: '2026-01-04T00:00:00Z',
    content: 'On Sunday, my mother and I go to the market. The market is big and has many things. We buy vegetables, fruit, and meat. My mother buys some apples and bananas. I like oranges, so she buys some for me. We also buy rice and eggs. After shopping, we go to a small shop and drink fresh juice. I have orange juice and my mother has coconut water. We go home at noon.',
    questions: [
      { id: 'q1', question: 'When do they go to the market?', options: ['Saturday', 'Sunday', 'Monday', 'Friday'], correctAnswer: 'Sunday' },
      { id: 'q2', question: 'What fruit does the writer like?', options: ['Apples', 'Bananas', 'Oranges', 'Grapes'], correctAnswer: 'Oranges' },
      { id: 'q3', question: 'What do they drink after shopping?', options: ['Tea', 'Coffee', 'Juice', 'Water'], correctAnswer: 'Juice' },
      { id: 'q4', question: 'What does the mother drink?', options: ['Orange juice', 'Coconut water', 'Apple juice', 'Tea'], correctAnswer: 'Coconut water' },
      { id: 'q5', question: 'When do they go home?', options: ['Morning', 'Noon', 'Afternoon', 'Evening'], correctAnswer: 'Noon' },
    ],
  },
  {
    id: 'r5', title: 'My Pet Cat', level: 'A1', length: 'short', topic: 'animals', wordCount: 90, questionCount: 5, imageUrl: null, createdAt: '2026-01-05T00:00:00Z',
    content: 'I have a pet cat. Her name is Mimi. She is white and brown. She is two years old. Mimi is very cute and friendly. She likes to play with a small ball. Every morning, she sleeps on my bed. She eats fish and drinks milk. I feed her two times a day. When I come home from school, Mimi runs to the door. She is always happy to see me. I love my cat very much.',
    questions: [
      { id: 'q1', question: 'What is the cat\'s name?', options: ['Miu', 'Mimi', 'Kitty', 'Luna'], correctAnswer: 'Mimi' },
      { id: 'q2', question: 'What colour is the cat?', options: ['Black', 'Grey', 'White and brown', 'Orange'], correctAnswer: 'White and brown' },
      { id: 'q3', question: 'What does the cat like to play with?', options: ['A toy mouse', 'A small ball', 'A string', 'A paper'], correctAnswer: 'A small ball' },
      { id: 'q4', question: 'How many times does the writer feed the cat?', options: ['Once', 'Twice', 'Three times', 'Four times'], correctAnswer: 'Twice' },
      { id: 'q5', question: 'What does the cat do when the writer comes home?', options: ['Sleeps', 'Hides', 'Runs to the door', 'Eats'], correctAnswer: 'Runs to the door' },
    ],
  },
  {
    id: 'r6', title: 'My Neighbourhood', level: 'A1', length: 'medium', topic: 'neighborhood', wordCount: 140, questionCount: 5, imageUrl: null, createdAt: '2026-01-06T00:00:00Z',
    content: 'I live in a small neighbourhood in the city. It is very quiet and clean. There are many trees and flowers on the streets. My house is on a small street with ten other houses. Next to my house, there is a small park. Children play there every afternoon. Near the park, there is a supermarket and a bakery. The bakery sells very good bread. There is also a small library on the corner. I like to go there and read books on weekends. The people in my neighbourhood are very friendly. I really like living here.',
    questions: [
      { id: 'q1', question: 'Where does the writer live?', options: ['In a village', 'In a small neighbourhood', 'On a farm', 'In a big apartment'], correctAnswer: 'In a small neighbourhood' },
      { id: 'q2', question: 'What is next to the house?', options: ['A school', 'A hospital', 'A park', 'A cinema'], correctAnswer: 'A park' },
      { id: 'q3', question: 'What does the bakery sell?', options: ['Cakes', 'Bread', 'Pizza', 'Cookies'], correctAnswer: 'Bread' },
      { id: 'q4', question: 'Where does the writer go on weekends?', options: ['The park', 'The library', 'The supermarket', 'The cinema'], correctAnswer: 'The library' },
      { id: 'q5', question: 'How are the people in the neighbourhood?', options: ['Busy', 'Noisy', 'Friendly', 'Quiet'], correctAnswer: 'Friendly' },
    ],
  },
]

const A2_PASSAGES: ReadingPassage[] = [
  {
    id: 'r7', title: 'A Day at the Zoo', level: 'A2', length: 'medium', topic: 'animals', wordCount: 210, questionCount: 5, imageUrl: null, createdAt: '2026-01-07T00:00:00Z',
    content: 'Last Saturday, my family and I went to the zoo. It was a beautiful sunny day. We arrived at the zoo at nine o\'clock in the morning. First, we saw the elephants. They were very big and they were eating leaves from a tree. My little brother was very excited. Then we walked to the monkey area. The monkeys were jumping and playing. They made funny noises and we all laughed. After that, we visited the bird house. There were many colourful birds from different countries. At noon, we sat on a bench and ate sandwiches for lunch. In the afternoon, we watched a dolphin show. The dolphins jumped through hoops and splashed water. It was the best part of the day. We left the zoo at four o\'clock. I was tired but very happy.',
    questions: [
      { id: 'q1', question: 'When did they go to the zoo?', options: ['Friday', 'Saturday', 'Sunday', 'Monday'], correctAnswer: 'Saturday' },
      { id: 'q2', question: 'What were the elephants doing?', options: ['Sleeping', 'Walking', 'Eating leaves', 'Drinking water'], correctAnswer: 'Eating leaves' },
      { id: 'q3', question: 'What did they see after the monkeys?', options: ['Lions', 'Birds', 'Snakes', 'Fish'], correctAnswer: 'Birds' },
      { id: 'q4', question: 'What was the best part of the day?', options: ['The elephants', 'The monkeys', 'The dolphin show', 'The birds'], correctAnswer: 'The dolphin show' },
      { id: 'q5', question: 'How did the writer feel at the end of the day?', options: ['Angry', 'Sad', 'Tired but happy', 'Bored'], correctAnswer: 'Tired but happy' },
    ],
  },
  {
    id: 'r8', title: 'A Trip to Da Lat', level: 'A2', length: 'medium', topic: 'travel', wordCount: 200, questionCount: 5, imageUrl: null, createdAt: '2026-01-08T00:00:00Z',
    content: 'Last summer, my family went on a trip to Da Lat. We went there by plane. The flight took about one hour. Da Lat is a beautiful city in the mountains. The weather there is cool all year, unlike the hot weather in my city. We stayed in a small hotel near the lake. On the first day, we visited the Flower Garden. There were thousands of beautiful flowers. I took many photos there. The next day, we went to the Valley of Love. It was very romantic. My parents enjoyed it very much. We also tried many local foods. The strawberries in Da Lat are the best I have ever eaten. On the last day, we bought some souvenirs for our friends. It was a wonderful trip and I hope to go back one day.',
    questions: [
      { id: 'q1', question: 'How did they travel to Da Lat?', options: ['By bus', 'By train', 'By plane', 'By car'], correctAnswer: 'By plane' },
      { id: 'q2', question: 'How is the weather in Da Lat?', options: ['Hot', 'Warm', 'Cool', 'Cold and snowy'], correctAnswer: 'Cool' },
      { id: 'q3', question: 'What did they visit on the first day?', options: ['The lake', 'The Flower Garden', 'The market', 'The Valley of Love'], correctAnswer: 'The Flower Garden' },
      { id: 'q4', question: 'What food did the writer especially like?', options: ['Rice', 'Noodles', 'Strawberries', 'Bananas'], correctAnswer: 'Strawberries' },
      { id: 'q5', question: 'What did they do on the last day?', options: ['Visited the lake', 'Went to a restaurant', 'Bought souvenirs', 'Stayed at the hotel'], correctAnswer: 'Bought souvenirs' },
    ],
  },
  {
    id: 'r9', title: 'Learning English', level: 'A2', length: 'medium', topic: 'study', wordCount: 190, questionCount: 5, imageUrl: null, createdAt: '2026-01-09T00:00:00Z',
    content: 'I started learning English two years ago. At first, it was very difficult. I could not understand anything. But I did not give up. I practice English every day for about one hour. In the morning, I listen to English songs or short stories. This helps me improve my listening skill. In the afternoon, I read English books. I started with simple books and now I can read longer stories. I also write new words in a small notebook. I try to use them in sentences. On weekends, I go to an English club near my house. I can speak English with other students there. My teacher says my English is getting better and better. I feel more confident now. Learning English is not easy, but it is very useful. I hope I can speak English fluently one day.',
    questions: [
      { id: 'q1', question: 'When did the writer start learning English?', options: ['One year ago', 'Two years ago', 'Three years ago', 'Last month'], correctAnswer: 'Two years ago' },
      { id: 'q2', question: 'What does the writer do in the morning?', options: ['Read books', 'Write stories', 'Listen to songs', 'Watch TV'], correctAnswer: 'Listen to songs' },
      { id: 'q3', question: 'What does the writer use to write new words?', options: ['A phone', 'A computer', 'A notebook', 'A dictionary'], correctAnswer: 'A notebook' },
      { id: 'q4', question: 'Where does the writer go on weekends?', options: ['The library', 'An English club', 'The cinema', 'A restaurant'], correctAnswer: 'An English club' },
      { id: 'q5', question: 'How does the writer feel about learning English now?', options: ['Bored', 'Frustrated', 'More confident', 'Sad'], correctAnswer: 'More confident' },
    ],
  },
  {
    id: 'r10', title: 'A Healthy Lifestyle', level: 'A2', length: 'medium', topic: 'health', wordCount: 180, questionCount: 5, imageUrl: null, createdAt: '2026-01-10T00:00:00Z',
    content: 'My name is Tom and I want to share some tips for a healthy life. First, it is important to eat well. I eat a lot of vegetables and fruit every day. I also drink at least eight glasses of water. I do not eat too much fast food or drink too many soft drinks. Second, exercise is very important. I run for thirty minutes every morning before breakfast. On weekends, I play football with my friends in the park. Third, sleep is necessary for health. I always go to bed before eleven o\'clock and sleep for about eight hours. I do not use my phone before bed because it makes it hard to sleep. Finally, I try to stay positive and not worry too much. A healthy mind is as important as a healthy body.',
    questions: [
      { id: 'q1', question: 'How many glasses of water does Tom drink?', options: ['Five', 'Six', 'Eight', 'Ten'], correctAnswer: 'Eight' },
      { id: 'q2', question: 'What exercise does Tom do every morning?', options: ['Swimming', 'Running', 'Cycling', 'Walking'], correctAnswer: 'Running' },
      { id: 'q3', question: 'When does Tom play football?', options: ['Monday', 'Wednesday', 'Weekends', 'Every day'], correctAnswer: 'Weekends' },
      { id: 'q4', question: 'Why does Tom not use his phone before bed?', options: ['It is boring', 'It makes it hard to sleep', 'The phone is broken', 'He does not have a phone'], correctAnswer: 'It makes it hard to sleep' },
      { id: 'q5', question: 'What does Tom say is as important as a healthy body?', options: ['Good food', 'A healthy mind', 'Lots of money', 'Many friends'], correctAnswer: 'A healthy mind' },
    ],
  },
]

export const ALL_PASSAGES: ReadingPassage[] = [...A1_PASSAGES, ...A2_PASSAGES]
export const TOTAL_PASSAGES = ALL_PASSAGES.length

export interface VocabWord {
  id: string;
  word: string;
  phoneticUk: string;
  phoneticUs: string;
  partOfSpeech: string;
  definition: string;
  exampleSentence: string;
}

export interface VocabSet {
  id: string;
  name: string;
  description: string;
  level: string;
  totalWords: number;
  learnedWords: number;
  progressPercent: number;
  lastStudiedAt: string | null;
}

// A1 Basic Greetings & Introductions
const A1_GREETINGS: VocabWord[] = [
  { id: 'g001', word: 'hello', phoneticUk: '/həloʊ/', phoneticUs: '/həloʊ/', partOfSpeech: 'exclamation', definition: 'xin chào', exampleSentence: 'Hello, how are you?' },
  { id: 'g002', word: 'hi', phoneticUk: '/haɪ/', phoneticUs: '/haɪ/', partOfSpeech: 'exclamation', definition: 'chào (thân mật)', exampleSentence: 'Hi, nice to meet you.' },
  { id: 'g003', word: 'goodbye', phoneticUk: '/ɡʊdbɑɪ/', phoneticUs: '/ɡʊdbɑɪ/', partOfSpeech: 'exclamation', definition: 'tạm biệt', exampleSentence: 'Goodbye, see you tomorrow.' },
  { id: 'g004', word: 'bye', phoneticUk: '/baɪ/', phoneticUs: '/baɪ/', partOfSpeech: 'exclamation', definition: 'tạm biệt (thân mật)', exampleSentence: 'Bye! Have a nice day.' },
  { id: 'g005', word: 'morning', phoneticUk: '/mɔrnɪŋ/', phoneticUs: '/mɔrnɪŋ/', partOfSpeech: 'noun', definition: 'buổi sáng', exampleSentence: 'Good morning, everyone.' },
  { id: 'g006', word: 'afternoon', phoneticUk: '/æftənnuːn/', phoneticUs: '/æftənnuːn/', partOfSpeech: 'noun', definition: 'buổi chiều', exampleSentence: 'Good afternoon, sir.' },
  { id: 'g007', word: 'evening', phoneticUk: '/ivəniŋ/', phoneticUs: '/ivəniŋ/', partOfSpeech: 'noun', definition: 'buổi tối', exampleSentence: 'Good evening, how was your day?' },
  { id: 'g008', word: 'night', phoneticUk: '/naɪt/', phoneticUs: '/naɪt/', partOfSpeech: 'noun', definition: 'đêm, buổi tối muộn', exampleSentence: 'Good night, sleep well.' },
  { id: 'g009', word: 'welcome', phoneticUk: '/wɛlkəm/', phoneticUs: '/wɛlkəm/', partOfSpeech: 'exclamation', definition: 'chào mừng', exampleSentence: 'Welcome to my home.' },
  { id: 'g010', word: 'please', phoneticUk: '/pli:z/', phoneticUs: '/pli:z/', partOfSpeech: 'exclamation', definition: 'làm ơn, xin vui lòng', exampleSentence: 'Please sit down.' },
  { id: 'g011', word: 'thanks', phoneticUk: '/θæŋks/', phoneticUs: '/θæŋks/', partOfSpeech: 'exclamation', definition: 'cảm ơn', exampleSentence: 'Thanks for your help.' },
  { id: 'g012', word: 'sorry', phoneticUk: '/sɔri/', phoneticUs: '/sɔri/', partOfSpeech: 'exclamation', definition: 'xin lỗi', exampleSentence: 'I am sorry, I am late.' },
  { id: 'g013', word: 'excuse', phoneticUk: '/ɪskjuːz/', phoneticUs: '/ɪskjuːz/', partOfSpeech: 'verb', definition: 'xin lỗi, thứ lỗi', exampleSentence: 'Excuse me, where is the station?' },
  { id: 'g014', word: 'name', phoneticUk: '/neɪm/', phoneticUs: '/neɪm/', partOfSpeech: 'noun', definition: 'tên', exampleSentence: 'My name is Anna.' },
  { id: 'g015', word: 'meet', phoneticUk: '/miːt/', phoneticUs: '/miːt/', partOfSpeech: 'verb', definition: 'gặp', exampleSentence: 'Nice to meet you.' },
  { id: 'g016', word: 'introduce', phoneticUk: '/ɪntrəduːs/', phoneticUs: '/ɪntrəduːs/', partOfSpeech: 'verb', definition: 'giới thiệu', exampleSentence: 'Let me introduce myself.' },
  { id: 'g017', word: 'friend', phoneticUk: '/frɛnd/', phoneticUs: '/frɛnd/', partOfSpeech: 'noun', definition: 'bạn bè', exampleSentence: 'She is my best friend.' },
  { id: 'g018', word: 'how', phoneticUk: '/haʊ/', phoneticUs: '/haʊ/', partOfSpeech: 'adverb', definition: 'như thế nào', exampleSentence: 'How are you?' },
  { id: 'g019', word: 'fine', phoneticUk: '/faɪn/', phoneticUs: '/faɪn/', partOfSpeech: 'adjective', definition: 'khỏe, tốt', exampleSentence: 'I am fine, thank you.' },
  { id: 'g020', word: 'well', phoneticUk: '/wɛl/', phoneticUs: '/wɛl/', partOfSpeech: 'adverb', definition: 'tốt, khỏe', exampleSentence: 'She speaks English very well.' },
  { id: 'g021', word: 'nice', phoneticUk: '/naɪs/', phoneticUs: '/naɪs/', partOfSpeech: 'adjective', definition: 'tốt, đẹp, dễ chịu', exampleSentence: 'The weather is nice today.' },
  { id: 'g022', word: 'happy', phoneticUk: '/hæpi/', phoneticUs: '/hæpi/', partOfSpeech: 'adjective', definition: 'vui vẻ, hạnh phúc', exampleSentence: 'I am happy to see you.' },
  { id: 'g023', word: 'sad', phoneticUk: '/sæd/', phoneticUs: '/sæd/', partOfSpeech: 'adjective', definition: 'buồn', exampleSentence: 'She looks sad today.' },
  { id: 'g024', word: 'tired', phoneticUk: '/taɪrd/', phoneticUs: '/taɪrd/', partOfSpeech: 'adjective', definition: 'mệt mỏi', exampleSentence: 'I am very tired after work.' },
]

// A1 Food & Drink
const A1_FOOD: VocabWord[] = [
  { id: 'd001', word: 'food', phoneticUk: '/fuːd/', phoneticUs: '/fuːd/', partOfSpeech: 'noun', definition: 'thức ăn', exampleSentence: 'The food here is delicious.' },
  { id: 'd002', word: 'water', phoneticUk: '/wɔtər/', phoneticUs: '/wɔtər/', partOfSpeech: 'noun', definition: 'nước', exampleSentence: 'Can I have a glass of water?' },
  { id: 'd003', word: 'rice', phoneticUk: '/raɪs/', phoneticUs: '/raɪs/', partOfSpeech: 'noun', definition: 'cơm, gạo', exampleSentence: 'We eat rice every day.' },
  { id: 'd004', word: 'bread', phoneticUk: '/brɛd/', phoneticUs: '/brɛd/', partOfSpeech: 'noun', definition: 'bánh mì', exampleSentence: 'I eat bread for breakfast.' },
  { id: 'd005', word: 'milk', phoneticUk: '/mɪlk/', phoneticUs: '/mɪlk/', partOfSpeech: 'noun', definition: 'sữa', exampleSentence: 'Children need to drink milk.' },
  { id: 'd006', word: 'egg', phoneticUk: '/eɡ/', phoneticUs: '/eɡ/', partOfSpeech: 'noun', definition: 'trứng', exampleSentence: 'I have two eggs for breakfast.' },
  { id: 'd007', word: 'meat', phoneticUk: '/miːt/', phoneticUs: '/miːt/', partOfSpeech: 'noun', definition: 'thịt', exampleSentence: 'Do you eat meat?' },
  { id: 'd008', word: 'chicken', phoneticUk: '/tʃɪkɪn/', phoneticUs: '/tʃɪkɪn/', partOfSpeech: 'noun', definition: 'gà, thịt gà', exampleSentence: 'We have chicken for dinner.' },
  { id: 'd009', word: 'fish', phoneticUk: '/fɪʃ/', phoneticUs: '/fɪʃ/', partOfSpeech: 'noun', definition: 'cá', exampleSentence: 'Fresh fish is very healthy.' },
  { id: 'd010', word: 'fruit', phoneticUk: '/fruːt/', phoneticUs: '/fruːt/', partOfSpeech: 'noun', definition: 'trái cây, hoa quả', exampleSentence: 'I eat fruit every morning.' },
  { id: 'd011', word: 'vegetable', phoneticUk: '/vɛdʒtəbəl/', phoneticUs: '/vɛdʒtəbəl/', partOfSpeech: 'noun', definition: 'rau', exampleSentence: 'Eat more vegetables please.' },
  { id: 'd012', word: 'apple', phoneticUk: '/æpəl/', phoneticUs: '/æpəl/', partOfSpeech: 'noun', definition: 'quả táo', exampleSentence: 'An apple a day keeps the doctor away.' },
  { id: 'd013', word: 'banana', phoneticUk: '/bənæn/', phoneticUs: '/bænæn/', partOfSpeech: 'noun', definition: 'quả chuối', exampleSentence: 'I like bananas for a snack.' },
  { id: 'd014', word: 'orange', phoneticUk: '/ˈɔrɪndʒ/', phoneticUs: '/ˈɔrɪndʒ/', partOfSpeech: 'noun', definition: 'quả cam', exampleSentence: 'Orange juice is my favourite.' },
  { id: 'd015', word: 'coffee', phoneticUk: '/kɒfi/', phoneticUs: '/kɔːfi/', partOfSpeech: 'noun', definition: 'cà phê', exampleSentence: 'I drink coffee every morning.' },
  { id: 'd016', word: 'tea', phoneticUk: '/ti:/', phoneticUs: '/ti:/', partOfSpeech: 'noun', definition: 'trà', exampleSentence: 'Would you like a cup of tea?' },
]

// Export vocabulary data
export const VOCABULARY_DATA = {
  'A1': [...A1_GREETINGS, ...A1_FOOD],
}

export const VOCAB_SETS = [
  {
    set: { id: 'a1', name: 'A1 Vocabulary', description: 'Basic vocabulary for A1 level', level: 'A1', totalWords: VOCABULARY_DATA.A1.length, learnedWords: 0, progressPercent: 0, lastStudiedAt: null },
    words: VOCABULARY_DATA.A1,
  },
]
export function getAllSeedWords(): VocabWord[] {
  return [...A1_GREETINGS, ...A1_FOOD];
}
// Seed data: Vocabulary organized by CEFR Level A1-A2 topics
// Each entry includes: word, phonetic (UK/US), partOfSpeech, Vietnamese definition, example sentence

export interface VocabWord {
  id: string
  word: string
  phoneticUk: string
  phoneticUs: string
  partOfSpeech: string
  definition: string
  exampleSentence: string
}

export interface VocabSet {
  id: string
  name: string
  description: string
  level: string
  totalWords: number
  learnedWords: number
  progressPercent: number
  lastStudiedAt: string | null
}

// ── A1 Greetings & Introductions ──────────────────────────
const A1_GREETINGS: VocabWord[] = [
  { id: 'g001', word: 'hello', phoneticUk: '/həˈləʊ/', phoneticUs: '/həˈloʊ/', partOfSpeech: 'exclamation', definition: 'xin chào', exampleSentence: 'Hello, how are you?' },
  { id: 'g002', word: 'hi', phoneticUk: '/haɪ/', phoneticUs: '/haɪ/', partOfSpeech: 'exclamation', definition: 'chào (thân mật)', exampleSentence: 'Hi, nice to meet you.' },
  { id: 'g003', word: 'goodbye', phoneticUk: '/ɡʊdˈbaɪ/', phoneticUs: '/ɡʊdˈbaɪ/', partOfSpeech: 'exclamation', definition: 'tạm biệt', exampleSentence: 'Goodbye, see you tomorrow.' },
  { id: 'g004', word: 'bye', phoneticUk: '/baɪ/', phoneticUs: '/baɪ/', partOfSpeech: 'exclamation', definition: 'tạm biệt (thân mật)', exampleSentence: 'Bye! Have a nice day.' },
  { id: 'g005', word: 'morning', phoneticUk: '/ˈmɔːnɪŋ/', phoneticUs: '/ˈmɔːrnɪŋ/', partOfSpeech: 'noun', definition: 'buổi sáng', exampleSentence: 'Good morning, everyone.' },
  { id: 'g006', word: 'afternoon', phoneticUk: '/ˌɑːftəˈnuːn/', phoneticUs: '/ˌæftərˈnuːn/', partOfSpeech: 'noun', definition: 'buổi chiều', exampleSentence: 'Good afternoon, sir.' },
  { id: 'g007', word: 'evening', phoneticUk: '/ˈiːvnɪŋ/', phoneticUs: '/ˈiːvnɪŋ/', partOfSpeech: 'noun', definition: 'buổi tối', exampleSentence: 'Good evening, how was your day?' },
  { id: 'g008', word: 'night', phoneticUk: '/naɪt/', phoneticUs: '/naɪt/', partOfSpeech: 'noun', definition: 'đêm, buổi tối muộn', exampleSentence: 'Good night, sleep well.' },
  { id: 'g009', word: 'welcome', phoneticUk: '/ˈwelkəm/', phoneticUs: '/ˈwelkəm/', partOfSpeech: 'exclamation', definition: 'chào mừng', exampleSentence: 'Welcome to our home.' },
  { id: 'g010', word: 'please', phoneticUk: '/pliːz/', phoneticUs: '/pliːz/', partOfSpeech: 'exclamation', definition: 'làm ơn, xin vui lòng', exampleSentence: 'Please sit down.' },
  { id: 'g011', word: 'thanks', phoneticUk: '/θæŋks/', phoneticUs: '/θæŋks/', partOfSpeech: 'exclamation', definition: 'cảm ơn', exampleSentence: 'Thanks for your help.' },
  { id: 'g012', word: 'sorry', phoneticUk: '/ˈsɒri/', phoneticUs: '/ˈsɑːri/', partOfSpeech: 'exclamation', definition: 'xin lỗi', exampleSentence: "I'm sorry, I'm late." },
  { id: 'g013', word: 'excuse', phoneticUk: '/ɪkˈskjuːz/', phoneticUs: '/ɪkˈskjuːz/', partOfSpeech: 'verb', definition: 'xin lỗi, thứ lỗi', exampleSentence: 'Excuse me, where is the station?' },
  { id: 'g014', word: 'name', phoneticUk: '/neɪm/', phoneticUs: '/neɪm/', partOfSpeech: 'noun', definition: 'tên', exampleSentence: 'My name is Anna.' },
  { id: 'g015', word: 'meet', phoneticUk: '/miːt/', phoneticUs: '/miːt/', partOfSpeech: 'verb', definition: 'gặp', exampleSentence: 'Nice to meet you.' },
  { id: 'g016', word: 'introduce', phoneticUk: '/ˌɪntrəˈdjuːs/', phoneticUs: '/ˌɪntrəˈduːs/', partOfSpeech: 'verb', definition: 'giới thiệu', exampleSentence: 'Let me introduce myself.' },
  { id: 'g017', word: 'friend', phoneticUk: '/frend/', phoneticUs: '/frend/', partOfSpeech: 'noun', definition: 'bạn bè', exampleSentence: 'She is my best friend.' },
  { id: 'g018', word: 'how', phoneticUk: '/haʊ/', phoneticUs: '/haʊ/', partOfSpeech: 'adverb', definition: 'như thế nào', exampleSentence: 'How are you?' },
  { id: 'g019', word: 'fine', phoneticUk: '/faɪn/', phoneticUs: '/faɪn/', partOfSpeech: 'adjective', definition: 'khỏe, tốt', exampleSentence: "I'm fine, thank you." },
  { id: 'g020', word: 'well', phoneticUk: '/wel/', phoneticUs: '/wel/', partOfSpeech: 'adverb', definition: 'tốt, khỏe', exampleSentence: "She speaks English very well." },
  { id: 'g021', word: 'nice', phoneticUk: '/naɪs/', phoneticUs: '/naɪs/', partOfSpeech: 'adjective', definition: 'tốt, đẹp, dễ chịu', exampleSentence: 'The weather is nice today.' },
  { id: 'g022', word: 'happy', phoneticUk: '/ˈhæpi/', phoneticUs: '/ˈhæpi/', partOfSpeech: 'adjective', definition: 'vui vẻ, hạnh phúc', exampleSentence: 'I am happy to see you.' },
  { id: 'g023', word: 'sad', phoneticUk: '/sæd/', phoneticUs: '/sæd/', partOfSpeech: 'adjective', definition: 'buồn', exampleSentence: "She looks sad today." },
  { id: 'g024', word: 'tired', phoneticUk: '/ˈtaɪəd/', phoneticUs: '/ˈtaɪərd/', partOfSpeech: 'adjective', definition: 'mệt mỏi', exampleSentence: 'I am very tired after work.' },
  { id: 'g025', word: 'hungry', phoneticUk: '/ˈhʌŋɡri/', phoneticUs: '/ˈhʌŋɡri/', partOfSpeech: 'adjective', definition: 'đói', exampleSentence: 'Are you hungry? Let us eat.' },
  { id: 'g026', word: 'thirsty', phoneticUk: '/ˈθɜːsti/', phoneticUs: '/ˈθɜːrsti/', partOfSpeech: 'adjective', definition: 'khát', exampleSentence: 'I am thirsty. Can I have water?' },
  { id: 'g027', word: 'cold', phoneticUk: '/kəʊld/', phoneticUs: '/koʊld/', partOfSpeech: 'adjective', definition: 'lạnh', exampleSentence: 'It is cold outside.' },
  { id: 'g028', word: 'hot', phoneticUk: '/hɒt/', phoneticUs: '/hɑːt/', partOfSpeech: 'adjective', definition: 'nóng', exampleSentence: 'The soup is very hot.' },
  { id: 'g029', word: 'good', phoneticUk: '/ɡʊd/', phoneticUs: '/ɡʊd/', partOfSpeech: 'adjective', definition: 'tốt, giỏi', exampleSentence: 'This is a good book.' },
  { id: 'g030', word: 'bad', phoneticUk: '/bæd/', phoneticUs: '/bæd/', partOfSpeech: 'adjective', definition: 'xấu, tệ', exampleSentence: 'The weather is bad today.' },
]

// ── A1 Family & People ─────────────────────────────────────
const A1_FAMILY: VocabWord[] = [
  { id: 'f001', word: 'family', phoneticUk: '/ˈfæməli/', phoneticUs: '/ˈfæməli/', partOfSpeech: 'noun', definition: 'gia đình', exampleSentence: 'My family is very big.' },
  { id: 'f002', word: 'mother', phoneticUk: '/ˈmʌðə/', phoneticUs: '/ˈmʌðər/', partOfSpeech: 'noun', definition: 'mẹ', exampleSentence: 'My mother is a teacher.' },
  { id: 'f003', word: 'father', phoneticUk: '/ˈfɑːðə/', phoneticUs: '/ˈfɑːðər/', partOfSpeech: 'noun', definition: 'cha, bố', exampleSentence: 'His father works in an office.' },
  { id: 'f004', word: 'parent', phoneticUk: '/ˈpeərənt/', phoneticUs: '/ˈperənt/', partOfSpeech: 'noun', definition: 'cha mẹ, phụ huynh', exampleSentence: 'My parents are very kind.' },
  { id: 'f005', word: 'brother', phoneticUk: '/ˈbrʌðə/', phoneticUs: '/ˈbrʌðər/', partOfSpeech: 'noun', definition: 'anh trai, em trai', exampleSentence: 'I have one brother and two sisters.' },
  { id: 'f006', word: 'sister', phoneticUk: '/ˈsɪstə/', phoneticUs: '/ˈsɪstər/', partOfSpeech: 'noun', definition: 'chị gái, em gái', exampleSentence: 'My sister is five years old.' },
  { id: 'f007', word: 'son', phoneticUk: '/sʌn/', phoneticUs: '/sʌn/', partOfSpeech: 'noun', definition: 'con trai', exampleSentence: 'Her son is in school now.' },
  { id: 'f008', word: 'daughter', phoneticUk: '/ˈdɔːtə/', phoneticUs: '/ˈdɔːtər/', partOfSpeech: 'noun', definition: 'con gái', exampleSentence: 'Their daughter is very smart.' },
  { id: 'f009', word: 'husband', phoneticUk: '/ˈhʌzbənd/', phoneticUs: '/ˈhʌzbənd/', partOfSpeech: 'noun', definition: 'chồng', exampleSentence: 'Her husband is a doctor.' },
  { id: 'f010', word: 'wife', phoneticUk: '/waɪf/', phoneticUs: '/waɪf/', partOfSpeech: 'noun', definition: 'vợ', exampleSentence: 'His wife is very beautiful.' },
  { id: 'f011', word: 'baby', phoneticUk: '/ˈbeɪbi/', phoneticUs: '/ˈbeɪbi/', partOfSpeech: 'noun', definition: 'em bé', exampleSentence: 'The baby is sleeping.' },
  { id: 'f012', word: 'child', phoneticUk: '/tʃaɪld/', phoneticUs: '/tʃaɪld/', partOfSpeech: 'noun', definition: 'đứa trẻ', exampleSentence: 'The child is playing outside.' },
  { id: 'f013', word: 'man', phoneticUk: '/mæn/', phoneticUs: '/mæn/', partOfSpeech: 'noun', definition: 'đàn ông', exampleSentence: 'The man is reading a book.' },
  { id: 'f014', word: 'woman', phoneticUk: '/ˈwʊmən/', phoneticUs: '/ˈwʊmən/', partOfSpeech: 'noun', definition: 'phụ nữ', exampleSentence: 'The woman is cooking dinner.' },
  { id: 'f015', word: 'boy', phoneticUk: '/bɔɪ/', phoneticUs: '/bɔɪ/', partOfSpeech: 'noun', definition: 'cậu bé', exampleSentence: 'The boy likes to play football.' },
  { id: 'f016', word: 'girl', phoneticUk: '/ɡɜːl/', phoneticUs: '/ɡɜːrl/', partOfSpeech: 'noun', definition: 'cô bé', exampleSentence: 'The girl has a new doll.' },
  { id: 'f017', word: 'people', phoneticUk: '/ˈpiːpəl/', phoneticUs: '/ˈpiːpəl/', partOfSpeech: 'noun', definition: 'mọi người', exampleSentence: 'Many people come to the park.' },
  { id: 'f018', word: 'person', phoneticUk: '/ˈpɜːsən/', phoneticUs: '/ˈpɜːrsən/', partOfSpeech: 'noun', definition: 'người', exampleSentence: 'She is a very kind person.' },
  { id: 'f019', word: 'grandmother', phoneticUk: '/ˈɡrænmʌðə/', phoneticUs: '/ˈɡrænmʌðər/', partOfSpeech: 'noun', definition: 'bà', exampleSentence: 'My grandmother lives with us.' },
  { id: 'f020', word: 'grandfather', phoneticUk: '/ˈɡrænfɑːðə/', phoneticUs: '/ˈɡrænfɑːðər/', partOfSpeech: 'noun', definition: 'ông', exampleSentence: 'My grandfather tells great stories.' },
]

// ── A1 Food & Drink ────────────────────────────────────────
const A1_FOOD: VocabWord[] = [
  { id: 'd001', word: 'food', phoneticUk: '/fuːd/', phoneticUs: '/fuːd/', partOfSpeech: 'noun', definition: 'thức ăn', exampleSentence: 'The food here is delicious.' },
  { id: 'd002', word: 'water', phoneticUk: '/ˈwɔːtə/', phoneticUs: '/ˈwɔːtər/', partOfSpeech: 'noun', definition: 'nước', exampleSentence: 'Can I have a glass of water?' },
  { id: 'd003', word: 'rice', phoneticUk: '/raɪs/', phoneticUs: '/raɪs/', partOfSpeech: 'noun', definition: 'cơm, gạo', exampleSentence: 'We eat rice every day.' },
  { id: 'd004', word: 'bread', phoneticUk: '/bred/', phoneticUs: '/bred/', partOfSpeech: 'noun', definition: 'bánh mì', exampleSentence: 'I eat bread for breakfast.' },
  { id: 'd005', word: 'milk', phoneticUk: '/mɪlk/', phoneticUs: '/mɪlk/', partOfSpeech: 'noun', definition: 'sữa', exampleSentence: 'Children need to drink milk.' },
  { id: 'd006', word: 'egg', phoneticUk: '/eɡ/', phoneticUs: '/eɡ/', partOfSpeech: 'noun', definition: 'trứng', exampleSentence: 'I have two eggs for breakfast.' },
  { id: 'd007', word: 'meat', phoneticUk: '/miːt/', phoneticUs: '/miːt/', partOfSpeech: 'noun', definition: 'thịt', exampleSentence: 'Do you eat meat?' },
  { id: 'd008', word: 'chicken', phoneticUk: '/ˈtʃɪkɪn/', phoneticUs: '/ˈtʃɪkɪn/', partOfSpeech: 'noun', definition: 'gà, thịt gà', exampleSentence: 'We have chicken for dinner.' },
  { id: 'd009', word: 'fish', phoneticUk: '/fɪʃ/', phoneticUs: '/fɪʃ/', partOfSpeech: 'noun', definition: 'cá', exampleSentence: 'Fresh fish is very healthy.' },
  { id: 'd010', word: 'fruit', phoneticUk: '/fruːt/', phoneticUs: '/fruːt/', partOfSpeech: 'noun', definition: 'trái cây, hoa quả', exampleSentence: 'I eat fruit every morning.' },
  { id: 'd011', word: 'vegetable', phoneticUk: '/ˈvedʒtəbəl/', phoneticUs: '/ˈvedʒtəbəl/', partOfSpeech: 'noun', definition: 'rau', exampleSentence: 'Eat more vegetables please.' },
  { id: 'd012', word: 'apple', phoneticUk: '/ˈæpəl/', phoneticUs: '/ˈæpəl/', partOfSpeech: 'noun', definition: 'quả táo', exampleSentence: 'An apple a day keeps the doctor away.' },
  { id: 'd013', word: 'banana', phoneticUk: '/bəˈnɑːnə/', phoneticUs: '/bəˈnænə/', partOfSpeech: 'noun', definition: 'quả chuối', exampleSentence: 'I like bananas for a snack.' },
  { id: 'd014', word: 'orange', phoneticUk: '/ˈɒrɪndʒ/', phoneticUs: '/ˈɔːrɪndʒ/', partOfSpeech: 'noun', definition: 'quả cam', exampleSentence: 'Orange juice is my favourite.' },
  { id: 'd015', word: 'coffee', phoneticUk: '/ˈkɒfi/', phoneticUs: '/ˈkɔːfi/', partOfSpeech: 'noun', definition: 'cà phê', exampleSentence: 'I drink coffee every morning.' },
  { id: 'd016', word: 'tea', phoneticUk: '/tiː/', phoneticUs: '/tiː/', partOfSpeech: 'noun', definition: 'trà', exampleSentence: 'Would you like a cup of tea?' },
  { id: 'd017', word: 'sugar', phoneticUk: '/ˈʃʊɡə/', phoneticUs: '/ˈʃʊɡər/', partOfSpeech: 'noun', definition: 'đường', exampleSentence: 'Do you take sugar in your coffee?' },
  { id: 'd018', word: 'salt', phoneticUk: '/sɔːlt/', phoneticUs: '/sɔːlt/', partOfSpeech: 'noun', definition: 'muối', exampleSentence: 'Please pass the salt.' },
  { id: 'd019', word: 'breakfast', phoneticUk: '/ˈbrekfəst/', phoneticUs: '/ˈbrekfəst/', partOfSpeech: 'noun', definition: 'bữa sáng', exampleSentence: 'What do you eat for breakfast?' },
  { id: 'd020', word: 'lunch', phoneticUk: '/lʌntʃ/', phoneticUs: '/lʌntʃ/', partOfSpeech: 'noun', definition: 'bữa trưa', exampleSentence: 'Let us have lunch together.' },
  { id: 'd021', word: 'dinner', phoneticUk: '/ˈdɪnə/', phoneticUs: '/ˈdɪnər/', partOfSpeech: 'noun', definition: 'bữa tối', exampleSentence: 'Dinner is ready at seven.' },
  { id: 'd022', word: 'eat', phoneticUk: '/iːt/', phoneticUs: '/iːt/', partOfSpeech: 'verb', definition: 'ăn', exampleSentence: 'I eat lunch at noon.' },
  { id: 'd023', word: 'drink', phoneticUk: '/drɪŋk/', phoneticUs: '/drɪŋk/', partOfSpeech: 'verb', definition: 'uống', exampleSentence: 'Would you like something to drink?' },
  { id: 'd024', word: 'cook', phoneticUk: '/kʊk/', phoneticUs: '/kʊk/', partOfSpeech: 'verb', definition: 'nấu ăn', exampleSentence: 'My mother cooks very well.' },
  { id: 'd025', word: 'cake', phoneticUk: '/keɪk/', phoneticUs: '/keɪk/', partOfSpeech: 'noun', definition: 'bánh ngọt', exampleSentence: 'This cake is very delicious.' },
]

// ── A1 Daily Routine ──────────────────────────────────────
const A1_DAILY: VocabWord[] = [
  { id: 'r001', word: 'wake', phoneticUk: '/weɪk/', phoneticUs: '/weɪk/', partOfSpeech: 'verb', definition: 'thức dậy', exampleSentence: 'I wake up at six every day.' },
  { id: 'r002', word: 'sleep', phoneticUk: '/sliːp/', phoneticUs: '/sliːp/', partOfSpeech: 'verb', definition: 'ngủ', exampleSentence: 'I sleep eight hours every night.' },
  { id: 'r003', word: 'bed', phoneticUk: '/bed/', phoneticUs: '/bed/', partOfSpeech: 'noun', definition: 'giường', exampleSentence: 'I go to bed at ten.' },
  { id: 'r004', word: 'bathroom', phoneticUk: '/ˈbɑːθruːm/', phoneticUs: '/ˈbæθruːm/', partOfSpeech: 'noun', definition: 'phòng tắm', exampleSentence: 'The bathroom is upstairs.' },
  { id: 'r005', word: 'shower', phoneticUk: '/ˈʃaʊə/', phoneticUs: '/ˈʃaʊər/', partOfSpeech: 'noun', definition: 'vòi sen, tắm vòi sen', exampleSentence: 'I take a shower every morning.' },
  { id: 'r006', word: 'toothbrush', phoneticUk: '/ˈtuːθbrʌʃ/', phoneticUs: '/ˈtuːθbrʌʃ/', partOfSpeech: 'noun', definition: 'bàn chải đánh răng', exampleSentence: 'I need a new toothbrush.' },
  { id: 'r007', word: 'breakfast', phoneticUk: '/ˈbrekfəst/', phoneticUs: '/ˈbrekfəst/', partOfSpeech: 'noun', definition: 'bữa sáng', exampleSentence: 'I have breakfast at seven.' },
  { id: 'r008', word: 'work', phoneticUk: '/wɜːk/', phoneticUs: '/wɜːrk/', partOfSpeech: 'verb', definition: 'làm việc', exampleSentence: 'I work in an office.' },
  { id: 'r009', word: 'school', phoneticUk: '/skuːl/', phoneticUs: '/skuːl/', partOfSpeech: 'noun', definition: 'trường học', exampleSentence: 'The children go to school by bus.' },
  { id: 'r010', word: 'study', phoneticUk: '/ˈstʌdi/', phoneticUs: '/ˈstʌdi/', partOfSpeech: 'verb', definition: 'học, nghiên cứu', exampleSentence: 'I study English every day.' },
  { id: 'r011', word: 'home', phoneticUk: '/həʊm/', phoneticUs: '/hoʊm/', partOfSpeech: 'noun', definition: 'nhà', exampleSentence: 'I go home at five.' },
  { id: 'r012', word: 'house', phoneticUk: '/haʊs/', phoneticUs: '/haʊs/', partOfSpeech: 'noun', definition: 'ngôi nhà', exampleSentence: 'My house is very small.' },
  { id: 'r013', word: 'watch', phoneticUk: '/wɒtʃ/', phoneticUs: '/wɑːtʃ/', partOfSpeech: 'verb', definition: 'xem', exampleSentence: 'We watch TV in the evening.' },
  { id: 'r014', word: 'read', phoneticUk: '/riːd/', phoneticUs: '/riːd/', partOfSpeech: 'verb', definition: 'đọc', exampleSentence: 'I like to read books.' },
  { id: 'r015', word: 'write', phoneticUk: '/raɪt/', phoneticUs: '/raɪt/', partOfSpeech: 'verb', definition: 'viết', exampleSentence: 'Please write your name here.' },
  { id: 'r016', word: 'listen', phoneticUk: '/ˈlɪsən/', phoneticUs: '/ˈlɪsən/', partOfSpeech: 'verb', definition: 'lắng nghe', exampleSentence: 'Listen to the teacher carefully.' },
  { id: 'r017', word: 'speak', phoneticUk: '/spiːk/', phoneticUs: '/spiːk/', partOfSpeech: 'verb', definition: 'nói', exampleSentence: 'Do you speak English?' },
  { id: 'r018', word: 'walk', phoneticUk: '/wɔːk/', phoneticUs: '/wɔːk/', partOfSpeech: 'verb', definition: 'đi bộ', exampleSentence: 'I walk to school every day.' },
  { id: 'r019', word: 'run', phoneticUk: '/rʌn/', phoneticUs: '/rʌn/', partOfSpeech: 'verb', definition: 'chạy', exampleSentence: 'He runs very fast.' },
  { id: 'r020', word: 'clean', phoneticUk: '/kliːn/', phoneticUs: '/kliːn/', partOfSpeech: 'verb', definition: 'dọn dẹp, lau chùi', exampleSentence: 'I clean my room on Saturday.' },
]

// ── A1 Home & Furniture ────────────────────────────────────
const A1_HOME: VocabWord[] = [
  { id: 'h001', word: 'room', phoneticUk: '/ruːm/', phoneticUs: '/ruːm/', partOfSpeech: 'noun', definition: 'phòng', exampleSentence: 'My room is very tidy.' },
  { id: 'h002', word: 'kitchen', phoneticUk: '/ˈkɪtʃɪn/', phoneticUs: '/ˈkɪtʃɪn/', partOfSpeech: 'noun', definition: 'nhà bếp', exampleSentence: 'She is cooking in the kitchen.' },
  { id: 'h003', word: 'living room', phoneticUk: '/ˈlɪvɪŋ ruːm/', phoneticUs: '/ˈlɪvɪŋ ruːm/', partOfSpeech: 'noun', definition: 'phòng khách', exampleSentence: 'We watch TV in the living room.' },
  { id: 'h004', word: 'bedroom', phoneticUk: '/ˈbedruːm/', phoneticUs: '/ˈbedruːm/', partOfSpeech: 'noun', definition: 'phòng ngủ', exampleSentence: 'The bedroom is upstairs.' },
  { id: 'h005', word: 'door', phoneticUk: '/dɔː/', phoneticUs: '/dɔːr/', partOfSpeech: 'noun', definition: 'cửa', exampleSentence: 'Please close the door.' },
  { id: 'h006', word: 'window', phoneticUk: '/ˈwɪndəʊ/', phoneticUs: '/ˈwɪndoʊ/', partOfSpeech: 'noun', definition: 'cửa sổ', exampleSentence: 'Open the window please.' },
  { id: 'h007', word: 'table', phoneticUk: '/ˈteɪbəl/', phoneticUs: '/ˈteɪbəl/', partOfSpeech: 'noun', definition: 'cái bàn', exampleSentence: 'Put the book on the table.' },
  { id: 'h008', word: 'chair', phoneticUk: '/tʃeə/', phoneticUs: '/tʃer/', partOfSpeech: 'noun', definition: 'cái ghế', exampleSentence: 'Please sit on this chair.' },
  { id: 'h009', word: 'sofa', phoneticUk: '/ˈsəʊfə/', phoneticUs: '/ˈsoʊfə/', partOfSpeech: 'noun', definition: 'ghế sô pha', exampleSentence: 'The cat is on the sofa.' },
  { id: 'h010', word: 'cupboard', phoneticUk: '/ˈkʌbəd/', phoneticUs: '/ˈkʌbərd/', partOfSpeech: 'noun', definition: 'tủ bếp, tủ đựng đồ', exampleSentence: 'The plates are in the cupboard.' },
  { id: 'h011', word: 'fridge', phoneticUk: '/frɪdʒ/', phoneticUs: '/frɪdʒ/', partOfSpeech: 'noun', definition: 'tủ lạnh', exampleSentence: 'Put the milk in the fridge.' },
  { id: 'h012', word: 'floor', phoneticUk: '/flɔː/', phoneticUs: '/flɔːr/', partOfSpeech: 'noun', definition: 'sàn nhà', exampleSentence: 'The floor is very clean.' },
  { id: 'h013', word: 'wall', phoneticUk: '/wɔːl/', phoneticUs: '/wɔːl/', partOfSpeech: 'noun', definition: 'bức tường', exampleSentence: 'There is a picture on the wall.' },
  { id: 'h014', word: 'garden', phoneticUk: '/ˈɡɑːdən/', phoneticUs: '/ˈɡɑːrdən/', partOfSpeech: 'noun', definition: 'vườn', exampleSentence: 'The flowers in the garden are beautiful.' },
  { id: 'h015', word: 'key', phoneticUk: '/kiː/', phoneticUs: '/kiː/', partOfSpeech: 'noun', definition: 'chìa khóa', exampleSentence: 'I cannot find my keys.' },
]

// ── A1 Travel & Transport ──────────────────────────────────
const A1_TRAVEL: VocabWord[] = [
  { id: 't001', word: 'car', phoneticUk: '/kɑː/', phoneticUs: '/kɑːr/', partOfSpeech: 'noun', definition: 'xe ô tô', exampleSentence: 'My father drives a blue car.' },
  { id: 't002', word: 'bus', phoneticUk: '/bʌs/', phoneticUs: '/bʌs/', partOfSpeech: 'noun', definition: 'xe buýt', exampleSentence: 'I go to school by bus.' },
  { id: 't003', word: 'train', phoneticUk: '/treɪn/', phoneticUs: '/treɪn/', partOfSpeech: 'noun', definition: 'tàu hỏa', exampleSentence: 'The train arrives at six.' },
  { id: 't004', word: 'plane', phoneticUk: '/pleɪn/', phoneticUs: '/pleɪn/', partOfSpeech: 'noun', definition: 'máy bay', exampleSentence: 'We fly by plane to Hanoi.' },
  { id: 't005', word: 'bike', phoneticUk: '/baɪk/', phoneticUs: '/baɪk/', partOfSpeech: 'noun', definition: 'xe đạp', exampleSentence: 'I ride my bike to the park.' },
  { id: 't006', word: 'taxi', phoneticUk: '/ˈtæksi/', phoneticUs: '/ˈtæksi/', partOfSpeech: 'noun', definition: 'taxi', exampleSentence: 'Let us take a taxi home.' },
  { id: 't007', word: 'station', phoneticUk: '/ˈsteɪʃən/', phoneticUs: '/ˈsteɪʃən/', partOfSpeech: 'noun', definition: 'nhà ga, bến', exampleSentence: 'Where is the train station?' },
  { id: 't008', word: 'airport', phoneticUk: '/ˈeəpɔːt/', phoneticUs: '/ˈerpɔːrt/', partOfSpeech: 'noun', definition: 'sân bay', exampleSentence: 'We need to go to the airport early.' },
  { id: 't009', word: 'hotel', phoneticUk: '/həʊˈtel/', phoneticUs: '/hoʊˈtel/', partOfSpeech: 'noun', definition: 'khách sạn', exampleSentence: 'We stay at a nice hotel.' },
  { id: 't010', word: 'street', phoneticUk: '/striːt/', phoneticUs: '/striːt/', partOfSpeech: 'noun', definition: 'đường phố', exampleSentence: 'The shop is on this street.' },
  { id: 't011', word: 'road', phoneticUk: '/rəʊd/', phoneticUs: '/roʊd/', partOfSpeech: 'noun', definition: 'con đường', exampleSentence: 'The road is very busy.' },
  { id: 't012', word: 'map', phoneticUk: '/mæp/', phoneticUs: '/mæp/', partOfSpeech: 'noun', definition: 'bản đồ', exampleSentence: 'Can I see the map please?' },
  { id: 't013', word: 'ticket', phoneticUk: '/ˈtɪkɪt/', phoneticUs: '/ˈtɪkɪt/', partOfSpeech: 'noun', definition: 'vé', exampleSentence: 'I need to buy a train ticket.' },
  { id: 't014', word: 'left', phoneticUk: '/left/', phoneticUs: '/left/', partOfSpeech: 'adjective', definition: 'bên trái', exampleSentence: 'Turn left at the corner.' },
  { id: 't015', word: 'right', phoneticUk: '/raɪt/', phoneticUs: '/raɪt/', partOfSpeech: 'adjective', definition: 'bên phải', exampleSentence: 'The shop is on the right.' },
]

// ── A1 Shopping & Money ────────────────────────────────────
const A1_SHOPPING: VocabWord[] = [
  { id: 's001', word: 'shop', phoneticUk: '/ʃɒp/', phoneticUs: '/ʃɑːp/', partOfSpeech: 'noun', definition: 'cửa hàng', exampleSentence: 'The shop opens at nine.' },
  { id: 's002', word: 'buy', phoneticUk: '/baɪ/', phoneticUs: '/baɪ/', partOfSpeech: 'verb', definition: 'mua', exampleSentence: 'I want to buy a new book.' },
  { id: 's003', word: 'sell', phoneticUk: '/sel/', phoneticUs: '/sel/', partOfSpeech: 'verb', definition: 'bán', exampleSentence: 'They sell fresh fruit here.' },
  { id: 's004', word: 'money', phoneticUk: '/ˈmʌni/', phoneticUs: '/ˈmʌni/', partOfSpeech: 'noun', definition: 'tiền', exampleSentence: 'I need some money for lunch.' },
  { id: 's005', word: 'price', phoneticUk: '/praɪs/', phoneticUs: '/praɪs/', partOfSpeech: 'noun', definition: 'giá cả', exampleSentence: 'What is the price of this bag?' },
  { id: 's006', word: 'cheap', phoneticUk: '/tʃiːp/', phoneticUs: '/tʃiːp/', partOfSpeech: 'adjective', definition: 'rẻ', exampleSentence: 'This shirt is very cheap.' },
  { id: 's007', word: 'expensive', phoneticUk: '/ɪkˈspensɪv/', phoneticUs: '/ɪkˈspensɪv/', partOfSpeech: 'adjective', definition: 'đắt', exampleSentence: 'That watch is too expensive.' },
  { id: 's008', word: 'market', phoneticUk: '/ˈmɑːkɪt/', phoneticUs: '/ˈmɑːrkɪt/', partOfSpeech: 'noun', definition: 'chợ', exampleSentence: 'I go to the market every Sunday.' },
  { id: 's009', word: 'supermarket', phoneticUk: '/ˈsuːpəmɑːkɪt/', phoneticUs: '/ˈsuːpərmɑːrkɪt/', partOfSpeech: 'noun', definition: 'siêu thị', exampleSentence: 'We buy food at the supermarket.' },
  { id: 's010', word: 'size', phoneticUk: '/saɪz/', phoneticUs: '/saɪz/', partOfSpeech: 'noun', definition: 'kích cỡ', exampleSentence: 'What size do you need?' },
  { id: 's011', word: 'pay', phoneticUk: '/peɪ/', phoneticUs: '/peɪ/', partOfSpeech: 'verb', definition: 'trả tiền', exampleSentence: 'Can I pay by card?' },
  { id: 's012', word: 'bill', phoneticUk: '/bɪl/', phoneticUs: '/bɪl/', partOfSpeech: 'noun', definition: 'hóa đơn', exampleSentence: 'Can I have the bill please?' },
  { id: 's013', word: 'bag', phoneticUk: '/bæɡ/', phoneticUs: '/bæɡ/', partOfSpeech: 'noun', definition: 'túi, cặp', exampleSentence: 'Do you need a bag?' },
  { id: 's014', word: 'receipt', phoneticUk: '/rɪˈsiːt/', phoneticUs: '/rɪˈsiːt/', partOfSpeech: 'noun', definition: 'biên lai', exampleSentence: 'Please keep the receipt.' },
  { id: 's015', word: 'cash', phoneticUk: '/kæʃ/', phoneticUs: '/kæʃ/', partOfSpeech: 'noun', definition: 'tiền mặt', exampleSentence: 'Do you have cash or card?' },
]

// ── A1 Health & Body ───────────────────────────────────────
const A1_HEALTH: VocabWord[] = [
  { id: 'hl001', word: 'head', phoneticUk: '/hed/', phoneticUs: '/hed/', partOfSpeech: 'noun', definition: 'đầu', exampleSentence: 'My head hurts.' },
  { id: 'hl002', word: 'face', phoneticUk: '/feɪs/', phoneticUs: '/feɪs/', partOfSpeech: 'noun', definition: 'khuôn mặt', exampleSentence: 'Wash your face please.' },
  { id: 'hl003', word: 'eye', phoneticUk: '/aɪ/', phoneticUs: '/aɪ/', partOfSpeech: 'noun', definition: 'mắt', exampleSentence: 'She has beautiful eyes.' },
  { id: 'hl004', word: 'nose', phoneticUk: '/nəʊz/', phoneticUs: '/noʊz/', partOfSpeech: 'noun', definition: 'mũi', exampleSentence: 'My nose is running.' },
  { id: 'hl005', word: 'mouth', phoneticUk: '/maʊθ/', phoneticUs: '/maʊθ/', partOfSpeech: 'noun', definition: 'miệng', exampleSentence: 'Open your mouth please.' },
  { id: 'hl006', word: 'hand', phoneticUk: '/hænd/', phoneticUs: '/hænd/', partOfSpeech: 'noun', definition: 'bàn tay', exampleSentence: 'Wash your hands before eating.' },
  { id: 'hl007', word: 'foot', phoneticUk: '/fʊt/', phoneticUs: '/fʊt/', partOfSpeech: 'noun', definition: 'bàn chân', exampleSentence: 'My foot hurts from walking.' },
  { id: 'hl008', word: 'doctor', phoneticUk: '/ˈdɒktə/', phoneticUs: '/ˈdɑːktər/', partOfSpeech: 'noun', definition: 'bác sĩ', exampleSentence: 'I need to see a doctor.' },
  { id: 'hl009', word: 'hospital', phoneticUk: '/ˈhɒspɪtəl/', phoneticUs: '/ˈhɑːspɪtəl/', partOfSpeech: 'noun', definition: 'bệnh viện', exampleSentence: 'She is in the hospital.' },
  { id: 'hl010', word: 'medicine', phoneticUk: '/ˈmedɪsɪn/', phoneticUs: '/ˈmedɪsɪn/', partOfSpeech: 'noun', definition: 'thuốc', exampleSentence: 'Take this medicine three times a day.' },
  { id: 'hl011', word: 'sick', phoneticUk: '/sɪk/', phoneticUs: '/sɪk/', partOfSpeech: 'adjective', definition: 'ốm, bệnh', exampleSentence: 'I feel sick today.' },
  { id: 'hl012', word: 'healthy', phoneticUk: '/ˈhelθi/', phoneticUs: '/ˈhelθi/', partOfSpeech: 'adjective', definition: 'khỏe mạnh', exampleSentence: 'Eating fruit keeps you healthy.' },
  { id: 'hl013', word: 'exercise', phoneticUk: '/ˈeksəsaɪz/', phoneticUs: '/ˈeksərsaɪz/', partOfSpeech: 'noun', definition: 'tập thể dục', exampleSentence: 'I do exercise every morning.' },
  { id: 'hl014', word: 'rest', phoneticUk: '/rest/', phoneticUs: '/rest/', partOfSpeech: 'verb', definition: 'nghỉ ngơi', exampleSentence: 'You should rest more.' },
  { id: 'hl015', word: 'feel', phoneticUk: '/fiːl/', phoneticUs: '/fiːl/', partOfSpeech: 'verb', definition: 'cảm thấy', exampleSentence: 'How do you feel today?' },
]

// ── A1 Weather & Nature ────────────────────────────────────
const A1_WEATHER: VocabWord[] = [
  { id: 'w001', word: 'weather', phoneticUk: '/ˈweðə/', phoneticUs: '/ˈweðər/', partOfSpeech: 'noun', definition: 'thời tiết', exampleSentence: 'The weather is nice today.' },
  { id: 'w002', word: 'sun', phoneticUk: '/sʌn/', phoneticUs: '/sʌn/', partOfSpeech: 'noun', definition: 'mặt trời', exampleSentence: 'The sun is very bright.' },
  { id: 'w003', word: 'rain', phoneticUk: '/reɪn/', phoneticUs: '/reɪn/', partOfSpeech: 'noun', definition: 'mưa', exampleSentence: 'It rains a lot in summer.' },
  { id: 'w004', word: 'wind', phoneticUk: '/wɪnd/', phoneticUs: '/wɪnd/', partOfSpeech: 'noun', definition: 'gió', exampleSentence: 'The wind is strong today.' },
  { id: 'w005', word: 'cloud', phoneticUk: '/klaʊd/', phoneticUs: '/klaʊd/', partOfSpeech: 'noun', definition: 'mây', exampleSentence: 'There are many clouds in the sky.' },
  { id: 'w006', word: 'sky', phoneticUk: '/skaɪ/', phoneticUs: '/skaɪ/', partOfSpeech: 'noun', definition: 'bầu trời', exampleSentence: 'The sky is blue today.' },
  { id: 'w007', word: 'snow', phoneticUk: '/snəʊ/', phoneticUs: '/snoʊ/', partOfSpeech: 'noun', definition: 'tuyết', exampleSentence: 'It snows in winter here.' },
  { id: 'w008', word: 'tree', phoneticUk: '/triː/', phoneticUs: '/triː/', partOfSpeech: 'noun', definition: 'cây', exampleSentence: 'There is a big tree in the garden.' },
  { id: 'w009', word: 'flower', phoneticUk: '/ˈflaʊə/', phoneticUs: '/ˈflaʊər/', partOfSpeech: 'noun', definition: 'hoa', exampleSentence: 'The flowers are very beautiful.' },
  { id: 'w010', word: 'animal', phoneticUk: '/ˈænɪməl/', phoneticUs: '/ˈænɪməl/', partOfSpeech: 'noun', definition: 'động vật', exampleSentence: 'I like animals very much.' },
  { id: 'w011', word: 'bird', phoneticUk: '/bɜːd/', phoneticUs: '/bɜːrd/', partOfSpeech: 'noun', definition: 'chim', exampleSentence: 'The birds sing in the morning.' },
  { id: 'w012', word: 'cat', phoneticUk: '/kæt/', phoneticUs: '/kæt/', partOfSpeech: 'noun', definition: 'mèo', exampleSentence: 'The cat sleeps all day.' },
  { id: 'w013', word: 'dog', phoneticUk: '/dɒɡ/', phoneticUs: '/dɔːɡ/', partOfSpeech: 'noun', definition: 'chó', exampleSentence: 'I walk my dog every day.' },
  { id: 'w014', word: 'mountain', phoneticUk: '/ˈmaʊntɪn/', phoneticUs: '/ˈmaʊntən/', partOfSpeech: 'noun', definition: 'núi', exampleSentence: 'The mountain is very high.' },
  { id: 'w015', word: 'river', phoneticUk: '/ˈrɪvə/', phoneticUs: '/ˈrɪvər/', partOfSpeech: 'noun', definition: 'sông', exampleSentence: 'The river is very long.' },
]

// ── A1 Work & Study ────────────────────────────────────────
const A1_WORK: VocabWord[] = [
  { id: 'wk001', word: 'teacher', phoneticUk: '/ˈtiːtʃə/', phoneticUs: '/ˈtiːtʃər/', partOfSpeech: 'noun', definition: 'giáo viên', exampleSentence: 'My teacher is very kind.' },
  { id: 'wk002', word: 'student', phoneticUk: '/ˈstjuːdənt/', phoneticUs: '/ˈstuːdənt/', partOfSpeech: 'noun', definition: 'học sinh, sinh viên', exampleSentence: 'She is a good student.' },
  { id: 'wk003', word: 'class', phoneticUk: '/klɑːs/', phoneticUs: '/klæs/', partOfSpeech: 'noun', definition: 'lớp học', exampleSentence: 'My class starts at eight.' },
  { id: 'wk004', word: 'book', phoneticUk: '/bʊk/', phoneticUs: '/bʊk/', partOfSpeech: 'noun', definition: 'cuốn sách', exampleSentence: 'I read a book every week.' },
  { id: 'wk005', word: 'pen', phoneticUk: '/pen/', phoneticUs: '/pen/', partOfSpeech: 'noun', definition: 'bút mực', exampleSentence: 'Can I borrow your pen?' },
  { id: 'wk006', word: 'pencil', phoneticUk: '/ˈpensəl/', phoneticUs: '/ˈpensəl/', partOfSpeech: 'noun', definition: 'bút chì', exampleSentence: 'I write with a pencil.' },
  { id: 'wk007', word: 'paper', phoneticUk: '/ˈpeɪpə/', phoneticUs: '/ˈpeɪpər/', partOfSpeech: 'noun', definition: 'giấy', exampleSentence: 'Please write on this paper.' },
  { id: 'wk008', word: 'computer', phoneticUk: '/kəmˈpjuːtə/', phoneticUs: '/kəmˈpjuːtər/', partOfSpeech: 'noun', definition: 'máy tính', exampleSentence: 'I use a computer at work.' },
  { id: 'wk009', word: 'phone', phoneticUk: '/fəʊn/', phoneticUs: '/foʊn/', partOfSpeech: 'noun', definition: 'điện thoại', exampleSentence: 'My phone is out of battery.' },
  { id: 'wk010', word: 'office', phoneticUk: '/ˈɒfɪs/', phoneticUs: '/ˈɑːfɪs/', partOfSpeech: 'noun', definition: 'văn phòng', exampleSentence: 'I work in a big office.' },
  { id: 'wk011', word: 'question', phoneticUk: '/ˈkwestʃən/', phoneticUs: '/ˈkwestʃən/', partOfSpeech: 'noun', definition: 'câu hỏi', exampleSentence: 'Do you have any questions?' },
  { id: 'wk012', word: 'answer', phoneticUk: '/ˈɑːnsə/', phoneticUs: '/ˈænsər/', partOfSpeech: 'noun', definition: 'câu trả lời', exampleSentence: 'What is the correct answer?' },
  { id: 'wk013', word: 'learn', phoneticUk: '/lɜːn/', phoneticUs: '/lɜːrn/', partOfSpeech: 'verb', definition: 'học', exampleSentence: 'I learn English every day.' },
  { id: 'wk014', word: 'teach', phoneticUk: '/tiːtʃ/', phoneticUs: '/tiːtʃ/', partOfSpeech: 'verb', definition: 'dạy', exampleSentence: 'She teaches English at school.' },
  { id: 'wk015', word: 'understand', phoneticUk: '/ˌʌndəˈstænd/', phoneticUs: '/ˌʌndərˈstænd/', partOfSpeech: 'verb', definition: 'hiểu', exampleSentence: 'Do you understand the lesson?' },
]

// ── A1 Hobbies & Sports ────────────────────────────────────
const A1_HOBBIES: VocabWord[] = [
  { id: 'hb001', word: 'play', phoneticUk: '/pleɪ/', phoneticUs: '/pleɪ/', partOfSpeech: 'verb', definition: 'chơi', exampleSentence: 'Children play in the park.' },
  { id: 'hb002', word: 'game', phoneticUk: '/ɡeɪm/', phoneticUs: '/ɡeɪm/', partOfSpeech: 'noun', definition: 'trò chơi', exampleSentence: 'Let us play a game.' },
  { id: 'hb003', word: 'sport', phoneticUk: '/spɔːt/', phoneticUs: '/spɔːrt/', partOfSpeech: 'noun', definition: 'thể thao', exampleSentence: 'What sports do you like?' },
  { id: 'hb004', word: 'football', phoneticUk: '/ˈfʊtbɔːl/', phoneticUs: '/ˈfʊtbɔːl/', partOfSpeech: 'noun', definition: 'bóng đá', exampleSentence: 'He plays football every weekend.' },
  { id: 'hb005', word: 'swim', phoneticUk: '/swɪm/', phoneticUs: '/swɪm/', partOfSpeech: 'verb', definition: 'bơi', exampleSentence: 'I like to swim in summer.' },
  { id: 'hb006', word: 'dance', phoneticUk: '/dɑːns/', phoneticUs: '/dæns/', partOfSpeech: 'verb', definition: 'nhảy múa', exampleSentence: 'She loves to dance.' },
  { id: 'hb007', word: 'sing', phoneticUk: '/sɪŋ/', phoneticUs: '/sɪŋ/', partOfSpeech: 'verb', definition: 'hát', exampleSentence: 'He sings very well.' },
  { id: 'hb008', word: 'music', phoneticUk: '/ˈmjuːzɪk/', phoneticUs: '/ˈmjuːzɪk/', partOfSpeech: 'noun', definition: 'âm nhạc', exampleSentence: 'I listen to music every day.' },
  { id: 'hb009', word: 'movie', phoneticUk: '/ˈmuːvi/', phoneticUs: '/ˈmuːvi/', partOfSpeech: 'noun', definition: 'phim', exampleSentence: 'Let us watch a movie tonight.' },
  { id: 'hb010', word: 'draw', phoneticUk: '/drɔː/', phoneticUs: '/drɔː/', partOfSpeech: 'verb', definition: 'vẽ', exampleSentence: 'She likes to draw pictures.' },
  { id: 'hb011', word: 'camera', phoneticUk: '/ˈkæmərə/', phoneticUs: '/ˈkæmərə/', partOfSpeech: 'noun', definition: 'máy ảnh', exampleSentence: 'I take photos with my camera.' },
  { id: 'hb012', word: 'holiday', phoneticUk: '/ˈhɒlɪdeɪ/', phoneticUs: '/ˈhɑːlɪdeɪ/', partOfSpeech: 'noun', definition: 'kỳ nghỉ', exampleSentence: 'We go on holiday in August.' },
  { id: 'hb013', word: 'beach', phoneticUk: '/biːtʃ/', phoneticUs: '/biːtʃ/', partOfSpeech: 'noun', definition: 'bãi biển', exampleSentence: 'We like to go to the beach.' },
  { id: 'hb014', word: 'park', phoneticUk: '/pɑːk/', phoneticUs: '/pɑːrk/', partOfSpeech: 'noun', definition: 'công viên', exampleSentence: 'We walk in the park every day.' },
  { id: 'hb015', word: 'swimming pool', phoneticUk: '/ˈswɪmɪŋ puːl/', phoneticUs: '/ˈswɪmɪŋ puːl/', partOfSpeech: 'noun', definition: 'hồ bơi', exampleSentence: 'The swimming pool is very big.' },
]

// ── A1 Clothes & Colors ────────────────────────────────────
const A1_CLOTHES: VocabWord[] = [
  { id: 'c001', word: 'shirt', phoneticUk: '/ʃɜːt/', phoneticUs: '/ʃɜːrt/', partOfSpeech: 'noun', definition: 'áo sơ mi', exampleSentence: 'He wears a white shirt.' },
  { id: 'c002', word: 'dress', phoneticUk: '/dres/', phoneticUs: '/dres/', partOfSpeech: 'noun', definition: 'váy đầm', exampleSentence: 'She bought a new dress.' },
  { id: 'c003', word: 'shoe', phoneticUk: '/ʃuː/', phoneticUs: '/ʃuː/', partOfSpeech: 'noun', definition: 'giày', exampleSentence: 'I need new shoes.' },
  { id: 'c004', word: 'hat', phoneticUk: '/hæt/', phoneticUs: '/hæt/', partOfSpeech: 'noun', definition: 'mũ', exampleSentence: 'He wears a hat in the sun.' },
  { id: 'c005', word: 'coat', phoneticUk: '/kəʊt/', phoneticUs: '/koʊt/', partOfSpeech: 'noun', definition: 'áo khoác', exampleSentence: 'Wear a coat, it is cold.' },
  { id: 'c006', word: 'colour', phoneticUk: '/ˈkʌlə/', phoneticUs: '/ˈkʌlər/', partOfSpeech: 'noun', definition: 'màu sắc', exampleSentence: 'What colour is your car?' },
  { id: 'c007', word: 'red', phoneticUk: '/red/', phoneticUs: '/red/', partOfSpeech: 'adjective', definition: 'màu đỏ', exampleSentence: 'She has a red bag.' },
  { id: 'c008', word: 'blue', phoneticUk: '/bluː/', phoneticUs: '/bluː/', partOfSpeech: 'adjective', definition: 'màu xanh dương', exampleSentence: 'The sky is blue.' },
  { id: 'c009', word: 'green', phoneticUk: '/ɡriːn/', phoneticUs: '/ɡriːn/', partOfSpeech: 'adjective', definition: 'màu xanh lá', exampleSentence: 'The grass is green.' },
  { id: 'c010', word: 'yellow', phoneticUk: '/ˈjeləʊ/', phoneticUs: '/ˈjeloʊ/', partOfSpeech: 'adjective', definition: 'màu vàng', exampleSentence: 'The sun is yellow.' },
  { id: 'c011', word: 'white', phoneticUk: '/waɪt/', phoneticUs: '/waɪt/', partOfSpeech: 'adjective', definition: 'màu trắng', exampleSentence: 'Snow is white.' },
  { id: 'c012', word: 'black', phoneticUk: '/blæk/', phoneticUs: '/blæk/', partOfSpeech: 'adjective', definition: 'màu đen', exampleSentence: 'I have a black cat.' },
  { id: 'c013', word: 'wear', phoneticUk: '/weə/', phoneticUs: '/wer/', partOfSpeech: 'verb', definition: 'mặc, đội', exampleSentence: 'What are you wearing today?' },
  { id: 'c014', word: 'big', phoneticUk: '/bɪɡ/', phoneticUs: '/bɪɡ/', partOfSpeech: 'adjective', definition: 'to, lớn', exampleSentence: 'This bag is too big.' },
  { id: 'c015', word: 'small', phoneticUk: '/smɔːl/', phoneticUs: '/smɔːl/', partOfSpeech: 'adjective', definition: 'nhỏ', exampleSentence: 'My room is very small.' },
]

// ── A1 Numbers & Time ──────────────────────────────────────
const A1_NUMBERS: VocabWord[] = [
  { id: 'n001', word: 'one', phoneticUk: '/wʌn/', phoneticUs: '/wʌn/', partOfSpeech: 'number', definition: 'số một', exampleSentence: 'I have one brother.' },
  { id: 'n002', word: 'two', phoneticUk: '/tuː/', phoneticUs: '/tuː/', partOfSpeech: 'number', definition: 'số hai', exampleSentence: 'She has two cats.' },
  { id: 'n003', word: 'three', phoneticUk: '/θriː/', phoneticUs: '/θriː/', partOfSpeech: 'number', definition: 'số ba', exampleSentence: 'I need three eggs.' },
  { id: 'n004', word: 'four', phoneticUk: '/fɔː/', phoneticUs: '/fɔːr/', partOfSpeech: 'number', definition: 'số bốn', exampleSentence: 'There are four chairs.' },
  { id: 'n005', word: 'five', phoneticUk: '/faɪv/', phoneticUs: '/faɪv/', partOfSpeech: 'number', definition: 'số năm', exampleSentence: 'I wake up at five.' },
  { id: 'n006', word: 'six', phoneticUk: '/sɪks/', phoneticUs: '/sɪks/', partOfSpeech: 'number', definition: 'số sáu', exampleSentence: 'She is six years old.' },
  { id: 'n007', word: 'seven', phoneticUk: '/ˈsevən/', phoneticUs: '/ˈsevən/', partOfSpeech: 'number', definition: 'số bảy', exampleSentence: 'There are seven days in a week.' },
  { id: 'n008', word: 'eight', phoneticUk: '/eɪt/', phoneticUs: '/eɪt/', partOfSpeech: 'number', definition: 'số tám', exampleSentence: 'Class starts at eight.' },
  { id: 'n009', word: 'nine', phoneticUk: '/naɪn/', phoneticUs: '/naɪn/', partOfSpeech: 'number', definition: 'số chín', exampleSentence: 'I go to bed at nine.' },
  { id: 'n010', word: 'ten', phoneticUk: '/ten/', phoneticUs: '/ten/', partOfSpeech: 'number', definition: 'số mười', exampleSentence: 'There are ten apples.' },
  { id: 'n011', word: 'time', phoneticUk: '/taɪm/', phoneticUs: '/taɪm/', partOfSpeech: 'noun', definition: 'thời gian', exampleSentence: 'What time is it?' },
  { id: 'n012', word: 'clock', phoneticUk: '/klɒk/', phoneticUs: '/klɑːk/', partOfSpeech: 'noun', definition: 'đồng hồ', exampleSentence: 'The clock on the wall is broken.' },
  { id: 'n013', word: 'today', phoneticUk: '/təˈdeɪ/', phoneticUs: '/təˈdeɪ/', partOfSpeech: 'adverb', definition: 'hôm nay', exampleSentence: 'What are you doing today?' },
  { id: 'n014', word: 'tomorrow', phoneticUk: '/təˈmɒrəʊ/', phoneticUs: '/təˈmɔːroʊ/', partOfSpeech: 'adverb', definition: 'ngày mai', exampleSentence: 'I will see you tomorrow.' },
  { id: 'n015', word: 'yesterday', phoneticUk: '/ˈjestədeɪ/', phoneticUs: '/ˈjestərdeɪ/', partOfSpeech: 'adverb', definition: 'hôm qua', exampleSentence: 'I was tired yesterday.' },
]

// ── A2 Travel & Directions ─────────────────────────────────
const A2_TRAVEL: VocabWord[] = [
  { id: 'a2t001', word: 'passport', phoneticUk: '/ˈpɑːspɔːt/', phoneticUs: '/ˈpæspɔːrt/', partOfSpeech: 'noun', definition: 'hộ chiếu', exampleSentence: 'Do not forget your passport.' },
  { id: 'a2t002', word: 'luggage', phoneticUk: '/ˈlʌɡɪdʒ/', phoneticUs: '/ˈlʌɡɪdʒ/', partOfSpeech: 'noun', definition: 'hành lý', exampleSentence: 'My luggage is very heavy.' },
  { id: 'a2t003', word: 'arrive', phoneticUk: '/əˈraɪv/', phoneticUs: '/əˈraɪv/', partOfSpeech: 'verb', definition: 'đến nơi', exampleSentence: 'We arrive at the airport at six.' },
  { id: 'a2t004', word: 'leave', phoneticUk: '/liːv/', phoneticUs: '/liːv/', partOfSpeech: 'verb', definition: 'rời đi', exampleSentence: 'The bus leaves at seven.' },
  { id: 'a2t005', word: 'visit', phoneticUk: '/ˈvɪzɪt/', phoneticUs: '/ˈvɪzɪt/', partOfSpeech: 'verb', definition: 'tham quan, thăm', exampleSentence: 'We visit our grandparents every month.' },
  { id: 'a2t006', word: 'trip', phoneticUk: '/trɪp/', phoneticUs: '/trɪp/', partOfSpeech: 'noun', definition: 'chuyến đi', exampleSentence: 'We had a great trip to Da Lat.' },
  { id: 'a2t007', word: 'journey', phoneticUk: '/ˈdʒɜːni/', phoneticUs: '/ˈdʒɜːrni/', partOfSpeech: 'noun', definition: 'hành trình', exampleSentence: 'The journey takes three hours.' },
  { id: 'a2t008', word: 'bridge', phoneticUk: '/brɪdʒ/', phoneticUs: '/brɪdʒ/', partOfSpeech: 'noun', definition: 'cây cầu', exampleSentence: 'Walk across the bridge.' },
  { id: 'a2t009', word: 'corner', phoneticUk: '/ˈkɔːnə/', phoneticUs: '/ˈkɔːrnər/', partOfSpeech: 'noun', definition: 'góc phố', exampleSentence: 'The shop is on the corner.' },
  { id: 'a2t010', word: 'straight', phoneticUk: '/streɪt/', phoneticUs: '/streɪt/', partOfSpeech: 'adverb', definition: 'thẳng', exampleSentence: 'Go straight and then turn left.' },
]

// ── TOEIC 600 Essential Words ──────────────────────────────
const TOEIC_600: VocabWord[] = [
  { id: 'tx001', word: 'contract', phoneticUk: '/ˈkɒntrækt/', phoneticUs: '/ˈkɑːntrækt/', partOfSpeech: 'noun', definition: 'hợp đồng', exampleSentence: 'Both parties signed the contract yesterday.' },
  { id: 'tx002', word: 'negotiate', phoneticUk: '/nɪˈɡəʊʃieɪt/', phoneticUs: '/nɪˈɡoʊʃieɪt/', partOfSpeech: 'verb', definition: 'đàm phán, thương lượng', exampleSentence: 'We need to negotiate a better price.' },
  { id: 'tx003', word: 'invoice', phoneticUk: '/ˈɪnvɔɪs/', phoneticUs: '/ˈɪnvɔɪs/', partOfSpeech: 'noun', definition: 'hóa đơn', exampleSentence: 'Please send the invoice by the end of the month.' },
  { id: 'tx004', word: 'shipment', phoneticUk: '/ˈʃɪpmənt/', phoneticUs: '/ˈʃɪpmənt/', partOfSpeech: 'noun', definition: 'lô hàng, việc vận chuyển', exampleSentence: 'The shipment will arrive next Tuesday.' },
  { id: 'tx005', word: 'applicant', phoneticUk: '/ˈæplɪkənt/', phoneticUs: '/ˈæplɪkənt/', partOfSpeech: 'noun', definition: 'ứng viên', exampleSentence: 'We interviewed ten applicants for the position.' },
  { id: 'tx006', word: 'promotion', phoneticUk: '/prəˈməʊʃən/', phoneticUs: '/prəˈmoʊʃən/', partOfSpeech: 'noun', definition: 'thăng chức; khuyến mãi', exampleSentence: 'She received a promotion after two years.' },
  { id: 'tx007', word: 'deadline', phoneticUk: '/ˈdedlaɪn/', phoneticUs: '/ˈdedlaɪn/', partOfSpeech: 'noun', definition: 'hạn chót', exampleSentence: 'The deadline for the report is Friday.' },
  { id: 'tx008', word: 'schedule', phoneticUk: '/ˈʃedjuːl/', phoneticUs: '/ˈskedʒuːl/', partOfSpeech: 'noun', definition: 'lịch trình', exampleSentence: 'Check the meeting schedule before booking.' },
  { id: 'tx009', word: 'refund', phoneticUk: '/ˈriːfʌnd/', phoneticUs: '/ˈriːfʌnd/', partOfSpeech: 'noun', definition: 'tiền hoàn lại', exampleSentence: 'You can request a refund within 30 days.' },
  { id: 'tx010', word: 'warranty', phoneticUk: '/ˈwɒrənti/', phoneticUs: '/ˈwɔːrənti/', partOfSpeech: 'noun', definition: 'bảo hành', exampleSentence: 'The laptop comes with a two-year warranty.' },
  { id: 'tx011', word: 'inventory', phoneticUk: '/ˈɪnvəntri/', phoneticUs: '/ˈɪnvəntɔːri/', partOfSpeech: 'noun', definition: 'hàng tồn kho', exampleSentence: 'We check the inventory every quarter.' },
  { id: 'tx012', word: 'revenue', phoneticUk: '/ˈrevənjuː/', phoneticUs: '/ˈrevənuː/', partOfSpeech: 'noun', definition: 'doanh thu', exampleSentence: 'Company revenue increased by 15% this year.' },
]

// ── Aggregate all sets ─────────────────────────────────────
export const VOCAB_SETS: Array<{ set: VocabSet; words: VocabWord[] }> = [
  { set: { id: 'a1-greetings', name: 'A1 - Greetings & Introductions', description: 'Chào hỏi, giới thiệu, cảm xúc cơ bản', level: 'A1', totalWords: 30, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_GREETINGS },
  { set: { id: 'a1-family', name: 'A1 - Family & People', description: 'Gia đình, người thân, mối quan hệ', level: 'A1', totalWords: 20, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_FAMILY },
  { set: { id: 'a1-food', name: 'A1 - Food & Drink', description: 'Thức ăn, đồ uống, bữa ăn', level: 'A1', totalWords: 25, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_FOOD },
  { set: { id: 'a1-daily', name: 'A1 - Daily Routine', description: 'Hoạt động hàng ngày, thói quen', level: 'A1', totalWords: 20, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_DAILY },
  { set: { id: 'a1-home', name: 'A1 - Home & Furniture', description: 'Nhà cửa, phòng ốc, đồ nội thất', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_HOME },
  { set: { id: 'a1-travel', name: 'A1 - Travel & Transport', description: 'Phương tiện, di chuyển, chỉ đường', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_TRAVEL },
  { set: { id: 'a1-shopping', name: 'A1 - Shopping & Money', description: 'Mua sắm, tiền bạc, giá cả', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_SHOPPING },
  { set: { id: 'a1-health', name: 'A1 - Health & Body', description: 'Sức khỏe, cơ thể, bệnh viện', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_HEALTH },
  { set: { id: 'a1-weather', name: 'A1 - Weather & Nature', description: 'Thời tiết, thiên nhiên, động vật', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_WEATHER },
  { set: { id: 'a1-work', name: 'A1 - Work & Study', description: 'Công việc, học tập, trường lớp', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_WORK },
  { set: { id: 'a1-hobbies', name: 'A1 - Hobbies & Sports', description: 'Sở thích, thể thao, giải trí', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_HOBBIES },
  { set: { id: 'a1-clothes', name: 'A1 - Clothes & Colors', description: 'Quần áo, màu sắc, kích thước', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_CLOTHES },
  { set: { id: 'a1-numbers', name: 'A1 - Numbers & Time', description: 'Số đếm, thời gian, ngày tháng', level: 'A1', totalWords: 15, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A1_NUMBERS },
  { set: { id: 'a2-travel', name: 'A2 - Travel & Directions', description: 'Du lịch, chỉ đường, phương hướng', level: 'A2', totalWords: 10, learnedWords: 0, progressPercent: 0, lastStudiedAt: null }, words: A2_TRAVEL },
  { set: { id: 'toeic-600', name: 'TOEIC 600 Essential Words', description: 'Từ vựng thiết yếu cho mục tiêu TOEIC 600', level: 'B1', totalWords: 12, learnedWords: 5, progressPercent: 42, lastStudiedAt: '2026-06-10T09:00:00Z' }, words: TOEIC_600 },
]

export const TOTAL_WORDS = VOCAB_SETS.reduce((sum, s) => sum + s.words.length, 0)

export interface Phoneme {
  id: string
  symbol: string
  example: string
  exampleVi: string
  audioHint: string
  mouthPosition: string
}

export interface PhonemeCategory {
  key: string
  label: string
  count: number
}

export interface PronunciationWord {
  id: string
  word: string
  phonetic: string
  meaning: string
  example: string
  difficultSound: string
  tips: string
}

export interface PronunciationSentence {
  id: string
  sentence: string
  translation: string
  phonetic: string
  difficultWords: string[]
  tips: string
}

export const PHONEME_CATEGORIES: PhonemeCategory[] = [
  { key: 'vowels', label: 'Nguyên âm', count: 4 },
  { key: 'consonants', label: 'Phụ âm', count: 4 },
  { key: 'tricky', label: 'Âm khó (dễ nhầm)', count: 4 },
]

export const PHONEMES: Record<string, Phoneme[]> = {
  vowels: [
    { id: '1', symbol: '/iː/', example: 'sheep', exampleVi: 'cừu', audioHint: 'Mở miệng rộng, đẩy lưỡi lên', mouthPosition: 'Lưỡi cao, môi mở rộng' },
    { id: '2', symbol: '/ɪ/', example: 'ship', exampleVi: 'tàu', audioHint: 'Ngắn hơn /iː/, lưỡi thấp hơn', mouthPosition: 'Lưỡi giữa, môi nửa mở' },
    { id: '3', symbol: '/e/', example: 'bed', exampleVi: 'giường', audioHint: 'Mở miệng vừa, lưỡi giữa', mouthPosition: 'Lưỡi giữa, môi hơi mở' },
    { id: '4', symbol: '/æ/', example: 'cat', exampleVi: 'mèo', audioHint: 'Mở miệng rộng, hàm dưới hạ', mouthPosition: 'Lưỡi thấp, môi mở rộng' },
  ],
  consonants: [
    { id: '5', symbol: '/θ/', example: 'think', exampleVi: 'nghĩ', audioHint: 'Đặt lưỡi giữa 2 răng trước, thổi hơi', mouthPosition: 'Lưỡi chạm răng trước' },
    { id: '6', symbol: '/ð/', example: 'this', exampleVi: 'cái này', audioHint: 'Giống /θ/ nhưng rung dây thanh', mouthPosition: 'Lưỡi chạm răng trước, rung' },
    { id: '7', symbol: '/ʃ/', example: 'ship', exampleVi: 'tàu', audioHint: 'Môi tròn, đẩy hơi qua răng', mouthPosition: 'Môi tròn, răng gần nhau' },
    { id: '8', symbol: '/ʒ/', example: 'vision', exampleVi: 'tầm nhìn', audioHint: 'Giống /ʃ/ nhưng rung dây thanh', mouthPosition: 'Môi tròn, rung dây thanh' },
  ],
  tricky: [
    { id: '9', symbol: '/l/ vs /r/', example: 'light / right', exampleVi: 'ánh sáng / đúng', audioHint: '/l/ đầu lưỡi chạm răng, /r/ lưỡi cong về sau', mouthPosition: 'Lưỡi vị trí khác nhau' },
    { id: '10', symbol: '/v/ vs /w/', example: 'very / worry', exampleVi: 'rất / lo lắng', audioHint: '/v/ cắn môi dưới, /w/ môi tròn', mouthPosition: 'Môi khác nhau rõ ràng' },
    { id: '11', symbol: '/s/ vs /ʃ/', example: 'see / she', exampleVi: 'nhìn / cô ấy', audioHint: '/s/ lưỡi thẳng, /ʃ/ lưỡi cong, môi tròn', mouthPosition: 'Lưỡi và môi khác nhau' },
    { id: '12', symbol: '/t/ vs /θ/', example: 'tea / think', exampleVi: 'trà / nghĩ', audioHint: '/t/ chạm nướu, /θ/ chạm răng', mouthPosition: 'Vị trí chạm lưỡi khác nhau' },
  ],
}

export const PRONUNCIATION_WORDS: PronunciationWord[] = [
  {
    id: '1',
    word: 'through',
    phonetic: '/θruː/',
    meaning: 'xuyên qua',
    example: 'walk through the park',
    difficultSound: '/θ/',
    tips: 'Đặt lưỡi giữa 2 răng trước, thổi hơi mạnh',
  },
  {
    id: '2',
    word: 'thought',
    phonetic: '/θɔːt/',
    meaning: 'nghĩ',
    example: 'I thought about it',
    difficultSound: '/θ/',
    tips: 'Giữ lưỡi chạm răng, không rung dây thanh',
  },
  {
    id: '3',
    word: 'comfortable',
    phonetic: '/ˈkʌmftəbl/',
    meaning: 'thoải mái',
    example: 'This chair is comfortable',
    difficultSound: '/ftəbl/',
    tips: 'Đọc nhanh: /ˈkʌm-fə-təbl/, bỏ âm /t/ ở giữa',
  },
  {
    id: '4',
    word: 'schedule',
    phonetic: '/ˈʃedjuːl/ (Br) /ˈskedʒuːl/ (Am)',
    meaning: 'lịch trình',
    example: 'check the schedule',
    difficultSound: '/ʃ/ vs /sk/',
    tips: 'BrE: /ʃedjuːl/, AmE: /skedʒuːl/',
  },
  {
    id: '5',
    word: 'world',
    phonetic: '/wɜːld/',
    meaning: 'thế giới',
    example: 'around the world',
    difficultSound: '/ɜːl/',
    tips: '/ɜː/ lưỡi giữa, rồi /l/ đầu lưỡi chạm nướu',
  },
]

export const PRONUNCIATION_SENTENCES: PronunciationSentence[] = [
  {
    id: '1',
    sentence: 'The quick brown fox jumps over the lazy dog.',
    translation: 'Con cáo nâu nhanh nhẹn nhảy qua con chó lười.',
    phonetic: '/ðə kwɪk braʊn fɒks dʒʌmps ˈəʊvə ðə ˈleɪzi dɒɡ/',
    difficultWords: ['quick', 'brown', 'jumps', 'lazy'],
    tips: 'Chú ý âm /kw/, /br/, /ʤ/, /leɪ/',
  },
  {
    id: '2',
    sentence: 'She sells seashells by the seashore.',
    translation: 'Cô ấy bán vỏ sò ven biển.',
    phonetic: '/ʃi selz ˈsiːʃelz baɪ ðə ˈsiːʃɔː/',
    difficultWords: ['sells', 'seashells', 'seashore'],
    tips: 'Phân biệt /ʃ/ và /s/, chú ý nguyên âm dài /iː/',
  },
  {
    id: '3',
    sentence: 'I think this thing is worth thinking about.',
    translation: 'Tôi nghĩ điều này đáng để suy nghĩ.',
    phonetic: '/aɪ θɪŋk ðɪs θɪŋ ɪz wɜːθ ˈθɪŋkɪŋ əˈbaʊt/',
    difficultWords: ['think', 'this', 'thing', 'worth', 'thinking'],
    tips: 'Luyện âm /θ/ (không rung) và /ð/ (rung) liên tục',
  },
  {
    id: '4',
    sentence: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
    translation: 'Một con chuột chũi có thể ném bao nhiêu gỗ nếu nó có thể ném gỗ?',
    phonetic: '/haʊ mʌtʃ wʊd wʊd ə ˈwʊdtʃʌk tʃʌk ɪf ə ˈwʊdtʃʌk kʊd tʃʌk wʊd/',
    difficultWords: ['wood', 'would', 'woodchuck', 'chuck'],
    tips: 'Phân biệt /w/ (môi tròn), /ʊ/ (ngắn), /tʃ/ (môi tròn + lưỡi), /d/ (đầu lưỡi)',
  },
]

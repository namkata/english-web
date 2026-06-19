export interface VocabExercise {
  id: string
  vietnamese: string
  english: string
  targetWord: string
  hint: string
  type: string
}

export interface FillInBlankExercise {
  id: string
  sentence: string
  translation: string
  answer: string
  grammarPoint: string
  hint: string
  fullSentence: string
}

export interface StructureSession {
  id: string
  title: string
  formula: string
  formulaVi: string
  explanation: string
  examples: Array<{ en: string; vi: string }>
  exercises: Array<{
    id: string
    scrambled: string[]
    answer: string
    translation: string
  }>
}

export interface GrammarTopic {
  label: string
  count: number
}

export const VOCAB_EXERCISES: VocabExercise[] = [
  {
    id: '1',
    vietnamese: 'Tôi bắt đầu một công việc mới.',
    english: 'I start a new job.',
    targetWord: 'start',
    hint: 'I ___ a new job.',
    type: 'verb',
  },
  {
    id: '2',
    vietnamese: 'Cô ấy đang làm việc ở văn phòng.',
    english: 'She works at the office.',
    targetWord: 'works',
    hint: 'She ___ at the office.',
    type: 'verb',
  },
  {
    id: '3',
    vietnamese: 'Họ đã hoàn thành dự án hôm qua.',
    english: 'They finished the project yesterday.',
    targetWord: 'finished',
    hint: 'They ___ the project yesterday.',
    type: 'verb',
  },
  {
    id: '4',
    vietnamese: 'Anh ấy không thích cà phê.',
    english: "He doesn't like coffee.",
    targetWord: "doesn't like",
    hint: 'He ___ coffee.',
    type: 'phrase',
  },
  {
    id: '5',
    vietnamese: 'Chúng tôi sẽ gặp nhau vào cuối tuần.',
    english: 'We will meet at the weekend.',
    targetWord: 'will meet',
    hint: 'We ___ at the weekend.',
    type: 'phrase',
  },
  {
    id: '6',
    vietnamese: 'Cô ấy đã sống ở đây được 5 năm.',
    english: 'She has lived here for 5 years.',
    targetWord: 'has lived',
    hint: 'She ___ here for 5 years.',
    type: 'verb',
  },
  {
    id: '7',
    vietnamese: 'Tôi chưa bao giờ đến Nhật Bản.',
    english: 'I have never been to Japan.',
    targetWord: 'have never been',
    hint: 'I ___ to Japan.',
    type: 'phrase',
  },
  {
    id: '8',
    vietnamese: 'Nếu trời mưa, chúng tôi sẽ ở nhà.',
    english: 'If it rains, we will stay at home.',
    targetWord: 'rains',
    hint: 'If it ___, we will stay at home.',
    type: 'verb',
  },
]

export const FILL_IN_BLANK_EXERCISES: FillInBlankExercise[] = [
  {
    id: '1',
    sentence: 'I ______ love you anymore.',
    translation: 'Anh không còn yêu em nữa.',
    answer: "don't",
    grammarPoint: 'Phủ định với động từ thường (thì hiện tại đơn)',
    hint: 'do + not',
    fullSentence: "I don't love you anymore.",
  },
  {
    id: '2',
    sentence: 'She ______ to the gym every morning.',
    translation: 'Cô ấy đi đến phòng gym mỗi buổi sáng.',
    answer: 'goes',
    grammarPoint: 'Động từ chia ở ngôi thứ 3 số ít (thì hiện tại đơn)',
    hint: 'go + es',
    fullSentence: 'She goes to the gym every morning.',
  },
  {
    id: '3',
    sentence: 'They ______ finished their homework yet.',
    translation: 'Họ vẫn chưa làm xong bài tập về nhà.',
    answer: "haven't",
    grammarPoint: 'Phủ định thì hiện tại hoàn thành',
    hint: 'have + not',
    fullSentence: "They haven't finished their homework yet.",
  },
  {
    id: '4',
    sentence: 'If it ______ tomorrow, we will stay at home.',
    translation: 'Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà.',
    answer: 'rains',
    grammarPoint: 'Câu điều kiện loại 1 (If + present simple, will + V)',
    hint: 'rain + s',
    fullSentence: 'If it rains tomorrow, we will stay at home.',
  },
  {
    id: '5',
    sentence: 'I wish I ______ taller.',
    translation: 'Tôi ước gì tôi cao hơn.',
    answer: 'were',
    grammarPoint: 'Câu ước với wish (hiện tại không có thật)',
    hint: 'be → were',
    fullSentence: 'I wish I were taller.',
  },
  {
    id: '6',
    sentence: 'The letter ______ written by him.',
    translation: 'Bức thư được viết bởi anh ấy.',
    answer: 'was',
    grammarPoint: 'Câu bị động thì quá khứ đơn',
    hint: 'be (quá khứ)',
    fullSentence: 'The letter was written by him.',
  },
  {
    id: '7',
    sentence: 'Where ______ she work?',
    translation: 'Cô ấy làm việc ở đâu?',
    answer: 'does',
    grammarPoint: 'Câu hỏi với Wh- ở hiện tại đơn',
    hint: 'trợ động từ cho ngôi thứ 3 số ít',
    fullSentence: 'Where does she work?',
  },
  {
    id: '8',
    sentence: 'I ______ been to Paris twice.',
    translation: 'Tôi đã đến Paris hai lần.',
    answer: 'have',
    grammarPoint: 'Thì hiện tại hoàn thành với I/you/we/they',
    hint: 'have/has',
    fullSentence: 'I have been to Paris twice.',
  },
]

export const STRUCTURE_SESSIONS: StructureSession[] = [
  {
    id: 'conditional-1',
    title: 'Câu điều kiện loại 1',
    formula: 'If + S + V(s/es), S + will + V',
    formulaVi: 'Nếu + chủ ngữ + động từ hiện tại, chủ ngữ + will + động từ nguyên thể',
    explanation: 'Diễn tả sự việc có thể xảy ra ở hiện tại hoặc tương lai. Mệnh đề IF dùng thì hiện tại đơn, mệnh đề chính dùng will + V.',
    examples: [
      { en: 'If it rains, I will stay at home.', vi: 'Nếu trời mưa, tôi sẽ ở nhà.' },
      { en: 'If you study hard, you will pass the exam.', vi: 'Nếu bạn học chăm, bạn sẽ đỗ kỳ thi.' },
    ],
    exercises: [
      {
        id: 'c1-1',
        scrambled: ['if', 'rains', 'it', 'tomorrow', 'stay', 'will', 'we', 'at', 'home'],
        answer: 'If it rains tomorrow, we will stay at home.',
        translation: 'Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà.',
      },
      {
        id: 'c1-2',
        scrambled: ['will', 'you', 'if', 'call', 'me', 'I', 'need', 'help'],
        answer: 'If you need help, call me.',
        translation: 'Nếu bạn cần giúp đỡ, hãy gọi cho tôi.',
      },
    ],
  },
  {
    id: 'present-perfect',
    title: 'Thì hiện tại hoàn thành',
    formula: 'S + have/has + V3/ed',
    formulaVi: 'Chủ ngữ + have/has + động từ phân từ II',
    explanation: 'Diễn tả hành động đã xảy ra trong quá khứ và có kết quả/kết nối với hiện tại.',
    examples: [
      { en: 'I have finished my homework.', vi: 'Tôi đã làm xong bài tập về nhà.' },
      { en: 'She has lived here for 10 years.', vi: 'Cô ấy đã sống ở đây được 10 năm.' },
    ],
    exercises: [
      {
        id: 'pp-1',
        scrambled: ['have', 'never', 'I', 'been', 'to', 'Paris'],
        answer: 'I have never been to Paris.',
        translation: 'Tôi chưa bao giờ đến Paris.',
      },
      {
        id: 'pp-2',
        scrambled: ['has', 'she', 'the', 'finished', 'project', 'yet'],
        answer: 'Has she finished the project yet?',
        translation: 'Cô ấy đã làm xong dự án chưa?',
      },
    ],
  },
  {
    id: 'passive-voice',
    title: 'Câu bị động',
    formula: 'S + be + V3/ed + (by + O)',
    formulaVi: 'Chủ ngữ + be + động từ phân từ II + (bởi + tân ngữ)',
    explanation: 'Diễn tả hành động mà chủ ngữ bị tác động bởi một tác nhân khác.',
    examples: [
      { en: 'The letter was written by him.', vi: 'Bức thư được viết bởi anh ấy.' },
      { en: 'English is spoken all over the world.', vi: 'Tiếng Anh được nói ở khắp nơi trên thế giới.' },
    ],
    exercises: [
      {
        id: 'pv-1',
        scrambled: ['was', 'the', 'cake', 'made', 'by', 'my', 'mom'],
        answer: 'The cake was made by my mom.',
        translation: 'Chiếc bánh được làm bởi mẹ tôi.',
      },
      {
        id: 'pv-2',
        scrambled: ['is', 'English', 'in', 'spoken', 'many', 'countries'],
        answer: 'English is spoken in many countries.',
        translation: 'Tiếng Anh được nói ở nhiều quốc gia.',
      },
    ],
  },
  {
    id: 'wh-questions',
    title: 'Câu hỏi với Wh-',
    formula: 'Wh- + do/does/did + S + V?',
    formulaVi: 'Từ hỏi + do/does/did + chủ ngữ + động từ nguyên thể?',
    explanation: 'Dùng để hỏi thông tin cụ thể (what, where, when, why, who, how).',
    examples: [
      { en: 'Where do you live?', vi: 'Bạn sống ở đâu?' },
      { en: 'What did she buy yesterday?', vi: 'Cô ấy đã mua gì hôm qua?' },
    ],
    exercises: [
      {
        id: 'wh-1',
        scrambled: ['does', 'she', 'work', 'where', '?'],
        answer: 'Where does she work?',
        translation: 'Cô ấy làm việc ở đâu?',
      },
      {
        id: 'wh-2',
        scrambled: ['did', 'you', 'what', 'do', 'last', 'weekend', '?'],
        answer: 'What did you do last weekend?',
        translation: 'Bạn đã làm gì cuối tuần trước?',
      },
    ],
  },
  {
    id: 'relative-clause',
    title: 'Mệnh đề quan hệ',
    formula: 'S + V + who/which/that/where + S + V',
    formulaVi: 'Chủ ngữ + động từ + đại từ quan hệ + chủ ngữ + động từ',
    explanation: 'Dùng để bổ nghĩa cho danh từ đứng trước.',
    examples: [
      { en: 'The man who is talking is my teacher.', vi: 'Người đàn ông đang nói chuyện là thầy giáo tôi.' },
      { en: 'This is the book that I bought yesterday.', vi: 'Đây là cuốn sách tôi đã mua hôm qua.' },
    ],
    exercises: [
      {
        id: 'rc-1',
        scrambled: ['the', 'man', 'who', 'is', 'my', 'teacher', 'talking'],
        answer: 'The man who is talking is my teacher.',
        translation: 'Người đàn ông đang nói chuyện là thầy giáo tôi.',
      },
      {
        id: 'rc-2',
        scrambled: ['this', 'is', 'the', 'book', 'that', 'I', 'bought', 'yesterday'],
        answer: 'This is the book that I bought yesterday.',
        translation: 'Đây là cuốn sách tôi đã mua hôm qua.',
      },
    ],
  },
]

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  { label: 'Mạo từ', count: 2 },
  { label: 'Sự đồng nhất giữa chủ ngữ và động từ', count: 1 },
  { label: 'Chọn giới từ', count: 1 },
]

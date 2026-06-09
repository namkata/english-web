import { NextResponse } from 'next/server'

interface WordEntry {
  id: string; word: string; phoneticUk: string | null; phoneticUs: string | null
  partOfSpeech: string; definition: string; exampleSentence: string
  imageUrl: string | null; audioUrl: string | null
}

const WORDS: Record<string, WordEntry[]> = {
  '1': [
    { id: 'w1', word: 'abandon', phoneticUk: '/əˈbændən/', phoneticUs: '/əˈbændən/', partOfSpeech: 'verb', definition: 'từ bỏ, bỏ rơi', exampleSentence: 'They had to abandon the plan.', imageUrl: null, audioUrl: null },
    { id: 'w2', word: 'ability', phoneticUk: '/əˈbɪləti/', phoneticUs: '/əˈbɪləti/', partOfSpeech: 'noun', definition: 'khả năng', exampleSentence: 'She has the ability to learn quickly.', imageUrl: null, audioUrl: null },
    { id: 'w3', word: 'abroad', phoneticUk: '/əˈbrɔːd/', phoneticUs: '/əˈbrɑːd/', partOfSpeech: 'adverb', definition: 'ở nước ngoài', exampleSentence: 'He studied abroad for two years.', imageUrl: null, audioUrl: null },
    { id: 'w4', word: 'absent', phoneticUk: '/ˈæbsənt/', phoneticUs: '/ˈæbsənt/', partOfSpeech: 'adjective', definition: 'vắng mặt', exampleSentence: 'He was absent from school yesterday.', imageUrl: null, audioUrl: null },
    { id: 'w5', word: 'accept', phoneticUk: '/əkˈsept/', phoneticUs: '/ækˈsept/', partOfSpeech: 'verb', definition: 'chấp nhận', exampleSentence: 'She accepted the job offer.', imageUrl: null, audioUrl: null },
    { id: 'w6', word: 'access', phoneticUk: '/ˈækses/', phoneticUs: '/ˈækses/', partOfSpeech: 'noun', definition: 'truy cập, quyền vào', exampleSentence: 'Students have access to the library.', imageUrl: null, audioUrl: null },
    { id: 'w7', word: 'achieve', phoneticUk: '/əˈtʃiːv/', phoneticUs: '/əˈtʃiːv/', partOfSpeech: 'verb', definition: 'đạt được', exampleSentence: 'She achieved her goal.', imageUrl: null, audioUrl: null },
    { id: 'w8', word: 'acquire', phoneticUk: '/əˈkwaɪə/', phoneticUs: '/əˈkwaɪər/', partOfSpeech: 'verb', definition: 'thu được, giành được', exampleSentence: 'He acquired new skills.', imageUrl: null, audioUrl: null },
    { id: 'w9', word: 'adapt', phoneticUk: '/əˈdæpt/', phoneticUs: '/əˈdæpt/', partOfSpeech: 'verb', definition: 'thích nghi', exampleSentence: 'Animals adapt to their environment.', imageUrl: null, audioUrl: null },
  ],
  '2': [
    { id: 'w10', word: 'agenda', phoneticUk: '/əˈdʒendə/', phoneticUs: '/əˈdʒendə/', partOfSpeech: 'noun', definition: 'chương trình nghị sự', exampleSentence: 'What is on the agenda today?', imageUrl: null, audioUrl: null },
    { id: 'w11', word: 'colleague', phoneticUk: '/ˈkɒliːɡ/', phoneticUs: '/ˈkɑːliːɡ/', partOfSpeech: 'noun', definition: 'đồng nghiệp', exampleSentence: 'I discussed it with my colleague.', imageUrl: null, audioUrl: null },
    { id: 'w12', word: 'deadline', phoneticUk: '/ˈdedlaɪn/', phoneticUs: '/ˈdedlaɪn/', partOfSpeech: 'noun', definition: 'hạn chót', exampleSentence: 'The deadline is next Friday.', imageUrl: null, audioUrl: null },
    { id: 'w13', word: 'document', phoneticUk: '/ˈdɒkjumənt/', phoneticUs: '/ˈdɑːkjumənt/', partOfSpeech: 'noun', definition: 'tài liệu', exampleSentence: 'Please sign this document.', imageUrl: null, audioUrl: null },
    { id: 'w14', word: 'employee', phoneticUk: '/ɪmˈplɔɪiː/', phoneticUs: '/ɪmˈplɔɪiː/', partOfSpeech: 'noun', definition: 'nhân viên', exampleSentence: 'The company has 500 employees.', imageUrl: null, audioUrl: null },
    { id: 'w15', word: 'employer', phoneticUk: '/ɪmˈplɔɪə/', phoneticUs: '/ɪmˈplɔɪər/', partOfSpeech: 'noun', definition: 'người sử dụng lao động', exampleSentence: 'My employer offers good benefits.', imageUrl: null, audioUrl: null },
    { id: 'w16', word: 'equipment', phoneticUk: '/ɪˈkwɪpmənt/', phoneticUs: '/ɪˈkwɪpmənt/', partOfSpeech: 'noun', definition: 'thiết bị', exampleSentence: 'The office has new equipment.', imageUrl: null, audioUrl: null },
    { id: 'w17', word: 'invoice', phoneticUk: '/ˈɪnvɔɪs/', phoneticUs: '/ˈɪnvɔɪs/', partOfSpeech: 'noun', definition: 'hóa đơn', exampleSentence: 'Please send the invoice by email.', imageUrl: null, audioUrl: null },
    { id: 'w18', word: 'meeting', phoneticUk: '/ˈmiːtɪŋ/', phoneticUs: '/ˈmiːtɪŋ/', partOfSpeech: 'noun', definition: 'cuộc họp', exampleSentence: 'The meeting starts at 10 AM.', imageUrl: null, audioUrl: null },
    { id: 'w19', word: 'presentation', phoneticUk: '/ˌprezənˈteɪʃən/', phoneticUs: '/ˌpriːzenˈteɪʃən/', partOfSpeech: 'noun', definition: 'bài thuyết trình', exampleSentence: 'She gave a great presentation.', imageUrl: null, audioUrl: null },
    { id: 'w20', word: 'project', phoneticUk: '/ˈprɒdʒekt/', phoneticUs: '/ˈprɑːdʒekt/', partOfSpeech: 'noun', definition: 'dự án', exampleSentence: 'We finished the project on time.', imageUrl: null, audioUrl: null },
    { id: 'w21', word: 'schedule', phoneticUk: '/ˈʃedjuːl/', phoneticUs: '/ˈskedʒuːl/', partOfSpeech: 'noun', definition: 'lịch trình', exampleSentence: 'Check the schedule for updates.', imageUrl: null, audioUrl: null },
  ],
  '3': [
    { id: 'w22', word: 'appointment', phoneticUk: '/əˈpɔɪntmənt/', phoneticUs: '/əˈpɔɪntmənt/', partOfSpeech: 'noun', definition: 'cuộc hẹn', exampleSentence: 'I have a dental appointment.', imageUrl: null, audioUrl: null },
    { id: 'w23', word: 'attach', phoneticUk: '/əˈtætʃ/', phoneticUs: '/əˈtætʃ/', partOfSpeech: 'verb', definition: 'đính kèm', exampleSentence: 'Please attach the file to the email.', imageUrl: null, audioUrl: null },
    { id: 'w24', word: 'brief', phoneticUk: '/briːf/', phoneticUs: '/briːf/', partOfSpeech: 'adjective', definition: 'ngắn gọn', exampleSentence: 'Give me a brief summary.', imageUrl: null, audioUrl: null },
    { id: 'w25', word: 'confirm', phoneticUk: '/kənˈfɜːm/', phoneticUs: '/kənˈfɜːrm/', partOfSpeech: 'verb', definition: 'xác nhận', exampleSentence: 'Please confirm your attendance.', imageUrl: null, audioUrl: null },
    { id: 'w26', word: 'correspondence', phoneticUk: '/ˌkɒrɪˈspɒndəns/', phoneticUs: '/ˌkɔːrɪˈspɑːndəns/', partOfSpeech: 'noun', definition: 'thư từ', exampleSentence: 'All correspondence is saved here.', imageUrl: null, audioUrl: null },
    { id: 'w27', word: 'delegate', phoneticUk: '/ˈdelɪɡeɪt/', phoneticUs: '/ˈdelɪɡeɪt/', partOfSpeech: 'verb', definition: 'ủy quyền, giao việc', exampleSentence: 'Learn to delegate tasks.', imageUrl: null, audioUrl: null },
    { id: 'w28', word: 'draft', phoneticUk: '/drɑːft/', phoneticUs: '/dræft/', partOfSpeech: 'noun', definition: 'bản nháp', exampleSentence: 'This is just a draft.', imageUrl: null, audioUrl: null },
    { id: 'w29', word: 'feedback', phoneticUk: '/ˈfiːdbæk/', phoneticUs: '/ˈfiːdbæk/', partOfSpeech: 'noun', definition: 'phản hồi', exampleSentence: 'We value your feedback.', imageUrl: null, audioUrl: null },
    { id: 'w30', word: 'follow-up', phoneticUk: '/ˈfɒləʊ ʌp/', phoneticUs: '/ˈfɑːloʊ ʌp/', partOfSpeech: 'noun', definition: 'theo dõi, tiếp tục', exampleSentence: 'I will send a follow-up email.', imageUrl: null, audioUrl: null },
    { id: 'w31', word: 'minutes', phoneticUk: '/ˈmɪnɪts/', phoneticUs: '/ˈmɪnɪts/', partOfSpeech: 'noun', definition: 'biên bản cuộc họp', exampleSentence: 'Take the meeting minutes.', imageUrl: null, audioUrl: null },
    { id: 'w32', word: 'postpone', phoneticUk: '/pəʊstˈpəʊn/', phoneticUs: '/poʊstˈpoʊn/', partOfSpeech: 'verb', definition: 'hoãn lại', exampleSentence: 'The meeting was postponed.', imageUrl: null, audioUrl: null },
    { id: 'w33', word: 'revise', phoneticUk: '/rɪˈvaɪz/', phoneticUs: '/rɪˈvaɪz/', partOfSpeech: 'verb', definition: 'sửa đổi, ôn tập', exampleSentence: 'Please revise the document.', imageUrl: null, audioUrl: null },
  ],
  '4': [
    { id: 'w34', word: 'boarding pass', phoneticUk: '/ˈbɔːdɪŋ pɑːs/', phoneticUs: '/ˈbɔːrdɪŋ pæs/', partOfSpeech: 'noun', definition: 'thẻ lên máy bay', exampleSentence: 'Show your boarding pass.', imageUrl: null, audioUrl: null },
    { id: 'w35', word: 'currency', phoneticUk: '/ˈkʌrənsi/', phoneticUs: '/ˈkɜːrənsi/', partOfSpeech: 'noun', definition: 'tiền tệ', exampleSentence: 'What currency do they use?', imageUrl: null, audioUrl: null },
    { id: 'w36', word: 'departure', phoneticUk: '/dɪˈpɑːtʃə/', phoneticUs: '/dɪˈpɑːrtʃər/', partOfSpeech: 'noun', definition: 'sự khởi hành', exampleSentence: 'Departure is at 8 AM.', imageUrl: null, audioUrl: null },
    { id: 'w37', word: 'destination', phoneticUk: '/ˌdestɪˈneɪʃən/', phoneticUs: '/ˌdestɪˈneɪʃən/', partOfSpeech: 'noun', definition: 'điểm đến', exampleSentence: 'Our destination is Paris.', imageUrl: null, audioUrl: null },
    { id: 'w38', word: 'itinerary', phoneticUk: '/aɪˈtɪnərəri/', phoneticUs: '/aɪˈtɪnəreri/', partOfSpeech: 'noun', definition: 'lịch trình chuyến đi', exampleSentence: 'Here is your itinerary.', imageUrl: null, audioUrl: null },
    { id: 'w39', word: 'luggage', phoneticUk: '/ˈlʌɡɪdʒ/', phoneticUs: '/ˈlʌɡɪdʒ/', partOfSpeech: 'noun', definition: 'hành lý', exampleSentence: 'How many pieces of luggage?', imageUrl: null, audioUrl: null },
    { id: 'w40', word: 'passport', phoneticUk: '/ˈpɑːspɔːt/', phoneticUs: '/ˈpæspɔːrt/', partOfSpeech: 'noun', definition: 'hộ chiếu', exampleSentence: 'Don\'t forget your passport.', imageUrl: null, audioUrl: null },
    { id: 'w41', word: 'reservation', phoneticUk: '/ˌrezəˈveɪʃən/', phoneticUs: '/ˌrezərˈveɪʃən/', partOfSpeech: 'noun', definition: 'sự đặt chỗ trước', exampleSentence: 'I have a reservation for two.', imageUrl: null, audioUrl: null },
    { id: 'w42', word: 'sightseeing', phoneticUk: '/ˈsaɪtsiːɪŋ/', phoneticUs: '/ˈsaɪtsiːɪŋ/', partOfSpeech: 'noun', definition: 'tham quan', exampleSentence: 'We went sightseeing all day.', imageUrl: null, audioUrl: null },
    { id: 'w43', word: 'souvenir', phoneticUk: '/ˌsuːvəˈnɪə/', phoneticUs: '/ˌsuːvəˈnɪr/', partOfSpeech: 'noun', definition: 'quà lưu niệm', exampleSentence: 'I bought a souvenir for my mom.', imageUrl: null, audioUrl: null },
    { id: 'w44', word: 'suitcase', phoneticUk: '/ˈsuːtkeɪs/', phoneticUs: '/ˈsuːtkeɪs/', partOfSpeech: 'noun', definition: 'va li', exampleSentence: 'Pack your suitcase tonight.', imageUrl: null, audioUrl: null },
    { id: 'w45', word: 'vacancy', phoneticUk: '/ˈveɪkənsi/', phoneticUs: '/ˈveɪkənsi/', partOfSpeech: 'noun', definition: 'phòng trống', exampleSentence: 'Do you have any vacancies?', imageUrl: null, audioUrl: null },
  ],
}

export async function GET(_req: Request, { params }: { params: Promise<{ setId: string }> }) {
  const { setId } = await params
  const words = WORDS[setId] || []
  return NextResponse.json({ success: true, data: { items: words, total: words.length } })
}

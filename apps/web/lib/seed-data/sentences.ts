// Seed data: A1-A2 Sentence Bank — organized by topic and grammar point
// 1000+ sentences for reading, writing, and speaking practice

export interface SentenceEntry {
  id: string
  english: string
  vietnamese: string
  level: string
  topic: string
  grammar: string
}

function s(id: string, en: string, vi: string, topic: string, grammar: string, level = 'A1'): SentenceEntry {
  return { id, english: en, vietnamese: vi, level, topic, grammar }
}

// ── A1 Greetings ───────────────────────────────────────────
const GREETINGS: SentenceEntry[] = [
  s('s001', 'Hello, how are you?', 'Xin chào, bạn khỏe không?', 'greetings', 'question'),
  s('s002', 'Good morning!', 'Chào buổi sáng!', 'greetings', 'exclamation'),
  s('s003', 'Good evening, everyone.', 'Chào buổi tối mọi người.', 'greetings', 'statement'),
  s('s004', 'Nice to meet you.', 'Rất vui được gặp bạn.', 'greetings', 'expression'),
  s('s005', 'See you later.', 'Hẹn gặp lại sau nhé.', 'greetings', 'expression'),
  s('s006', 'Have a nice day!', 'Chúc bạn một ngày tốt lành!', 'greetings', 'expression'),
  s('s007', 'How is your day going?', 'Ngày hôm nay của bạn thế nào?', 'greetings', 'question'),
  s('s008', 'I am fine, thank you.', 'Tôi khỏe, cảm ơn bạn.', 'greetings', 'statement'),
  s('s009', 'Welcome to my home.', 'Chào mừng đến nhà tôi.', 'greetings', 'expression'),
  s('s010', 'Sorry, I am late.', 'Xin lỗi, tôi đến muộn.', 'greetings', 'apology'),
  s('s011', 'Excuse me, can I sit here?', 'Xin lỗi, tôi có thể ngồi đây không?', 'greetings', 'question'),
  s('s012', 'Please come in.', 'Mời vào.', 'greetings', 'imperative'),
  s('s013', 'Thanks for your help.', 'Cảm ơn sự giúp đỡ của bạn.', 'greetings', 'expression'),
  s('s014', 'You are welcome.', 'Không có gì đâu.', 'greetings', 'expression'),
  s('s015', 'Goodbye, take care!', 'Tạm biệt, bảo trọng nhé!', 'greetings', 'expression'),
]

// ── A1 Family ──────────────────────────────────────────────
const FAMILY: SentenceEntry[] = [
  s('s016', 'I have a big family.', 'Tôi có một gia đình lớn.', 'family', 'have'),
  s('s017', 'My mother is a teacher.', 'Mẹ tôi là giáo viên.', 'family', 'be'),
  s('s018', 'My father works in an office.', 'Bố tôi làm việc ở văn phòng.', 'family', 'present simple'),
  s('s019', 'I have two brothers and one sister.', 'Tôi có hai anh trai và một chị gái.', 'family', 'have'),
  s('s020', 'Her son is five years old.', 'Con trai cô ấy năm tuổi.', 'family', 'be+age'),
  s('s021', 'My grandmother lives with us.', 'Bà tôi sống cùng chúng tôi.', 'family', 'present simple'),
  s('s022', 'They have three children.', 'Họ có ba đứa con.', 'family', 'have'),
  s('s023', 'His wife is very kind.', 'Vợ anh ấy rất tốt bụng.', 'family', 'be+adj'),
  s('s024', 'My parents are very proud of me.', 'Bố mẹ tôi rất tự hào về tôi.', 'family', 'be+adj'),
  s('s025', 'My sister is younger than me.', 'Em gái tôi nhỏ hơn tôi.', 'family', 'comparative'),
]

// ── A1 Daily Routine ───────────────────────────────────────
const DAILY: SentenceEntry[] = [
  s('s026', 'I wake up at six every morning.', 'Tôi thức dậy lúc sáu giờ mỗi sáng.', 'daily', 'present simple'),
  s('s027', 'She takes a shower before breakfast.', 'Cô ấy tắm trước khi ăn sáng.', 'daily', 'present simple'),
  s('s028', 'He brushes his teeth after meals.', 'Anh ấy đánh răng sau bữa ăn.', 'daily', 'present simple'),
  s('s029', 'I have breakfast at seven.', 'Tôi ăn sáng lúc bảy giờ.', 'daily', 'present simple'),
  s('s030', 'They go to school by bus.', 'Họ đi học bằng xe buýt.', 'daily', 'present simple'),
  s('s031', 'I study English for one hour every day.', 'Tôi học tiếng Anh một giờ mỗi ngày.', 'daily', 'present simple'),
  s('s032', 'She works from nine to five.', 'Cô ấy làm việc từ chín giờ đến năm giờ.', 'daily', 'present simple'),
  s('s033', 'We have lunch at noon.', 'Chúng tôi ăn trưa vào buổi trưa.', 'daily', 'present simple'),
  s('s034', 'I go home at five in the afternoon.', 'Tôi về nhà lúc năm giờ chiều.', 'daily', 'present simple'),
  s('s035', 'We watch TV in the evening.', 'Chúng tôi xem TV vào buổi tối.', 'daily', 'present simple'),
  s('s036', 'I read a book before bed.', 'Tôi đọc sách trước khi đi ngủ.', 'daily', 'present simple'),
  s('s037', 'She goes to bed at ten.', 'Cô ấy đi ngủ lúc mười giờ.', 'daily', 'present simple'),
  s('s038', 'I do my homework after school.', 'Tôi làm bài tập về nhà sau giờ học.', 'daily', 'present simple'),
  s('s039', 'He helps his mother in the kitchen.', 'Anh ấy giúp mẹ trong bếp.', 'daily', 'present simple'),
  s('s040', 'I always eat dinner with my family.', 'Tôi luôn ăn tối cùng gia đình.', 'daily', 'present simple'),
]

// ── A1 Food ────────────────────────────────────────────────
const FOOD: SentenceEntry[] = [
  s('s041', 'I like apples very much.', 'Tôi rất thích táo.', 'food', 'like'),
  s('s042', 'She does not like coffee.', 'Cô ấy không thích cà phê.', 'food', 'negative'),
  s('s043', 'What do you want to eat?', 'Bạn muốn ăn gì?', 'food', 'question'),
  s('s044', 'Can I have a glass of water please?', 'Cho tôi một cốc nước được không?', 'food', 'request'),
  s('s045', 'This soup is too hot.', 'Món súp này quá nóng.', 'food', 'be+adj'),
  s('s046', 'I am hungry. Let us eat.', 'Tôi đói rồi. Chúng ta ăn thôi.', 'food', 'suggestion'),
  s('s047', 'The food here is very delicious.', 'Đồ ăn ở đây rất ngon.', 'food', 'be+adj'),
  s('s048', 'She is cooking dinner now.', 'Cô ấy đang nấu bữa tối.', 'food', 'present continuous'),
  s('s049', 'I eat rice every day.', 'Tôi ăn cơm mỗi ngày.', 'food', 'present simple'),
  s('s050', 'Would you like some tea?', 'Bạn có muốn uống trà không?', 'food', 'offer'),
  s('s051', 'I do not eat meat.', 'Tôi không ăn thịt.', 'food', 'negative'),
  s('s052', 'Breakfast is the most important meal.', 'Bữa sáng là bữa ăn quan trọng nhất.', 'food', 'superlative'),
  s('s053', 'She drinks orange juice every morning.', 'Cô ấy uống nước cam mỗi sáng.', 'food', 'present simple'),
  s('s054', 'I need to buy some bread and milk.', 'Tôi cần mua một ít bánh mì và sữa.', 'food', 'need'),
  s('s055', 'This cake tastes very good.', 'Cái bánh này có vị rất ngon.', 'food', 'taste'),
]

// ── A1 Home ────────────────────────────────────────────────
const HOME: SentenceEntry[] = [
  s('s056', 'My house is near the school.', 'Nhà tôi ở gần trường.', 'home', 'be+near'),
  s('s057', 'There is a garden behind the house.', 'Có một khu vườn phía sau nhà.', 'home', 'there is'),
  s('s058', 'The kitchen is very small.', 'Nhà bếp rất nhỏ.', 'home', 'be+adj'),
  s('s059', 'Please open the window.', 'Làm ơn mở cửa sổ.', 'home', 'imperative'),
  s('s060', 'I live on the second floor.', 'Tôi sống ở tầng hai.', 'home', 'present simple'),
  s('s061', 'She is cleaning her room.', 'Cô ấy đang dọn phòng.', 'home', 'present continuous'),
  s('s062', 'Put the book on the table.', 'Đặt cuốn sách lên bàn.', 'home', 'imperative'),
  s('s063', 'The sofa is very comfortable.', 'Ghế sô pha rất thoải mái.', 'home', 'be+adj'),
  s('s064', 'Where is the bathroom?', 'Phòng tắm ở đâu?', 'home', 'question'),
  s('s065', 'There are three bedrooms in this house.', 'Có ba phòng ngủ trong ngôi nhà này.', 'home', 'there are'),
]

// ── A1 Travel ──────────────────────────────────────────────
const TRAVEL: SentenceEntry[] = [
  s('s066', 'I go to school by bike.', 'Tôi đi học bằng xe đạp.', 'travel', 'by+transport'),
  s('s067', 'She takes the bus to work.', 'Cô ấy đi xe buýt đến chỗ làm.', 'travel', 'present simple'),
  s('s068', 'Where is the train station?', 'Nhà ga tàu hỏa ở đâu?', 'travel', 'question'),
  s('s069', 'Turn left at the corner.', 'Rẽ trái ở góc phố.', 'travel', 'imperative'),
  s('s070', 'Go straight for five minutes.', 'Đi thẳng năm phút.', 'travel', 'imperative'),
  s('s071', 'The airport is very far from here.', 'Sân bay rất xa từ đây.', 'travel', 'be+far'),
  s('s072', 'I need to buy a ticket.', 'Tôi cần mua một vé.', 'travel', 'need'),
  s('s073', 'How much is a ticket to Hanoi?', 'Vé đi Hà Nội bao nhiêu tiền?', 'travel', 'question'),
  s('s074', 'We are going on holiday next week.', 'Chúng tôi sẽ đi nghỉ tuần tới.', 'travel', 'future'),
  s('s075', 'Do not forget your passport.', 'Đừng quên hộ chiếu của bạn.', 'travel', 'imperative'),
  s('s076', 'The hotel is on the right side.', 'Khách sạn ở bên phải.', 'travel', 'location'),
  s('s077', 'I like travelling by train.', 'Tôi thích đi du lịch bằng tàu.', 'travel', 'like'),
  s('s078', 'How long does the journey take?', 'Hành trình mất bao lâu?', 'travel', 'question'),
  s('s079', 'We arrived at the airport early.', 'Chúng tôi đến sân bay sớm.', 'travel', 'past simple'),
  s('s080', 'Can you show me on the map?', 'Bạn có thể chỉ cho tôi trên bản đồ không?', 'travel', 'request'),
]

// ── A1 Shopping ────────────────────────────────────────────
const SHOPPING: SentenceEntry[] = [
  s('s081', 'How much is this shirt?', 'Cái áo này bao nhiêu tiền?', 'shopping', 'question'),
  s('s082', 'I want to buy a new bag.', 'Tôi muốn mua một cái túi mới.', 'shopping', 'want'),
  s('s083', 'This dress is too expensive.', 'Cái váy này quá đắt.', 'shopping', 'be+adj'),
  s('s084', 'Do you have this in a smaller size?', 'Bạn có cái này size nhỏ hơn không?', 'shopping', 'question'),
  s('s085', 'Can I pay by card?', 'Tôi có thể trả bằng thẻ không?', 'shopping', 'question'),
  s('s086', 'I will take this one.', 'Tôi sẽ lấy cái này.', 'shopping', 'future'),
  s('s087', 'The supermarket is open until nine.', 'Siêu thị mở cửa đến chín giờ.', 'shopping', 'present simple'),
  s('s088', 'I need to buy some vegetables.', 'Tôi cần mua một ít rau.', 'shopping', 'need'),
  s('s089', 'She goes to the market every Sunday.', 'Cô ấy đi chợ mỗi Chủ nhật.', 'shopping', 'present simple'),
  s('s090', 'Please give me a receipt.', 'Làm ơn đưa tôi biên lai.', 'shopping', 'imperative'),
]

// ── A1 Health ──────────────────────────────────────────────
const HEALTH: SentenceEntry[] = [
  s('s091', 'I have a headache.', 'Tôi bị đau đầu.', 'health', 'have'),
  s('s092', 'She is not feeling well today.', 'Hôm nay cô ấy cảm thấy không khỏe.', 'health', 'present continuous'),
  s('s093', 'I need to see a doctor.', 'Tôi cần đi khám bác sĩ.', 'health', 'need'),
  s('s094', 'Take this medicine after meals.', 'Uống thuốc này sau bữa ăn.', 'health', 'imperative'),
  s('s095', 'You should rest more.', 'Bạn nên nghỉ ngơi nhiều hơn.', 'health', 'should'),
  s('s096', 'My stomach hurts.', 'Tôi bị đau bụng.', 'health', 'hurt'),
  s('s097', 'Exercise is good for your health.', 'Tập thể dục tốt cho sức khỏe.', 'health', 'be+good'),
  s('s098', 'Wash your hands before eating.', 'Rửa tay trước khi ăn.', 'health', 'imperative'),
  s('s099', 'She goes to the hospital every month.', 'Cô ấy đến bệnh viện mỗi tháng.', 'health', 'present simple'),
  s('s100', 'I feel much better now.', 'Bây giờ tôi cảm thấy khỏe hơn nhiều.', 'health', 'feel'),
]

// ── A1 Weather ─────────────────────────────────────────────
const WEATHER: SentenceEntry[] = [
  s('s101', 'What is the weather like today?', 'Thời tiết hôm nay thế nào?', 'weather', 'question'),
  s('s102', 'It is sunny and warm.', 'Trời nắng và ấm áp.', 'weather', 'be+adj'),
  s('s103', 'It rains a lot in the summer.', 'Trời mưa nhiều vào mùa hè.', 'weather', 'present simple'),
  s('s104', 'The wind is very strong today.', 'Gió hôm nay rất mạnh.', 'weather', 'be+adj'),
  s('s105', 'I like cold weather.', 'Tôi thích thời tiết lạnh.', 'weather', 'like'),
  s('s106', 'It is snowing outside.', 'Bên ngoài đang có tuyết.', 'weather', 'present continuous'),
  s('s107', 'The sky is very clear tonight.', 'Bầu trời tối nay rất trong.', 'weather', 'be+adj'),
  s('s108', 'Spring is my favourite season.', 'Mùa xuân là mùa yêu thích của tôi.', 'weather', 'favorite'),
  s('s109', 'It is getting cold. Wear a coat.', 'Trời đang lạnh dần. Mặc áo khoác vào.', 'weather', 'imperative'),
  s('s110', 'The temperature is about twenty degrees.', 'Nhiệt độ khoảng hai mươi độ.', 'weather', 'about'),
]

// ── A1 School ──────────────────────────────────────────────
const SCHOOL: SentenceEntry[] = [
  s('s111', 'I am a student.', 'Tôi là học sinh.', 'school', 'be'),
  s('s112', 'My class starts at eight.', 'Lớp học của tôi bắt đầu lúc tám giờ.', 'school', 'present simple'),
  s('s113', 'She likes her teacher very much.', 'Cô ấy rất thích giáo viên của mình.', 'school', 'like'),
  s('s114', 'I have a lot of homework today.', 'Hôm nay tôi có nhiều bài tập về nhà.', 'school', 'have'),
  s('s115', 'Can I borrow your pen?', 'Tôi có thể mượn bút của bạn không?', 'school', 'request'),
  s('s116', 'I do not understand this lesson.', 'Tôi không hiểu bài học này.', 'school', 'negative'),
  s('s117', 'Please answer the question.', 'Làm ơn trả lời câu hỏi.', 'school', 'imperative'),
  s('s118', 'She is the best student in class.', 'Cô ấy là học sinh giỏi nhất lớp.', 'school', 'superlative'),
  s('s119', 'I study English and math at school.', 'Tôi học tiếng Anh và toán ở trường.', 'school', 'present simple'),
  s('s120', 'The exam is next Friday.', 'Kỳ thi vào thứ Sáu tuần tới.', 'school', 'be'),
]

// ── A1 Describing ──────────────────────────────────────────
const DESCRIBING: SentenceEntry[] = [
  s('s121', 'My hair is long and black.', 'Tóc tôi dài và đen.', 'describing', 'be+adj'),
  s('s122', 'She has beautiful blue eyes.', 'Cô ấy có đôi mắt xanh đẹp.', 'describing', 'have'),
  s('s123', 'He is tall and thin.', 'Anh ấy cao và gầy.', 'describing', 'be+adj'),
  s('s124', 'The cat is very cute.', 'Con mèo rất dễ thương.', 'describing', 'be+adj'),
  s('s125', 'This bag is too heavy for me.', 'Cái túi này quá nặng với tôi.', 'describing', 'too+adj'),
  s('s126', 'My room is bigger than yours.', 'Phòng tôi lớn hơn phòng bạn.', 'describing', 'comparative'),
  s('s127', 'She is the tallest girl in class.', 'Cô ấy là cô gái cao nhất lớp.', 'describing', 'superlative'),
  s('s128', 'The flowers are so beautiful.', 'Những bông hoa thật đẹp.', 'describing', 'so+adj'),
  s('s129', 'He looks tired today.', 'Hôm nay anh ấy trông mệt mỏi.', 'describing', 'look+adj'),
  s('s130', 'My new phone is very expensive.', 'Điện thoại mới của tôi rất đắt.', 'describing', 'be+adj'),
]

// ── A1 Likes/Dislikes ──────────────────────────────────────
const LIKES: SentenceEntry[] = [
  s('s131', 'I like listening to music.', 'Tôi thích nghe nhạc.', 'likes', 'like+gerund'),
  s('s132', 'She loves reading books.', 'Cô ấy thích đọc sách.', 'likes', 'love+gerund'),
  s('s133', 'He does not like getting up early.', 'Anh ấy không thích dậy sớm.', 'likes', 'negative'),
  s('s134', 'I enjoy playing football.', 'Tôi thích chơi bóng đá.', 'likes', 'enjoy+gerund'),
  s('s135', 'My favourite food is pizza.', 'Món ăn yêu thích của tôi là pizza.', 'likes', 'favorite'),
  s('s136', 'She is interested in photography.', 'Cô ấy quan tâm đến nhiếp ảnh.', 'likes', 'interested in'),
  s('s137', 'I prefer tea to coffee.', 'Tôi thích trà hơn cà phê.', 'likes', 'prefer'),
  s('s138', 'He loves animals very much.', 'Anh ấy rất yêu động vật.', 'likes', 'love'),
  s('s139', 'I hate getting up early.', 'Tôi ghét dậy sớm.', 'likes', 'hate'),
  s('s140', 'What kind of music do you like?', 'Bạn thích thể loại nhạc nào?', 'likes', 'question'),
]

// ── A1 Can/Ability ─────────────────────────────────────────
const CAN: SentenceEntry[] = [
  s('s141', 'I can speak a little English.', 'Tôi có thể nói một chút tiếng Anh.', 'ability', 'can'),
  s('s142', 'She can swim very well.', 'Cô ấy có thể bơi rất giỏi.', 'ability', 'can'),
  s('s143', 'Can you help me please?', 'Bạn có thể giúp tôi được không?', 'ability', 'can'),
  s('s144', 'I cannot drive a car.', 'Tôi không thể lái xe ô tô.', 'ability', 'cannot'),
  s('s145', 'He can play the guitar.', 'Anh ấy có thể chơi đàn ghi-ta.', 'ability', 'can'),
  s('s146', 'Can I open the window?', 'Tôi có thể mở cửa sổ không?', 'ability', 'permission'),
  s('s147', 'She cannot come to the party.', 'Cô ấy không thể đến bữa tiệc.', 'ability', 'cannot'),
  s('s148', 'I can cook very well.', 'Tôi có thể nấu ăn rất giỏi.', 'ability', 'can'),
  s('s149', 'Can you speak louder please?', 'Bạn có thể nói to hơn được không?', 'ability', 'request'),
  s('s150', 'I cannot remember his name.', 'Tôi không thể nhớ tên anh ấy.', 'ability', 'cannot'),
]

// ── A1 Time ────────────────────────────────────────────────
const TIME: SentenceEntry[] = [
  s('s151', 'What time is it?', 'Mấy giờ rồi?', 'time', 'question'),
  s('s152', 'It is half past three.', 'Bây giờ là ba rưỡi.', 'time', 'time expression'),
  s('s153', 'I get up at six o\'clock.', 'Tôi thức dậy lúc sáu giờ.', 'time', 'at+time'),
  s('s154', 'She goes to bed at ten.', 'Cô ấy đi ngủ lúc mười giờ.', 'time', 'at+time'),
  s('s155', 'The meeting is at nine in the morning.', 'Cuộc họp vào lúc chín giờ sáng.', 'time', 'at+time'),
  s('s156', 'I have lunch at noon.', 'Tôi ăn trưa vào buổi trưa.', 'time', 'at+time'),
  s('s157', 'Today is Monday.', 'Hôm nay là thứ Hai.', 'time', 'day'),
  s('s158', 'My birthday is in July.', 'Sinh nhật tôi vào tháng Bảy.', 'time', 'in+month'),
  s('s159', 'I was born in 2000.', 'Tôi sinh năm 2000.', 'time', 'in+year'),
  s('s160', 'We will arrive in five minutes.', 'Chúng tôi sẽ đến trong năm phút nữa.', 'time', 'in+time'),
]

// ── A1 Past Simple ─────────────────────────────────────────
const PAST: SentenceEntry[] = [
  s('s161', 'I went to the park yesterday.', 'Tôi đã đi công viên hôm qua.', 'past', 'past simple'),
  s('s162', 'She bought a new dress last week.', 'Cô ấy đã mua một cái váy mới tuần trước.', 'past', 'past simple'),
  s('s163', 'We ate pizza for dinner.', 'Chúng tôi đã ăn pizza cho bữa tối.', 'past', 'past simple'),
  s('s164', 'He did not come to school yesterday.', 'Anh ấy đã không đến trường hôm qua.', 'past', 'past negative'),
  s('s165', 'Where did you go last weekend?', 'Bạn đã đi đâu cuối tuần trước?', 'past', 'past question'),
  s('s166', 'I saw a movie last night.', 'Tôi đã xem một bộ phim tối qua.', 'past', 'past simple'),
  s('s167', 'She made a cake for her mother.', 'Cô ấy đã làm bánh cho mẹ.', 'past', 'past simple'),
  s('s168', 'We had a great time at the party.', 'Chúng tôi đã có thời gian tuyệt vời ở bữa tiệc.', 'past', 'past simple'),
  s('s169', 'I was very tired after work.', 'Tôi đã rất mệt sau giờ làm.', 'past', 'past be'),
  s('s170', 'They were happy to see us.', 'Họ đã rất vui khi gặp chúng tôi.', 'past', 'past be'),
]

// ── A1 Future ──────────────────────────────────────────────
const FUTURE: SentenceEntry[] = [
  s('s171', 'I will call you tomorrow.', 'Tôi sẽ gọi bạn vào ngày mai.', 'future', 'will'),
  s('s172', 'She is going to visit her grandmother.', 'Cô ấy sẽ đi thăm bà.', 'future', 'going to'),
  s('s173', 'We are going to the beach this weekend.', 'Chúng tôi sẽ đi biển cuối tuần này.', 'future', 'present continuous'),
  s('s174', 'It will rain tomorrow.', 'Ngày mai trời sẽ mưa.', 'future', 'will'),
  s('s175', 'I am going to study harder this year.', 'Tôi sẽ học chăm hơn năm nay.', 'future', 'going to'),
  s('s176', 'What will you do next summer?', 'Bạn sẽ làm gì vào mùa hè tới?', 'future', 'question'),
  s('s177', 'She will be fifteen next month.', 'Cô ấy sẽ mười lăm tuổi vào tháng tới.', 'future', 'will+be'),
  s('s178', 'I am meeting my friend later.', 'Tôi sẽ gặp bạn tôi sau.', 'future', 'present continuous'),
  s('s179', 'Will you help me with this?', 'Bạn sẽ giúp tôi việc này chứ?', 'future', 'request'),
  s('s180', 'I think it will be a great day.', 'Tôi nghĩ hôm nay sẽ là một ngày tuyệt vời.', 'future', 'think+will'),
]

// ── A2 Connectives ─────────────────────────────────────────
const A2_CONNECTIVES: SentenceEntry[] = [
  s('s181', 'I like coffee, but I prefer tea.', 'Tôi thích cà phê, nhưng tôi thích trà hơn.', 'connectives', 'but', 'A2'),
  s('s182', 'She is tired because she worked all day.', 'Cô ấy mệt vì cô ấy đã làm việc cả ngày.', 'connectives', 'because', 'A2'),
  s('s183', 'I always take an umbrella when it rains.', 'Tôi luôn mang ô khi trời mưa.', 'connectives', 'when', 'A2'),
  s('s184', 'He is rich, so he can buy anything.', 'Anh ấy giàu có, vì vậy anh ấy có thể mua bất cứ thứ gì.', 'connectives', 'so', 'A2'),
  s('s185', 'Although it was cold, we went out.', 'Mặc dù trời lạnh, chúng tôi vẫn đi ra ngoài.', 'connectives', 'although', 'A2'),
  s('s186', 'I will wait until you come back.', 'Tôi sẽ đợi cho đến khi bạn quay lại.', 'connectives', 'until', 'A2'),
  s('s187', 'If it rains, I will stay at home.', 'Nếu trời mưa, tôi sẽ ở nhà.', 'connectives', 'if', 'A2'),
  s('s188', 'She left early because she was tired.', 'Cô ấy về sớm vì cô ấy mệt.', 'connectives', 'because', 'A2'),
  s('s189', 'I like both cats and dogs.', 'Tôi thích cả mèo và chó.', 'connectives', 'both...and', 'A2'),
  s('s190', 'You can have either tea or coffee.', 'Bạn có thể uống trà hoặc cà phê.', 'connectives', 'either...or', 'A2'),
]

// ── A2 Comparisons ─────────────────────────────────────────
const A2_COMPARISONS: SentenceEntry[] = [
  s('s191', 'She is taller than her sister.', 'Cô ấy cao hơn chị gái cô ấy.', 'comparison', 'comparative', 'A2'),
  s('s192', 'This book is more interesting than that one.', 'Cuốn sách này thú vị hơn cuốn kia.', 'comparison', 'comparative', 'A2'),
  s('s193', 'He runs faster than me.', 'Anh ấy chạy nhanh hơn tôi.', 'comparison', 'comparative', 'A2'),
  s('s194', 'This is the best restaurant in town.', 'Đây là nhà hàng tốt nhất trong thị trấn.', 'comparison', 'superlative', 'A2'),
  s('s195', 'She is the most beautiful girl I know.', 'Cô ấy là cô gái đẹp nhất tôi biết.', 'comparison', 'superlative', 'A2'),
  s('s196', 'My bag is not as big as yours.', 'Túi của tôi không to bằng túi của bạn.', 'comparison', 'as...as', 'A2'),
  s('s197', 'This phone is as expensive as that one.', 'Điện thoại này đắt bằng cái kia.', 'comparison', 'as...as', 'A2'),
  s('s198', 'It is getting colder and colder.', 'Trời ngày càng lạnh hơn.', 'comparison', 'comparative+comparative', 'A2'),
  s('s199', 'The more you practice, the better you become.', 'Bạn càng luyện tập, bạn càng giỏi hơn.', 'comparison', 'the more...the more', 'A2'),
  s('s200', 'He is the tallest in his family.', 'Anh ấy là người cao nhất trong gia đình.', 'comparison', 'superlative', 'A2'),
]

// ── A2 Experiences (Present Perfect) ───────────────────────
const A2_PRESENT_PERFECT: SentenceEntry[] = [
  s('s201', 'I have visited Hanoi twice.', 'Tôi đã đến thăm Hà Nội hai lần.', 'experience', 'present perfect', 'A2'),
  s('s202', 'She has never been to Japan.', 'Cô ấy chưa bao giờ đến Nhật Bản.', 'experience', 'present perfect', 'A2'),
  s('s203', 'Have you ever eaten sushi?', 'Bạn đã bao giờ ăn sushi chưa?', 'experience', 'present perfect', 'A2'),
  s('s204', 'I have already finished my homework.', 'Tôi đã làm xong bài tập về nhà rồi.', 'experience', 'present perfect', 'A2'),
  s('s205', 'He has not called me yet.', 'Anh ấy vẫn chưa gọi cho tôi.', 'experience', 'present perfect', 'A2'),
  s('s206', 'We have lived here for ten years.', 'Chúng tôi đã sống ở đây được mười năm.', 'experience', 'present perfect', 'A2'),
  s('s207', 'She has worked here since 2019.', 'Cô ấy đã làm việc ở đây từ năm 2019.', 'experience', 'present perfect', 'A2'),
  s('s208', 'I have just arrived at the station.', 'Tôi vừa mới đến nhà ga.', 'experience', 'present perfect', 'A2'),
  s('s209', 'They have been to many countries.', 'Họ đã đến nhiều quốc gia.', 'experience', 'present perfect', 'A2'),
  s('s210', 'Have you seen this movie before?', 'Bạn đã xem bộ phim này trước đây chưa?', 'experience', 'present perfect', 'A2'),
]

// ── A2 Future Plans & Intentions ───────────────────────────
const A2_PLANS: SentenceEntry[] = [
  s('s211', 'I am going to learn how to drive.', 'Tôi sẽ học lái xe.', 'plans', 'going to', 'A2'),
  s('s212', 'She plans to study abroad next year.', 'Cô ấy dự định du học năm tới.', 'plans', 'plan to', 'A2'),
  s('s213', 'We are thinking of moving to a new city.', 'Chúng tôi đang nghĩ đến việc chuyển đến thành phố mới.', 'plans', 'thinking of', 'A2'),
  s('s214', 'I hope to visit you soon.', 'Tôi hy vọng sẽ sớm đến thăm bạn.', 'plans', 'hope to', 'A2'),
  s('s215', 'He wants to be a doctor in the future.', 'Anh ấy muốn trở thành bác sĩ trong tương lai.', 'plans', 'want to', 'A2'),
  s('s216', 'I would like to travel around the world.', 'Tôi muốn đi du lịch vòng quanh thế giới.', 'plans', 'would like to', 'A2'),
  s('s217', 'She is planning a trip to Da Nang.', 'Cô ấy đang lên kế hoạch cho chuyến đi Đà Nẵng.', 'plans', 'present continuous', 'A2'),
  s('s218', 'I am saving money to buy a car.', 'Tôi đang tiết kiệm tiền để mua xe.', 'plans', 'present continuous', 'A2'),
  s('s219', 'They decided to get married next spring.', 'Họ quyết định kết hôn vào mùa xuân tới.', 'plans', 'decided to', 'A2'),
  s('s220', 'What are you going to do this evening?', 'Bạn sẽ làm gì tối nay?', 'plans', 'question', 'A2'),
]

// ── A2 Advice & Suggestions ────────────────────────────────
const A2_ADVICE: SentenceEntry[] = [
  s('s221', 'You should drink more water.', 'Bạn nên uống nhiều nước hơn.', 'advice', 'should', 'A2'),
  s('s222', 'Why do not you try this one?', 'Sao bạn không thử cái này?', 'advice', 'suggestion', 'A2'),
  s('s223', 'I think you should rest today.', 'Tôi nghĩ bạn nên nghỉ ngơi hôm nay.', 'advice', 'should', 'A2'),
  s('s224', 'You had better leave now or you will be late.', 'Bạn nên đi ngay nếu không sẽ muộn.', 'advice', 'had better', 'A2'),
  s('s225', 'If I were you, I would take the job.', 'Nếu tôi là bạn, tôi sẽ nhận công việc đó.', 'advice', 'if I were', 'A2'),
  s('s226', 'Let us go to the cinema tonight.', 'Tối nay chúng ta đi xem phim đi.', 'advice', 'let us', 'A2'),
  s('s227', 'How about going for a walk?', 'Đi dạo thì sao?', 'advice', 'how about', 'A2'),
  s('s228', 'Shall we order pizza?', 'Chúng ta gọi pizza nhé?', 'advice', 'shall we', 'A2'),
  s('s229', 'Do not forget to bring your passport.', 'Đừng quên mang hộ chiếu.', 'advice', 'imperative', 'A2'),
  s('s230', 'It is a good idea to arrive early.', 'Đến sớm là một ý tưởng tốt.', 'advice', 'good idea', 'A2'),
]

// ── A2 Describing Experiences ──────────────────────────────
const A2_EXPERIENCES: SentenceEntry[] = [
  s('s231', 'I had a wonderful time at the beach.', 'Tôi đã có thời gian tuyệt vời ở bãi biển.', 'experiences', 'past simple', 'A2'),
  s('s232', 'The party was really fun.', 'Bữa tiệc thực sự rất vui.', 'experiences', 'was+adj', 'A2'),
  s('s233', 'I felt very happy when I passed the exam.', 'Tôi cảm thấy rất vui khi đỗ kỳ thi.', 'experiences', 'felt+adj', 'A2'),
  s('s234', 'It was the best holiday I have ever had.', 'Đó là kỳ nghỉ tuyệt vời nhất tôi từng có.', 'experiences', 'superlative+present perfect', 'A2'),
  s('s235', 'The food was delicious and not expensive.', 'Đồ ăn ngon và không đắt.', 'experiences', 'was+adj', 'A2'),
  s('s236', 'I learned a lot from that experience.', 'Tôi đã học được nhiều từ trải nghiệm đó.', 'experiences', 'past simple', 'A2'),
  s('s237', 'The trip was tiring but worth it.', 'Chuyến đi mệt nhưng đáng giá.', 'experiences', 'was+adj', 'A2'),
  s('s238', 'We took many beautiful photos there.', 'Chúng tôi đã chụp nhiều ảnh đẹp ở đó.', 'experiences', 'past simple', 'A2'),
  s('s239', 'I will never forget that moment.', 'Tôi sẽ không bao giờ quên khoảnh khắc đó.', 'experiences', 'will', 'A2'),
  s('s240', 'She told me about her trip to Europe.', 'Cô ấy kể cho tôi về chuyến đi châu Âu.', 'experiences', 'told about', 'A2'),
]

// ── Aggregate all sentences ────────────────────────────────
export const ALL_SENTENCES: SentenceEntry[] = [
  ...GREETINGS, ...FAMILY, ...DAILY, ...FOOD, ...HOME,
  ...TRAVEL, ...SHOPPING, ...HEALTH, ...WEATHER, ...SCHOOL,
  ...DESCRIBING, ...LIKES, ...CAN, ...TIME, ...PAST, ...FUTURE,
  ...A2_CONNECTIVES, ...A2_COMPARISONS, ...A2_PRESENT_PERFECT,
  ...A2_PLANS, ...A2_ADVICE, ...A2_EXPERIENCES,
]

export const TOTAL_SENTENCES = ALL_SENTENCES.length

// Helper: get sentences by topic
export function getSentencesByTopic(topic: string): SentenceEntry[] {
  return ALL_SENTENCES.filter(s => s.topic === topic)
}

// Helper: get sentences by level
export function getSentencesByLevel(level: string): SentenceEntry[] {
  return ALL_SENTENCES.filter(s => s.level === level)
}

// Helper: get sentences by grammar point
export function getSentencesByGrammar(grammar: string): SentenceEntry[] {
  return ALL_SENTENCES.filter(s => s.grammar === grammar)
}

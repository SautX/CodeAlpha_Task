import React, { useState } from 'react';
import { Copy, Volume2, RefreshCw, Languages, Zap } from 'lucide-react';

interface TranslationPanelProps {
  onTranslationRequest: (text: string, from: string, to: string) => void;
}

const languages = [
  { code: 'auto', name: 'Auto-detect' },
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'el', name: 'Greek' },
  { code: 'he', name: 'Hebrew' },
  { code: 'fa', name: 'Persian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ne', name: 'Nepali' },
  { code: 'si', name: 'Sinhala' },
  { code: 'my', name: 'Myanmar' },
  { code: 'km', name: 'Khmer' },
  { code: 'lo', name: 'Lao' },
  { code: 'ka', name: 'Georgian' },
  { code: 'am', name: 'Amharic' },
  { code: 'sw', name: 'Swahili' },
  { code: 'zu', name: 'Zulu' },
  { code: 'af', name: 'Afrikaans' },
];

export default function TranslationPanel({ onTranslationRequest }: TranslationPanelProps) {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const mockTranslations: Record<string, Record<string, { text: string; pronunciation: string }>> = {
    'hello': {
      'en': { text: 'Hello', pronunciation: 'heh-LOH' },
      'bn': { text: 'হ্যালো', pronunciation: 'hyalo' },
      'es': { text: 'Hola', pronunciation: 'OH-lah' },
      'fr': { text: 'Bonjour', pronunciation: 'bon-ZHOOR' },
      'de': { text: 'Hallo', pronunciation: 'HAH-loh' },
      'it': { text: 'Ciao', pronunciation: 'CHAH-oh' },
      'pt': { text: 'Olá', pronunciation: 'oh-LAH' },
      'ru': { text: 'Привет', pronunciation: 'pri-VYET' },
      'ja': { text: 'こんにちは', pronunciation: 'kon-ni-chi-wa' },
      'ko': { text: '안녕하세요', pronunciation: 'an-nyeong-ha-se-yo' },
      'zh': { text: '你好', pronunciation: 'nǐ hǎo' },
      'ar': { text: 'مرحبا', pronunciation: 'mar-ha-ban' },
      'hi': { text: 'नमस्ते', pronunciation: 'na-mas-te' },
      'th': { text: 'สวัสดี', pronunciation: 'sa-wat-dee' },
      'vi': { text: 'Xin chào', pronunciation: 'sin chow' },
      'tr': { text: 'Merhaba', pronunciation: 'mer-ha-ba' },
      'pl': { text: 'Cześć', pronunciation: 'cheshch' },
      'nl': { text: 'Hallo', pronunciation: 'HAH-loh' },
      'sv': { text: 'Hej', pronunciation: 'hey' },
      'da': { text: 'Hej', pronunciation: 'hi' },
      'no': { text: 'Hei', pronunciation: 'hi' },
      'fi': { text: 'Hei', pronunciation: 'hay' },
      'el': { text: 'Γεια σας', pronunciation: 'YAH-sas' },
      'he': { text: 'שלום', pronunciation: 'sha-LOHM' },
      'fa': { text: 'سلام', pronunciation: 'sa-LAHM' },
      'ur': { text: 'السلام علیکم', pronunciation: 'as-sa-laa-mu a-lay-kum' },
      'ta': { text: 'வணக்கம்', pronunciation: 'va-nak-kam' },
      'te': { text: 'నమస్కారం', pronunciation: 'na-mas-ka-ram' },
      'ml': { text: 'നമസ്കാരം', pronunciation: 'na-mas-ka-ram' },
      'kn': { text: 'ನಮಸ್ಕಾರ', pronunciation: 'na-mas-ka-ra' },
      'gu': { text: 'નમસ્તે', pronunciation: 'na-mas-te' },
      'pa': { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', pronunciation: 'sat sri a-kaal' },
      'mr': { text: 'नमस्कार', pronunciation: 'na-mas-kar' },
      'ne': { text: 'नमस्ते', pronunciation: 'na-mas-te' },
      'si': { text: 'ආයුබෝවන්', pronunciation: 'aa-yu-bo-wan' },
      'my': { text: 'မင်္ဂလာပါ', pronunciation: 'min-ga-la-ba' },
      'km': { text: 'សួស្តី', pronunciation: 'sous-dey' },
      'lo': { text: 'ສະບາຍດີ', pronunciation: 'sa-bai-dee' },
      'ka': { text: 'გამარჯობა', pronunciation: 'ga-mar-jo-ba' },
      'am': { text: 'ሰላም', pronunciation: 'se-lam' },
      'sw': { text: 'Hujambo', pronunciation: 'hu-jam-bo' },
      'zu': { text: 'Sawubona', pronunciation: 'sa-wu-bo-na' },
      'af': { text: 'Hallo', pronunciation: 'HAH-loh' }
    },
    'how are you': {
      'en': { text: 'How are you?', pronunciation: 'how ar yoo' },
      'bn': { text: 'আপনি কেমন আছেন?', pronunciation: 'ap-ni ke-mon a-chen' },
      'es': { text: '¿Cómo estás?', pronunciation: 'KOH-moh ehs-TAHS' },
      'fr': { text: 'Comment allez-vous?', pronunciation: 'koh-mahn tah-lay VOO' },
      'de': { text: 'Wie geht es dir?', pronunciation: 'vee gayt es deer' },
      'it': { text: 'Come stai?', pronunciation: 'KOH-meh stah-ee' },
      'pt': { text: 'Como você está?', pronunciation: 'KOH-moh vo-SEH ehs-TAH' },
      'ru': { text: 'Как дела?', pronunciation: 'kak de-LAH' },
      'ja': { text: '元気ですか？', pronunciation: 'gen-ki des-ka' },
      'ko': { text: '어떻게 지내세요?', pronunciation: 'eo-tteo-ke ji-nae-se-yo' },
      'zh': { text: '你好吗？', pronunciation: 'nǐ hǎo ma' },
      'ar': { text: 'كيف حالك؟', pronunciation: 'kayf ha-lak' },
      'hi': { text: 'आप कैसे हैं?', pronunciation: 'aap kai-se hain' },
      'th': { text: 'คุณเป็นอย่างไร?', pronunciation: 'khun pen yang-rai' },
      'vi': { text: 'Bạn có khỏe không?', pronunciation: 'ban ko khoe khong' },
      'tr': { text: 'Nasılsın?', pronunciation: 'na-sil-sin' },
      'pl': { text: 'Jak się masz?', pronunciation: 'yak sheh mash' },
      'nl': { text: 'Hoe gaat het?', pronunciation: 'hoo khaht het' },
      'sv': { text: 'Hur mår du?', pronunciation: 'hoor mawr doo' },
      'da': { text: 'Hvordan har du det?', pronunciation: 'vor-dan har doo deh' },
      'no': { text: 'Hvordan har du det?', pronunciation: 'vor-dan har doo deh' },
      'fi': { text: 'Mitä kuuluu?', pronunciation: 'mi-ta koo-loo' },
      'el': { text: 'Πώς είσαι;', pronunciation: 'pos EE-seh' },
      'he': { text: 'מה שלומך?', pronunciation: 'mah shlo-MEKH' },
      'fa': { text: 'حال شما چطور است؟', pronunciation: 'haal-e sho-ma che-tor ast' },
      'ur': { text: 'آپ کیسے ہیں؟', pronunciation: 'aap kai-se hain' },
      'ta': { text: 'நீங்கள் எப்படி இருக்கிறீர்கள்?', pronunciation: 'neen-gal ep-pa-di i-ruk-ki-ree-gal' },
      'te': { text: 'మీరు ఎలా ఉన్నారు?', pronunciation: 'mee-ru e-laa un-naa-ru' },
      'ml': { text: 'നിങ്ങൾ എങ്ങനെയുണ്ട്?', pronunciation: 'nin-gal en-ga-ne-yund' },
      'kn': { text: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', pronunciation: 'nee-vu he-gid-dee-ri' },
      'gu': { text: 'તમે કેમ છો?', pronunciation: 'ta-me kem cho' },
      'pa': { text: 'ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', pronunciation: 'tu-seen ki-ven ho' },
      'mr': { text: 'तुम्ही कसे आहात?', pronunciation: 'tum-hi ka-se aa-haat' },
      'ne': { text: 'तपाईं कस्तो हुनुहुन्छ?', pronunciation: 'ta-pai kas-to hu-nu-hun-cha' },
      'si': { text: 'ඔබ කොහොමද?', pronunciation: 'o-ba ko-ho-ma-da' },
      'my': { text: 'နေကောင်းလား?', pronunciation: 'ne-kaung-laa' },
      'km': { text: 'តើអ្នកសុខសប្បាយទេ?', pronunciation: 'tae nak sok sab-baay te' },
      'lo': { text: 'ເຈົ້າເປັນແນວໃດ?', pronunciation: 'jao pen naeo dai' },
      'ka': { text: 'როგორ ხარ?', pronunciation: 'ro-gor khar' },
      'am': { text: 'እንዴት ነህ?', pronunciation: 'en-det neh' },
      'sw': { text: 'Habari yako?', pronunciation: 'ha-ba-ri ya-ko' },
      'zu': { text: 'Unjani?', pronunciation: 'un-ja-ni' },
      'af': { text: 'Hoe gaan dit?', pronunciation: 'hoo khaan dit' }
    },
    'good morning': {
      'en': { text: 'Good morning', pronunciation: 'good MOR-ning' },
      'bn': { text: 'সুপ্রভাত', pronunciation: 'su-pro-bhat' },
      'es': { text: 'Buenos días', pronunciation: 'BWAY-nohs DEE-ahs' },
      'fr': { text: 'Bonjour', pronunciation: 'bon-ZHOOR' },
      'de': { text: 'Guten Morgen', pronunciation: 'GOO-ten MOR-gen' },
      'it': { text: 'Buongiorno', pronunciation: 'bwohn-JHOR-noh' },
      'pt': { text: 'Bom dia', pronunciation: 'bom DEE-ah' },
      'ru': { text: 'Доброе утро', pronunciation: 'DOH-broh-ye OO-troh' },
      'ja': { text: 'おはようございます', pronunciation: 'o-ha-you go-zai-mas' },
      'ko': { text: '좋은 아침입니다', pronunciation: 'jo-eun a-chim-im-ni-da' },
      'zh': { text: '早上好', pronunciation: 'zǎo shàng hǎo' },
      'ar': { text: 'صباح الخير', pronunciation: 'sa-baah al-khayr' },
      'hi': { text: 'सुप्रभात', pronunciation: 'su-pra-bhaat' },
      'th': { text: 'อรุณสวัสดิ์', pronunciation: 'a-run sa-wat' },
      'vi': { text: 'Chào buổi sáng', pronunciation: 'chao buoi sang' },
      'tr': { text: 'Günaydın', pronunciation: 'gü-nay-din' }
    },
    'please': {
      'en': { text: 'Please', pronunciation: 'pleez' },
      'bn': { text: 'দয়া করে', pronunciation: 'do-ya ko-re' },
      'es': { text: 'Por favor', pronunciation: 'por fah-VOR' },
      'fr': { text: 'S\'il vous plaît', pronunciation: 'seel voo PLEH' },
      'de': { text: 'Bitte', pronunciation: 'BIT-teh' },
      'it': { text: 'Per favore', pronunciation: 'per fah-VOH-reh' },
      'pt': { text: 'Por favor', pronunciation: 'por fah-VOR' },
      'ru': { text: 'Пожалуйста', pronunciation: 'pah-ZHAH-loo-stah' },
      'ja': { text: 'お願いします', pronunciation: 'o-ne-gai shi-mas' },
      'ko': { text: '제발', pronunciation: 'je-bal' },
      'zh': { text: '请', pronunciation: 'qǐng' },
      'ar': { text: 'من فضلك', pronunciation: 'min fad-lik' },
      'hi': { text: 'कृपया', pronunciation: 'kri-pa-ya' },
      'th': { text: 'โปรด', pronunciation: 'proht' },
      'vi': { text: 'Xin lỗi', pronunciation: 'sin loi' },
      'tr': { text: 'Lütfen', pronunciation: 'lüt-fen' }
    },
    'excuse me': {
      'en': { text: 'Excuse me', pronunciation: 'ik-SKYOOZ mee' },
      'bn': { text: 'মাফ করবেন', pronunciation: 'maaf kor-ben' },
      'es': { text: 'Disculpe', pronunciation: 'dis-KOOL-peh' },
      'fr': { text: 'Excusez-moi', pronunciation: 'ehk-skü-zay MWAH' },
      'de': { text: 'Entschuldigung', pronunciation: 'ent-SHOOL-di-goong' },
      'it': { text: 'Mi scusi', pronunciation: 'mee SKOO-zee' },
      'pt': { text: 'Com licença', pronunciation: 'kom li-SEN-sah' },
      'ru': { text: 'Извините', pronunciation: 'iz-vi-NEE-tye' },
      'ja': { text: 'すみません', pronunciation: 'su-mi-ma-sen' },
      'ko': { text: '실례합니다', pronunciation: 'sil-lye-ham-ni-da' },
      'zh': { text: '不好意思', pronunciation: 'bù hǎo yì si' },
      'ar': { text: 'عذراً', pronunciation: 'uz-ran' },
      'hi': { text: 'माफ़ करिए', pronunciation: 'maaf ka-ri-ye' },
      'th': { text: 'ขอโทษ', pronunciation: 'khor toht' },
      'vi': { text: 'Xin lỗi', pronunciation: 'sin loi' },
      'tr': { text: 'Affedersiniz', pronunciation: 'af-fe-der-si-niz' }
    },
    'i love you': {
      'en': { text: 'I love you', pronunciation: 'ai luv yoo' },
      'bn': { text: 'আমি তোমাকে ভালোবাসি', pronunciation: 'a-mi to-ma-ke bha-lo-ba-si' },
      'es': { text: 'Te amo', pronunciation: 'teh AH-moh' },
      'fr': { text: 'Je t\'aime', pronunciation: 'zhuh TEHM' },
      'de': { text: 'Ich liebe dich', pronunciation: 'ikh LEE-beh dikh' },
      'it': { text: 'Ti amo', pronunciation: 'tee AH-moh' },
      'pt': { text: 'Eu te amo', pronunciation: 'eh-oo chee AH-moh' },
      'ru': { text: 'Я тебя люблю', pronunciation: 'ya te-BYA lyu-BLYU' },
      'ja': { text: '愛してる', pronunciation: 'ai shi-te-ru' },
      'ko': { text: '사랑해요', pronunciation: 'sa-rang-hae-yo' },
      'zh': { text: '我爱你', pronunciation: 'wǒ ài nǐ' },
      'ar': { text: 'أحبك', pronunciation: 'u-hib-buk' },
      'hi': { text: 'मैं तुमसे प्यार करता हूँ', pronunciation: 'main tum-se pyaar kar-ta hun' },
      'th': { text: 'ฉันรักเธอ', pronunciation: 'chan rak thoe' },
      'vi': { text: 'Anh yêu em', pronunciation: 'anh yeu em' },
      'tr': { text: 'Seni seviyorum', pronunciation: 'se-ni se-vi-yo-rum' }
    },
    'goodbye': {
      'en': { text: 'Goodbye', pronunciation: 'good-BYE' },
      'bn': { text: 'বিদায়', pronunciation: 'bi-dai' },
      'es': { text: 'Adiós', pronunciation: 'ah-DYOHS' },
      'fr': { text: 'Au revoir', pronunciation: 'oh ruh-VWAHR' },
      'de': { text: 'Auf Wiedersehen', pronunciation: 'owf VEE-der-zayn' },
      'it': { text: 'Arrivederci', pronunciation: 'ah-ree-veh-DEHR-chee' },
      'pt': { text: 'Tchau', pronunciation: 'chow' },
      'ru': { text: 'До свидания', pronunciation: 'do svi-DA-ni-ya' },
      'ja': { text: 'さようなら', pronunciation: 'sa-yo-na-ra' },
      'ko': { text: '안녕히 가세요', pronunciation: 'an-nyeong-hi ga-se-yo' },
      'zh': { text: '再见', pronunciation: 'zài jiàn' },
      'ar': { text: 'وداعا', pronunciation: 'wa-da-an' },
      'hi': { text: 'अलविदा', pronunciation: 'al-vi-da' },
      'th': { text: 'ลาก่อน', pronunciation: 'laa gon' },
      'vi': { text: 'Tạm biệt', pronunciation: 'tam byet' },
      'tr': { text: 'Hoşça kal', pronunciation: 'hosh-cha kal' },
      'pl': { text: 'Do widzenia', pronunciation: 'do vi-dze-nya' },
      'nl': { text: 'Tot ziens', pronunciation: 'tot zeens' },
      'sv': { text: 'Hej då', pronunciation: 'hey daw' },
      'da': { text: 'Farvel', pronunciation: 'far-vel' },
      'no': { text: 'Ha det', pronunciation: 'ha deh' },
      'fi': { text: 'Näkemiin', pronunciation: 'na-ke-meen' },
      'el': { text: 'Αντίο', pronunciation: 'an-DEE-oh' },
      'he': { text: 'להתראות', pronunciation: 'le-hit-ra-OHT' },
      'fa': { text: 'خداحافظ', pronunciation: 'kho-da-ha-fez' },
      'ur': { text: 'الوداع', pronunciation: 'al-vi-da' },
      'ta': { text: 'பிரியாவிடை', pronunciation: 'pri-ya-vi-dai' },
      'te': { text: 'వీడ్కోలు', pronunciation: 'veed-ko-lu' },
      'ml': { text: 'വിടവാങ്ങൽ', pronunciation: 'vi-da-vaan-gal' },
      'kn': { text: 'ವಿದಾಯ', pronunciation: 'vi-daa-ya' },
      'gu': { text: 'વિદાય', pronunciation: 'vi-daay' },
      'pa': { text: 'ਅਲਵਿਦਾ', pronunciation: 'al-vi-da' },
      'mr': { text: 'निरोप', pronunciation: 'ni-rop' },
      'ne': { text: 'बिदाई', pronunciation: 'bi-dai' },
      'si': { text: 'ගිහින් එන්නම්', pronunciation: 'gi-hin en-nam' },
      'my': { text: 'သွားတော့မယ်', pronunciation: 'thwa-daw-meh' },
      'km': { text: 'លាហើយ', pronunciation: 'lea haey' },
      'lo': { text: 'ລາກ່ອນ', pronunciation: 'laa gon' },
      'ka': { text: 'ნახვამდის', pronunciation: 'nakh-vam-dis' },
      'am': { text: 'ቻው', pronunciation: 'chaw' },
      'sw': { text: 'Kwaheri', pronunciation: 'kwa-he-ri' },
      'zu': { text: 'Sala kahle', pronunciation: 'sa-la kah-le' },
      'af': { text: 'Totsiens', pronunciation: 'TOHT-seens' }
    },
    'thank you': {
      'en': { text: 'Thank you', pronunciation: 'thank yoo' },
      'bn': { text: 'ধন্যবাদ', pronunciation: 'dhon-no-bad' },
      'es': { text: 'Gracias', pronunciation: 'GRAH-see-ahs' },
      'fr': { text: 'Merci', pronunciation: 'mer-SEE' },
      'de': { text: 'Danke', pronunciation: 'DAHN-keh' },
      'it': { text: 'Grazie', pronunciation: 'GRAH-tsee-eh' },
      'pt': { text: 'Obrigado', pronunciation: 'oh-bri-GAH-doh' },
      'ru': { text: 'Спасибо', pronunciation: 'spa-SEE-bah' },
      'ja': { text: 'ありがとう', pronunciation: 'a-ri-ga-tou' },
      'ko': { text: '감사합니다', pronunciation: 'gam-sa-ham-ni-da' },
      'zh': { text: '谢谢', pronunciation: 'xiè xiè' },
      'ar': { text: 'شكرا', pronunciation: 'shuk-ran' },
      'hi': { text: 'धन्यवाद', pronunciation: 'dhan-ya-vaad' },
      'th': { text: 'ขอบคุณ', pronunciation: 'khob khun' },
      'vi': { text: 'Cảm ơn', pronunciation: 'gam un' },
      'tr': { text: 'Teşekkür ederim', pronunciation: 'te-shek-kur e-de-rim' }
    },
    'yes': {
      'en': { text: 'Yes', pronunciation: 'yes' },
      'bn': { text: 'হ্যাঁ', pronunciation: 'hyan' },
      'es': { text: 'Sí', pronunciation: 'see' },
      'fr': { text: 'Oui', pronunciation: 'wee' },
      'de': { text: 'Ja', pronunciation: 'yah' },
      'it': { text: 'Sì', pronunciation: 'see' },
      'pt': { text: 'Sim', pronunciation: 'seem' },
      'ru': { text: 'Да', pronunciation: 'da' },
      'ja': { text: 'はい', pronunciation: 'hai' },
      'ko': { text: '네', pronunciation: 'ne' },
      'zh': { text: '是', pronunciation: 'shì' },
      'ar': { text: 'نعم', pronunciation: 'na-am' },
      'hi': { text: 'हाँ', pronunciation: 'haan' },
      'th': { text: 'ใช่', pronunciation: 'chai' },
      'vi': { text: 'Có', pronunciation: 'ko' },
      'tr': { text: 'Evet', pronunciation: 'e-vet' }
    },
    'no': {
      'en': { text: 'No', pronunciation: 'no' },
      'bn': { text: 'না', pronunciation: 'na' },
      'es': { text: 'No', pronunciation: 'noh' },
      'fr': { text: 'Non', pronunciation: 'nohn' },
      'de': { text: 'Nein', pronunciation: 'nine' },
      'it': { text: 'No', pronunciation: 'noh' },
      'pt': { text: 'Não', pronunciation: 'now' },
      'ru': { text: 'Нет', pronunciation: 'nyet' },
      'ja': { text: 'いいえ', pronunciation: 'ii-e' },
      'ko': { text: '아니요', pronunciation: 'a-ni-yo' },
      'zh': { text: '不', pronunciation: 'bù' },
      'ar': { text: 'لا', pronunciation: 'laa' },
      'hi': { text: 'नहीं', pronunciation: 'na-heen' },
      'th': { text: 'ไม่', pronunciation: 'mai' },
      'vi': { text: 'Không', pronunciation: 'khong' },
      'tr': { text: 'Hayır', pronunciation: 'ha-yir' }
    },
    'water': {
      'en': { text: 'Water', pronunciation: 'WAH-ter' },
      'bn': { text: 'পানি', pronunciation: 'pa-ni' },
      'es': { text: 'Agua', pronunciation: 'AH-gwah' },
      'fr': { text: 'Eau', pronunciation: 'oh' },
      'de': { text: 'Wasser', pronunciation: 'VAH-ser' },
      'it': { text: 'Acqua', pronunciation: 'AH-kwah' },
      'pt': { text: 'Água', pronunciation: 'AH-gwah' },
      'ru': { text: 'Вода', pronunciation: 'vo-DAH' },
      'ja': { text: '水', pronunciation: 'mi-zu' },
      'ko': { text: '물', pronunciation: 'mul' },
      'zh': { text: '水', pronunciation: 'shuǐ' },
      'ar': { text: 'ماء', pronunciation: 'maa' },
      'hi': { text: 'पानी', pronunciation: 'paa-nee' },
      'th': { text: 'น้ำ', pronunciation: 'nam' },
      'vi': { text: 'Nước', pronunciation: 'nuoc' },
      'tr': { text: 'Su', pronunciation: 'soo' }
    },
    'food': {
      'en': { text: 'Food', pronunciation: 'food' },
      'bn': { text: 'খাবার', pronunciation: 'kha-bar' },
      'es': { text: 'Comida', pronunciation: 'ko-MEE-dah' },
      'fr': { text: 'Nourriture', pronunciation: 'noo-ree-TOOR' },
      'de': { text: 'Essen', pronunciation: 'EH-sen' },
      'it': { text: 'Cibo', pronunciation: 'CHEE-boh' },
      'pt': { text: 'Comida', pronunciation: 'ko-MEE-dah' },
      'ru': { text: 'Еда', pronunciation: 'ye-DAH' },
      'ja': { text: '食べ物', pronunciation: 'ta-be-mo-no' },
      'ko': { text: '음식', pronunciation: 'eum-sik' },
      'zh': { text: '食物', pronunciation: 'shí wù' },
      'ar': { text: 'طعام', pronunciation: 'ta-aam' },
      'hi': { text: 'खाना', pronunciation: 'khaa-na' },
      'th': { text: 'อาหาร', pronunciation: 'aa-haan' },
      'vi': { text: 'Thức ăn', pronunciation: 'thuc an' },
      'tr': { text: 'Yemek', pronunciation: 'ye-mek' }
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    onTranslationRequest(inputText, sourceLanguage, targetLanguage);
    
    // Mock translation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerInput = inputText.toLowerCase();
    let translationData = mockTranslations[lowerInput]?.[targetLanguage];
    
    if (!translationData) {
      // Try to find partial matches or generate a fallback translation
      const matchingKey = Object.keys(mockTranslations).find(key => 
        lowerInput.includes(key) || key.includes(lowerInput)
      );
      
      if (matchingKey) {
        translationData = mockTranslations[matchingKey]?.[targetLanguage];
      }
    }
    
    if (translationData) {
      setTranslatedText(translationData.text);
      setPronunciation(translationData.pronunciation);
    } else {
      const targetLangName = languages.find(l => l.code === targetLanguage)?.name;
      
      // Generate a more realistic fallback with proper script indication
      if (targetLanguage === 'bn') {
        setTranslatedText(`[বাংলায় অনুবাদ]: ${inputText}`);
        setPronunciation(`[ban-glay o-nu-bad]: ${inputText}`);
      } else if (targetLanguage === 'ar') {
        setTranslatedText(`[مترجم إلى العربية]: ${inputText}`);
        setPronunciation(`[mu-tar-jam ila al-ara-bi-ya]: ${inputText}`);
      } else if (targetLanguage === 'hi') {
        setTranslatedText(`[हिंदी में अनुवाद]: ${inputText}`);
        setPronunciation(`[hin-di mein a-nu-vaad]: ${inputText}`);
      } else if (targetLanguage === 'zh') {
        setTranslatedText(`[翻译成中文]: ${inputText}`);
        setPronunciation(`[fān yì chéng zhōng wén]: ${inputText}`);
      } else if (targetLanguage === 'ja') {
        setTranslatedText(`[日本語に翻訳]: ${inputText}`);
        setPronunciation(`[ni-hon-go ni hon-yaku]: ${inputText}`);
      } else if (targetLanguage === 'ko') {
        setTranslatedText(`[한국어로 번역]: ${inputText}`);
        setPronunciation(`[han-gug-eo-ro beon-yeok]: ${inputText}`);
      } else if (targetLanguage === 'ru') {
        setTranslatedText(`[Переведено на русский]: ${inputText}`);
        setPronunciation(`[pe-re-ve-de-no na RU-skiy]: ${inputText}`);
      } else if (targetLanguage === 'th') {
        setTranslatedText(`[แปลเป็นภาษาไทย]: ${inputText}`);
        setPronunciation(`[plae pen pha-saa thai]: ${inputText}`);
      } else {
        setTranslatedText(`[Translated to ${targetLangName}]: ${inputText}`);
        setPronunciation(`[Translation in ${targetLangName} script]`);
      }
    }
    
    setIsTranslating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const handlePlay = () => {
    if ('speechSynthesis' in window && translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setPronunciation('');
  };

  const swapLanguages = () => {
    if (sourceLanguage !== 'auto') {
      setSourceLanguage(targetLanguage);
      setTargetLanguage(sourceLanguage);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
          <Languages className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">LinguaBridge Translation Panel</h2>
        <div className="ml-auto bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white/80 text-sm font-medium">{languages.length - 1} Languages</span>
        </div>
      </div>

      {/* Language Selection */}
      <div className="flex items-center gap-4 mb-6">
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-gray-800">
              {lang.name}
            </option>
          ))}
        </select>
        
        <button
          onClick={swapLanguages}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 group"
          disabled={sourceLanguage === 'auto'}
        >
          <RefreshCw className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-300" />
        </button>
        
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {languages.filter(lang => lang.code !== 'auto').map((lang) => (
            <option key={lang.code} value={lang.code} className="text-gray-800">
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Input Text Area */}
      <div className="mb-6">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
          className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleTranslate}
          disabled={!inputText.trim() || isTranslating}
          className="flex-1 flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {isTranslating ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Zap className="w-5 h-5" />
          )}
          {isTranslating ? 'Translating...' : 'Translate'}
        </button>
        
        <button
          onClick={handleClear}
          className="px-6 py-4 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200"
        >
          Clear
        </button>
      </div>

      {/* Output Text Area */}
      {translatedText && (
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">Translation</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 group"
              >
                <Copy className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handlePlay}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 group"
              >
                <Volume2 className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
          <p className="text-white text-lg leading-relaxed">{translatedText}</p>
          
          {/* Pronunciation Guide */}
          {pronunciation && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-white/80 text-sm font-medium">Pronunciation Guide</span>
              </div>
              <p className="text-yellow-200 text-base font-mono">{pronunciation}</p>
            </div>
          )}
          
          {/* Language Script Info */}
          <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Native Script</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Phonetic Guide</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
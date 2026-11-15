
"use strict";

/* =========================================================
   TÜRK TARİHİ ATLASI — TURKIC WORLD
   Ana uygulama, tarih arşivi ve yönetim simülasyonu
   ========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const STORAGE = {
  theme: "turkicworld-theme-v1",
  game: "turkicworld-game-v1"
};

const PERIODS = {
  ancient: "İlk Türk Devletleri",
  islamic: "Türk-İslam Devletleri",
  empire: "İmparatorluklar",
  modern: "Modern Türk Devletleri"
};

const SYMBOLS = {
  ancient: "𐰜",
  islamic: "✥",
  empire: "♜",
  modern: "★"
};

/* ---------------------------------------------------------
   1. DEVLET ARŞİVİ
   Tarihler yaklaşık tarihsel dönemleri ifade eder.
   Sınırlar ve yönetim alanları dönemlere göre değişmiştir.
   --------------------------------------------------------- */

const STATES = [
  {
    id: "xiongnu",
    name: "Asya Hun Devleti",
    era: "ancient",
    date: "MÖ 3. yüzyıl",
    start: -220,
    end: 216,
    capital: "Ötüken çevresi",
    founder: "Teoman",
    ruler: "Mete Han",
    symbol: "𐰴",
    location: [430, 190],
    description: "Orta Asya bozkırlarında güçlü bir siyasi birlik oluşturan Hun konfederasyonu. Mete Han döneminde askerî ve siyasi teşkilatlanmasıyla öne çıktı.",
    facts: [
      "Mete Han döneminde siyasi ve askerî güç büyük ölçüde arttı.",
      "Bozkır devlet geleneğinin önemli örneklerinden biridir.",
      "Çin ile uzun süreli siyasi ve diplomatik ilişkiler yürütüldü."
    ],
    leaders: ["Teoman", "Mete Han", "Ki-ok"],
    allies: ["Hun boyları ve bağlı topluluklar"],
    rivals: ["Han Hanedanı"]
  },
  {
    id: "western-hun",
    name: "Batı Hun Devleti",
    era: "ancient",
    date: "4–5. yüzyıl",
    start: 370,
    end: 469,
    capital: "Avrupa bozkırları",
    founder: "Balamir ile ilişkilendirilen kuruluş",
    ruler: "Attila",
    symbol: "𐰴",
    location: [185, 190],
    description: "Avrupa Hunlarının siyasi ve askerî gücünü temsil eden yapı. Attila döneminde Doğu ve Batı Roma ile ilişkilerinde etkili oldu.",
    facts: [
      "Attila döneminde Avrupa siyasetinde belirleyici bir güç hâline geldi.",
      "Doğu ve Batı Roma ile antlaşmalar ve diplomatik görüşmeler yapıldı.",
      "Avrupa kavimlerinin siyasi tarihini etkiledi."
    ],
    leaders: ["Balamir", "Uldız", "Rua", "Attila"],
    allies: ["Döneme göre değişen Germen toplulukları"],
    rivals: ["Doğu Roma", "Batı Roma"]
  },
  {
    id: "gokturk",
    name: "Göktürk Kağanlığı",
    era: "ancient",
    date: "552–744",
    start: 552,
    end: 744,
    capital: "Ötüken",
    founder: "Bumin Kağan",
    ruler: "Mukan Kağan",
    symbol: "𐰜",
    location: [460, 155],
    description: "Türk adını devlet adı olarak kullanan ilk siyasi teşkilat olarak kabul edilir. Orta Asya'da geniş bir siyasi hâkimiyet kurdu.",
    facts: [
      "Bumin Kağan 552 yılında kağanlığın kuruluşunda öncü oldu.",
      "Orhun Yazıtları, Göktürk tarihinin en önemli yazılı kaynaklarındandır.",
      "Doğu ve Batı kanatlarıyla geniş bir coğrafyada etkili oldu."
    ],
    leaders: ["Bumin Kağan", "Mukan Kağan", "İstemi Yabgu", "Bilge Kağan", "Kül Tigin"],
    allies: ["Döneme göre bağlı Türk boyları"],
    rivals: ["Sui Hanedanı", "Tang Hanedanı"]
  },
  {
    id: "western-gokturk",
    name: "Batı Göktürk Kağanlığı",
    era: "ancient",
    date: "6–7. yüzyıl",
    start: 603,
    end: 657,
    capital: "Yedisu bölgesi",
    founder: "Göktürklerin batı kanadı",
    ruler: "Tong Yabgu Kağan",
    symbol: "𐰜",
    location: [350, 210],
    description: "Göktürk siyasi mirasının batı kanadını temsil eder. İpek Yolu üzerindeki konumu nedeniyle diplomatik ve ticari ilişkilerde etkiliydi.",
    facts: [
      "İpek Yolu üzerindeki ticari bağlantılarda önemli rol oynadı.",
      "Bizans ve Sasani dünyasıyla diplomatik temaslarda bulundu.",
      "Yedisu ve çevresinde etkili oldu."
    ],
    leaders: ["Şipi Kağan", "Tong Yabgu Kağan"],
    allies: ["Bizans ile dönemsel diplomatik temaslar"],
    rivals: ["Tang Hanedanı", "Sasani Devleti"]
  },
  {
    id: "uyghur",
    name: "Uygur Kağanlığı",
    era: "ancient",
    date: "744–840",
    start: 744,
    end: 840,
    capital: "Ordu Balık",
    founder: "Kutluk Bilge Kül Kağan",
    ruler: "Moyun Çor",
    symbol: "𐰇",
    location: [505, 235],
    description: "Yerleşik şehir hayatı, yazılı kültür ve ticaret alanlarında gelişen önemli bir Türk kağanlığı.",
    facts: [
      "Ordu Balık önemli siyasi ve kültürel merkezlerinden biriydi.",
      "Maniheizm ve Budizm gibi inançlar bazı dönemlerde etkili oldu.",
      "Uygur yazısı ve kültürel üretim tarih açısından önemlidir."
    ],
    leaders: ["Kutluk Bilge Kül Kağan", "Moyun Çor", "Bögü Kağan"],
    allies: ["Tang Hanedanı ile dönemsel ilişkiler"],
    rivals: ["Kırgız Kağanlığı"]
  },
  {
    id: "khazar",
    name: "Hazar Kağanlığı",
    era: "ancient",
    date: "7–10. yüzyıl",
    start: 650,
    end: 969,
    capital: "İtil",
    founder: "Hazar siyasi birliğinin kurucuları",
    ruler: "Bulmuş Kağan",
    symbol: "✥",
    location: [245, 260],
    description: "Hazar Denizi'nin kuzeyi ve Kafkasya çevresinde etkili olan Türk siyasi oluşumu. Ticaret yolları ve diplomatik ilişkileriyle tanındı.",
    facts: [
      "İtil önemli siyasi ve ticari merkezlerinden biriydi.",
      "Bizans ve çevre devletlerle diplomatik ilişkiler kuruldu.",
      "Farklı inanç ve toplulukların bir arada bulunduğu bir yapıydı."
    ],
    leaders: ["Bulan", "Obadiah", "Joseph"],
    allies: ["Bizans ile dönemsel ilişkiler"],
    rivals: ["Kiev Knezliği", "Arap güçleri"]
  },
  {
    id: "karakhanid",
    name: "Karahanlı Devleti",
    era: "islamic",
    date: "840–1212",
    start: 840,
    end: 1212,
    capital: "Balasagun, Kaşgar",
    founder: "Bilinen ilk hükümdarlarından Bilge Kül Kadir Han",
    ruler: "Satuk Buğra Han",
    symbol: "✥",
    location: [415, 250],
    description: "Türk-İslam tarihinin önemli devletlerinden biri. Türk dili ve İslam kültürünün gelişmesinde önemli rol oynadı.",
    facts: [
      "Satuk Buğra Han'ın Müslüman olması devlet tarihi açısından önemli bir dönüm noktasıdır.",
      "Kaşgarlı Mahmud ve Yusuf Has Hacib gibi isimler bu kültürel çevrede yetişti.",
      "Türk dili ve edebiyatı açısından önemli eserler ortaya çıktı."
    ],
    leaders: ["Satuk Buğra Han", "Musa Baytaş", "Hasan Buğra Han"],
    allies: ["Döneme göre diğer Türk-İslam hanedanları"],
    rivals: ["Gazneliler", "Selçuklular"]
  },
  {
    id: "ghaznavid",
    name: "Gazneli Devleti",
    era: "islamic",
    date: "977–1186",
    start: 977,
    end: 1186,
    capital: "Gazne",
    founder: "Sebük Tegin",
    ruler: "Gazneli Mahmud",
    symbol: "✥",
    location: [490, 330],
    description: "Afganistan ve çevresinde kurulan, Hindistan'a uzanan siyasi ve kültürel etkisi bulunan Türk-İslam devleti.",
    facts: [
      "Gazneli Mahmud döneminde devletin siyasi etkisi genişledi.",
      "Gazne önemli bir kültür ve yönetim merkezi oldu.",
      "Farsça edebiyat ve saray kültürü gelişti."
    ],
    leaders: ["Sebük Tegin", "Gazneli Mahmud", "Mesud"],
    allies: ["Döneme göre Karahanlılar"],
    rivals: ["Büyük Selçuklu Devleti"]
  },
  {
    id: "great-seljuk",
    name: "Büyük Selçuklu Devleti",
    era: "islamic",
    date: "1037–1194",
    start: 1037,
    end: 1194,
    capital: "Nişabur, Rey, İsfahan",
    founder: "Tuğrul Bey",
    ruler: "Melikşah",
    symbol: "✥",
    location: [430, 320],
    description: "Orta Asya'dan İran ve Irak'a uzanan geniş bir coğrafyada etkili olan Türk-İslam imparatorluğu.",
    facts: [
      "1040 Dandanakan Savaşı devletin yükselişinde önemli rol oynadı.",
      "Nizamiye medreseleri eğitim tarihinde önemli bir yere sahiptir.",
      "Melikşah döneminde siyasi ve kültürel güç zirveye yaklaştı."
    ],
    leaders: ["Tuğrul Bey", "Alp Arslan", "Melikşah", "Sencer"],
    allies: ["Döneme göre Abbasi Halifeliği"],
    rivals: ["Gazneliler", "Bizans", "Karahanlılar"]
  },
  {
    id: "anatolian-seljuk",
    name: "Anadolu Selçuklu Devleti",
    era: "islamic",
    date: "1077–1308",
    start: 1077,
    end: 1308,
    capital: "İznik, Konya",
    founder: "Kutalmışoğlu Süleyman Şah",
    ruler: "I. Alaeddin Keykubad",
    symbol: "✥",
    location: [315, 345],
    description: "Anadolu'da Türk siyasi varlığının güçlenmesinde etkili olan Selçuklu devleti. Ticaret, mimari ve şehirleşme alanlarında iz bıraktı.",
    facts: [
      "Konya önemli bir siyasi ve kültürel merkez hâline geldi.",
      "Kervansaraylar ticaret yollarının gelişmesini destekledi.",
      "I. Alaeddin Keykubad döneminde devletin gücü arttı."
    ],
    leaders: ["Süleyman Şah", "I. Kılıç Arslan", "I. Alaeddin Keykubad"],
    allies: ["Döneme göre çevre beylikler"],
    rivals: ["Bizans", "Moğol İlhanlıları"]
  },
  {
    id: "khwarazmian",
    name: "Harzemşahlar",
    era: "islamic",
    date: "1077–1231",
    start: 1077,
    end: 1231,
    capital: "Gürgenç",
    founder: "Anuş Tigin",
    ruler: "Alaeddin Tekiş",
    symbol: "✥",
    location: [470, 275],
    description: "Harezm merkezli olarak gelişen ve Orta Asya ile İran coğrafyasında etkili olan Türk hanedanı.",
    facts: [
      "Alaeddin Tekiş döneminde siyasi güç arttı.",
      "Moğol istilası devletin son döneminde belirleyici oldu.",
      "Orta Asya ve İran tarihinin önemli siyasi aktörlerindendir."
    ],
    leaders: ["Anuş Tigin", "Atsız", "Alaeddin Tekiş", "Celaleddin Mengüberti"],
    allies: ["Döneme göre yerel hanedanlar"],
    rivals: ["Moğol İmparatorluğu"]
  },
  {
    id: "golden-horde",
    name: "Altın Orda Devleti",
    era: "empire",
    date: "13–15. yüzyıl",
    start: 1242,
    end: 1502,
    capital: "Saray-Batu, Saray-Berke",
    founder: "Batu Han",
    ruler: "Özbek Han",
    symbol: "♜",
    location: [245, 220],
    description: "Cuci Ulusu'nun devamı olarak gelişen, Avrasya bozkırlarında etkili olan Türk-Moğol siyasi yapısı.",
    facts: [
      "Özbek Han döneminde İslamiyetin etkisi güçlendi.",
      "Rus knezlikleri ve Doğu Avrupa siyaseti üzerinde etkili oldu.",
      "Kırım ve Kazan gibi sonraki hanlıkların tarihini etkiledi."
    ],
    leaders: ["Batu Han", "Berke Han", "Özbek Han", "Toktamış"],
    allies: ["Döneme göre Memlük Devleti"],
    rivals: ["Timur Devleti", "Rus knezlikleri"]
  },
  {
    id: "timurid",
    name: "Timur Devleti",
    era: "empire",
    date: "1370–1507",
    start: 1370,
    end: 1507,
    capital: "Semerkant",
    founder: "Timur",
    ruler: "Timur",
    symbol: "♜",
    location: [445, 285],
    description: "Maveraünnehir merkezli olarak kurulan ve Orta Asya, İran ve çevresinde etkili olan büyük siyasi güç.",
    facts: [
      "Semerkant önemli bir bilim, sanat ve mimari merkezi hâline geldi.",
      "Uluğ Bey döneminde astronomi çalışmaları gelişti.",
      "Timur dönemi Avrasya tarihini derinden etkiledi."
    ],
    leaders: ["Timur", "Şahruh", "Uluğ Bey", "Hüseyin Baykara"],
    allies: ["Döneme göre çeşitli Orta Asya hanedanları"],
    rivals: ["Altın Orda", "Osmanlı Devleti"]
  },
  {
    id: "ottoman",
    name: "Osmanlı Devleti",
    era: "empire",
    date: "1299–1922",
    start: 1299,
    end: 1922,
    capital: "Bursa, Edirne, İstanbul",
    founder: "Osman Gazi",
    ruler: "Kanuni Sultan Süleyman",
    symbol: "☪",
    location: [285, 340],
    description: "Anadolu'da kurularak üç kıtada yüzyıllar boyunca hüküm süren büyük imparatorluk. Devlet teşkilatı, mimari, hukuk ve kültür alanlarında kalıcı izler bıraktı.",
    facts: [
      "Osman Gazi döneminde beyliğin temelleri atıldı.",
      "1453 yılında İstanbul'un fethi dünya tarihi açısından önemli bir dönüm noktası oldu.",
      "Kanuni Sultan Süleyman döneminde siyasi ve kültürel etki genişledi.",
      "Saltanat 1922 yılında kaldırıldı."
    ],
    leaders: ["Osman Gazi", "Orhan Gazi", "Fatih Sultan Mehmed", "Yavuz Sultan Selim", "Kanuni Sultan Süleyman"],
    allies: ["Döneme göre Fransa ve çeşitli Avrupa devletleri"],
    rivals: ["Safevî Devleti", "Habsburg Monarşisi"]
  },
  {
    id: "aq-qoyunlu",
    name: "Akkoyunlu Devleti",
    era: "empire",
    date: "14–16. yüzyıl",
    start: 1378,
    end: 1501,
    capital: "Diyarbakır, Tebriz",
    founder: "Kara Yülük Osman Bey",
    ruler: "Uzun Hasan",
    symbol: "♜",
    location: [365, 320],
    description: "Doğu Anadolu, Azerbaycan ve İran çevresinde etkili olan Türkmen hanedanı.",
    facts: [
      "Uzun Hasan döneminde siyasi güç ve diplomatik ilişkiler gelişti.",
      "Osmanlı ve Venedik ile diplomatik temaslarda bulunuldu.",
      "Dönemin Türkmen siyasi tarihinde önemli yer tuttu."
    ],
    leaders: ["Kara Yülük Osman", "Uzun Hasan", "Sultan Yakup"],
    allies: ["Döneme göre Venedik"],
    rivals: ["Karakoyunlular", "Osmanlı Devleti"]
  },
  {
    id: "qara-qoyunlu",
    name: "Karakoyunlu Devleti",
    era: "empire",
    date: "14–15. yüzyıl",
    start: 1375,
    end: 1468,
    capital: "Tebriz",
    founder: "Bayram Hoca",
    ruler: "Kara Yusuf",
    symbol: "♜",
    location: [390, 295],
    description: "Doğu Anadolu, Azerbaycan ve İran'ın batısında etkili olan Türkmen konfederasyonu.",
    facts: [
      "Kara Yusuf döneminde siyasi güç arttı.",
      "Tebriz önemli bir yönetim merkezi oldu.",
      "Akkoyunlularla uzun süreli siyasi rekabet yaşandı."
    ],
    leaders: ["Bayram Hoca", "Kara Yusuf", "Cihan Şah"],
    allies: ["Döneme göre yerel Türkmen beyleri"],
    rivals: ["Akkoyunlular", "Timur Devleti"]
  },
  {
    id: "crimean-khanate",
    name: "Kırım Hanlığı",
    era: "empire",
    date: "1441–1783",
    start: 1441,
    end: 1783,
    capital: "Bahçesaray",
    founder: "Hacı I. Giray",
    ruler: "Mengli Giray",
    symbol: "♜",
    location: [220, 260],
    description: "Kırım yarımadası ve çevresinde kurulan, Karadeniz siyasetinde etkili olan Türk hanlığı.",
    facts: [
      "Bahçesaray önemli kültürel ve siyasi merkez oldu.",
      "Osmanlı Devleti ile uzun süreli siyasi ilişkiler yürütüldü.",
      "1783 yılında Rusya tarafından ilhak edildi."
    ],
    leaders: ["Hacı I. Giray", "Mengli Giray", "Devlet Giray"],
    allies: ["Osmanlı Devleti"],
    rivals: ["Rusya Çarlığı", "Polonya-Litvanya"]
  },
  {
    id: "safavid",
    name: "Safevî Devleti",
    era: "empire",
    date: "1501–1736",
    start: 1501,
    end: 1736,
    capital: "Tebriz, Kazvin, İsfahan",
    founder: "Şah İsmail",
    ruler: "Şah Abbas",
    symbol: "♜",
    location: [410, 350],
    description: "Azerbaycan ve İran coğrafyasında kurulan, hanedan kökeni ve siyasi kültürü bakımından Türk tarihiyle yakından ilişkili devlet.",
    facts: [
      "Şah İsmail 1501 yılında Tebriz'de hükümdarlığını ilan etti.",
      "Safevî hanedanı Azerbaycan Türkçesi ve Türkçe kültür çevresiyle ilişkilidir.",
      "Osmanlı-Safevî ilişkileri bölge tarihini önemli ölçüde etkiledi."
    ],
    leaders: ["Şah İsmail", "Şah Tahmasb", "Şah Abbas"],
    allies: ["Döneme göre Avrupa devletleriyle temaslar"],
    rivals: ["Osmanlı Devleti", "Özbek Hanlığı"]
  },
  {
    id: "kazakh-khanate",
    name: "Kazak Hanlığı",
    era: "empire",
    date: "15–19. yüzyıl",
    start: 1465,
    end: 1847,
    capital: "Sığnak ve farklı merkezler",
    founder: "Kerey Han ve Canibek Han",
    ruler: "Ablay Han",
    symbol: "♜",
    location: [525, 185],
    description: "Kazak bozkırlarında gelişen ve Kazak siyasi kimliğinin oluşumunda önemli rol oynayan hanlık.",
    facts: [
      "Kerey ve Canibek hanlar kuruluş sürecinde öne çıktı.",
      "Kazak cüzleri siyasi ve toplumsal yapının önemli unsurlarıydı.",
      "Ablay Han dönemi siyasi ilişkiler açısından dikkat çekicidir."
    ],
    leaders: ["Kerey Han", "Canibek Han", "Ablay Han"],
    allies: ["Döneme göre komşu bozkır toplulukları"],
    rivals: ["Cungar Hanlığı", "Rus İmparatorluğu"]
  },
  {
    id: "uzbek-khanate",
    name: "Buhara Hanlığı",
    era: "empire",
    date: "16–18. yüzyıl",
    start: 1500,
    end: 1785,
    capital: "Buhara",
    founder: "Muhammed Şeybani Han",
    ruler: "Abdullah Han II",
    symbol: "♜",
    location: [465, 300],
    description: "Maveraünnehir'de gelişen Özbek hanedanı ve devlet geleneğinin önemli temsilcilerinden.",
    facts: [
      "Buhara önemli bir bilim ve kültür merkeziydi.",
      "Şeybanî hanedanı bölge siyasetinde etkili oldu.",
      "Medrese ve mimari eserleriyle tanındı."
    ],
    leaders: ["Muhammed Şeybani Han", "Abdullah Han II"],
    allies: ["Döneme göre bölgesel hanlıklar"],
    rivals: ["Safevî Devleti"]
  },
  {
    id: "mughal",
    name: "Babür İmparatorluğu",
    era: "empire",
    date: "1526–1857",
    start: 1526,
    end: 1857,
    capital: "Delhi, Agra",
    founder: "Babür",
    ruler: "Ekber Şah",
    symbol: "♜",
    location: [565, 370],
    description: "Timurlu hanedan geleneğinden gelen Babür tarafından Hindistan'da kurulan büyük imparatorluk. Türk-Moğol ve Fars kültür çevrelerinin etkileşimini yansıtır.",
    facts: [
      "Babür, Timur ve Cengiz Han soy gelenekleriyle ilişkilidir.",
      "Ekber Şah döneminde yönetim ve kültür alanında önemli gelişmeler yaşandı.",
      "Babür mimarisi Güney Asya kültür tarihinde önemli bir yere sahiptir."
    ],
    leaders: ["Babür", "Hümayun", "Ekber Şah", "Şah Cihan", "Evrengzib"],
    allies: ["Döneme göre bölgesel hanedanlar"],
    rivals: ["Delhi Sultanlığı'nın ardıl güçleri", "Maratha konfederasyonu"]
  },
  {
    id: "turkey",
    name: "Türkiye Cumhuriyeti",
    era: "modern",
    date: "1923–Günümüz",
    start: 1923,
    end: 9999,
    capital: "Ankara",
    founder: "Mustafa Kemal Atatürk",
    ruler: "Cumhurbaşkanlığı makamı",
    symbol: "★",
    location: [300, 365],
    description: "29 Ekim 1923 tarihinde ilan edilen Türkiye Cumhuriyeti, Millî Mücadele'nin ardından egemenliğin millete ait olduğu yeni devlet düzenini kurdu.",
    facts: [
      "29 Ekim 1923 tarihinde Cumhuriyet ilan edildi.",
      "Mustafa Kemal Atatürk, Cumhuriyet'in ilk cumhurbaşkanı oldu.",
      "Ankara başkent olarak belirlendi.",
      "Cumhuriyet döneminde hukuk, eğitim, yönetim ve toplumsal yaşam alanlarında köklü değişiklikler gerçekleştirildi."
    ],
    leaders: ["Mustafa Kemal Atatürk", "İsmet İnönü", "Celal Bayar"],
    allies: ["Döneme ve uluslararası anlaşmalara göre değişen ülkeler"],
    rivals: ["Dış ilişkiler dönemlere göre değişir"]
  },
  {
    id: "azerbaijan",
    name: "Azerbaycan Cumhuriyeti",
    era: "modern",
    date: "1918 / 1991–Günümüz",
    start: 1991,
    end: 9999,
    capital: "Bakü",
    founder: "Modern bağımsızlık süreci",
    ruler: "Cumhurbaşkanlığı makamı",
    symbol: "★",
    location: [355, 300],
    description: "Azerbaycan, 1918 yılında kısa ömürlü ilk cumhuriyet deneyiminin ardından 1991 yılında yeniden bağımsızlığını ilan etti.",
    facts: [
      "Azerbaycan Demokratik Cumhuriyeti 1918 yılında kuruldu.",
      "Azerbaycan 1991 yılında bağımsızlığını yeniden ilan etti.",
      "Bakü, ülkenin başkenti ve önemli kültür merkezidir."
    ],
    leaders: ["Mehmed Emin Resulzade", "Haydar Aliyev"],
    allies: ["Türkiye ile yakın ilişkiler"],
    rivals: ["Bölgesel ilişkiler dönemlere göre değişir"]
  },
  {
    id: "kazakhstan",
    name: "Kazakistan Cumhuriyeti",
    era: "modern",
    date: "1991–Günümüz",
    start: 1991,
    end: 9999,
    capital: "Astana",
    founder: "Bağımsızlık süreci",
    ruler: "Cumhurbaşkanlığı makamı",
    symbol: "★",
    location: [535, 205],
    description: "Orta Asya'da yer alan bağımsız Türk cumhuriyeti. Geniş yüzölçümü, doğal kaynakları ve bozkır kültürüyle öne çıkar.",
    facts: [
      "16 Aralık 1991 tarihinde bağımsızlığını ilan etti.",
      "Astana ülkenin başkentidir.",
      "Kazakistan Türk Devletleri Teşkilatı üyesidir."
    ],
    leaders: ["Nursultan Nazarbayev", "Kassym-Jomart Tokayev"],
    allies: ["Türk devletleriyle çok taraflı ilişkiler"],
    rivals: ["Dış ilişkiler dönemlere göre değişir"]
  },
  {
    id: "uzbekistan",
    name: "Özbekistan Cumhuriyeti",
    era: "modern",
    date: "1991–Günümüz",
    start: 1991,
    end: 9999,
    capital: "Taşkent",
    founder: "Bağımsızlık süreci",
    ruler: "Cumhurbaşkanlığı makamı",
    symbol: "★",
    location: [475, 280],
    description: "Maveraünnehir'in tarihî şehirlerini barındıran bağımsız Orta Asya Türk cumhuriyeti.",
    facts: [
      "1 Eylül 1991 tarihinde bağımsızlığını ilan etti.",
      "Semerkant, Buhara ve Hive önemli tarihî şehirleridir.",
      "Taşkent günümüzde başkenttir."
    ],
    leaders: ["İslam Kerimov", "Şevket Mirziyoyev"],
    allies: ["Türk devletleriyle çok taraflı ilişkiler"],
    rivals: ["Dış ilişkiler dönemlere göre değişir"]
  },
  {
    id: "kyrgyzstan",
    name: "Kırgızistan Cumhuriyeti",
    era: "modern",
    date: "1991–Günümüz",
    start: 1991,
    end: 9999,
    capital: "Bişkek",
    founder: "Bağımsızlık süreci",
    ruler: "Cumhurbaşkanlığı makamı",
    symbol: "★",
    location: [510, 250],
    description: "Tanrı Dağları çevresinde yer alan, köklü göçebe kültürü ve Manas Destanı ile tanınan bağımsız Türk cumhuriyeti.",
    facts: [
      "31 Ağustos 1991 tarihinde bağımsızlığını ilan etti.",
      "Manas Destanı Kırgız kültürünün önemli miraslarındandır.",
      "Bişkek ülkenin başkentidir."
    ],
    leaders: ["Askar Akayev", "Sadyr Japarov"],
    allies: ["Türk devletleriyle çok taraflı ilişkiler"],
    rivals: ["Dış ilişkiler dönemlere göre değişir"]
  },
  {
    id: "turkmenistan",
    name: "Türkmenistan",
    era: "modern",
    date: "1991–Günümüz",
    start: 1991,
    end: 9999,
    capital: "Aşkabat",
    founder: "Bağımsızlık süreci",
    ruler: "Cumhurbaşkanlığı makamı",
    symbol: "★",
    location: [430, 330],
    description: "Orta Asya'da bulunan bağımsız Türk devleti. Türkmen kültürü, halıcılık geleneği ve doğal gaz kaynaklarıyla tanınır.",
    facts: [
      "27 Ekim 1991 tarihinde bağımsızlığını ilan etti.",
      "Aşkabat ülkenin başkentidir.",
      "Türkmenistan daimi tarafsızlık statüsüne sahiptir."
    ],
    leaders: ["Saparmurat Niyazov", "Gurbanguly Berdimuhamedov", "Serdar Berdimuhamedov"],
    allies: ["Türk devletleriyle çok taraflı ilişkiler"],
    rivals: ["Dış ilişkiler dönemlere göre değişir"]
  }
];

/* ---------------------------------------------------------
   2. ZAMAN ÇİZELGESİ
   --------------------------------------------------------- */

const EVENTS = [
  { year: "MÖ 220", era: "ancient", title: "Asya Hun siyasi birliğinin yükselişi", description: "Teoman ve ardından Mete Han dönemlerinde Orta Asya'da güçlü bir siyasi yapı gelişti." },
  { year: "552", era: "ancient", title: "Göktürk Kağanlığı'nın kuruluşu", description: "Bumin Kağan öncülüğünde Göktürk siyasi teşkilatı kuruldu." },
  { year: "603", era: "ancient", title: "Göktürk siyasi yapısında ayrışma", description: "Doğu ve Batı kanatları arasındaki siyasi ayrışma belirginleşti." },
  { year: "682", era: "ancient", title: "II. Göktürk Kağanlığı", description: "Kutluk Kağan öncülüğünde Göktürk siyasi varlığı yeniden kuruldu." },
  { year: "744", era: "ancient", title: "Uygur Kağanlığı'nın kuruluşu", description: "Uygurlar Orta Asya'da yeni bir kağanlık kurdu." },
  { year: "840", era: "islamic", title: "Uygur Kağanlığı'nın dağılması", description: "Uygur toplulukları farklı bölgelere yayılarak yeni siyasi ve kültürel merkezler oluşturdu." },
  { year: "10. yüzyıl", era: "islamic", title: "Karahanlılarda İslamiyet", description: "Karahanlı hanedanında İslamiyetin kabulü Türk-İslam tarihi açısından önemli bir dönüm noktası oldu." },
  { year: "1040", era: "islamic", title: "Dandanakan Savaşı", description: "Selçukluların Gazneliler karşısındaki başarısı Büyük Selçuklu Devleti'nin yükselişini hızlandırdı." },
  { year: "1071", era: "islamic", title: "Malazgirt Savaşı", description: "Alp Arslan'ın Bizans karşısındaki zaferi Anadolu tarihinin seyrini etkiledi." },
  { year: "1077", era: "islamic", title: "Anadolu Selçuklu Devleti", description: "Anadolu'da Selçuklu siyasi teşkilatı gelişti." },
  { year: "1231", era: "islamic", title: "Harzemşahların sona erişi", description: "Moğol istilaları sonrasında Harzemşah siyasi varlığı sona erdi." },
  { year: "1299", era: "empire", title: "Osmanlı Beyliği'nin kuruluş dönemi", description: "Osman Gazi öncülüğünde Osmanlı siyasi teşkilatının temelleri atıldı." },
  { year: "1453", era: "empire", title: "İstanbul'un fethi", description: "Fatih Sultan Mehmed'in İstanbul'u fethetmesi dünya tarihi açısından önemli sonuçlar doğurdu." },
  { year: "1501", era: "empire", title: "Safevî Devleti'nin kuruluşu", description: "Şah İsmail Tebriz'de hükümdarlığını ilan etti." },
  { year: "1517", era: "empire", title: "Osmanlı'nın Memlük topraklarına hâkimiyeti", description: "Yavuz Sultan Selim döneminde Osmanlı Devleti'nin Orta Doğu'daki etkisi genişledi." },
  { year: "1526", era: "empire", title: "Babür İmparatorluğu'nun kuruluşu", description: "Babür, Hindistan'da yeni bir imparatorluk kurdu." },
  { year: "1683", era: "empire", title: "II. Viyana Kuşatması", description: "Osmanlı ve Avrupa tarihinin önemli dönüm noktalarından biri yaşandı." },
  { year: "1783", era: "empire", title: "Kırım'ın Rusya tarafından ilhakı", description: "Kırım Hanlığı'nın bağımsız siyasi varlığı sona erdi." },
  { year: "1918", era: "modern", title: "Azerbaycan Demokratik Cumhuriyeti", description: "Azerbaycan'da cumhuriyet yönetimi ilan edildi." },
  { year: "1922", era: "modern", title: "Saltanatın kaldırılması", description: "Osmanlı saltanatı kaldırıldı." },
  { year: "1923", era: "modern", title: "Türkiye Cumhuriyeti'nin ilanı", description: "29 Ekim 1923 tarihinde Cumhuriyet ilan edildi ve Mustafa Kemal Atatürk ilk cumhurbaşkanı oldu." },
  { year: "1991", era: "modern", title: "Orta Asya Türk cumhuriyetlerinin bağımsızlığı", description: "Kazakistan, Kırgızistan, Özbekistan ve Türkmenistan bağımsızlıklarını ilan etti. Azerbaycan da bağımsızlığını yeniden kazandı." },
  { year: "2009", era: "modern", title: "Nahçıvan Anlaşması", description: "Türk Konseyi'nin kuruluşuna temel oluşturan anlaşma imzalandı." },
  { year: "2021", era: "modern", title: "Türk Devletleri Teşkilatı", description: "Türk Konseyi, Türk Devletleri Teşkilatı adını aldı." }
];

/* ---------------------------------------------------------
   3. GENEL YARDIMCILAR
   --------------------------------------------------------- */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function formatNumber(number) {
  return new Intl.NumberFormat("tr-TR").format(Math.round(number));
}

function getState(id) {
  return STATES.find(state => state.id === id);
}

function toast(message, type = "success") {
  const container = $("#toastContainer");
  if (!container) return;

  const element = document.createElement("div");
  element.className = `toast ${type === "error" ? "error" : ""}`;
  element.textContent = message;
  container.appendChild(element);

  window.setTimeout(() => {
    element.style.opacity = "0";
    element.style.transform = "translateY(8px)";
    window.setTimeout(() => element.remove(), 250);
  }, 3000);
}

function formatHistoricalYear(year) {
  if (year < 0) return `MÖ ${Math.abs(year)}`;
  if (year === 0) return "Tarih belirtilmemiş";
  return `MS ${year}`;
}

/* ---------------------------------------------------------
   4. ÖNE ÇIKAN DEVLETLER
   --------------------------------------------------------- */

function renderFeatured() {
  const grid = $("#featuredGrid");
  if (!grid) return;

  const featuredIds = ["xiongnu", "gokturk", "great-seljuk", "ottoman", "turkey"];

  grid.innerHTML = featuredIds.map(id => {
    const state = getState(id);
    if (!state) return "";

    return `
      <article class="featured-card" data-symbol="${escapeHTML(state.symbol)}"
        data-open-state="${escapeHTML(state.id)}" tabindex="0" role="button"
        aria-label="${escapeHTML(state.name)} devletini incele">
        <span class="featured-date">${escapeHTML(state.date)}</span>
        <h3>${escapeHTML(state.name)}</h3>
        <p>${escapeHTML(state.description.slice(0, 105))}...</p>
        <span class="featured-open">DEVLETİ İNCELE ↗</span>
      </article>
    `;
  }).join("");
}

/* ---------------------------------------------------------
   5. DEVLET ARŞİVİ VE FİLTRELER
   --------------------------------------------------------- */

let activeStateFilter = "all";

function renderStates() {
  const grid = $("#statesGrid");
  const empty = $("#emptyState");
  if (!grid) return;

  const query = ($("#stateSearch")?.value || "").trim().toLocaleLowerCase("tr-TR");
  const sort = $("#stateSort")?.value || "chronological";

  let results = STATES.filter(state => {
    const matchesFilter = activeStateFilter === "all" || state.era === activeStateFilter;
    const searchable = [
      state.name,
      state.date,
      state.capital,
      state.founder,
      state.ruler,
      state.description,
      ...state.leaders
    ].join(" ").toLocaleLowerCase("tr-TR");

    return matchesFilter && searchable.includes(query);
  });

  results.sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name, "tr");
    return a.start - b.start;
  });

  $("#archiveCount").textContent = results.length;
  $("#stateCount").textContent = STATES.length;

  grid.innerHTML = results.map(state => `
    <article class="state-card" data-open-state="${escapeHTML(state.id)}"
      tabindex="0" role="button" aria-label="${escapeHTML(state.name)} detaylarını aç">
      <div class="state-card-top">
        <span class="state-card-period">${escapeHTML(PERIODS[state.era])}</span>
        <span class="state-card-symbol">${escapeHTML(state.symbol)}</span>
      </div>
      <h3>${escapeHTML(state.name)}</h3>
      <p>${escapeHTML(state.description)}</p>
      <div class="state-card-bottom">
        <span>${escapeHTML(state.date)}</span>
        <strong>İNCELE ↗</strong>
      </div>
    </article>
  `).join("");

  empty.hidden = results.length !== 0;
}

function setupStateFilters() {
  $("#stateFilters")?.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    activeStateFilter = button.dataset.filter;
    $$(".filter-tab").forEach(tab => tab.classList.toggle("active", tab === button));
    renderStates();
  });

  $("#stateSearch")?.addEventListener("input", renderStates);
  $("#stateSort")?.addEventListener("change", renderStates);
}

/* ---------------------------------------------------------
   6. DEVLET DETAY PENCERESİ
   --------------------------------------------------------- */

function openStateDetails(id) {
  const state = getState(id);
  const dialog = $("#stateDialog");
  const content = $("#dialogContent");

  if (!state || !dialog || !content) return;

  content.innerHTML = `
    <div class="dialog-content">
      <span class="dialog-kicker">${escapeHTML(PERIODS[state.era])}</span>
      <h2>${escapeHTML(state.name)}</h2>
      <p class="dialog-description">${escapeHTML(state.description)}</p>

      <div class="dialog-facts">
        <div class="dialog-fact"><span>TARİH</span><strong>${escapeHTML(state.date)}</strong></div>
        <div class="dialog-fact"><span>BAŞKENT / MERKEZ</span><strong>${escapeHTML(state.capital)}</strong></div>
        <div class="dialog-fact"><span>KURULUŞ / ÖNCÜ İSİM</span><strong>${escapeHTML(state.founder)}</strong></div>
        <div class="dialog-fact"><span>ÖNE ÇIKAN HÜKÜMDAR</span><strong>${escapeHTML(state.ruler)}</strong></div>
      </div>

      <h3 class="dialog-subtitle">Tarihî notlar</h3>
      <ul>${state.facts.map(fact => `<li>${escapeHTML(fact)}</li>`).join("")}</ul>

      <h3 class="dialog-subtitle">Önemli isimler</h3>
      <ul>${state.leaders.map(name => `<li>${escapeHTML(name)}</li>`).join("")}</ul>

      <h3 class="dialog-subtitle">Diplomatik çevre</h3>
      <p class="dialog-description"><strong>İlişkiler:</strong> ${escapeHTML(state.allies.join(", "))}</p>
      <p class="dialog-description"><strong>Rekabet ve mücadeleler:</strong> ${escapeHTML(state.rivals.join(", "))}</p>

      <p class="game-note">Tarihî bilgiler genel bir özet niteliğindedir. Başlangıç ve bitiş tarihleri bazı devletler için yaklaşık dönemleri ifade eder.</p>
    </div>
  `;

  if (!dialog.open) dialog.showModal();
}

function setupStateDetails() {
  document.addEventListener("click", event => {
    const target = event.target.closest("[data-open-state]");
    if (!target) return;
    openStateDetails(target.dataset.openState);
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target.closest("[data-open-state]");
    if (!target || target.tagName === "BUTTON") return;
    event.preventDefault();
    openStateDetails(target.dataset.openState);
  });

  $("#closeDialogButton")?.addEventListener("click", () => $("#stateDialog")?.close());

  $("#stateDialog")?.addEventListener("click", event => {
    if (event.target === $("#stateDialog")) $("#stateDialog").close();
  });
}

/* ---------------------------------------------------------
   7. ŞEMATİK ATLAS HARİTASI
   --------------------------------------------------------- */

let selectedMapState = null;

function renderMap() {
  const markers = $("#mapMarkers");
  const period = $("#mapPeriod")?.value || "all";
  if (!markers) return;

  const visibleStates = STATES.filter(state => period === "all" || state.era === period);

  markers.innerHTML = visibleStates.map(state => {
    const [x, y] = state.location;

    return `
      <g class="map-marker ${selectedMapState === state.id ? "selected" : ""}"
        data-map-state="${escapeHTML(state.id)}" tabindex="0" role="button"
        aria-label="${escapeHTML(state.name)}">
        <circle class="marker-halo" cx="${x}" cy="${y}" r="15"></circle>
        <circle class="marker-dot" cx="${x}" cy="${y}" r="6"></circle>
        <text x="${x + 12}" y="${y - 10}">${escapeHTML(state.name)}</text>
      </g>
    `;
  }).join("");

  const labels = {
    all: "BÜTÜN DÖNEMLER",
    ancient: "İLK TÜRK DEVLETLERİ",
    islamic: "TÜRK-İSLAM DEVLETLERİ",
    empire: "İMPARATORLUKLAR",
    modern: "MODERN TÜRK DEVLETLERİ"
  };

  $("#mapPeriodLabel").textContent = labels[period];
  $("#mapResultCount").textContent = `${visibleStates.length} devlet işareti gösteriliyor`;

  if (selectedMapState && !visibleStates.some(state => state.id === selectedMapState)) {
    selectedMapState = null;
    showMapPlaceholder();
  }
}

function showMapPlaceholder() {
  const placeholder = $(".info-placeholder");
  const selected = $("#mapSelectedInfo");
  if (placeholder) placeholder.hidden = false;
  if (selected) selected.hidden = true;
}

function selectMapState(id) {
  const state = getState(id);
  if (!state) return;

  selectedMapState = id;
  renderMap();

  const placeholder = $(".info-placeholder");
  const selected = $("#mapSelectedInfo");
  if (!selected) return;

  if (placeholder) placeholder.hidden = true;
  selected.hidden = false;

  selected.innerHTML = `
    <span class="selected-era">${escapeHTML(PERIODS[state.era])}</span>
    <h3>${escapeHTML(state.name)}</h3>
    <p>${escapeHTML(state.description)}</p>
    <div class="map-facts">
      <div class="map-fact"><span>Dönem</span><strong>${escapeHTML(state.date)}</strong></div>
      <div class="map-fact"><span>Merkez</span><strong>${escapeHTML(state.capital)}</strong></div>
      <div class="map-fact"><span>Öne çıkan isim</span><strong>${escapeHTML(state.ruler)}</strong></div>
    </div>
    <button class="button button-primary" style="width:100%;margin-top:20px" id="mapDetailsButton">Ayrıntıları görüntüle →</button>
  `;

  $("#mapDetailsButton")?.addEventListener("click", () => openStateDetails(id));
}

function setupMap() {
  $("#mapPeriod")?.addEventListener("change", renderMap);

  $("#mapMarkers")?.addEventListener("click", event => {
    const marker = event.target.closest("[data-map-state]");
    if (marker) selectMapState(marker.dataset.mapState);
  });

  $("#mapMarkers")?.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const marker = event.target.closest("[data-map-state]");
    if (!marker) return;
    event.preventDefault();
    selectMapState(marker.dataset.mapState);
  });

  $("#resetMapButton")?.addEventListener("click", () => {
    $("#mapPeriod").value = "all";
    selectedMapState = null;
    renderMap();
    showMapPlaceholder();
  });

  renderMap();
}

/* ---------------------------------------------------------
   8. ZAMAN ÇİZELGESİ
   --------------------------------------------------------- */

let activeTimelineFilter = "all";

function renderTimeline() {
  const list = $("#timelineList");
  if (!list) return;

  const events = EVENTS.filter(event =>
    activeTimelineFilter === "all" || event.era === activeTimelineFilter
  );

  list.innerHTML = events.map(event => `
    <article class="timeline-item">
      <div class="timeline-year">${escapeHTML(event.year)}</div>
      <span class="timeline-dot"></span>
      <div class="timeline-content">
        <span>${escapeHTML(PERIODS[event.era])}</span>
        <h3>${escapeHTML(event.title)}</h3>
        <p>${escapeHTML(event.description)}</p>
      </div>
    </article>
  `).join("");
}

function setupTimeline() {
  $$(".timeline-filter-button").forEach(button => {
    button.addEventListener("click", () => {
      activeTimelineFilter = button.dataset.era;
      $$(".timeline-filter-button").forEach(item => {
        item.classList.toggle("active", item === button);
      });
      renderTimeline();
    });
  });

  renderTimeline();
}

/* ---------------------------------------------------------
   9. OYUN DURUMU VE KAYIT SİSTEMİ
   --------------------------------------------------------- */

let game = null;
let gameTimer = null;

const GAME_INTERVAL = 15000;

function makeInitialGame(stateId) {
  const state = getState(stateId);
  if (!state) return null;

  const initial = {
    ancient: { treasury: 120, economy: 38, power: 45, stability: 65 },
    islamic: { treasury: 150, economy: 48, power: 52, stability: 60 },
    empire: { treasury: 180, economy: 58, power: 62, stability: 58 },
    modern: { treasury: 220, economy: 65, power: 68, stability: 72 }
  }[state.era];

  return {
    version: 1,
    stateId,
    year: state.start,
    turn: 1,
    treasury: initial.treasury,
    economy: initial.economy,
    power: initial.power,
    stability: initial.stability,
    relations: {},
    log: [],
    paused: false,
    createdAt: Date.now()
  };
}

function saveGame(showMessage = true) {
  if (!game) {
    if (showMessage) toast("Kaydedilecek bir oyun bulunmuyor.", "error");
    return false;
  }

  try {
    localStorage.setItem(STORAGE.game, JSON.stringify(game));
    $("#saveStatus").textContent = "Oyun kaydedildi";
    if (showMessage) toast("Oyun başarıyla kaydedildi.");
    return true;
  } catch (error) {
    console.error("Kayıt hatası:", error);
    if (showMessage) toast("Kayıt yapılamadı. Tarayıcı depolamasını kontrol et.", "error");
    return false;
  }
}

function loadSavedGame() {
  try {
    const raw = localStorage.getItem(STORAGE.game);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (
      parsed.version !== 1 ||
      !getState(parsed.stateId) ||
      !Number.isFinite(parsed.year) ||
      !Number.isFinite(parsed.turn)
    ) {
      return null;
    }

    return {
      ...parsed,
      relations: parsed.relations || {},
      log: Array.isArray(parsed.log) ? parsed.log : [],
      paused: true
    };
  } catch (error) {
    console.warn("Kayıt okunamadı:", error);
    return null;
  }
}

function deleteSavedGame() {
  try {
    localStorage.removeItem(STORAGE.game);
  } catch (error) {
    console.warn("Kayıt silinemedi:", error);
  }
}

function addLog(message) {
  if (!game) return;

  const state = getState(game.stateId);
  const entry = {
    year: game.year,
    turn: game.turn,
    message: String(message)
  };

  game.log.unshift(entry);
  game.log = game.log.slice(0, 60);
  renderLog();

  if (state) $("#saveStatus").textContent = "Kaydedilmemiş değişiklikler var";
}

function renderLog() {
  const container = $("#gameLog");
  if (!container || !game) return;

  if (!game.log.length) {
    container.innerHTML = `<div class="log-entry"><time>BAŞLANGIÇ</time><span>Henüz bir gelişme kaydedilmedi.</span></div>`;
    return;
  }

  container.innerHTML = game.log.map(entry => `
    <div class="log-entry">
      <time>${escapeHTML(formatHistoricalYear(entry.year))}</time>
      <span>${escapeHTML(entry.message)}</span>
    </div>
  `).join("");
}

function showGameDashboard() {
  if (!game) return;

  const state = getState(game.stateId);
  if (!state) return;

  $("#gameStart").hidden = true;
  $("#gameDashboard").hidden = false;

  $("#gameStateName").textContent = state.name;
  $("#gameStatePeriod").textContent = `${state.date} · ${state.capital}`;
  renderGame();
  renderDiplomacy();
  renderLog();
  updateGameStatus();
}

function renderGame() {
  if (!game) return;

  $("#treasuryValue").textContent = formatNumber(game.treasury);
  $("#economyValue").textContent = formatNumber(game.economy);
  $("#powerValue").textContent = formatNumber(game.power);
  $("#stabilityValue").textContent = formatNumber(game.stability);

  const values = [
    ["economy", game.economy],
    ["power", game.power],
    ["stability", game.stability]
  ];

  values.forEach(([key, value]) => {
    const percent = Math.max(0, Math.min(100, value));
    $(`#${key}Percent`).textContent = `${percent}%`;
    $(`#${key}Bar`).style.width = `${percent}%`;
  });

  $("#gameDate").textContent = formatHistoricalYear(game.year);
  $("#gameTurn").textContent = `${game.turn}. dönem`;

  const expectedIncome = Math.round(game.economy * 0.35);
  $("#treasuryChange").textContent = `+${expectedIncome} / dönem`;

  $("#pauseGameButton").textContent = game.paused ? "Oyuna devam et" : "Oyunu duraklat";
}

function updateGameStatus() {
  if (!game) return;

  $("#gameStatus").textContent = game.paused ? "DURAKLATILDI" : "CANLI";
  $(".status-dot").style.background = game.paused ? "var(--gold)" : "var(--green)";
}

function startGameTimer() {
  stopGameTimer();
  if (!game || game.paused) return;

  gameTimer = window.setInterval(() => {
    if (!game || game.paused) return;
    advanceTurn(true);
  }, GAME_INTERVAL);
}

function stopGameTimer() {
  if (gameTimer !== null) {
    window.clearInterval(gameTimer);
    gameTimer = null;
  }
}

function startGame(stateId) {
  const state = getState(stateId);
  if (!state) {
    toast("Önce yönetmek istediğin devleti seç.", "error");
    return;
  }

  stopGameTimer();
  game = makeInitialGame(stateId);
  addLog(`${state.name} yönetimini devraldın.`);
  addLog(`Yönetim merkezi: ${state.capital}.`);
  game.paused = false;

  showGameDashboard();
  startGameTimer();
  saveGame(false);
  toast(`${state.name} için yeni simülasyon başladı.`);
}

function advanceTurn(automatic = false) {
  if (!game) return;

  const state = getState(game.stateId);
  if (!state) return;

  game.turn += 1;
  game.year += 1;

  const income = Math.max(3, Math.round(game.economy * 0.35));
  const upkeep = Math.max(2, Math.round(game.power * 0.12));

  game.treasury = Math.max(0, game.treasury + income - upkeep);

  if (game.stability < 35) {
    game.stability = Math.min(100, game.stability + 1);
  }

  if (game.economy < 100 && game.turn % 4 === 0) {
    game.economy += 1;
  }

  if (game.year > state.end && state.end !== 9999) {
    game.stability = Math.max(0, game.stability - 1);
    if (game.turn % 5 === 0) {
      addLog("Seçilen tarihî dönemin sonrasına geçildi. Simülasyon alternatif tarih olarak devam ediyor.");
    }
  }

  addLog(`${game.turn}. döneme geçildi. Gelir: +${income}, yönetim gideri: −${upkeep}.`);
  renderGame();
  saveGame(false);

  if (!automatic) toast("Yeni dönem başladı.");
}

function performDecision(action) {
  if (!game) return;

  const decisions = {
    economy: {
      cost: 20,
      run: () => {
        game.economy = Math.min(100, game.economy + 8);
        addLog("Ekonomik üretimi destekleyen bir yatırım programı başlatıldı.");
      }
    },
    stability: {
      cost: 15,
      run: () => {
        game.stability = Math.min(100, game.stability + 10);
        addLog("Toplumsal istikrarı destekleyen yönetim düzenlemeleri yapıldı.");
      }
    },
    administration: {
      cost: 25,
      run: () => {
        game.power = Math.min(100, game.power + 9);
        addLog("Kamu kurumlarının ve yönetim kapasitesinin geliştirilmesi için yatırım yapıldı.");
      }
    },
    research: {
      cost: 20,
      run: () => {
        game.economy = Math.min(100, game.economy + 3);
        game.stability = Math.min(100, game.stability + 4);
        addLog("Eğitim, bilim ve kültürel çalışmalara kaynak ayrıldı.");
      }
    }
  };

  const decision = decisions[action];
  if (!decision) return;

  if (game.treasury < decision.cost) {
    toast("Bu karar için hazinede yeterli kaynak yok.", "error");
    return;
  }

  const before = { ...game };
  game.treasury -= decision.cost;
  decision.run();

  renderGame();
  saveGame(false);
  toast("Yönetim kararı uygulandı.");
}

/* ---------------------------------------------------------
   10. DİPLOMASİ
   Bu bölüm soyut oyun ilişkilerinden oluşur.
   --------------------------------------------------------- */

function getRelation(stateId) {
  if (!game) return "Tarafsız";
  return game.relations[stateId] || "Tarafsız";
}

function renderDiplomacy() {
  const container = $("#diplomacyList");
  if (!container || !game) return;

  const selectedState = getState(game.stateId);
  if (!selectedState) return;

  const candidates = STATES.filter(state =>
    state.id !== game.stateId && state.era === selectedState.era
  ).slice(0, 5);

  if (!candidates.length) {
    container.innerHTML = `<p class="game-note">Bu dönem için listelenecek başka devlet bulunmuyor.</p>`;
    return;
  }

  container.innerHTML = candidates.map(state => {
    const relation = getRelation(state.id);
    const isAlly = relation === "Dostluk";
    const actionLabel = isAlly ? "İlişkiyi yenile" : "Dostluk öner";

    return `
      <div class="diplomacy-item">
        <div>
          <strong>${escapeHTML(state.name)}</strong>
          <small>${escapeHTML(relation)}</small>
        </div>
        <button class="diplomacy-action" data-diplomacy="${escapeHTML(state.id)}">
          ${actionLabel}
        </button>
      </div>
    `;
  }).join("");
}

function makeDiplomaticProposal(stateId) {
  if (!game) return;

  const target = getState(stateId);
  if (!target) return;

  const cost = 12;
  if (game.treasury < cost) {
    toast("Diplomatik girişim için yeterli hazine yok.", "error");
    return;
  }

  game.treasury -= cost;
  game.relations[stateId] = "Dostluk";
  game.stability = Math.min(100, game.stability + 2);

  addLog(`${target.name} ile dostane ilişkiler geliştirmek için diplomatik girişimde bulunuldu.`);
  renderGame();
  renderDiplomacy();
  saveGame(false);
  toast(`${target.name} ile dostluk ilişkisi kuruldu.`);
}

/* ---------------------------------------------------------
   11. OYUN ARAYÜZÜ ETKİLEŞİMLERİ
   --------------------------------------------------------- */

function setupGame() {
  const select = $("#gameStateSelect");
  if (!select) return;

  const playableStates = [...STATES].sort((a, b) => a.start - b.start);

  select.innerHTML = `
    <option value="">Bir devlet seç...</option>
    ${playableStates.map(state => `
      <option value="${escapeHTML(state.id)}">
        ${escapeHTML(state.name)} — ${escapeHTML(state.date)}
      </option>
    `).join("")}
  `;

  $("#startGameButton")?.addEventListener("click", () => {
    startGame(select.value);
  });

  $("#gameDashboard")?.addEventListener("click", event => {
    const decisionButton = event.target.closest("[data-action]");
    if (decisionButton) {
      performDecision(decisionButton.dataset.action);
    }

    const diplomacyButton = event.target.closest("[data-diplomacy]");
    if (diplomacyButton) {
      makeDiplomaticProposal(diplomacyButton.dataset.diplomacy);
    }
  });

  $("#nextTurnButton")?.addEventListener("click", () => {
    if (!game) return;
    advanceTurn(false);
  });

  $("#pauseGameButton")?.addEventListener("click", () => {
    if (!game) return;

    game.paused = !game.paused;

    if (game.paused) {
      stopGameTimer();
      addLog("Simülasyon duraklatıldı.");
    } else {
      addLog("Simülasyon yeniden başlatıldı.");
      startGameTimer();
    }

    renderGame();
    updateGameStatus();
    saveGame(false);
  });

  $("#saveGameButton")?.addEventListener("click", () => saveGame(true));

  $("#leaveGameButton")?.addEventListener("click", () => {
    if (!game) return;

    const confirmed = window.confirm("Yönetim ekranından ayrılmak istiyor musun? Kaydın korunacak.");
    if (!confirmed) return;

    stopGameTimer();
    game.paused = true;
    saveGame(false);
    game = null;

    $("#gameDashboard").hidden = true;
    $("#gameStart").hidden = false;
    $("#gameStatus").textContent = "HAZIR";
    $("#saveStatus").textContent = "Kayıt korunuyor";
    toast("Yönetim ekranından ayrıldın. Kaydın saklandı.");
  });

  $("#clearLogButton")?.addEventListener("click", () => {
    if (!game) return;
    game.log = [];
    renderLog();
    saveGame(false);
    toast("Günlük temizlendi.");
  });

  const saved = loadSavedGame();

  if (saved) {
    game = saved;
    const savedState = getState(saved.stateId);
    $("#gameStart").hidden = false;
    $("#gameDashboard").hidden = true;

    const option = [...select.options].find(item => item.value === saved.stateId);
    if (option) {
      option.textContent = `${savedState.name} — kayıt bulundu`;
    }

    const resumeButton = document.createElement("button");
    resumeButton.className = "button button-muted";
    resumeButton.type = "button";
    resumeButton.textContent = "Kayıtlı oyuna devam et";
    resumeButton.style.marginTop = "8px";
    $("#gameStart .game-start-controls").appendChild(resumeButton);

    resumeButton.addEventListener("click", () => {
      game.paused = false;
      showGameDashboard();
      addLog("Kayıtlı simülasyona devam edildi.");
      startGameTimer();
      saveGame(false);
      toast("Kayıtlı oyun açıldı.");
    });
  }
}

/* ---------------------------------------------------------
   12. TEMA, MENÜ VE SAYFA KONTROLLERİ
   --------------------------------------------------------- */

function setupTheme() {
  const savedTheme = localStorage.getItem(STORAGE.theme);
  if (savedTheme === "light") document.body.classList.add("light-theme");

  $("#themeButton")?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const theme = document.body.classList.contains("light-theme") ? "light" : "dark";

    try {
      localStorage.setItem(STORAGE.theme, theme);
    } catch (error) {
      console.warn("Tema tercihi saklanamadı:", error);
    }
  });
}

function setupMobileMenu() {
  const button = $("#mobileMenuButton");
  const nav = $("#mainNav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });

  $$(".nav-link", nav).forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function setupNavigation() {
  const links = $$(".nav-link");
  const sections = links
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      links.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, {
    rootMargin: "-25% 0px -65% 0px"
  });

  sections.forEach(section => observer.observe(section));
}

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", event => {
    const tag = document.activeElement?.tagName;
    const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

    if (event.key === "/" && !typing) {
      event.preventDefault();
      $("#stateSearch")?.focus();
    }

    if (event.key === "Escape") {
      $("#mainNav")?.classList.remove("open");
      $("#mobileMenuButton")?.setAttribute("aria-expanded", "false");
    }
  });
}

function setupFooter() {
  $("#currentYear").textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   13. UYGULAMA BAŞLATMA
   --------------------------------------------------------- */

function initializeApp() {
  try {
    setupTheme();
    setupMobileMenu();
    setupNavigation();
    setupKeyboardShortcuts();
    setupFooter();

    renderFeatured();
    setupStateFilters();
    renderStates();
    setupStateDetails();
    setupMap();
    setupTimeline();
    setupGame();

    document.body.classList.add("app-ready");

    window.setTimeout(() => {
      $("#pageLoader")?.classList.add("loaded");
    }, 350);

    console.info("Türk Tarihi Atlası başarıyla başlatıldı.");
    console.info(`${STATES.length} devlet kaydı ve ${EVENTS.length} tarihî olay yüklendi.`);
  } catch (error) {
    console.error("Uygulama başlatılırken hata oluştu:", error);
    $("#pageLoader")?.classList.add("loaded");
    toast("Uygulama başlatılırken bir hata oluştu. Konsolu kontrol et.", "error");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp, { once: true });
} else {
  initializeApp();
}

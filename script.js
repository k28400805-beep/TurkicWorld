
"use strict";

/* =========================================================
   TÜRK TARİHİ ATLASI
   Ana uygulama, tarih veri tabanı ve strateji motoru
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const STORAGE_KEY = "turk_tarihi_atlasi_save_v1";
const SETTINGS_KEY = "turk_tarihi_atlasi_settings_v1";

/* =========================================================
   1. TARİHİ DÖNEMLER
   ========================================================= */

const PERIODS = [
    {
        id: "ancient",
        name: "İlk Türk Toplulukları",
        date: "MÖ 3. yüzyıl ve öncesi",
        description: "Türk tarihinin erken dönemlerine ilişkin topluluklar ve kültürler.",
        year: -300
    },
    {
        id: "hun",
        name: "Hun Dönemi",
        date: "MÖ 3. yüzyıl – MS 216",
        description: "Asya Hunları ve Avrupa Hunları dönemi.",
        year: -220
    },
    {
        id: "gokturk",
        name: "Göktürk Dönemi",
        date: "552 – 744",
        description: "Türk adının devlet adı olarak kullanıldığı Göktürk dönemi.",
        year: 552
    },
    {
        id: "uyghur",
        name: "Uygur Dönemi",
        date: "744 – 840",
        description: "Uygur Kağanlığı ve yerleşik kültürün gelişimi.",
        year: 744
    },
    {
        id: "karakhanid",
        name: "Karahanlı Dönemi",
        date: "840 – 1212",
        description: "İlk Müslüman Türk hanedanlarından Karahanlılar.",
        year: 840
    },
    {
        id: "seljuk",
        name: "Selçuklu Dönemi",
        date: "1037 – 1308",
        description: "Büyük Selçuklu ve Anadolu Selçuklu devletleri.",
        year: 1037
    },
    {
        id: "ottoman",
        name: "Osmanlı Dönemi",
        date: "1299 – 1922",
        description: "Osmanlı Devleti'nin kuruluşundan sona erişine kadar.",
        year: 1299
    },
    {
        id: "modern",
        name: "Modern Türk Devletleri",
        date: "1923 – Günümüz",
        description: "Türkiye Cumhuriyeti ve çağdaş Türk devletleri.",
        year: 1923
    }
];

/* =========================================================
   2. TÜRK DEVLETLERİ VERİ TABANI
   ========================================================= */

const STATES = [
    {
        id: "scythian",
        name: "İskitler (Sakalar)",
        period: "ancient",
        date: "MÖ 8. yüzyıl – MÖ 3. yüzyıl",
        type: "state",
        flag: "🏹",
        capital: "Kesin başkent bilinmiyor",
        founder: "Bilinen tek bir kurucu yoktur",
        description: "Avrasya bozkırlarında yaşamış, atlı kültürleri ve sanatlarıyla tanınan topluluklar.",
        region: "Avrasya bozkırları",
        rulers: "Tomris, Alp Er Tunga ile ilişkilendirilen gelenekler"
    },
    {
        id: "xiongnu",
        name: "Asya Hun Devleti",
        period: "hun",
        date: "MÖ 220 – MS 216",
        type: "empire",
        flag: "🐎",
        capital: "Ötüken çevresi",
        founder: "Teoman",
        description: "Orta Asya'da güçlü bir siyasi birlik oluşturan, Mete Han döneminde büyük güç kazanan devlet.",
        region: "Orta Asya ve Moğolistan",
        rulers: "Teoman, Mete Han"
    },
    {
        id: "european-huns",
        name: "Avrupa Hun Devleti",
        period: "hun",
        date: "4. yüzyıl – 469",
        type: "state",
        flag: "🐎",
        capital: "Orta Avrupa",
        founder: "Balamir ile ilişkilendirilir",
        description: "Avrupa'da etkili olan Hun siyasi birliği.",
        region: "Doğu ve Orta Avrupa",
        rulers: "Balamir, Attila"
    },
    {
        id: "gokturk",
        name: "Göktürk Kağanlığı",
        period: "gokturk",
        date: "552 – 744",
        type: "empire",
        flag: "𐱅𐰇𐰼𐰜",
        capital: "Ötüken",
        founder: "Bumin Kağan",
        description: "Türk adını devlet adı olarak kullanan ilk devlet. Orhun Yazıtları bu dönemin önemli miraslarındandır.",
        region: "Orta Asya",
        rulers: "Bumin Kağan, İstemi Yabgu, Bilge Kağan, Kül Tigin"
    },
    {
        id: "second-gokturk",
        name: "II. Göktürk Kağanlığı",
        period: "gokturk",
        date: "682 – 744",
        type: "state",
        flag: "𐱅",
        capital: "Ötüken",
        founder: "Kutluk Kağan",
        description: "Kutluk Kağan tarafından yeniden kurulan Göktürk devleti.",
        region: "Moğolistan ve Orta Asya",
        rulers: "Kutluk Kağan, Kapgan Kağan, Bilge Kağan"
    },
    {
        id: "uyghur",
        name: "Uygur Kağanlığı",
        period: "uyghur",
        date: "744 – 840",
        type: "khanate",
        flag: "🐉",
        capital: "Ordu Balık",
        founder: "Kutlug Bilge Kül Kağan",
        description: "Yerleşik hayat, şehir kültürü, yazı ve sanat alanlarında önemli gelişmeler gösteren devlet.",
        region: "Orhun Vadisi ve Moğolistan",
        rulers: "Kutlug Bilge Kül Kağan, Moyen-Çor"
    },
    {
        id: "karakhanid",
        name: "Karahanlılar",
        period: "karakhanid",
        date: "840 – 1212",
        type: "state",
        flag: "☾",
        capital: "Balasagun, Kaşgar",
        founder: "Bilinen tek bir kurucu üzerinde uzlaşma yoktur",
        description: "Türk-İslam kültürünün gelişmesinde önemli rol oynayan hanedan.",
        region: "Maveraünnehir ve Doğu Türkistan",
        rulers: "Satuk Buğra Han, Yusuf Kadir Han"
    },
    {
        id: "ghaznavid",
        name: "Gazneliler",
        period: "seljuk",
        date: "963 – 1186",
        type: "state",
        flag: "⚜",
        capital: "Gazne",
        founder: "Alp Tigin",
        description: "Güney Asya ve Horasan'da etkili olan Türk-İslam devleti.",
        region: "Afganistan, Horasan ve Kuzey Hindistan",
        rulers: "Mahmud, Mesud"
    },
    {
        id: "great-seljuk",
        name: "Büyük Selçuklu Devleti",
        period: "seljuk",
        date: "1037 – 1194",
        type: "empire",
        flag: "☾",
        capital: "Rey, İsfahan",
        founder: "Tuğrul Bey ve Çağrı Bey",
        description: "Orta Doğu ve Orta Asya'da büyük bir siyasi güç hâline gelen Selçuklu devleti.",
        region: "İran, Horasan ve Orta Asya",
        rulers: "Tuğrul Bey, Alp Arslan, Melikşah"
    },
    {
        id: "anatolian-seljuk",
        name: "Anadolu Selçuklu Devleti",
        period: "seljuk",
        date: "1077 – 1308",
        type: "state",
        flag: "☾",
        capital: "Konya",
        founder: "Kutalmışoğlu Süleyman Şah",
        description: "Anadolu'da şehirleşme, ticaret, mimari ve kültür alanlarında gelişme sağlayan devlet.",
        region: "Anadolu",
        rulers: "I. Kılıç Arslan, I. Alaeddin Keykubad"
    },
    {
        id: "khwarezm",
        name: "Harzemşahlar",
        period: "seljuk",
        date: "1097 – 1231",
        type: "state",
        flag: "⚜",
        capital: "Gürgenç",
        founder: "Anuş Tigin",
        description: "Orta Asya ve İran çevresinde etkili olan büyük Türk hanedanı.",
        region: "Harzem ve İran",
        rulers: "Atsız, Alaeddin Tekiş, Celaleddin Harzemşah"
    },
    {
        id: "golden-horde",
        name: "Altın Orda Devleti",
        period: "seljuk",
        date: "13. yüzyıl – 1502",
        type: "empire",
        flag: "🐎",
        capital: "Saray",
        founder: "Batu Han",
        description: "Deşt-i Kıpçak ve Doğu Avrupa tarihinde etkili olan Türk-Moğol kökenli hanlık.",
        region: "Karadeniz'in kuzeyi ve Doğu Avrupa",
        rulers: "Batu Han, Özbek Han"
    },
    {
        id: "timurid",
        name: "Timurlu Devleti",
        period: "ottoman",
        date: "1370 – 1507",
        type: "empire",
        flag: "✦",
        capital: "Semerkant",
        founder: "Timur",
        description: "Orta Asya, İran ve çevresinde sanat, mimari ve bilim alanlarında önemli izler bırakan devlet.",
        region: "Orta Asya ve İran",
        rulers: "Timur, Şahruh, Uluğ Bey"
    },
    {
        id: "ottoman",
        name: "Osmanlı Devleti",
        period: "ottoman",
        date: "1299 – 1922",
        type: "empire",
        flag: "☪",
        capital: "Söğüt, Bursa, Edirne, İstanbul",
        founder: "Osman Gazi",
        description: "Üç kıtada uzun süre hüküm sürmüş, dünya tarihinde önemli bir yere sahip devlet.",
        region: "Anadolu, Balkanlar, Orta Doğu ve Kuzey Afrika",
        rulers: "Osman Gazi, Fatih Sultan Mehmet, Kanuni Sultan Süleyman, II. Abdülhamid"
    },
    {
        id: "crimean",
        name: "Kırım Hanlığı",
        period: "ottoman",
        date: "1441 – 1783",
        type: "khanate",
        flag: "⚑",
        capital: "Bahçesaray",
        founder: "Hacı Giray",
        description: "Karadeniz'in kuzeyinde etkili olmuş Kırım Tatar hanlığı.",
        region: "Kırım ve Karadeniz'in kuzeyi",
        rulers: "Hacı Giray, I. Mengli Giray"
    },
    {
        id: "kazakh",
        name: "Kazak Hanlığı",
        period: "ottoman",
        date: "1465 – 1847",
        type: "khanate",
        flag: "☀",
        capital: "Türkistan ve diğer merkezler",
        founder: "Kerey Han ve Canibek Han",
        description: "Kazak halkının siyasi ve kültürel tarihinde temel yere sahip hanlık.",
        region: "Kazak bozkırları",
        rulers: "Kerey Han, Canibek Han, Kasım Han"
    },
    {
        id: "khiva",
        name: "Hive Hanlığı",
        period: "ottoman",
        date: "1511 – 1920",
        type: "khanate",
        flag: "☾",
        capital: "Hive",
        founder: "İlbars Han",
        description: "Harezm bölgesinde varlık göstermiş tarihî hanlık.",
        region: "Harezm",
        rulers: "İlbars Han ve hanedan hükümdarları"
    },
    {
        id: "bukhara",
        name: "Buhara Hanlığı ve Emirliği",
        period: "ottoman",
        date: "1500 – 1920",
        type: "khanate",
        flag: "✦",
        capital: "Buhara",
        founder: "Muhammed Şeybani Han dönemi",
        description: "Maveraünnehir'de uzun süre etkili olmuş tarihî siyasi yapı.",
        region: "Özbekistan ve Maveraünnehir",
        rulers: "Muhammed Şeybani Han, hanlık ve emirlik hükümdarları"
    },
    {
        id: "khokand",
        name: "Hokand Hanlığı",
        period: "ottoman",
        date: "1709 – 1876",
        type: "khanate",
        flag: "✦",
        capital: "Hokand",
        founder: "Şahruh Bey",
        description: "Fergana Vadisi'nde kurulmuş Türk hanlığı.",
        region: "Fergana Vadisi",
        rulers: "Şahruh Bey, Alim Han"
    },
    {
        id: "azerbaijan",
        name: "Azerbaycan Cumhuriyeti",
        period: "modern",
        date: "1918 – 1920 / 1991 – Günümüz",
        type: "modern",
        flag: "🇦🇿",
        capital: "Bakü",
        founder: "Mehmet Emin Resulzade ve arkadaşları",
        description: "Türk dünyasının çağdaş bağımsız devletlerinden biri.",
        region: "Güney Kafkasya",
        rulers: "Cumhuriyet döneminin devlet başkanları"
    },
    {
        id: "turkiye",
        name: "Türkiye Cumhuriyeti",
        period: "modern",
        date: "29 Ekim 1923 – Günümüz",
        type: "modern",
        flag: "🇹🇷",
        capital: "Ankara",
        founder: "Mustafa Kemal Atatürk",
        description: "Cumhuriyet yönetimiyle kurulan, çağdaş Türk devletlerinden biri.",
        region: "Anadolu ve Doğu Trakya",
        rulers: "Mustafa Kemal Atatürk ve Türkiye Cumhuriyeti cumhurbaşkanları"
    },
    {
        id: "kazakhstan",
        name: "Kazakistan Cumhuriyeti",
        period: "modern",
        date: "1991 – Günümüz",
        type: "modern",
        flag: "🇰🇿",
        capital: "Astana",
        founder: "Bağımsızlık dönemi",
        description: "Orta Asya'nın yüzölçümü bakımından en büyük bağımsız Türk devleti.",
        region: "Orta Asya",
        rulers: "Bağımsızlık dönemi devlet başkanları"
    },
    {
        id: "uzbekistan",
        name: "Özbekistan Cumhuriyeti",
        period: "modern",
        date: "1991 – Günümüz",
        type: "modern",
        flag: "🇺🇿",
        capital: "Taşkent",
        founder: "Bağımsızlık dönemi",
        description: "Semerkant ve Buhara gibi tarihî merkezleri barındıran bağımsız Türk devleti.",
        region: "Orta Asya",
        rulers: "Bağımsızlık dönemi devlet başkanları"
    },
    {
        id: "kyrgyzstan",
        name: "Kırgız Cumhuriyeti",
        period: "modern",
        date: "1991 – Günümüz",
        type: "modern",
        flag: "🇰🇬",
        capital: "Bişkek",
        founder: "Bağımsızlık dönemi",
        description: "Tanrı Dağları çevresinde yer alan bağımsız Türk devleti.",
        region: "Orta Asya",
        rulers: "Bağımsızlık dönemi devlet başkanları"
    },
    {
        id: "turkmenistan",
        name: "Türkmenistan",
        period: "modern",
        date: "1991 – Günümüz",
        type: "modern",
        flag: "🇹🇲",
        capital: "Aşkabat",
        founder: "Bağımsızlık dönemi",
        description: "Orta Asya'da bulunan bağımsız Türk devleti.",
        region: "Orta Asya",
        rulers: "Bağımsızlık dönemi devlet başkanları"
    },
    {
        id: "north-cyprus",
        name: "Kuzey Kıbrıs Türk Cumhuriyeti",
        period: "modern",
        date: "1983 – Günümüz",
        type: "modern",
        flag: "🇹🇷",
        capital: "Lefkoşa",
        founder: "Rauf Denktaş",
        description: "Kıbrıs adasının kuzeyinde ilan edilmiş Türk yönetimi. Uluslararası tanınma durumu sınırlıdır.",
        region: "Kıbrıs",
        rulers: "Rauf Denktaş ve sonraki cumhurbaşkanları"
    }
];

/* =========================================================
   3. TARİHİ HARİTA VERİLERİ
   Şematik gösterimdir; kesin sınır haritası değildir.
   ========================================================= */

const MAP_DATA = {
    ancient: {
        name: "İLK TÜRK TOPLULUKLARI",
        regions: [
            { id: "steppe", name: "Avrasya Bozkırları", x: 350, y: 120, rx: 175, ry: 65 },
            { id: "altai", name: "Altay Bölgesi", x: 650, y: 250, rx: 105, ry: 65 }
        ],
        cities: [
            { name: "Altay", x: 650, y: 250 },
            { name: "Tanrı Dağları", x: 470, y: 320 }
        ]
    },
    hun: {
        name: "HUN DÖNEMİ",
        regions: [
            { id: "hun-east", name: "Asya Hun Etki Alanı", x: 640, y: 210, rx: 200, ry: 100 },
            { id: "hun-west", name: "Avrupa Hun Etki Alanı", x: 280, y: 200, rx: 145, ry: 90 }
        ],
        cities: [
            { name: "Ötüken", x: 690, y: 240 },
            { name: "Orta Avrupa", x: 270, y: 195 }
        ]
    },
    gokturk: {
        name: "GÖKTÜRK DÖNEMİ",
        regions: [
            { id: "gokturk-east", name: "Doğu Göktürk Alanı", x: 700, y: 190, rx: 170, ry: 80 },
            { id: "gokturk-west", name: "Batı Göktürk Alanı", x: 490, y: 250, rx: 155, ry: 80 }
        ],
        cities: [
            { name: "Ötüken", x: 710, y: 200 },
            { name: "Balasagun", x: 480, y: 300 }
        ]
    },
    uyghur: {
        name: "UYGUR DÖNEMİ",
        regions: [
            { id: "uyghur", name: "Uygur Kağanlığı", x: 700, y: 205, rx: 165, ry: 80 },
            { id: "tarim", name: "Tarım Havzası", x: 550, y: 370, rx: 100, ry: 60 }
        ],
        cities: [
            { name: "Ordu Balık", x: 700, y: 200 },
            { name: "Turfan", x: 610, y: 350 }
        ]
    },
    karakhanid: {
        name: "KARAHANLI DÖNEMİ",
        regions: [
            { id: "karakhanid-west", name: "Batı Karahanlı Alanı", x: 420, y: 280, rx: 135, ry: 75 },
            { id: "karakhanid-east", name: "Doğu Karahanlı Alanı", x: 620, y: 320, rx: 130, ry: 75 }
        ],
        cities: [
            { name: "Balasagun", x: 590, y: 300 },
            { name: "Kaşgar", x: 670, y: 350 },
            { name: "Semerkant", x: 390, y: 330 }
        ]
    },
    seljuk: {
        name: "SELÇUKLU DÖNEMİ",
        regions: [
            { id: "seljuk-east", name: "Büyük Selçuklu Alanı", x: 570, y: 270, rx: 180, ry: 100 },
            { id: "seljuk-west", name: "Anadolu Selçuklu Alanı", x: 260, y: 350, rx: 110, ry: 65 }
        ],
        cities: [
            { name: "İsfahan", x: 560, y: 330 },
            { name: "Konya", x: 260, y: 360 },
            { name: "Nişabur", x: 680, y: 290 }
        ]
    },
    ottoman: {
        name: "OSMANLI DÖNEMİ",
        regions: [
            { id: "ottoman-anatolia", name: "Anadolu", x: 330, y: 355, rx: 130, ry: 75 },
            { id: "ottoman-balkans", name: "Balkanlar", x: 290, y: 220, rx: 115, ry: 65 },
            { id: "ottoman-middleeast", name: "Orta Doğu", x: 510, y: 460, rx: 140, ry: 65 }
        ],
        cities: [
            { name: "İstanbul", x: 300, y: 290 },
            { name: "Bursa", x: 330, y: 330 },
            { name: "Edirne", x: 275, y: 260 }
        ]
    },
    modern: {
        name: "MODERN TÜRK DÜNYASI",
        regions: [
            { id: "modern-turkey", name: "Türkiye", x: 280, y: 355, rx: 90, ry: 45 },
            { id: "modern-azerbaijan", name: "Azerbaycan", x: 480, y: 330, rx: 55, ry: 35 },
            { id: "modern-central", name: "Orta Asya Türk Devletleri", x: 700, y: 240, rx: 180, ry: 80 }
        ],
        cities: [
            { name: "Ankara", x: 280, y: 355 },
            { name: "Bakü", x: 485, y: 330 },
            { name: "Astana", x: 700, y: 190 },
            { name: "Taşkent", x: 650, y: 280 },
            { name: "Bişkek", x: 740, y: 290 },
            { name: "Aşkabat", x: 560, y: 360 }
        ]
    }
};

/* =========================================================
   4. OYUN SENARYOLARI
   ========================================================= */

const SCENARIOS = {
    modern: {
        name: "Türkiye Cumhuriyeti",
        flag: "🇹🇷",
        date: 1923,
        government: "Cumhuriyet",
        leader: "Mustafa Kemal Atatürk",
        capital: "Ankara",
        description: "29 Ekim 1923'te kurulan Türkiye Cumhuriyeti ile modern çağda yeni bir döneme başla.",
        money: 12000,
        production: 75,
        population: 14000,
        stability: 78,
        research: 0,
        defense: 65,
        regions: [
            { id: "ankara", name: "Ankara", population: 1800, level: 2, development: 55 },
            { id: "istanbul", name: "İstanbul", population: 2500, level: 3, development: 70 },
            { id: "izmir", name: "İzmir", population: 1500, level: 2, development: 65 },
            { id: "bursa", name: "Bursa", population: 1100, level: 2, development: 58 },
            { id: "trabzon", name: "Trabzon", population: 700, level: 1, development: 45 },
            { id: "konya", name: "Konya", population: 900, level: 1, development: 42 }
        ]
    },
    gokturk: {
        name: "Göktürk Kağanlığı",
        flag: "𐱅𐰇𐰼𐰜",
        date: 552,
        government: "Kağanlık",
        leader: "Bumin Kağan",
        capital: "Ötüken",
        description: "Bumin Kağan döneminde Göktürk Kağanlığı'nı yönet ve Orta Asya'da güçlü bir siyasi yapı oluştur.",
        money: 7000,
        production: 55,
        population: 8000,
        stability: 75,
        research: 0,
        defense: 70,
        regions: [
            { id: "otuken", name: "Ötüken", population: 1800, level: 2, development: 50 },
            { id: "altay", name: "Altay", population: 1200, level: 1, development: 40 },
            { id: "orhun", name: "Orhun", population: 1500, level: 2, development: 48 },
            { id: "yedi-su", name: "Yedisu", population: 1000, level: 1, development: 42 }
        ]
    },
    seljuk: {
        name: "Büyük Selçuklu Devleti",
        flag: "☾",
        date: 1037,
        government: "Sultanlık",
        leader: "Tuğrul Bey",
        capital: "Rey",
        description: "Selçuklu devletinin kuruluş döneminde yönetimi devral ve ülkeni geliştir.",
        money: 10000,
        production: 70,
        population: 11000,
        stability: 72,
        research: 0,
        defense: 75,
        regions: [
            { id: "rey", name: "Rey", population: 1800, level: 2, development: 55 },
            { id: "isfahan", name: "İsfahan", population: 2300, level: 3, development: 68 },
            { id: "nisabur", name: "Nişabur", population: 1700, level: 2, development: 52 },
            { id: "merv", name: "Merv", population: 1500, level: 2, development: 50 },
            { id: "herat", name: "Herat", population: 1200, level: 1, development: 45 }
        ]
    },
    ottoman: {
        name: "Osmanlı Devleti",
        flag: "☪",
        date: 1299,
        government: "Beylik",
        leader: "Osman Gazi",
        capital: "Söğüt",
        description: "Osman Gazi döneminde küçük bir beylikten güçlü bir devlete uzanan yolculuğa başla.",
        money: 6500,
        production: 50,
        population: 6000,
        stability: 80,
        research: 0,
        defense: 60,
        regions: [
            { id: "sogut", name: "Söğüt", population: 900, level: 1, development: 42 },
            { id: "bilecik", name: "Bilecik", population: 800, level: 1, development: 40 },
            { id: "bursa", name: "Bursa", population: 1400, level: 2, development: 55 }
        ]
    }
};

const DIFFICULTY = {
    easy: { income: 1.3, expenses: 0.8, name: "Kolay" },
    normal: { income: 1, expenses: 1, name: "Normal" },
    hard: { income: 0.8, expenses: 1.25, name: "Zor" }
};

const BUILDINGS = [
    {
        id: "market",
        name: "Ticaret Merkezi",
        icon: "⚖",
        cost: 1800,
        income: 180,
        description: "Ticaret gelirlerini artırır."
    },
    {
        id: "workshop",
        name: "Üretim Tesisi",
        icon: "⚒",
        cost: 2500,
        income: 130,
        production: 12,
        description: "Üretim kapasitesini geliştirir."
    },
    {
        id: "school",
        name: "Eğitim Kurumu",
        icon: "⌬",
        cost: 2200,
        income: 60,
        research: 5,
        description: "Bilimsel gelişimi destekler."
    },
    {
        id: "infrastructure",
        name: "Altyapı Projesi",
        icon: "▦",
        cost: 3000,
        income: 100,
        stability: 2,
        description: "Bölgesel gelişimi ve istikrarı artırır."
    }
];

const RESEARCHES = [
    {
        id: "agriculture",
        name: "Tarım Teknikleri",
        cost: 250,
        description: "Üretim ve ekonomik verimliliği artırır.",
        effect: { production: 8 }
    },
    {
        id: "trade",
        name: "Ticaret Ağları",
        cost: 350,
        description: "Ticari gelirleri artırır.",
        effect: { money: 150 }
    },
    {
        id: "education",
        name: "Eğitim Reformu",
        cost: 450,
        description: "Bilimsel gelişim kapasitesini artırır.",
        effect: { research: 10 }
    },
    {
        id: "administration",
        name: "İdari Reform",
        cost: 500,
        description: "Devlet kurumlarını güçlendirir.",
        effect: { stability: 5 }
    },
    {
        id: "engineering",
        name: "Mühendislik",
        cost: 650,
        description: "Üretim kapasitesini geliştirir.",
        effect: { production: 15 }
    }
];

/* =========================================================
   5. UYGULAMA DURUMU
   ========================================================= */

let selectedPeriod = "gokturk";
let selectedScenario = "modern";
let selectedState = null;
let selectedProvince = null;

let game = null;
let gameTimer = null;
let gamePaused = false;
let gameSpeed = 1;

let mapZoom = 1;
let stateViewMode = "grid";
let gameTab = "overview";

let settings = {
    sound: false,
    animations: true,
    autosave: true
};

/* =========================================================
   6. YARDIMCI FONKSİYONLAR
   ========================================================= */

function formatNumber(value) {
    return new Intl.NumberFormat("tr-TR").format(Math.floor(value));
}

function formatPopulation(value) {
    if (value >= 1000) {
        return `${(value / 1000).toLocaleString("tr-TR", {
            maximumFractionDigits: 1
        })} milyon`;
    }

    return formatNumber(value);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function showToast(message, type = "success") {
    const container = $("#toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3200);
}

function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("hidden");
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("hidden");
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/* =========================================================
   7. SAYFA GEÇİŞLERİ
   ========================================================= */

function navigateTo(page) {
    const target = document.getElementById(`page-${page}`);
    if (!target) return;

    $$(".page").forEach((item) => item.classList.remove("active"));
    target.classList.add("active");

    $$(".nav-item").forEach((item) => {
        item.classList.toggle("active", item.dataset.page === page);
    });

    if (page === "atlas") {
        renderPeriodList();
        renderMap();
    }

    if (page === "states") {
        renderStates();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindNavigation() {
    $$(".nav-item").forEach((button) => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.page);
        });
    });

    $$("[data-goto]").forEach((element) => {
        element.addEventListener("click", () => {
            navigateTo(element.dataset.goto);
        });
    });
}

/* =========================================================
   8. ANA SAYFA
   ========================================================= */

function renderHome() {
    setText("home-state-count", STATES.length);
    setText("home-period-count", PERIODS.length);
    setText("home-ruler-count", 30);
    setText("home-event-count", 25);

    const container = $("#home-timeline-items");
    if (!container) return;

    const items = [
        {
            year: "MÖ 220",
            name: "Asya Hun Devleti",
            description: "Mete Han döneminde güçlenen siyasi birlik."
        },
        {
            year: "552",
            name: "Göktürk Kağanlığı",
            description: "Türk adını taşıyan büyük devlet."
        },
        {
            year: "744",
            name: "Uygur Kağanlığı",
            description: "Yerleşik kültürün geliştiği dönem."
        },
        {
            year: "1037",
            name: "Büyük Selçuklu",
            description: "Selçuklu devletinin kuruluşu."
        },
        {
            year: "1299",
            name: "Osmanlı Devleti",
            description: "Osmanlı Beyliği'nin kuruluşu."
        },
        {
            year: "1923",
            name: "Türkiye Cumhuriyeti",
            description: "Cumhuriyetin ilanı."
        }
    ];

    container.innerHTML = items.map((item) => `
        <div class="timeline-item">
            <div class="timeline-year">${escapeHTML(item.year)}</div>
            <div class="timeline-name">${escapeHTML(item.name)}</div>
            <div class="timeline-description">${escapeHTML(item.description)}</div>
        </div>
    `).join("");
}

/* =========================================================
   9. TARİH ATLASI
   ========================================================= */

function renderPeriodList() {
    const container = $("#period-list");
    if (!container) return;

    container.innerHTML = PERIODS.map((period) => `
        <button class="period-button ${period.id === selectedPeriod ? "active" : ""}"
            data-period="${period.id}">
            <span>${escapeHTML(period.name)}</span>
            <span>›</span>
        </button>
    `).join("");

    $$(".period-button").forEach((button) => {
        button.addEventListener("click", () => {
            selectedPeriod = button.dataset.period;
            renderPeriodList();
            renderMap();
        });
    });
}

function renderMap() {
    const data = MAP_DATA[selectedPeriod];
    if (!data) return;

    setText("map-period-name", data.name);

    const background = $("#map-background");
    const regions = $("#map-regions");
    const cities = $("#map-cities");
    const labels = $("#map-labels");
    const routes = $("#map-routes");

    if (!background || !regions || !cities || !labels || !routes) return;

    background.innerHTML = `
        <rect x="0" y="0" width="1000" height="620" fill="#15252b"/>
        ${Array.from({ length: 12 }, (_, i) =>
            `<path d="M ${i * 100} 0 V 620" stroke="#a68b5d" opacity=".08"/>`
        ).join("")}
        ${Array.from({ length: 8 }, (_, i) =>
            `<path d="M 0 ${i * 80} H 1000" stroke="#a68b5d" opacity=".08"/>`
        ).join("")}
        <path d="M 0 500 Q 250 450 420 510 T 1000 500"
            fill="none" stroke="#568397" opacity=".25" stroke-width="2"/>
    `;

    const showStates = $("#layer-states")?.checked !== false;
    const showCities = $("#layer-cities")?.checked !== false;
    const showLabels = $("#layer-labels")?.checked !== false;
    const showRoutes = $("#layer-routes")?.checked === true;

    regions.innerHTML = showStates ? data.regions.map((region, index) => `
        <g class="map-region" data-region="${escapeHTML(region.id)}"
            tabindex="0" role="button" aria-label="${escapeHTML(region.name)}">
            <ellipse cx="${region.x}" cy="${region.y}"
                rx="${region.rx}" ry="${region.ry}"
                fill="${index % 2 === 0 ? "#b08b4e" : "#987748"}"
                fill-opacity=".27"
                stroke="#d2b36e"
                stroke-width="2"
                stroke-opacity=".75"/>
            <ellipse cx="${region.x}" cy="${region.y}"
                rx="${region.rx - 10}" ry="${region.ry - 10}"
                fill="none" stroke="#d2b36e" stroke-opacity=".2"
                stroke-dasharray="5 8"/>
        </g>
    `).join("") : "";

    cities.innerHTML = showCities ? data.cities.map((city) => `
        <g class="map-city" data-city="${escapeHTML(city.name)}"
            tabindex="0" role="button">
            <circle cx="${city.x}" cy="${city.y}" r="5"
                fill="#e6c982" stroke="#fff" stroke-width="1"/>
        </g>
    `).join("") : "";

    labels.innerHTML = showLabels ? `
        ${data.regions.map((region) => `
            <text x="${region.x}" y="${region.y}"
                text-anchor="middle" fill="#f0d8a3"
                font-size="13" font-family="Inter"
                pointer-events="none">
                ${escapeHTML(region.name)}
            </text>
        `).join("")}
        ${showCities ? data.cities.map((city) => `
            <text x="${city.x + 9}" y="${city.y - 9}"
                fill="#d9e3e4" font-size="10"
                font-family="Inter" pointer-events="none">
                ${escapeHTML(city.name)}
            </text>
        `).join("") : ""}
    ` : "";

    routes.innerHTML = showRoutes ? `
        <path d="M 280 355 Q 450 100 700 200"
            fill="none" stroke="#e4c783" stroke-width="2"
            stroke-dasharray="7 7" opacity=".7"/>
        <path d="M 280 355 Q 420 400 650 280"
            fill="none" stroke="#e4c783" stroke-width="2"
            stroke-dasharray="7 7" opacity=".7"/>
    ` : "";

    regions.querySelectorAll(".map-region").forEach((element) => {
        const region = data.regions.find(
            (item) => item.id === element.dataset.region
        );

        const selectRegion = () => {
            showMapDetail({
                name: region.name,
                type: "Tarihî bölge",
                description: `${region.name}, ${data.name.toLocaleLowerCase("tr-TR")} haritasında gösterilen şematik bir tarihî bölgedir.`
            });
        };

        element.addEventListener("click", selectRegion);
        element.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectRegion();
            }
        });
    });

    cities.querySelectorAll(".map-city").forEach((element) => {
        const city = data.cities.find(
            (item) => item.name === element.dataset.city
        );

        const selectCity = () => {
            showMapDetail({
                name: city.name,
                type: "Tarihî şehir",
                description: `${city.name}, seçili tarihî dönemin haritasında işaretlenmiş önemli bir merkezdir.`
            });
        };

        element.addEventListener("click", selectCity);
        element.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectCity();
            }
        });
    });

    $("#map-canvas").style.transform = `scale(${mapZoom})`;
}

function showMapDetail(info) {
    const container = $("#atlas-detail-content");
    if (!container) return;

    container.innerHTML = `
        <div class="detail-map-content">
            <span class="eyebrow">${escapeHTML(info.type)}</span>
            <h2 style="font-family:var(--font-heading);font-size:20px;margin:12px 0;">
                ${escapeHTML(info.name)}
            </h2>
            <div style="height:1px;background:var(--border);margin:15px 0;"></div>
            <p style="color:var(--muted);font-size:11px;line-height:1.8;">
                ${escapeHTML(info.description)}
            </p>
            <p style="color:var(--gold);font-size:9px;margin-top:20px;">
                SEÇİLİ DÖNEM: ${escapeHTML(MAP_DATA[selectedPeriod].name)}
            </p>
        </div>
    `;

    setText("map-coordinate-info", info.name);
}

function bindMapControls() {
    $("#map-zoom-in")?.addEventListener("click", () => {
        mapZoom = clamp(mapZoom + .15, .7, 2);
        $("#map-canvas").style.transform = `scale(${mapZoom})`;
    });

    $("#map-zoom-out")?.addEventListener("click", () => {
        mapZoom = clamp(mapZoom - .15, .7, 2);
        $("#map-canvas").style.transform = `scale(${mapZoom})`;
    });

    $("#atlas-reset-button")?.addEventListener("click", () => {
        mapZoom = 1;
        selectedPeriod = "gokturk";
        renderPeriodList();
        renderMap();

        $("#map-canvas").style.transform = "scale(1)";
        showToast("Harita başlangıç görünümüne döndürüldü.");
    });

    $("#map-fullscreen")?.addEventListener("click", () => {
        const map = $("#atlas-map");
        if (!document.fullscreenElement) {
            map?.requestFullscreen?.().catch(() => {
                showToast("Tam ekran kullanılamıyor.", "error");
            });
        } else {
            document.exitFullscreen?.();
        }
    });

    ["layer-states", "layer-cities", "layer-routes", "layer-labels"].forEach((id) => {
        document.getElementById(id)?.addEventListener("change", renderMap);
    });
}

/* =========================================================
   10. TÜRK DEVLETLERİ SAYFASI
   ========================================================= */

function populatePeriodFilter() {
    const select = $("#state-period-filter");
    if (!select) return;

    select.innerHTML = `
        <option value="all">Bütün dönemler</option>
        ${PERIODS.map((period) => `
            <option value="${period.id}">${escapeHTML(period.name)}</option>
        `).join("")}
    `;
}

function renderStates() {
    const container = $("#states-grid");
    if (!container) return;

    const search = ($("#state-search")?.value || "")
        .trim()
        .toLocaleLowerCase("tr-TR");

    const period = $("#state-period-filter")?.value || "all";
    const type = $("#state-type-filter")?.value || "all";

    const filtered = STATES.filter((state) => {
        const searchText = [
            state.name,
            state.description,
            state.capital,
            state.rulers,
            state.region
        ].join(" ").toLocaleLowerCase("tr-TR");

        return (
            (!search || searchText.includes(search)) &&
            (period === "all" || state.period === period) &&
            (type === "all" || state.type === type)
        );
    });

    setText("states-result-count", filtered.length);

    container.classList.toggle("list-view", stateViewMode === "list");
    $("#states-empty")?.classList.toggle("hidden", filtered.length !== 0);

    container.innerHTML = filtered.map((state) => {
        const periodInfo = PERIODS.find((item) => item.id === state.period);

        return `
            <article class="state-card" data-state-id="${state.id}" tabindex="0">
                <div class="state-card-top">
                    <div class="state-flag">${escapeHTML(state.flag)}</div>
                    <span class="state-period">${escapeHTML(state.date)}</span>
                </div>

                <h3>${escapeHTML(state.name)}</h3>
                <p>${escapeHTML(state.description)}</p>

                <div class="state-card-bottom">
                    <span>${escapeHTML(state.capital)}</span>
                    <span>${escapeHTML(periodInfo?.name || "")} →</span>
                </div>
            </article>
        `;
    }).join("");

    container.querySelectorAll(".state-card").forEach((card) => {
        const open = () => openStateModal(card.dataset.stateId);

        card.addEventListener("click", open);
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter") open();
        });
    });
}

function openStateModal(id) {
    const state = STATES.find((item) => item.id === id);
    if (!state) return;

    selectedState = state;

    const period = PERIODS.find((item) => item.id === state.period);

    $("#state-modal-body").innerHTML = `
        <div style="font-size:42px;margin-bottom:12px;">${escapeHTML(state.flag)}</div>
        <span class="eyebrow">${escapeHTML(period?.name || "")}</span>
        <h2 style="font-family:var(--font-heading);font-size:25px;margin-bottom:8px;">
            ${escapeHTML(state.name)}
        </h2>
        <p style="color:var(--gold);font-size:10px;margin-bottom:20px;">
            ${escapeHTML(state.date)}
        </p>
        <p style="color:var(--muted);font-size:12px;line-height:1.9;">
            ${escapeHTML(state.description)}
        </p>

        <div style="margin-top:25px;border-top:1px solid var(--border);padding-top:18px;">
            <div class="detail-row"><span>Başkent</span><strong>${escapeHTML(state.capital)}</strong></div>
            <div class="detail-row"><span>Kurucu</span><strong>${escapeHTML(state.founder)}</strong></div>
            <div class="detail-row"><span>Coğrafya</span><strong>${escapeHTML(state.region)}</strong></div>
            <div class="detail-row"><span>Hükümdarlar</span><strong>${escapeHTML(state.rulers)}</strong></div>
            <div class="detail-row"><span>Tür</span><strong>${escapeHTML(state.type)}</strong></div>
        </div>
    `;

    showModal("state-modal");
}

function bindStateControls() {
    $("#state-search")?.addEventListener("input", renderStates);
    $("#state-period-filter")?.addEventListener("change", renderStates);
    $("#state-type-filter")?.addEventListener("change", renderStates);

    $("#states-grid-view")?.addEventListener("click", () => {
        stateViewMode = "grid";
        $("#states-grid-view").classList.add("active");
        $("#states-list-view").classList.remove("active");
        renderStates();
    });

    $("#states-list-view")?.addEventListener("click", () => {
        stateViewMode = "list";
        $("#states-list-view").classList.add("active");
        $("#states-grid-view").classList.remove("active");
        renderStates();
    });
}

/* =========================================================
   11. OYUN MENÜSÜ VE SENARYO SEÇİMİ
   ========================================================= */

function updateScenarioSelection() {
    const scenario = SCENARIOS[selectedScenario];
    if (!scenario) return;

    setText("selected-scenario-name", scenario.name);
    setText("selected-scenario-description", scenario.description);

    $$(".scenario-card").forEach((card) => {
        const active = card.dataset.scenario === selectedScenario;
        card.classList.toggle("selected", active);
        const label = card.querySelector("i");
        if (label) label.textContent = active ? "SEÇİLDİ" : "SEÇ";
    });
}

function bindScenarioControls() {
    $$(".scenario-card").forEach((card) => {
        card.addEventListener("click", () => {
            selectedScenario = card.dataset.scenario;
            updateScenarioSelection();
        });
    });

    $("#start-game-button")?.addEventListener("click", startNewGame);
    $("#load-game-button")?.addEventListener("click", loadGame);
    $("#exit-game-button")?.addEventListener("click", exitGame);
    $("#save-game-button")?.addEventListener("click", saveGame);
}

/* =========================================================
   12. YENİ OYUN OLUŞTURMA
   ========================================================= */

function startNewGame() {
    const scenario = SCENARIOS[selectedScenario];
    if (!scenario) return;

    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }

    const difficulty = $("#game-difficulty")?.value || "normal";
    const speed = Number($("#game-start-speed")?.value || 1);

    game = {
        scenario: selectedScenario,
        name: scenario.name,
        flag: scenario.flag,
        year: scenario.date,
        government: scenario.government,
        leader: scenario.leader,
        capital: scenario.capital,

        money: scenario.money,
        production: scenario.production,
        population: scenario.population,
        stability: scenario.stability,
        research: scenario.research,
        defense: scenario.defense,

        difficulty,
        regions: JSON.parse(JSON.stringify(scenario.regions)),

        buildings: {},
        completedResearch: [],
        diplomacy: {},
        eventLog: [],
        totalIncome: 0,
        totalExpenses: 0,
        months: 0,
        tick: 0,
        paused: false
    };

    Object.keys(BUILDINGS).forEach(() => {});
    Object.keys(game.regions).forEach(() => {});

    STATES.filter((state) => state.type === "modern" && state.id !== "turkiye")
        .forEach((state) => {
            game.diplomacy[state.id] = {
                relation: 0,
                status: "Nötr"
            };
        });

    gameSpeed = speed;
    gamePaused = false;
    gameTab = "overview";

    addGameLog(`${game.name} yönetimi başladı. Başkent: ${game.capital}.`);
    addGameLog(`Yönetim biçimi: ${game.government}.`);

    $("#game-menu").classList.add("hidden");
    $("#game-interface").classList.remove("hidden");

    renderGame();
    setGameTab("overview");
    startGameClock();

    showToast(`${game.name} senaryosu başlatıldı.`);
}

/* =========================================================
   13. OYUN SAATİ
   ========================================================= */

function startGameClock() {
    if (gameTimer) clearInterval(gameTimer);

    gameTimer = setInterval(() => {
        if (!game || gamePaused) return;

        for (let i = 0; i < gameSpeed; i++) {
            gameTick();
        }
    }, 2000);
}

function gameTick() {
    if (!game) return;

    game.tick++;

    const difficulty = DIFFICULTY[game.difficulty] || DIFFICULTY.normal;

    const buildingIncome = Object.entries(game.buildings).reduce((sum, [id, count]) => {
        const building = BUILDINGS.find((item) => item.id === id);
        return sum + (building ? building.income * count : 0);
    }, 0);

    const baseIncome = game.production * 1.5;
    const income = (baseIncome + buildingIncome) * difficulty.income;

    const expenses = (
        game.population * 0.08 +
        game.defense * 3 +
        Object.values(game.buildings).reduce((sum, count) => sum + count * 15, 0)
    ) * difficulty.expenses;

    game.money += income - expenses;
    game.money = Math.max(0, game.money);

    game.totalIncome += income;
    game.totalExpenses += expenses;

    game.regions.forEach((region) => {
        region.population = Math.floor(region.population * 1.0003);
    });

    if (game.tick % 5 === 0) {
        game.year++;
        game.months++;

        const populationGrowth = Math.max(1, Math.floor(game.population * 0.001));
        game.population += populationGrowth;

        if (game.money > 0) {
            game.stability = clamp(game.stability + 0.2, 0, 100);
        } else {
            game.stability = clamp(game.stability - 1, 0, 100);
        }

        if (game.tick % 20 === 0) {
            addGameLog(`${game.year} yılı: Devlet yönetimi devam ediyor.`);
        }

        if (game.tick % 30 === 0 && settings.autosave) {
            saveGame(true);
        }
    }

    renderGameTopbar();
    renderOverviewStats();
    renderEconomy();
    renderStatistics();
}

/* =========================================================
   14. OYUN DURDURMA VE HIZ
   ========================================================= */

function bindGameClockControls() {
    $("#game-pause-button")?.addEventListener("click", () => {
        gamePaused = !gamePaused;

        $("#game-pause-button").textContent = gamePaused ? "▶" : "Ⅱ";
        showToast(gamePaused ? "Oyun duraklatıldı." : "Oyun devam ediyor.");
    });

    $$(".game-speed-button").forEach((button) => {
        button.addEventListener("click", () => {
            gameSpeed = Number(button.dataset.speed);

            $$(".game-speed-button").forEach((item) => {
                item.classList.toggle("active", item === button);
            });

            showToast(`Oyun hızı ${gameSpeed}× olarak ayarlandı.`);
        });
    });
}

/* =========================================================
   15. OYUN ARAYÜZÜ
   ========================================================= */

function renderGame() {
    if (!game) return;

    renderGameTopbar();
    renderOverview();
    renderProvinces();
    renderEconomy();
    renderDiplomacy();
    renderResearch();
    renderMilitary();
    renderStatistics();
}

function renderGameTopbar() {
    if (!game) return;

    setText("game-country-name", game.name);
    setText("game-country-government", game.government);
    setText("game-country-flag", game.flag);

    setText("resource-money", formatNumber(game.money));
    setText("resource-production", formatNumber(game.production));
    setText("resource-population", formatPopulation(game.population));
    setText("resource-stability", `${Math.round(game.stability)}%`);

    setText("game-date", `${game.year}`);
}

function renderOverviewStats() {
    if (!game) return;

    setText("overview-money", formatNumber(game.money));
    setText("overview-population", formatPopulation(game.population));
    setText("overview-production", formatNumber(game.production));
    setText("overview-stability", `${Math.round(game.stability)}%`);
}

function renderOverview() {
    if (!game) return;

    setText("overview-country-title", game.name);
    setText("overview-country-description", `${game.year} yılı. Başkent: ${game.capital}.`);
    setText("overview-flag", game.flag);

    renderOverviewStats();

    const details = $("#overview-country-details");
    if (details) {
        details.innerHTML = [
            ["Başkent", game.capital],
            ["Yönetim biçimi", game.government],
            ["Devlet başkanı / hükümdar", game.leader],
            ["Bölge sayısı", game.regions.length],
            ["Zorluk", DIFFICULTY[game.difficulty].name]
        ].map(([label, value]) => `
            <div class="detail-row">
                <span>${escapeHTML(label)}</span>
                <strong>${escapeHTML(value)}</strong>
            </div>
        `).join("");
    }

    const events = $("#overview-events");
    if (events) {
        events.innerHTML = `
            <div class="event-item">Devlet yönetimi aktif.</div>
            <div class="event-item">Ekonomi sistemi çalışıyor.</div>
            <div class="event-item">Araştırma ve gelişim sistemi hazır.</div>
            <div class="event-item">Diplomatik ilişkiler yönetilebilir.</div>
        `;
    }

    renderEventLog();
}

function addGameLog(message) {
    if (!game) return;

    game.eventLog.unshift({
        year: game.year,
        message
    });

    game.eventLog = game.eventLog.slice(0, 50);

    renderEventLog();
}

function renderEventLog() {
    const container = $("#game-event-log");
    if (!container || !game) return;

    container.innerHTML = game.eventLog.length
        ? game.eventLog.map((event) => `
            <div class="log-entry">
                <time>${event.year}</time>
                ${escapeHTML(event.message)}
            </div>
        `).join("")
        : `<div class="log-entry">Henüz bir gelişme bulunmuyor.</div>`;
}

/* =========================================================
   16. OYUN SEKMELERİ
   ========================================================= */

const GAME_TAB_INFO = {
    overview: ["DEVLETİNİN DURUMU", "Genel Bakış"],
    provinces: ["BÖLGESEL YÖNETİM", "Şehirler ve Bölgeler"],
    economy: ["EKONOMİ VE KALKINMA", "Ekonomi"],
    diplomacy: ["DIŞ İLİŞKİLER", "Diplomasi"],
    research: ["BİLİM VE TEKNOLOJİ", "Araştırmalar"],
    military: ["ULUSAL GÜVENLİK", "Savunma"],
    statistics: ["DEVLET VERİLERİ", "İstatistikler"]
};

function setGameTab(tab) {
    if (!GAME_TAB_INFO[tab]) return;

    gameTab = tab;

    $$(".game-tab").forEach((button) => {
        button.classList.toggle("active", button.dataset.gameTab === tab);
    });

    $$(".game-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === `game-panel-${tab}`);
    });

    setText("game-section-eyebrow", GAME_TAB_INFO[tab][0]);
    setText("game-section-title", GAME_TAB_INFO[tab][1]);
}

function bindGameTabs() {
    $$(".game-tab").forEach((button) => {
        button.addEventListener("click", () => {
            setGameTab(button.dataset.gameTab);
        });
    });
}

/* =========================================================
   17. ŞEHİRLER VE BÖLGELER
   ========================================================= */

function renderProvinces() {
    if (!game) return;

    const container = $("#province-list");
    if (!container) return;

    container.innerHTML = game.regions.map((region) => `
        <article class="province-card ${selectedProvince === region.id ? "selected" : ""}"
            data-province="${region.id}">
            <h4>${escapeHTML(region.name)}</h4>
            <p>Nüfus: ${formatPopulation(region.population)}</p>
            <p>Gelişim: ${region.development}%</p>
            <p>Seviye: ${region.level}</p>
            <button type="button">BÖLGEYİ İNCELE →</button>
        </article>
    `).join("");

    container.querySelectorAll(".province-card").forEach((card) => {
        card.addEventListener("click", () => {
            selectProvince(card.dataset.province);
        });
    });
}

function selectProvince(id) {
    const region = game?.regions.find((item) => item.id === id);
    if (!region) return;

    selectedProvince = id;

    const detail = $("#province-detail");
    if (!detail) return;

    detail.innerHTML = `
        <div class="game-content-card">
            <span class="eyebrow">BÖLGE YÖNETİMİ</span>
            <h3 style="font-family:var(--font-heading);font-size:20px;margin-bottom:12px;">
                ${escapeHTML(region.name)}
            </h3>

            <div class="detail-row"><span>Nüfus</span><strong>${formatPopulation(region.population)}</strong></div>
            <div class="detail-row"><span>Gelişim</span><strong>${region.development}%</strong></div>
            <div class="detail-row"><span>Seviye</span><strong>${region.level}</strong></div>

            <button class="primary-button" id="develop-province-button">
                BÖLGEYİ GELİŞTİR · 750 ◈
            </button>
        </div>
    `;

    $("#develop-province-button")?.addEventListener("click", () => {
        developProvince(id);
    });

    renderProvinces();
}

function developProvince(id) {
    const region = game?.regions.find((item) => item.id === id);
    if (!region) return;

    const cost = 750;

    if (game.money < cost) {
        showToast("Bu yatırım için yeterli hazinen yok.", "error");
        return;
    }

    if (region.development >= 100) {
        showToast("Bu bölge en yüksek gelişim seviyesine ulaşmış.", "error");
        return;
    }

    game.money -= cost;
    region.development = Math.min(100, region.development + 10);
    region.level++;

    addGameLog(`${region.name} bölgesinde gelişim yatırımı yapıldı.`);
    renderGame();
    selectProvince(id);

    showToast(`${region.name} bölgesi geliştirildi.`);
}

/* =========================================================
   18. EKONOMİ
   ========================================================= */

function renderEconomy() {
    if (!game) return;

    const summary = $("#economy-summary");
    if (summary) {
        const difficulty = DIFFICULTY[game.difficulty];

        const income = (
            game.production * 1.5 +
            Object.entries(game.buildings).reduce((sum, [id, count]) => {
                const building = BUILDINGS.find((item) => item.id === id);
                return sum + (building ? building.income * count : 0);
            }, 0)
        ) * difficulty.income;

        const expenses = (
            game.population * 0.08 +
            game.defense * 3 +
            Object.values(game.buildings).reduce((sum, count) => sum + count * 15, 0)
        ) * difficulty.expenses;

        summary.innerHTML = `
            <div class="economy-box">
                <span>Hazine</span>
                <strong>${formatNumber(game.money)}</strong>
            </div>
            <div class="economy-box">
                <span>Dönemsel gelir</span>
                <strong>${formatNumber(income)}</strong>
            </div>
            <div class="economy-box">
                <span>Dönemsel gider</span>
                <strong>${formatNumber(expenses)}</strong>
            </div>
        `;
    }

    const container = $("#building-list");
    if (!container) return;

    container.innerHTML = BUILDINGS.map((building) => {
        const count = game.buildings[building.id] || 0;

        return `
            <article class="building-card">
                <div style="font-size:24px;margin-bottom:8px;">${building.icon}</div>
                <h4>${escapeHTML(building.name)}</h4>
                <p>${escapeHTML(building.description)}</p>
                <p style="margin-top:8px;color:var(--gold);">
                    Maliyet: ${formatNumber(building.cost)}
                </p>
                <p>Kurulu: ${count}</p>
                <button data-building="${building.id}" type="button">
                    YATIRIM YAP
                </button>
            </article>
        `;
    }).join("");

    container.querySelectorAll("[data-building]").forEach((button) => {
        button.addEventListener("click", () => {
            buildStructure(button.dataset.building);
        });
    });
}

function buildStructure(id) {
    const building = BUILDINGS.find((item) => item.id === id);
    if (!building || !game) return;

    if (game.money < building.cost) {
        showToast("Yeterli hazine bulunmuyor.", "error");
        return;
    }

    game.money -= building.cost;
    game.buildings[id] = (game.buildings[id] || 0) + 1;

    if (building.production) game.production += building.production;
    if (building.research) game.research += building.research;
    if (building.stability) {
        game.stability = clamp(game.stability + building.stability, 0, 100);
    }

    addGameLog(`${building.name} yatırımı tamamlandı.`);
    renderGame();

    showToast(`${building.name} kuruldu.`);
}

/* =========================================================
   19. DİPLOMASİ
   ========================================================= */

function renderDiplomacy() {
    if (!game) return;

    const container = $("#diplomacy-list");
    if (!container) return;

    const diplomaticStates = STATES.filter((state) =>
        state.type === "modern" && state.id !== "turkiye"
    );

    container.innerHTML = diplomaticStates.map((state) => {
        const relation = game.diplomacy[state.id] || {
            relation: 0,
            status: "Nötr"
        };

        return `
            <article class="diplomacy-card">
                <div>
                    <h4>${escapeHTML(state.flag)} ${escapeHTML(state.name)}</h4>
                    <p>İlişki: ${relation.relation} / 100 · ${escapeHTML(relation.status)}</p>
                </div>
                <button data-diplomacy="${state.id}" type="button">
                    İLİŞKİ GELİŞTİR
                </button>
            </article>
        `;
    }).join("");

    container.querySelectorAll("[data-diplomacy]").forEach((button) => {
        button.addEventListener("click", () => {
            improveDiplomacy(button.dataset.diplomacy);
        });
    });
}

function improveDiplomacy(id) {
    if (!game) return;

    const state = STATES.find((item) => item.id === id);
    if (!state) return;

    const cost = 400;

    if (game.money < cost) {
        showToast("Diplomatik görüşme için yeterli hazine yok.", "error");
        return;
    }

    if (!game.diplomacy[id]) {
        game.diplomacy[id] = { relation: 0, status: "Nötr" };
    }

    game.money -= cost;
    game.diplomacy[id].relation = clamp(
        game.diplomacy[id].relation + 15,
        -100,
        100
    );

    const relation = game.diplomacy[id].relation;

    game.diplomacy[id].status =
        relation >= 75 ? "Çok iyi" :
        relation >= 40 ? "İyi" :
        relation >= 15 ? "Olumlu" :
        "Nötr";

    addGameLog(`${state.name} ile diplomatik temas gerçekleştirildi.`);
    renderGame();

    showToast(`${state.name} ile ilişkiler geliştirildi.`);
}

/* =========================================================
   20. ARAŞTIRMALAR
   ========================================================= */

function renderResearch() {
    if (!game) return;

    const container = $("#research-list");
    if (!container) return;

    container.innerHTML = RESEARCHES.map((research) => {
        const completed = game.completedResearch.includes(research.id);

        return `
            <article class="research-card">
                <div style="font-size:22px;margin-bottom:8px;">⌬</div>
                <h4>${escapeHTML(research.name)}</h4>
                <p>${escapeHTML(research.description)}</p>
                <p style="color:var(--gold);margin-top:9px;">
                    Araştırma puanı: ${research.cost}
                </p>
                <button data-research="${research.id}" type="button"
                    ${completed ? "disabled" : ""}>
                    ${completed ? "TAMAMLANDI" : "ARAŞTIR"}
                </button>
            </article>
        `;
    }).join("");

    container.querySelectorAll("[data-research]").forEach((button) => {
        button.addEventListener("click", () => {
            completeResearch(button.dataset.research);
        });
    });
}

function completeResearch(id) {
    if (!game) return;

    const research = RESEARCHES.find((item) => item.id === id);
    if (!research) return;

    if (game.completedResearch.includes(id)) return;

    if (game.research < research.cost) {
        showToast("Yeterli araştırma puanın bulunmuyor. Eğitim yatırımı yapabilirsin.", "error");
        return;
    }

    game.research -= research.cost;
    game.completedResearch.push(id);

    const effect = research.effect;

    if (effect.production) game.production += effect.production;
    if (effect.money) game.money += effect.money;
    if (effect.research) game.research += effect.research;
    if (effect.stability) game.stability = clamp(game.stability + effect.stability, 0, 100);

    addGameLog(`${research.name} araştırması tamamlandı.`);
    renderGame();

    showToast(`${research.name} araştırması tamamlandı.`);
}

/* =========================================================
   21. SAVUNMA
   ========================================================= */

function renderMilitary() {
    if (!game) return;

    const summary = $("#military-summary");
    const actions = $("#military-actions");

    if (summary) {
        summary.innerHTML = `
            <div class="military-box">
                <span>Savunma kapasitesi</span>
                <strong>${game.defense}</strong>
            </div>
            <div class="military-box">
                <span>İstikrar</span>
                <strong>${Math.round(game.stability)}%</strong>
            </div>
            <div class="military-box">
                <span>Yıllık savunma seviyesi</span>
                <strong>${game.defense >= 80 ? "Güçlü" : game.defense >= 50 ? "Orta" : "Geliştirilmeli"}</strong>
            </div>
        `;
    }

    if (actions) {
        actions.innerHTML = `
            <button id="defense-investment" type="button">
                SAVUNMA YATIRIMI · 1200 ◈
            </button>
            <button id="public-service" type="button">
                KAMU HİZMETİ · 900 ◈
            </button>
        `;

        $("#defense-investment")?.addEventListener("click", () => {
            if (game.money < 1200) {
                showToast("Yeterli hazine yok.", "error");
                return;
            }

            if (game.defense >= 100) {
                showToast("Savunma kapasitesi en üst seviyede.", "error");
                return;
            }

            game.money -= 1200;
            game.defense = clamp(game.defense + 8, 0, 100);

            addGameLog("Ulusal savunma yatırımı gerçekleştirildi.");
            renderGame();

            showToast("Savunma kapasitesi artırıldı.");
        });

        $("#public-service")?.addEventListener("click", () => {
            if (game.money < 900) {
                showToast("Yeterli hazine yok.", "error");
                return;
            }

            game.money -= 900;
            game.stability = clamp(game.stability + 7, 0, 100);

            addGameLog("Kamu hizmetleri için ek kaynak ayrıldı.");
            renderGame();

            showToast("Toplumsal istikrar geliştirildi.");
        });
    }
}

/* =========================================================
   22. İSTATİSTİKLER
   ========================================================= */

function renderStatistics() {
    if (!game) return;

    const container = $("#statistics-content");
    if (!container) return;

    const data = [
        ["Hazine", formatNumber(game.money)],
        ["Nüfus", formatPopulation(game.population)],
        ["Üretim", formatNumber(game.production)],
        ["İstikrar", `${Math.round(game.stability)}%`],
        ["Savunma", `${game.defense}/100`],
        ["Araştırmalar", `${game.completedResearch.length}/${RESEARCHES.length}`],
        ["Bölge sayısı", game.regions.length],
        ["Yapı sayısı", Object.values(game.buildings).reduce((a, b) => a + b, 0)],
        ["Geçen oyun ayı", game.months]
    ];

    container.innerHTML = data.map(([label, value]) => `
        <div class="statistics-box">
            <span>${escapeHTML(label)}</span>
            <strong>${escapeHTML(value)}</strong>
        </div>
    `).join("");
}

/* =========================================================
   23. OYUN KAYIT SİSTEMİ
   ========================================================= */

function saveGame(silent = false) {
    if (!game) {
        if (!silent) showToast("Kaydedilecek aktif oyun bulunmuyor.", "error");
        return;
    }

    try {
        const payload = {
            game,
            gameSpeed,
            savedAt: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

        updateSavedGameInfo();

        if (!silent) {
            showToast("Oyun başarıyla kaydedildi.");
        }
    } catch (error) {
        console.error("Kayıt hatası:", error);
        if (!silent) showToast("Oyun kaydedilemedi. Tarayıcı depolamasını kontrol et.", "error");
    }
}

function loadGame() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            showToast("Kayıtlı oyun bulunamadı.", "error");
            return;
        }

        const payload = JSON.parse(raw);

        if (!payload.game || !SCENARIOS[payload.game.scenario]) {
            throw new Error("Kayıt verisi geçersiz.");
        }

        if (gameTimer) {
            clearInterval(gameTimer);
            gameTimer = null;
        }

        game = payload.game;
        gameSpeed = clamp(Number(payload.gameSpeed) || 1, 1, 3);
        gamePaused = false;
        game.paused = false;

        selectedScenario = game.scenario;
        selectedProvince = null;

        $("#game-menu").classList.add("hidden");
        $("#game-interface").classList.remove("hidden");

        renderGame();
        setGameTab("overview");

        $$(".game-speed-button").forEach((button) => {
            button.classList.toggle(
                "active",
                Number(button.dataset.speed) === gameSpeed
            );
        });

        $("#game-pause-button").textContent = "Ⅱ";

        startGameClock();
        showToast("Kayıtlı oyun yüklendi.");
    } catch (error) {
        console.error("Yükleme hatası:", error);
        showToast("Kayıtlı oyun yüklenemedi.", "error");
    }
}

function updateSavedGameInfo() {
    const container = $("#saved-game-info");
    const button = $("#load-game-button");

    if (!container || !button) return;

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        container.querySelector("span").textContent = "Henüz kayıtlı oyun bulunmuyor.";
        button.disabled = true;
        return;
    }

    try {
        const payload = JSON.parse(raw);
        const savedGame = payload.game;

        const date = new Date(payload.savedAt).toLocaleString("tr-TR");

        container.querySelector("span").textContent =
            `${savedGame.name} · ${savedGame.year} · ${date}`;

        button.disabled = false;
    } catch {
        container.querySelector("span").textContent = "Kayıt dosyası okunamadı.";
        button.disabled = true;
    }
}

function exitGame() {
    if (game) saveGame(true);

    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }

    gamePaused = true;

    $("#game-interface").classList.add("hidden");
    $("#game-menu").classList.remove("hidden");

    updateSavedGameInfo();
    showToast("Ana oyun menüsüne dönüldü.");
}

/* =========================================================
   24. AYARLAR
   ========================================================= */

function loadSettings() {
    try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) {
            settings = { ...settings, ...JSON.parse(stored) };
        }
    } catch (error) {
        console.warn("Ayarlar okunamadı:", error);
    }

    $("#setting-sound").checked = settings.sound;
    $("#setting-animations").checked = settings.animations;
    $("#setting-autosave").checked = settings.autosave;

    applySettings();
}

function saveSettings() {
    settings.sound = $("#setting-sound").checked;
    settings.animations = $("#setting-animations").checked;
    settings.autosave = $("#setting-autosave").checked;

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

    applySettings();
    showToast("Ayarlar kaydedildi.");
}

function applySettings() {
    document.body.classList.toggle(
        "no-animations",
        !settings.animations
    );
}

function bindSettings() {
    $("#settings-button")?.addEventListener("click", () => {
        showModal("settings-modal");
    });

    $("#close-settings-button")?.addEventListener("click", () => {
        saveSettings();
        closeModal("settings-modal");
    });

    ["setting-sound", "setting-animations", "setting-autosave"].forEach((id) => {
        document.getElementById(id)?.addEventListener("change", () => {
            settings.sound = $("#setting-sound").checked;
            settings.animations = $("#setting-animations").checked;
            settings.autosave = $("#setting-autosave").checked;

            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
            applySettings();
        });
    });
}

/* =========================================================
   25. MODAL KONTROLLERİ
   ========================================================= */

function bindModals() {
    $$("[data-close-modal]").forEach((element) => {
        element.addEventListener("click", () => {
            closeModal(element.dataset.closeModal);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            $$(".modal").forEach((modal) => modal.classList.add("hidden"));
        }
    });
}

/* =========================================================
   26. BİLDİRİM BUTONU
   ========================================================= */

function bindNotificationButton() {
    $("#game-notifications-button")?.addEventListener("click", () => {
        if (!game) return;

        const latest = game.eventLog[0];

        if (!latest) {
            showToast("Henüz yeni bir gelişme bulunmuyor.");
            return;
        }

        showToast(`${latest.year}: ${latest.message}`);
    });
}

/* =========================================================
   27. BAŞLANGIÇ EKRANI
   ========================================================= */

function initializeLoadingScreen() {
    const bar = $("#loading-progress-bar");
    const status = $("#loading-status");
    const screen = $("#loading-screen");
    const app = $("#app");

    if (!bar || !status || !screen || !app) {
        app?.classList.remove("hidden");
        return;
    }

    const steps = [
        ["Tarih verileri hazırlanıyor...", 25],
        ["Atlas bileşenleri yükleniyor...", 55],
        ["Oyun sistemleri hazırlanıyor...", 80],
        ["Uygulama başlatılıyor...", 100]
    ];

    let index = 0;

    function nextStep() {
        if (index >= steps.length) {
            setTimeout(() => {
                screen.style.opacity = "0";
                screen.style.visibility = "hidden";
                app.classList.remove("hidden");
            }, 250);
            return;
        }

        const [message, progress] = steps[index];

        status.textContent = message;
        bar.style.width = `${progress}%`;

        index++;
        setTimeout(nextStep, 180);
    }

    nextStep();
}

/* =========================================================
   28. UYGULAMAYI BAŞLAT
   ========================================================= */

function initializeApp() {
    bindNavigation();

    renderHome();

    populatePeriodFilter();
    renderPeriodList();
    renderMap();

    bindMapControls();

    bindStateControls();
    renderStates();

    bindScenarioControls();
    updateScenarioSelection();

    bindGameTabs();
    bindGameClockControls();

    bindSettings();
    bindModals();
    bindNotificationButton();

    loadSettings();
    updateSavedGameInfo();

    initializeLoadingScreen();

    console.log("Türk Tarihi Atlası başarıyla başlatıldı.");
}

document.addEventListener("DOMContentLoaded", initializeApp);

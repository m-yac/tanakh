
// ================================================================
// Torah and Haftarah data
// ================================================================

const torah = [
  ["Bereshit", "בְּרֵאשִׁית", "Genesis", 12, [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 54, 33, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26]],
  ["Shemot", "שְׁמוֹת", "Exodus", 11, [22, 25, 22, 31, 23, 30, 29, 28, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 23, 37, 30, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38]],
  ["Vayikra", "וַיִּקְרָא", "Leviticus", 10, [17, 16, 17, 35, 26, 23, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34]],
  ["B'midbar", "בְּמִדְבַּר", "Numbers", 10, [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 35, 28, 32, 22, 29, 35, 41, 30, 25, 19, 65, 23, 31, 39, 17, 54, 42, 56, 29, 34, 13]],
  ["Devarim", "דְּבָרִים", "Deuteronomy", 11, [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 31, 19, 29, 23, 22, 20, 22, 21, 20, 23, 29, 26, 22, 19, 19, 26, 69, 28, 20, 30, 52, 29, 12]]
];

const portions = [
  [
    ["Bereshit", "בְּרֵאשִׁית", "In the Beginning", [[1,1],[6,8]]],
    ["Noach", "נֹחַ", "Noah", [[6,9],[11,32]]],
    ["Lech-Lecha", "לֶךְ-לְךָ", "Go Forth", [[12,1],[17,27]]],
    ["Vayeira", "וַיֵּרָא", "And He Appeared", [[18,1],[22,24]]],
    ["Chayei Sarah", "חַיֵּי שָׂרָה", "The Life of Sarah", [[23,1],[25,18]]],
    ["Toledot", "תּוֹלְדֹת", "Generations", [[25,19],[28,9]]],
    ["Vayetze", "וַיֵּצֵא", "And He Went Out", [[28,10],[32,3]]],
    ["Vayishlach", "וַיִּשְׁלַח", "And He Sent Out", [[32,4],[36,43]]],
    ["Vayeshev", "וַיֵּשֶׁב", "And He Settled", [[37,1],[40,23]]],
    ["Miketz", "מִקֵּץ", "At the End", [[41,1],[44,17]]],
    ["Vayigash", "וַיִּגַּשׁ", "And He Approached", [[44,18],[47,27]]],
    ["Vayechi", "וַיְחִי", "And He Lived", [[47,28],[50,26]]]
  ],
  [
    ["Shemot", "שְׁמוֹת", "Names", [[1,1],[6,1]]],
    ["Va'eira", "וָאֵרָא", "And I Appeared", [[6,2],[9,35]]],
    ["Bo", "בֹּא", "Come", [[10,1],[13,16]]],
    ["Beshalach", "בְּשַׁלַּח", "When He Sent Out", [[13,17],[17,16]]],
    ["Yitro", "יִתְרוֹ", "Jethro", [[18,1],[20,22]]],
    ["Mishpatim", "מִּשְׁפָּטִים", "Laws", [[21,1],[24,18]]],
    ["Terumah", "תְּרוּמָה", "Donation", [[25,1],[27,19]]],
    ["Tetzaveh", "תְּצַוֶּה", "You Shall Command", [[27,20],[30,10]]],
    ["Ki Tisa", "כִּי תִשָּׂא", "When You Count", [[30,11],[34,35]]],
    ["Vayakhel", "וַיַּקְהֵל", "And He Assembled", [[35,1],[38,20]], "On non-leap years this portion is combined with the next, except when " + wikiLink("Rosh Hashana") + " falls on Thursday and " + wikiLink("Pesach") + " on Sunday."],
    ["Pekudei", "פְקוּדֵי", "Accountings", [[38,21],[40,38]]]
  ],
  [
    ["Vayikra", "וַיִּקְרָא", "And He Called", [[1,1],[5,26]]],
    ["Tzav", "צַו", "Command", [[6,1],[8,36]]],
    ["Shemini", "שְּׁמִינִי", "Eighth", [[9,1],[11,47]]],
    ["Tazria", "תַזְרִיעַ", "She Bears Seed", [[12,1],[13,59]], "On non-leap years this portion is combined with the next."],
    ["Metzora", "מְּצֹרָע", "Leprous", [[14,1],[15,33]]],
    ["Acharei Mot", "אַחֲרֵי מוֹת", "After the Death", [[16,1],[18,30]], "On non-leap years this portion is combined with the next."],
    ["Kedoshim", "קְדֹשִׁים", "Holy Ones", [[19,1],[20,27]]],
    ["Emor", "אֱמֹר", "Speak", [[21,1],[24,23]]],
    ["Behar", "בְּהַר", "On the Mount", [[25,1],[26,2]], "On non-leap years this portion is combined with the next."],
    ["Bechukotai", "בְּחֻקֹּתַי", "In My Statutes", [[26,3],[27,34]]]
  ],
  [
    ["B'midbar", "בְּמִדְבַּר", "In the Wilderness", [[1,1],[4,20]]],
    ["Naso", "נָשֹׂא", "Count", [[4,21],[7,89]]],
    ["Behaalotecha", "בְּהַעֲלֹתְךָ", "When You Raise", [[8,1],[12,16]]],
    ["Shlach", "שְׁלַח-לְךָ", "Send Out", [[13,1],[15,41]]],
    ["Korach", "קֹרַח", "Korach", [[16,1],[18,32]]],
    ["Chukat", "חֻקַּת", "Statute", [[19,1],[22,1]], "Outside of Israel, on years where the second day of " + wikiLink("Shavout") + " falls on " + wikiLink("Shabbat") + ", this portion is combined with the next."],
    ["Balak", "בָּלָק", "Balak", [[22,2],[25,9]]],
    ["Pinchas", "פִּינְחָס", "Phineas", [[25,10],[30,1]]],
    ["Matot", "מַּטּוֹת", "Tribes", [[30,2],[32,42]], "This portion is combined with the next except on leap years where either the leap month has five " + wikiLink("<i>Shabbat</i>s", undefined, "Shabbat", true) + " or outside of Israel where the eighth day of " + wikiLink("Pesach") + " falls on " + wikiLink("Shabbat") + "."],
    ["Masei", "מַסְעֵי", "Journeys", [[33,1],[36,13]]]
  ],
  [
    ["Devarim", "דְּבָרִים", "Words", [[1,1],[3,22]]],
    ["Va'etchanan", "וָאֶתְחַנַּן", "And I Pleaded", [[3,23],[7,11]]],
    ["Eikev", "עֵקֶב", "As a Consequence", [[7,12],[11,25]]],
    ["Re'eh", "רְאֵה", "See", [[11,26],[16,17]]],
    ["Shoftim", "שֹׁפְטִים", "Judges", [[16,18],[21,9]]],
    ["Ki Teitzei", "כִּי-תֵצֵא", "When You Go Out", [[21,10],[25,19]]],
    ["Ki Tavo", "כִּי-תָבוֹא", "When You Come In", [[26,1],[29,8]]],
    ["Nitzavim", "נִצָּבִים", "Standing", [[29,9],[30,20]], "This portion is combined with the next except on years where there are two " + wikiLink("<i>Shabbat</i>s", undefined, "Shabbat", true) + " between " + wikiLink("Rosh Hashana") + " and " + wikiLink("Sukkot") + "."],
    ["Vayelech", "וַיֵּלֶךְ", "And He Went", [[31,1],[31,30]]],
    ["Haazinu", "הַאֲזִינוּ", "Listen", [[32,1],[32,52]]],
    ["V'Zot HaBerachah", "וְזֹאת הַבְּרָכָה", "And This Is the Blessing", [[33,1],[34,12]], "This portion is skipped since its contents are always read on " + wikiLink("Simchat Torah") + "."]
  ]
];

const neviim = [
  ["Joshua", [["Joshua", [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33]]]],
  ["Judges", [["Judges", [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25]]]],
  ["Samuel", [["I Samuel", [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 16, 23, 28, 23, 43, 25, 12, 25, 11, 31, 13]],
              ["II Samuel", [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 32, 44, 26, 22, 51, 39, 25]]]],
  ["Kings", [["I Kings", [53, 46, 28, 20, 32, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 54]],
             ["II Kings", [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 20, 22, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30]]]],
  ["Isaiah", [["Isaiah", [31, 22, 26, 6, 30, 13, 25, 23, 20, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 11, 25, 24]]]],
  ["Jeremiah", [["Jeremiah", [19, 37, 25, 31, 31, 30, 34, 23, 25, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34]]]],
  ["Ezekiel", [["Ezekiel", [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35]]]],
  ["The Twelve Prophets", [["Hosea", [9, 25, 5, 19, 15, 11, 16, 14, 17, 15, 11, 15, 15, 10]],
                       ["Joel", [20, 27, 5, 21]],
                       ["Amos", [15, 16, 15, 13, 27, 14, 17, 14, 15]],
                       ["Obadiah", [21]],
                       ["Jonah", [16, 11, 10, 11]],
                       ["Micah", [16, 13, 12, 14, 14, 16, 20]],
                       ["Nahum", [14, 14, 19]],
                       ["Habakkuk", [17, 20, 19]],
                       ["Zephaniah", [18, 15, 20]],
                       ["Haggai", [15, 23]],
                       ["Zechariah", [17, 17, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21]],
                       ["Malachi", [14, 17, 24]]]]
];

const haftarotByPortion = [
  [
    ["Isaiah", [[[42,5],[43,10]]]],
    ["Isaiah", [[[54,1],[55,5]]]],
    ["Isaiah", [[[40,27],[41,16]]]],
    ["II Kings", [[[4,1],[4,37]]]],
    ["I Kings", [[[1,1],[1,31]]]],
    ["Malachi", [[[1,1],[2,7]]]],
    ["Hosea", [[[12,13],[14,10]]]],
    ["Hosea", [[[11,7],[12,12]]]],
    ["Amos", [[[2,6],[3,8]]]],
    ["I Kings", [[[3,15],[4,1]]]],
    ["Ezekiel", [[[37,15],[37,28]]]],
    ["I Kings", [[[2,1],[2,12]]]]
  ],
  [
    ["Isaiah", [[[27,6],[28,13]], [[29,22],[29,23]]]],
    ["Ezekiel", [[[28,25],[29,21]]]],
    ["Jeremiah", [[[46,13],[46,28]]]],
    ["Judges", [[[4,4],[5,31]]]],
    ["Isaiah", [[[6,1],[7,6]], [[9,5],[9,6]]]],
    ["Jeremiah", [[[34,8],[34,22]], [[33,25],[33,26]]]],
    ["I Kings", [[[5,26],[6,13]]]],
    ["Ezekiel", [[[43,10],[43,27]]]],
    ["I Kings", [[[18,1],[18,39]]]],
    ["I Kings", [[[7,40],[7,50]]]],
    ["I Kings", [[[7,51],[8,21]]]]
  ],
  [
    ["Isaiah", [[[43,21],[44,23]]]],
    ["Jeremiah", [[[7,21],[8,3]], [[9,22],[9,23]]]],
    ["II Samuel", [[[6,1],[7,17]]]],
    ["II Kings", [[[4,42],[5,19]]]],
    ["II Kings", [[[7,3],[7,20]]]],
    ["Amos", [[[9,7],[9,15]]]],
    ["Ezekiel", [[[22,1],[22,19]]]],
    ["Ezekiel", [[[44,15],[44,31]]]],
    ["Jeremiah", [[[32,6],[32,27]]]],
    ["Jeremiah", [[[16,19],[17,14]]]]
  ],
  [
    ["Hosea", [[[2,1],[2,22]]]],
    ["Judges", [[[13,2],[13,25]]]],
    ["Zechariah", [[[2,14],[4,7]]]],
    ["Joshua", [[[2,1],[2,24]]]],
    ["I Samuel", [[[11,14],[12,22]]]],
    ["Judges", [[[11,1],[11,33]]]],
    ["Micah", [[[5,6],[6,8]]]],
    ["I Kings", [[[18,46],[19,21]]]],
    ["Jeremiah", [[[1,1],[2,3]]]],
    ["Jeremiah", [[[2,4],[2,28]], [[3,4],[3,4]]]]
  ],
  [
    ["Isaiah", [[[1,1],[1,27]]]],
    ["Isaiah", [[[40,1],[40,26]]]],
    ["Isaiah", [[[49,14],[51,3]]]],
    ["Isaiah", [[[54,11],[55,5]]]],
    ["Isaiah", [[[51,12],[52,12]]]],
    ["Isaiah", [[[54,1],[54,10]]]],
    ["Isaiah", [[[60,1],[60,22]]]],
    ["Isaiah", [[[61,10],[63,9]]]],
    ["Isaiah", [[[55,6],[56,8]]]],
    ["II Samuel", [[[22,1],[22,51]]]],
    ["Joshua", [[[1,1],[1,18]]]]
  ]
];

const haftarotByBook =
  (function () {
    let hs = {};
    for (let b = 0; b < torah.length; b++) {
      for (let p = 0; p < torah[b][3]; p++) {
        const [nm, vss] = haftarotByPortion[b][p];
        const tvss = vss.map(vs => [[b,p], vs]);
        hs[nm] = nm in hs ? hs[nm].concat(tvss) : tvss;
      }
    }
    for (const nm in hs) {
      hs[nm].sort((a,b) => a[1][0][0] == b[1][0][0] ? a[1][0][1] - b[1][0][1] : a[1][0][0] - b[1][0][0]);
    }
    return neviim.map(([_,sbs]) => sbs.map(([nm,_]) => nm in hs ? hs[nm] : []));
  })();

const ketuvim = [
  ["Psalms", [["Psalms", [6, 12, 9, 9, 13, 11, 18, 10, 21, 18, 7, 9, 6, 7, 5, 11, 15, 51, 15, 10, 14, 32, 6, 10, 22, 11, 14, 9, 11, 13, 25, 11, 22, 23, 28, 13, 40, 23, 14, 18, 14, 12, 5, 27, 18, 12, 10, 15, 21, 23, 21, 11, 7, 9, 24, 14, 12, 12, 18, 14, 9, 13, 12, 11, 14, 20, 8, 36, 37, 6, 24, 20, 28, 23, 11, 13, 21, 72, 13, 20, 17, 8, 19, 13, 14, 17, 7, 19, 53, 17, 16, 16, 5, 23, 11, 13, 12, 9, 9, 5, 8, 29, 22, 35, 45, 48, 43, 14, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 14, 10, 8, 12, 15, 21, 10, 20, 14, 9, 6]]]],
  ["Proverbs", [["Proverbs", [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31]]]],
  ["Job", [["Job", [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 21, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 32, 26, 17]]]],
  ["Song of Songs", [["Song of Songs", [17, 17, 11, 16, 16, 12, 14, 14]]]],
  ["Ruth", [["Ruth", [22, 23, 18, 22]]]],
  ["Lamentations", [["Lamentations", [22, 22, 66, 22, 22]]]],
  ["Ecclesiastes", [["Ecclesiastes", [18, 26, 22, 17, 19, 12, 29, 17, 18, 20, 10, 14]]]],
  ["Esther", [["Esther", [22, 23, 15, 17, 14, 14, 10, 17, 32, 3, 17, 8, 30, 16, 24, 10]]]],
  ["Daniel", [["Daniel", [21, 49, 100, 34, 30, 29, 28, 27, 27, 21, 45, 13, 64, 42]]]],
  ["Ezra-Nehemiah", [["Ezra", [11, 70, 13, 24, 17, 22, 28, 36, 15, 44]],
                     ["Nehemiah", [11, 20, 38, 17, 19, 19, 72, 18, 37, 40, 36, 47, 31]]]],
  ["Chronicles", [["I Chronicles", [54, 55, 24, 43, 41, 66, 40, 40, 44, 14, 47, 41, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30]],
                  ["II Chronicles", [18, 17, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 23, 14, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 26, 23]]]]
];

const prayers = {
  "Ma Tovu":
    [["",
      [["Numbers",      [[[24,5]]]],
       ["Psalms",       [[[5,8]],
                         [[26,8]],
                         [[95,6]],
                         [[69,14]]]]]]],
  "Kabbalat Shabbat":
    [["",
      [["Psalms",       [[95, 99],
                         [29],
                         [92, 93]]]]]],
  "Shema":
    [["Shema Yisrael",
      [["Deuteronomy",  [[[6,4]]]]]],
     ["V'ahavta",
      [["Deuteronomy",  [[[6,5], [6,9]]]]]],
     ["",
      [["Deuteronomy",  [[[11,13], [11,21]]]]]],
     ["",
      [["Numbers",      [[[15,37], [15,41]]]]]]],
  "Veshamru":
    [["",
      [["Exodus",       [[[31,16], [31,17]]]]]]],
  "Proclaiming the Festivals":
    [["",
      [["Leviticus",    [[[23,44]]]]]]],
  "Vay'chulu":
    [["",
      [["Genesis",      [[[2,1], [2,3]]]]]]],
  // https://opensiddur.org/prayers/solilunar/everyday/daytime/psukei-dzimrah/yehi-khvod-interpretive-translation-by-zalman-schachter-shalomi/
  "Yehi Kevod":
    [["",
      [["Psalms",       [[[104,31]],
                         [[113,2], [113,4]],
                         [[135,13]],
                         [[103,19]]]],
       ["I Chronicles", [[[16,31]]]],
       ["Psalms",       [[[10,16]],
                         [[92,1]]]],
       ["Exodus",       [[[15,18]]]],
       ["Psalms",       [[[33,9], [33,11]]]],
       ["Proverbs",     [[[19,21]]]],
       ["Psalms",       [[[132,13]],
                         [[135,4]],
                         [[94,14]],
                         [[78,38]],
                         [[20,10]]]]]]],
  "Psalms for Pesukei Dezimra":
    [["",
      [["Psalms",        [[30]]]]],
     ["On Shabbat and certain festivals",
      [["Psalms",       [[19], [34], [90], [91], [135], [136], [33], [92], [93]]]]],
     ["Not on Shabbat and certain festivals",
      [["Psalms",        [[100]]]]]],
  "Ashrei":
    [["",
      [["Psalms",       [[[84,5]],
                         [[144,15]],
                         [145],
                         [[115,18]]]]]]],
  "Hallel of Pesukei Dezimra":
    [["",
      [["Psalms",       [[146, 150]]]]]],
  "Verses for Pesukei Dezimra":
    [["",
      [["I Chronicles", [[[16,8], [16,36]]]]]],
     ["",
      [["Psalms",       [[[89,53]],
                         [[135,21]],
                         [[72,18], [72,19]]]]]],
     ["",
      [["I Chronicles", [[[29,10], [29,13]]]]]],
     ["",
      [["Nehemiah",     [[[9,6], [9,11]]]]]]],
  "Mi Chamocha":
    [["",
      [["Exodus",       [[[15,1], [15,18]]]]]]],
  "Kedushah":
    [["",
      [["Isaiah",       [[[6,3]]]]]],
     ["",
      [["Ezekiel",      [[[3,12]]]]]],
     ["",
      [["Psalms",       [[[146,10]]]]]]],
  "Returning the Torah to the Ark":
    [["",
      [["Proverbs",     [[[3,17]]]]]]],
  // https://brill.com/view/book/edcoll/9789004420465/BP000016.xml
  "Returning the Torah to the Ark (additional verses)":
    [["",
      [["Numbers",      [[[10,36]]]]]],
     ["",
      [["Psalms",       [[[132,8], [132, 10]]]]]],
     ["",
      [["Proverbs",     [[[4,2]], [[3,18]]]]]],
     ["",
      [["Lamentations", [[[5,21]]]]]]],
  "Putting on a Tallit":
    [["",
      [["Psalms",       [[[36,8], [36,11]]]]]]],
  // https://www.chabad.org/library/article_cdo/aid/4858924/jewish/Shofar-Blowing-Blessings-and-Instructions.htm
  "Shofar service":
    [["",
      [["Psalms",       [[47]]]]],
     ["",
      [["Psalms",       [[[98,6]]]],
       ["Numbers",      [[[29,1]]]],
       ["Psalms",       [[[81,4], [81,5]]]]]],
     ["",
      [["Psalms",       [[[118,5]], [[119,149]], [[119,160]], [[119,122]],
                         [[119,162]], [[119,66]], [[119,108]], [[47,6]]]]]],
     ["",
      [["Psalms",       [[[89,16], [89,18]]]]]]]
};

// Numbers 15:38 - Putting on a Tallit? (p. 143)
// Numbers 6:24-26 - ? (p. 153)
// Psalm 27 (or 130?) - Psalm for Rosh Chodesh Elul through Shemini Atzeret (penitential season?)
// 121 122 - Pesukei dezimra?
// Psalm 29 - Shabbat (p. 342)
// Psalm 24 - festivals following a weekday (p. 344)

// Rosh Hashana evening services
// Psalms 81:4-5 - To Proclaim This Day (p. 33)
// Psalm 27 - ? (p. 27)
// Rosh Hashana morning services
// Psalms 104:1-2 - Putting on a Tallit? (p. 81)
// Psalm 27 - ? (p. 95)
// Exodus 15:18; Numbers 23:21; Deut. 33:5; Psalms 22:29, 93:1, 24:7-10; Isaiah 44:6; Obadiah 1:21; Zechariah 14:9; Deut. 6:4 - Malchuyot (p. 272)
// Genesis 8:1; Exodus 2:24; Lev. 26:42; Psalms 111:4-5, 106:45; Jeremiah 2:2; Ezekiel 16:60; Jeremiah 31:20 - Zochronot (p. 274)
// Exodus 19:16, 19:19, 20:15; Psalms 47:6, 98:6, 81:4-5, 150; Isaiah 18:3, 27:13; Zechariah 9:14-15 - Shofarot (p. 275)
// Kol Nidre
// Psalms 81:4-5 - To Proclaim This Day (p. 421)
// ? - (p. 449)
// Exodus 34:6-7 - Thirteen Attributes (p. 455)

// Still have to do: Tashlich, Avodah service

const services = {
  "Evening":
    ["Ma Tovu",
     "Shema",
     "Veshamru"],
  "Shabbat evening":
    ["Kabbalat Shabbat",
     "Vay'chulu"],
  "Morning":
    ["Ma Tovu",
     "Putting on a Tallit",
     "Psalms for Pesukei Dezimra",
     "Yehi Kevod",
     "Ashrei",
     "Hallel of Pesukei Dezimra",
     "Verses for Pesukei Dezimra",
     "Mi Chamocha",
     "Shema",
     "Kedushah",
     "Returning the Torah to the Ark",
     "Returning the Torah to the Ark (additional verses)"],
  "Rosh Hashana morning":
    ["Shofar service"]
};
const importantPrayers = [
  "Ma Tovu", "Ashrei", "Mi Chamocha", "Shema",
  "Kedushah", "Returning the Torah to the Ark",
  "Veshamru"
];

const shirShelYom = {
  "Sunday":    [[24]],
  "Monday":    [[48]],
  "Tuesday":   [[82]],
  "Wednesday": [[94], [[95,1], [95,3]]],
  "Thursday":  [[81]],
  "Friday":    [[93]],
  "Saturday":  [[92]],
};

const fullHallel = [[113, 118]];
const partialHallel = [[113, 114], [[115,12], [115,18]], [[116,12], [116,19]], [117, 118]];

const hallelHolidays = {
  // first two days of Pesach
  "Pesach I": true,
  "Pesach II": true,
  // remaining days of Pesach
  "Pesach Chol ha-Moed Day 1": false,
  "Pesach Chol ha-Moed Day 2": false,
  "Pesach Chol ha-Moed Day 3": false,
  "Pesach Chol ha-Moed Day 4": false,
  "Pesach Shabbat Chol ha-Moed": false,
  "Pesach VII": false,
  "Pesach VIII": false,
  // Shavout
  "Shavuot I": true,
  "Shavuot II": true,
  // Sukkot
  "Sukkot I": true,
  "Sukkot II": true,
  "Sukkot Chol ha-Moed Day 1": true,
  "Sukkot Chol ha-Moed Day 2": true,
  "Sukkot Chol ha-Moed Day 3": true,
  "Sukkot Chol ha-Moed Day 4": true,
  "Sukkot Shabbat Chol ha-Moed": true,
  "Sukkot Final Day (Hoshana Raba)": true,
  // Shmini Atzeret
  "Shmini Atzeret": true,
  // Simchat Torah
  "Simchat Torah": true,
  // Chanukah
  "Shabbat Chanukah": true,
  "Shabbat Chanukah II": true,
  "Shabbat Rosh Chodesh Chanukah": true,
  "Chanukah Day 1": true,
  "Chanukah Day 2": true,
  "Chanukah Day 3": true,
  "Chanukah Day 4": true,
  "Chanukah Day 5": true,
  "Chanukah Day 6": true,
  "Chanukah Day 7": true,
  "Chanukah Day 7 (on Rosh Chodesh)": true,
  "Chanukah Day 8": true,
  // Rosh Chodesh
  "Rosh Chodesh": false,
  "Shabbat Rosh Chodesh": false
};
const fullHallelHolidaysSummary = [
  wikiLink("Shavout"),
  wikiLink("Sukkot"),
  wikiLink("Shmini Atzeret"),
  wikiLink("Simchat Torah"),
  wikiLink("Chanukah"),
  "First two days of " + wikiLink("Pesach")
];
const partialHallelHolidaysSummary = [
  wikiLink("Rosh Chodesh"),
  "Last six days of " + wikiLink("Pesach")
];

const yizkor = [[23]];

const yizkorHolidays = {
  "Yom Kippur": true,
  "Shmini Atzeret": true,
  "Pesach VIII": true,
  "Shavuot II": true
};

const megillot = [
  [[3,0], "Pesach Shabbat Chol ha-Moed"],
  [[4,0], "Shavuot II"],
  [[5,0], "Tish'a B'Av"],
  [[6,0], "Sukkot Shabbat Chol ha-Moed"],
  [[7,0], "Purim"]
];


// ================================================================
// Formatting
// ================================================================

function fmtVerses(vs) {
  if (vs.length == 1 && typeof vs[0] == 'number') {
    return vs[0]+"";
  }
  if (vs.length == 2 && typeof vs[0] == 'number' && typeof vs[1] == 'number') {
    return vs[0] == vs[1] ? vs[0]+"" : vs[0] + "-" + vs[1];
  }
  if (vs.length == 1 || (vs.length == 2 && vs[0][0] == vs[1][0] && vs[0][1] == vs[1][1])) {
    return vs[0][0] + ":" + vs[0][1];
  }
  if (vs.length == 2 && vs[0][0] == vs[1][0]) {
    return vs[0][0] + ":" + vs[0][1] + "-" + vs[1][1];
  }
  if (vs.length == 2) {
    return vs[0][0] + ":" + vs[0][1] + "-" + vs[1][0] + ":" + vs[1][1];
  }
  throw new Error("Improperly formatted verses: " + vs)
}

function fmtMultiVerses(vss) {
  return vss.map(fmtVerses).join("; ");
}

function fmtNameAndMultiVerses([nm, vss]) {
  if (nm == "Psalms" && vss.length == 1 && vss[0].length == 1) {
    return "Psalm " + fmtMultiVerses(vss);
  }
  return nm + " " + fmtMultiVerses(vss);
}

function fmtTlHeTr(tl, he, tr) {
  return he + " / " + tl + " / " + tr;
}


// ================================================================
// Printing out portions and haftarot
// ================================================================

function printPortions() {
  for (let b = 0; b < torah.length; b++) {
    const [b_tl, b_he, b_tr, ps, chs] = torah[b];
    console.log(fmtTlHeTr(b_tl, b_he, b_tr) + " (" + chs.length + " ch)");
    for (let p = 0; p < ps; p++) {
      const [tl, he, tr, vs] = portions[b][p];
      console.log(" - " + fmtVerses(vs) + " - " + fmtTlHeTr(tl, he, tr));
    }
  }
}

function printHaftarotByPortion() {
  for (let b = 0; b < torah.length; b++) {
    const [b_tl, b_he, b_tr, ps] = torah[b];
    console.log(fmtTlHeTr(b_tl, b_he, b_tr));
    for (let p = 0; p < ps; p++) {
      console.log(" - " + fmtNameAndMultiVerses(haftarotByPortion[b][p]));
    }
  }
}

function printHaftarotByBook() {
  for (let b = 0; b < neviim.length; b++) {
    const chstr1 = neviim[b][1].length == 1 ? " (" + neviim[b][1][0][1].length + " ch)" : "";
    console.log(neviim[b][0] + chstr1);
    for (let sb = 0; sb < neviim[b][1].length; sb++) {
      const [nm, chs] = neviim[b][1][sb];
      const sbstr = neviim[b][1].length > 1 ? nm + " " : "";
      const chstr = neviim[b][1].length > 1 ? "(" + chs.length + " ch) " : "";
      const vsstr = haftarotByBook[b][sb].length > 0
                      ? haftarotByBook[b][sb].map(([[tb,tp],vs]) => fmtVerses(vs) + " (" + portions[tb][tp][0] + ")").join(", ")
                      : "X";
      console.log(" - " + sbstr + chstr + vsstr);
    }
  }
}

function printPrayers() {
  for (const k in prayers) {
    console.log(k + ":");
    for (const [s, nmvss] of prayers[k]) {
      const str = nmvss.map(fmtNameAndMultiVerses).join("; ");
      console.log(" - " + (s === "" ? "" : s + ": ") + str);
    }
  }
}


// ================================================================
// Utility functions for the web
// ================================================================

const ibm_clrs = [[255, 213, 51],
                  [255, 176, 0],
                  [254, 97, 0],
                  [220, 38, 127],
                  [120, 94, 240],
                  [100, 143, 255]];


function portionColor2(bk, pn) {
  let p = (torah.slice(0,bk).map(x => x[3]).reduce(((x,y) => x + y), 0) + pn) / 54;
  return portionColor(p);
}

function portionColor(p) {
  const i = Math.floor(3*p);
  const t = 3*p - i;
  return "rgb(" + ibm_clrs[i].map((e,k) => e*(1-t) + ibm_clrs[i+1][k]*t).join(", ") + ")";

  // const clrss = [[220, 38, 127], [255, 176, 0]];
  // let [r,g,b] = clrss[0].map((e,i) => e*p + clrss[1][i]*(1-p));
  // return "rgb(" + r + ", " + g + ", " + b + ")";

  // p -= 0.125;
  // if (p < 0) { p += 1; }
  // const clrs = [[240, 0.67, 1.00],
  //               [120, 0.72, 0.78],
  //               [50, 0.85, 0.86],
  //               [0, 0.80, 0.94]];
  // const i = Math.floor(4*p);
  // const j = (i+1) % 4;
  // const t = 4*p - i;
  // let [h,s,v] = clrs[i].map((e,k) => e*(1-t) + clrs[j][k]*t);
  // if (i == 3) {
  //   function f(t) {
  //     const t1 = (t - 0.5)/4;
  //     return Math.sign(t1) * Math.pow(Math.abs(t1), 1/3) + 0.5;
  //   }
  //   function g(t,s) {
  //     return (f(t + s) - f(s))/(f(1 + s) - f(s));
  //   }
  //   function f1(t, s) {
  //     return t < 0.5 ? s*t : s*t + (1-s);
  //   }
  //   const s = g(t, 0.05);
  //   h = 360*(1-s) + clrs[j][0]*s;
  // }
  // let l = v - (v * s) / 2;
  // let m = Math.min(l, 1-l);
  // let sl = m ? (v-l)/m : 0;
  // if (i == 3) {
  //   const s = 0.25;
  //   sl *= (1-s) * Math.abs(2*t-1) + s;
  // }
  // return "hsl(" + h + ", " + (sl*100) + "%, " + (l*100) + "%)";

  // const clrs = [[47.28, 51.49, -84.59],
  //               [70.81, -63.88, 57.69],
  //               [75.87, -1.14, 72.74],
  //               [52.77, 70.28, 47.72]];
  // const i = Math.floor(4*p);
  // const j = (i + 1) % 4
  // const t = 4*p - i;
  // const clr = clrs[i].map((e,i) => e*(1-t) + clrs[j][i]*t);
  // return "rgb(" + lab2rgb(clr).join(",") + ")";

  // const [c, t] = [60, (p + 0.5) * 2 * Math.PI];
  // const [a, b] = [c * Math.sin(t), c * Math.cos(t)];
  // return "rgb(" + lab2rgb([65, a, b]).join(",") + ")"
}

function expandVerses(vs, vs_arr) {
  if (vs.length == 1) {
    if (typeof vs[0] == 'number') {
      return [[vs[0], 1], [vs[0], vs_arr[vs[0]-1]]];
    }
    return [vs[0], vs[0]];
  }
  if (vs.length == 2) {
    if (typeof vs[0] == 'number' && typeof vs[1] == 'number') {
      return [[vs[0], 1], [vs[1], vs_arr[vs[1]-1]]];
    }
    return vs;
  }
  throw new Error("Improperly formatted verses: " + vs)
}

function parseVerse(s) {
  return s.split(':').map(n => +n);
}

function parseVerses(s) {
  return s.split('-').map(parseVerse);
}

function addPortionToCh(arr, vs_arr, vs, s1, s2, s3) {
  const [[c1,v1],[c2,v2]] = vs;
  for (let c = c1; c <= c2; c++) {
    const tot_vs = vs_arr[c-1];
    const vs = [c == c1 ? v1 : 1, c == c2 ? v2 : tot_vs];
    arr[c-1].push([s1, s2, s3, vs]);
  }
}

function wikiLink(s, p, exact, noItalics) {
  const pg = exact ? exact : encodeURIComponent(s);
  const tx = (noItalics ? s : "<i>" + s + "</i>") + (p ? " (" + p + ")" : "");
  return $("<a>").attr("href", "https://en.wikipedia.org/wiki/" + pg)
                 .html(tx).attr("target", "_blank").prop("outerHTML");
}

const pesachLink = wikiLink("Pesach", "Passover");
const tishaBAvLink = wikiLink("Tish'a B'Av", "Day of fasting for the 9th of <i>Av</i>");
const roshHashanaLink = wikiLink("Rosh Hashana", "Jewish New Year");
const yomKippurLink = wikiLink("Yom Kippur", "Day of Atonement");
const simchatTorahLink = wikiLink("Simchat Torah" ,"Celebration of the <i>Torah</i>");
const roshChodeshLink = wikiLink("Rosh Chodesh", "Festival of the New Moon");
const arkLink = wikiLink("Ark", undefined, "Torah_ark", true);

const holidayKeyMap = {
  "Pesach I": "First day of " + pesachLink,
  "Pesach II": "Second day of " + pesachLink,
  "Pesach Chol ha-Moed Day 1": "Third day of " + pesachLink,
  "Pesach Chol ha-Moed Day 2": "Fourth day of " + pesachLink,
  "Pesach Chol ha-Moed Day 3": "Fifth day of " + pesachLink,
  "Pesach Chol ha-Moed Day 4": "Sixth day of " + pesachLink,
  "Pesach Shabbat Chol ha-Moed": "<i>Shabbat</i> of " + pesachLink,
  "Pesach VII": "Seventh day of " + pesachLink,
  "Pesach VIII": "Eighth day of " + pesachLink,
  "Shavuot I": "First day of " + wikiLink("Shavuot"),
  "Shavuot II": "Second day of " + wikiLink("Shavuot"),
  "Asara B'Tevet": wikiLink("Asara B'Tevet", "Minor fast for the 10th of <i>Tevet</i>", "Tenth_of_Tevet"),
  "Ta'anit Bechorot": wikiLink("Ta'anit Bechorot", "Minor fast for firstborn children the day before <i>Pesach</i> (Passover)", "Fast_of_the_Firstborn"),
  "Ta'anit Esther": wikiLink("Ta'anit Esther", "Minor fast for <i>Purim</i>", "Fast_of_Esther"),
  "Tzom Gedaliah": wikiLink("Tzom Gedaliah", "Minor fast for the assassination of <i>Gedaliah</i>", "Fast_of_Gedalia"),
  "Tzom Tammuz": wikiLink("Tzom Tammuz", "Minor fast for the 17th of <i>Tammuz</i>", "Seventeenth_of_Tammuz"),
  "Tish'a B'Av": tishaBAvLink,
  "Rosh Hashana I": "First day of " + roshHashanaLink,
  "Rosh Hashana II": "Second day of " + roshHashanaLink,
  "Yom Kippur": "Morning of " + yomKippurLink,
  "Yom Kippur (Mincha, Traditional)": "Evening of " + yomKippurLink,
  "Sukkot I": "First day of " + wikiLink("Sukkot"),
  "Sukkot II": "Second day of " + wikiLink("Sukkot"),
  "Sukkot Chol ha-Moed Day 1": "Third day of " + wikiLink("Sukkot"),
  "Sukkot Chol ha-Moed Day 2": "Fourth day of " + wikiLink("Sukkot"),
  "Sukkot Chol ha-Moed Day 3": "Fifth day of " + wikiLink("Sukkot"),
  "Sukkot Chol ha-Moed Day 4": "Sixth day of " + wikiLink("Sukkot"),
  // "Sukkot Chol ha-Moed Day 5": "Seventh day of " + wikiLink("Sukkot"),
  "Sukkot Shabbat Chol ha-Moed": wikiLink("Shabbat") + " of " + wikiLink("Sukkot"),
  "Sukkot Final Day (Hoshana Raba)": wikiLink("Hoshana Raba") + " (seventh day of " + wikiLink("Sukkot") + ")",
  "Shmini Atzeret": wikiLink("Shmini Atzeret"),
  "Erev Simchat Torah": "Evening before " + simchatTorahLink,
  "Simchat Torah": simchatTorahLink ,
  "Shabbat Chanukah": "First " + wikiLink("Shabbat") + " of " + wikiLink("Chanukah"),
  "Shabbat Chanukah II": "Second " + wikiLink("Shabbat") + " of " + wikiLink("Chanukah"),
  "Shabbat Rosh Chodesh Chanukah": wikiLink("Chanukah") + " on " + wikiLink("Shabbat") + " and " + wikiLink("Rosh Chodesh"),
  "Chanukah Day 1": "First day of " + wikiLink("Chanukah"),
  "Chanukah Day 2": "Second day of " + wikiLink("Chanukah"),
  "Chanukah Day 3": "Third day of " + wikiLink("Chanukah"),
  "Chanukah Day 4": "Fourth day of " + wikiLink("Chanukah"),
  "Chanukah Day 5": "Fifth day of " + wikiLink("Chanukah"),
  "Chanukah Day 6": "Sixth day of " + wikiLink("Chanukah"),
  "Chanukah Day 7": "Seventh day of " + wikiLink("Chanukah"),
  "Chanukah Day 7 (on Rosh Chodesh)": "Seventh day of " + wikiLink("Chanukah") + " on " + wikiLink("Rosh Chodesh"),
  "Chanukah Day 8": "Eighth day of " + wikiLink("Chanukah"),
  "Purim": wikiLink("Purim"),
  "Shabbat HaChodesh": wikiLink("Shabbat HaChodesh"),
  "Shabbat HaGadol": wikiLink("Shabbat HaGadol"),
  "Shabbat Nachamu": wikiLink("Shabbat Nachamu"),
  "Shabbat Parah": wikiLink("Shabbat Parah"),
  "Shabbat Shekalim": wikiLink("Shabbat Shekalim"),
  "Shabbat Shuva": wikiLink("Shabbat Shuva"),
  "Shabbat Zachor": wikiLink("Shabbat Zachor"),
  "Rosh Chodesh": roshChodeshLink,
  "Shabbat Rosh Chodesh": roshChodeshLink + " on " + wikiLink("Shabbat"),
  "Shabbat Machar Chodesh": wikiLink("Shabbat") + " before " + roshChodeshLink
};

const prayerKeyMap = {
  "Evening": "Evening services",
  "Shabbat evening": wikiLink("Shabbat") + " evening services",
  "Festival evening": "Festival evening services",
  "Morning": "Morning services",
  "Shabbat morning": wikiLink("Shabbat") + " morning services",
  "Festival morning": "Festival morning services",
  "Rosh Hashana morning": wikiLink("Rosh Hashana") + " morning services",
  "Additions for Evening": "Evening services",
  "Additions for Shabbat evening": "↳ " + wikiLink("Shabbat") + " evening services",
  "Additions for Morning": "Morning services",
  "Additions for Festival evening": "↳ Festival evening services",
  "Additions for Shabbat morning": "↳ " + wikiLink("Shabbat") + " morning services",
  "Additions for Festival morning": "↳ Festival morning services",
  "Additions for Rosh Hashana morning": "↳ " + wikiLink("Rosh Hashana") + " morning services",
  "Ma Tovu": wikiLink("Ma Tovu"),
  "Shema": wikiLink("Shema"),
  "Veshamru": "<i>Veshamru</i>",
  "Proclaiming the Festivals": "Proclaiming the Festivals",
  "Psalms for Pesukei Dezimra": "Psalms of " + wikiLink("Pesukei Dezimra"),
  "On Shabbat and certain festivals": "On " + wikiLink("Shabbat") + " and certain festivals",
  "Not on Shabbat and certain festivals": "Not on " + wikiLink("Shabbat") + " and certain festivals",
  "Yehi Kevod": wikiLink("Yehi Kevod") + " (part of " + wikiLink("Pesukei Dezimra") + ")",
  "Ashrei": wikiLink("Ashrei"),
  "Hallel of Pesukei Dezimra": wikiLink("<i>Hallel</i> of <i>Pesukei Dezimra</i>", undefined, "Hallel_(pesukei_dezimra)", true) + " (after " + wikiLink("Ashrei") + ")",
  "Verses for Pesukei Dezimra": "Verses in " + wikiLink("Pesukei Dezimra"),
  "Mi Chamocha": wikiLink("Mi Chamocha", "Song of the Sea"),
  "Kedushah": wikiLink("Kedushah", undefined, "Kedushah_(prayer)#Kedushah_in_the_Amidah"),
  "Returning the Torah to the Ark": "Returning the <i>Torah</i> to the " + arkLink,
  "Returning the Torah to the Ark (additional verses)": "Returning the <i>Torah</i> to the " + arkLink + " (additional verses)",
  "Shema Yisrael": "<i>Shema Yisrael</i>",
  "V'ahavta": "<i>V'ahavta</i>",
  "Putting on a Tallit": "Putting on a " + wikiLink("Tallit")
};

const portions_flat = [].concat.apply([], portions);
var descOfPortion_cache = {};
function descOfPortion(nm, k, rds, hideAst, hideReadOn) {
  if (rds == undefined) { rds = []; }
  if (descOfPortion_cache[[nm,k]] != undefined) {
    return [descOfPortion_cache[[nm,k]][0](rds, hideAst, hideReadOn), descOfPortion_cache[[nm,k]][1]];
  }
  const h = ' class="highlighted"';
  if (nm == "A") {
    const {summary, haftara} = hebcal__leyning.getLeyningForParsha(k);
    const {num} = hebcal__leyning__aliyot[k];
    let str0 = "<b><i>Shabbat</i> week " + num;
    let str1 = "";
    if (portionDates[k]) { str1 += " (" + portionDates[k].toLocaleDateString() + ")"; }
    str1 += ": <i>Parashat " + k + "</i> ";
    str1 += "(" + portions_flat[num-1][2] + ")</b>";
    str1 += "<ul>";
    str1 += "<li><span";
    let str2 = ">" + summary + "</span></li>";
    str2 += "<li><span";
    let str3 = ">" + wikiLink("Haftarah") + ": " + haftara + "</span></li>";
    str3 += "</ul>";
    const fn = function (rdsi, hideAsti, hideReadOni) {
      // for now, we ignore highligting here
      rdsi = [];
      return str0 + (!hideAsti && portions_flat[num-1][4] ? "*" : "") +
             str1 + (rdsi.includes("torah") ? h : "") +
             str2 + (rdsi.includes("haft") ? h : "") +
             str3;
    };
    descOfPortion_cache[[nm,k]] = [fn, portions_flat[num-1][4]];
    return [fn(rds, hideAst, hideReadOn), portions_flat[num-1][4]];
  }
  if (nm == "H") {
    const {summary, haftara} = hebcal__leyning.getLeyningForHolidayKey(k);
    let k_fmt = holidayKeyMap[k];
    if (!k_fmt && k.includes("Rosh Chodesh")) { k_fmt = k.replace("Rosh Chodesh", wikiLink("Rosh Chodesh")); }
    let str1 = "<b>" + (k_fmt ? k_fmt : k);
    if (portionDates[k]) { str1 += " (" + portionDates[k].toLocaleDateString() + ")"; }
    str1 += "</b><ul>"
    let [str2, str3] = ["", ""];
    if (summary && haftara) {
      str1 += "<li><span";
      str2 = ">" + summary + "</span></li>";
      str2 += "<li><span";
      str3 = ">" + wikiLink("Haftarah") + ": " + haftara + "</span></li>";
    }
    else if (summary) {
      str1 += "<li><span";
      str3 = ">" + summary + "</span></li>";
    }
    else if (haftara) {
      str1 += "<li><span";
      str3 = ">Additional " + wikiLink("Haftarah") + ": " + haftara + "</span></li>";
    }
    let str4 = "";
    const i = megillot.findIndex(e => e[1] === k);
    if (i >= 0) {
      const [b,sb] = megillot[i][0];
      str3 += "<li><span";
      str4 = ">" + wikiLink("Megillah", undefined, "Five_Megillot") + ": ";
      str4 += ketuvim[b][1][sb][0] + "</span></li>";
    }
    let str5 = "";
    if (k in hallelHolidays) {
      str4 += "<li><span";
      str5 = ">" + wikiLink("Hallel") + ": "
      if (hallelHolidays[k]) {
        str5 += fmtNameAndMultiVerses(["Psalms", fullHallel]);
      }
      else {
        str5 += fmtNameAndMultiVerses(["Psalms", partialHallel]);
      }
      str5 += "</span></li>";
    }
    let str6 = "";
    if (k in yizkorHolidays) {
      str5 += "<li><span";
      str6 = ">" + wikiLink("Yizkor") + ": ";
      str6 += fmtNameAndMultiVerses(["Psalms", yizkor]);
      str6 += "</span></li>";
    }
    str6 += "</ul>";
    const fn = function (rdsi, hideAsti, hideReadOni) {
      // for now, we ignore highligting here
      rdsi = [];
      return str1 + (rdsi.includes("torah") ? h : "") +
             str2 + (rdsi.includes("haft") ? h : "") +
             str3 + (rdsi.includes("megillah") ? h : "") +
             str4 + (rdsi.includes("hallel") ? h : "") +
             str5 + (rdsi.includes("yizkor") ? h : "") +
             str6;
    };
    descOfPortion_cache[[nm,k]] = [fn, undefined];
    return [fn(rds, hideAst, hideReadOn), undefined];
  }
  if (nm == "P") {
    const k_fmt = prayerKeyMap[k];
    let str1 = (k_fmt ? k_fmt : "<i>" + k + "</i>");
    let str2 = "<ul>";
    for (const [nm, rds] of prayers[k]) {
      str2 += "<li>";
      if (nm !== "") {
        const nm_fmt = prayerKeyMap[nm];
        str2 += (nm_fmt ? nm_fmt : nm) + ": ";
      }
      str2 += rds.map(fmtNameAndMultiVerses).join("; ");
      str2 += "</li>";
    }
    let str3 = "";
    const readOn = Object.keys(services).filter((k1) => services[k1].includes(k))
                                        .map(function (k1) {
                                          const k1_fmt = prayerKeyMap[k1];
                                          return k1_fmt ? k1_fmt : k1;
                                        });
    if (readOn.length > 0) {
      str3 += "<li>(Read on: " + readOn.join(", ") + ")</li>";
    }
    let str4 = "</ul>";
    const imp = importantPrayers.includes(k);
    const fn = function (rdsi, hideAstsi, hideReadOni) {
      return        (!hideReadOni || imp ? "<b>" : "") +
             str1 + (!hideReadOni || imp ? "</b>" : "") +
             str2 + (!hideReadOni ? str3 : "") +
             str4;
    };
    descOfPortion_cache[[nm,k]] = [fn, undefined];
    return [fn(rds, hideAst, hideReadOn), undefined]
  }
  if (nm == "SH") {
    let str = "<b>";
    if (k == "Full hallel") {
      str += "Full " + wikiLink("Hallel") + "</b><ul>";
      str += "<li>" + fmtNameAndMultiVerses(["Psalms", fullHallel]) + "</li>";
      str += "<li>(Read on: " + fullHallelHolidaysSummary.join(", ") + ")</li>";
    }
    if (k == "Partial hallel") {
      str += "Partial " + wikiLink("Hallel") + "</b><ul>";
      str += "<li>" + fmtNameAndMultiVerses(["Psalms", partialHallel]) + "</li>";
      str += "<li>(Read on: " + partialHallelHolidaysSummary.join(", ") + ")</li>";
    }
    if (k == "Yizkor") {
      str += wikiLink("Yizkor") + " service</b><ul>";
      str += "<li>" + fmtNameAndMultiVerses(["Psalms", yizkor]) + "</li>";
      const readOn = Object.keys(yizkorHolidays).map(function (k1) {
        const k1_fmt = holidayKeyMap[k1];
        return k1_fmt ? k1_fmt.replace(/ \([^\)]*\)<\/a>/, "</a>") : k1;
      });
      str += "<li>(Read on: " + readOn.join(", ") + ")</li>";
    }
    str += "</ul>";
    descOfPortion_cache[[nm,k]] = [(() => str), undefined];
    return [str, undefined]
  }
  if (nm == "Y") {
    let str = "<b>" + k + " " + wikiLink("Shir Shel Yom", "Song of the Day") + "</b><ul>";
    str += "<li><span";
    // for now, we ignore highligting here
    // str += h;
    str += ">" + fmtNameAndMultiVerses(["Psalms", shirShelYom[k]]);
    str += "</li></ul>"
    descOfPortion_cache[[nm,k]] = [(() => str), undefined];
    return [str, undefined];
  }
  let str = "<b>" + k + "</b>";
  descOfPortion_cache[[nm,k]] = [(() => str), undefined];
  return [str, undefined];
}

function saniID(s) {
  return s.replace(" ","").replace("-","").replace("'","");
}


// ================================================================
// JQuery
// ================================================================

function mousemoveCh(marker, byCh, nm, c, e) {
  if (!clickState) {
    const l = e.currentTarget.getBoundingClientRect().left + window.scrollX;
    const t = e.currentTarget.getBoundingClientRect().top  + window.scrollY;
    const h = e.currentTarget.getBoundingClientRect().height;
    const v = Math.max(Math.ceil(e.clientX - l), 1);
    marker.removeClass("hidden").css("left", e.clientX).css("top", t + h - 13);
    $('#mouseoverBox').removeClass("hidden").css("left", 0).css("top", t + h + 5);
    const rds = byCh.filter((x,i) => x[3][0] <= v && v <= x[3][1])
                    .map(x => [x[0], x[1], [x[2]], x[3]]);
    const [readOn, partOf] = rds.filter(function (x,i) {
      const i_fst = rds.findIndex(y => x[1] == y[1]);
      if (i_fst == i) { return true; }
      rds[i_fst][2] = rds[i_fst][2].concat(x[2]);
    }).reduce(function (accs,x) {
      accs[["P","Y","SH"].includes(x[0]) ? 1 : 0].push(x);
      return accs;
    }, [[],[]]);
    const lnk = $('<a>').attr("href", "https://www.sefaria.org/" + nm.replace(" ", "_") + "." + (c+1) + "." + v + "?lang=bi&with=all&lang2=en")
                        .text(nm + " " + (c+1) + ":" + v)
                        .attr("target", "blank");
    const text1 = readOn.length > 0 ? ", read on:" :
                  partOf.length > 0 ? ", part of:" : "";
    const text2 = readOn.length > 0 && partOf.length > 0 ? "and part of:" : "";
    $('#verseText').html("<b>" + lnk.prop("outerHTML") + "</b>" + text1);
    $('#readingsText').empty();
    let asts = undefined;
    readOn.forEach(function (x) {
      const [desc, ast] = descOfPortion(x[0], x[1], x[2]);
      if (ast) { asts = ast; }
      $('#readingsText').append($('<li>').html(desc))
    });
    $('#addlText').html(text2);
    $('#addlText').css("margin-top", text2 !== "" ? "5px" : "0");
    $('#prayersText').empty();
    partOf.forEach(function (x) {
      $('#prayersText').append($('<li>').html(descOfPortion(x[0], x[1], x[2])[0]))
    })
    $('#astText').html(asts ? "* " + asts : "");
    $('#astText').css("margin-top", asts ? "5px" : "0");
    if (readOn.length == 0 || readOn[0][0] == "A" && lastTorahPortion !== readOn[0][1]) {
      if (lastTorahPortion !== "") {
        for (let i = 0; i < torahPortionChs[lastTorahPortion]; i++) {
          $('#' + "torahPortionCh" + saniID(lastTorahPortion) + i).removeClass("visHighlighted");
        }
      }
      lastTorahPortion = "";
    }
    if (readOn.length > 0 && readOn[0][0] == "A" && lastTorahPortion !== readOn[0][1]) {
      for (let i = 0; i < torahPortionChs[readOn[0][1]]; i++) {
        $('#' + "torahPortionCh" + saniID(readOn[0][1]) + i).addClass("visHighlighted");
      }
      lastTorahPortion = readOn[0][1];
    }
    const max_left = $(window).width()-$('#mouseoverBox').width();
    $('#mouseoverBox').css("left", Math.min(e.clientX, max_left));
  }
}

var [clickState, justSetClickState] = ["", false];
var lastTorahPortion = "";
var torahPortionChs = {};
var portionDates = {};

$(document).ready(function() {

  const today = new Date();
  let hebcal_opts = { year: today.getFullYear(), isHebrewYear: false, sedrot: 1 };
  for (const e of hebcal.HebrewCalendar.calendar(hebcal_opts)) {
    let d = e.getDate().greg();
    d.setTime(d.getTime() + 60 * 60 * 24 * 1000 - 1);
    if (today <= d) {
      if (e.parsha) {
        e.parsha.forEach(p => portionDates[p] = d);
      }
      const k = hebcal__leyning.getLeyningKeyForEvent(e);
      if (k) {
        portionDates[k] = d;
        if (k == "Yom Kippur") {
          portionDates["Yom Kippur (Mincha, Traditional)"] = d;
        }
        if (k.includes("(on Shabbat)")) {
          const k1 = k.replace(" (on Shabbat)", "");
          portionDates[k1] = d;
          if (k1.includes("Pesach") && portionDates["Pesach Shabbat Chol ha-Moed"] == undefined) {
            portionDates["Pesach Shabbat Chol ha-Moed"] = d;
          }
        }
        if (k == "Sukkot Shabbat Chol ha-Moed" && portionDates[k] == undefined) {
          portionDates["Sukkot Chol ha-Moed Day " + e.cholHaMoedDay] = d;
        }
      }
    }
  }
  hebcal_opts.year = today.getFullYear() + 1;
  for (const e of hebcal.HebrewCalendar.calendar(hebcal_opts)) {
    const d = e.getDate().greg();
    if (e.parsha) {
      e.parsha.forEach(function (p) {
        if (portionDates[p] == undefined) {
          portionDates[p] = d;
        }
      });
    }
    const k = hebcal__leyning.getLeyningKeyForEvent(e);
    if (k && portionDates[k] == undefined) {
      portionDates[k] = d;
      if (k == "Yom Kippur") {
        portionDates["Yom Kippur (Mincha, Traditional)"] = d;
      }
      if (k.includes(" (on Shabbat)")) {
        const k1 = k.replace(" (on Shabbat)", "");
        if (portionDates[k1] == undefined) {
          portionDates[k1] = d;
        }
        if (k1.includes("Pesach") && portionDates["Pesach Shabbat Chol ha-Moed"] == undefined) {
          portionDates["Pesach Shabbat Chol ha-Moed"] = d;
        }
      }
      if (k == "Sukkot Shabbat Chol ha-Moed" && portionDates[k] == undefined) {
        portionDates["Sukkot Chol ha-Moed Day " + e.cholHaMoedDay] = d;
      }
    }
  }
  hebcal_opts.year = today.getFullYear()
  hebcal_opts.start = new Date(today.getTime() + (0) * 60 * 60 * 24 * 1000);
  hebcal_opts.end = new Date(today.getTime() + (365) * 60 * 60 * 24 * 1000);
  hebcal_opts.noRoshChodesh = 1;
  hebcal_opts.noSpecialShabbat = 1;
  hebcal_opts.noMinorFast = 1;
  let [nextParshas, nextHoliday] = [undefined, undefined];
  for (const e of hebcal.HebrewCalendar.calendar(hebcal_opts)) {
    if (e.parsha && !nextParshas) { nextParshas = e.parsha; }
    const k = hebcal__leyning.getLeyningKeyForEvent(e);
    if (k && !nextHoliday) { nextHoliday = k; }
    // if (!nextParshas && !nextHoliday) { break; }
  }
  // $('#nextShabbatPortionPlural').text(nextParshas.length == 1 ? "portion" : "portions");
  $('#nextShabbatPortion').html("<li>" + nextParshas.map(p => descOfPortion("A", p, [], nextParshas.length == 1)[0]).join("</li><li>") + "</li>");
  if (nextParshas.length > 1) {
    const asts = nextParshas.map(p => descOfPortion("A", p, [])[1]).filter(x => x);
    $('#astTextNextShabbatPortion').html(asts.length > 0 ? "* " + asts[0] : "");
    $('#astTextNextShabbatPortion').css("margin-top", asts.length > 0 ? "5px" : "0");
  }
  $('#nextHolidayPortion').html("<li>" + descOfPortion("H", nextHoliday, [])[0] + "</li>");

  let [datePortions, dates] = [{}, []];
  for (const k in portionDates) {
    const res = hebcal__leyning.getLeyningForHolidayKey(k);
    const {summaryParts, haft} = res ? res : {};
    if (k.includes(" (on Shabbat)")) {
      const o = hebcal__leyning.getLeyningForHolidayKey(k.split(" (on Shabbat)")[0]);
      if (o && ""+summaryParts === ""+o.summaryParts && ""+haft === ""+o.haft) {
        continue;
      }
    }
    if (k.includes(" (on Rosh Chodesh)")) {
      const o = hebcal__leyning.getLeyningForHolidayKey(k.split(" (on Rosh Chodesh)")[0]);
      if (o && ""+summaryParts === ""+o.summaryParts && ""+haft === ""+o.haft) {
        continue;
      }
    }
    if (k.includes("Shushan") || k.includes("Alternate")) { continue; }
    if (k == "Sukkot Chol ha-Moed Day 5") { continue; }
    const d = portionDates[k];
    const d_str = d.toLocaleDateString();
    if (!(d_str in datePortions)) { datePortions[d_str] = []; }
    datePortions[d_str].push(k);
    if (dates.every(d1 => d1.getTime() != d.getTime())) { dates.push(d); }
  }
  dates.sort((a,b) => a - b);
  var [eventID, dateGroups] = [0, [[],[],[],[],[]]];
  $('#dateSelect').append($('<option>').html("—"));
  for (const d of dates) {
    const d_str = d.toLocaleDateString();
    $('#dateSelect').append($('<option>').html(d_str));
    datePortions[d_str] = datePortions[d_str].map(function (k) {
      const nm = k in holidayKeyMap || k.includes("Rosh Chodesh") ? "H" : "A";
      return [nm, k];
    });
    datePortions[d_str].sort((a,b) => b[0] < a[0] ? 1 : a[0] < b[0] ? -1 : 0);
    const diff = d.getTime() - today.getTime();
    const ix = [7,28,84,168,385].findIndex((ds) => diff <= ds * 60 * 60 * 24 * 1000);
    if (ix > -1) {
      const hideAsts = datePortions[d_str].filter(([nm,_]) => nm == "A").length <= 1;
      for (const [nm, k] of datePortions[d_str]) {
        const [desc, ast] = descOfPortion(nm, k, [], hideAsts);
        let item = $('<li>').attr("id", "event" + eventID);
        if (ix > 0) { item.addClass("hidden") };
        item.html(desc + (!hideAsts && ast ? "* " + ast : ""));
        $('#upcomingEvents').append(item);
        dateGroups[ix].push(eventID);
        eventID++;
      }
    }
  }
  var currShowMoreIx = 0;
  $('#moreUpcomingEvents').click(function () {
    if (currShowMoreIx < dateGroups.length-1) {
      currShowMoreIx++;
      for (const id of dateGroups[currShowMoreIx]) {
        $('#event' + id).removeClass("hidden");
      }
      if (currShowMoreIx == dateGroups.length-1) {
        $('#moreUpcomingEvents').text("show less");
      }
    }
    else {
      currShowMoreIx = 0;
      for (let ix = 1; ix <= dateGroups.length-1; ix++) {
        for (const id of dateGroups[ix]) {
          $('#event' + id).addClass("hidden");
        }
      }
      $('#moreUpcomingEvents').text("show more");
    }
  });
  $('#dateSelect').change(function () {
    $('#portionForDate').empty();
    if ($('#dateSelect').val() != "—") {
      const ks = datePortions[$('#dateSelect').val()];
      const hideAsts = ks.filter(([nm,_]) => nm == "A").length <= 1;
      let asts = [];
      for (const [nm, k] of ks) {
        const [desc, ast] = descOfPortion(nm, k, [], hideAsts);
        $('#portionForDate').append("<li>" + desc + "</li>");
        if (ast) { asts.push(ast); }
      }
      if (!hideAsts) {
        $('#astTextPortionForDate').html(asts.length > 0 ? "* " + asts[0] : "");
        $('#astTextPortionForDate').css("margin-top", asts.length > 0 ? "5px" : "0");
      }
      else {
        $('#astTextPortionForDate').empty();
        $('#astTextPortionForDate').css("margin-top", 0);
      }
    }
  });

  var serviceID = 0;
  for (const k in services) {
    const k0 = "Additions for " + k;
    const k0_fmt = prayerKeyMap[k0];
    let str = "<li><b>" + (k0_fmt ? k0_fmt : k0 + " services") + "</b>";
    str += '<span id="serviceExpand' + serviceID + '" style="float:right">';
    str += $('<i>').html($('<a>').attr("href", "javascript:void(0)")
                                 .attr("id", "serviceExpandText" + serviceID)
                                 .html("expand"))
                   .prop("outerHTML");
    str += "</span>";
    str += '<ul id="serviceBody' + serviceID + '" class="hidden">';
    for (const k1 of services[k]) {
      const k1_fmt = prayerKeyMap[k1];
      str += "<li>" + descOfPortion("P", k1, [], false, true)[0] + "</li>";
    }
    str += "</ul></li>";
    $('#prayersByService').append(str);
    const id = serviceID;
    $('#serviceExpand' + serviceID).click(function () {
      console.log("yo" + id, '#serviceBody' + id);
      if ($('#serviceBody' + id).hasClass("hidden")) {
        $('#serviceExpandText' + id).html("hide");
        $('#serviceBody' + id).removeClass("hidden");
      }
      else {
        $('#serviceExpandText' + id).html("expand");
        $('#serviceBody' + id).addClass("hidden");
      }
    });
    serviceID++;
  }


  let [torahIx, torahByCh] = [{}, []];
  for (let b = 0; b < torah.length; b++) {
    torahIx[torah[b][2]] = 1+b;
    torahByCh.push(torah[b][4].map(_ => []));
  }

  let [neviimIx, neviimByCh] = [{}, []];
  for (let b = 0; b < neviim.length; b++) {
    neviimByCh.push([]);
    for (let sb = 0; sb < neviim[b][1].length; sb++) {
      neviimIx[neviim[b][1][sb][0]] = [1+b,sb];
      neviimByCh[b].push(neviim[b][1][sb][1].map(_ => []));
    }
  }

  let [ketuvimIx, ketuvimByCh] = [{}, []];
  for (let b = 0; b < ketuvim.length; b++) {
    ketuvimByCh.push([]);
    for (let sb = 0; sb < ketuvim[b][1].length; sb++) {
      ketuvimIx[ketuvim[b][1][sb][0]] = [1+b,sb];
      ketuvimByCh[b].push(ketuvim[b][1][sb][1].map(_ => []));
    }
  }

  for (const k0 in hebcal__leyning__aliyot) {
    if (k0.includes("-")) {
      const [l,r] = k0.split("-");
      if (l in hebcal__leyning__aliyot && r in hebcal__leyning__aliyot) { continue; }
    }
    torahPortionChs[k0] = 0;
    const {book, verses, haft} = hebcal__leyning__aliyot[k0];
    addPortionToCh(torahByCh[book-1], torah[book-1][4], parseVerses(verses), "A", k0, "torah");
    for (const {k,b,e} of Array.isArray(haft) ? haft : [haft]) {
      const [book, sb] = neviimIx[k];
      addPortionToCh(neviimByCh[book-1][sb], neviim[book-1][1][sb][1], [parseVerse(b), parseVerse(e)], "A", k0, "haft");
    }
  }

  for (const k0 in hebcal__leyning__holiday_readings) {
    let {summary, summaryParts, haft} = hebcal__leyning.getLeyningForHolidayKey(k0);
    if (k0.includes(" (on Shabbat)")) {
      const o = hebcal__leyning.getLeyningForHolidayKey(k0.split(" (on Shabbat)")[0]);
      if (o && ""+summaryParts === ""+o.summaryParts && ""+haft === ""+o.haft) {
        continue;
      }
    }
    if (k0.includes(" (on Rosh Chodesh)")) {
      const o = hebcal__leyning.getLeyningForHolidayKey(k0.split(" (on Rosh Chodesh)")[0]);
      if (o && ""+summaryParts === ""+o.summaryParts && ""+haft === ""+o.haft) {
        continue;
      }
    }
    if (k0.includes("Shushan") || k0.includes("Alternate")) { continue; }
    if (k0 == "Sukkot Chol ha-Moed Day 5") { continue; }
    if (k0 == "Sukkot Shabbat Chol ha-Moed") {
      summaryParts = [summaryParts[0], {k: "Numbers", b: "29:17", e: "29:34"}];
    }
    if (summary && !summaryParts) {
      const [k,be1] = summary.split(" ");
      const [c,be2] = be1.split(":");
      const [b,e] = be2.split("-").map(x => c + ":" + x);
      summaryParts = [{k,b,e}];
    }
    if (summaryParts) {
      for (let i = 0; i < summaryParts.length; i++) {
        const {k,b,e} = summaryParts[i];
        if (summaryParts.some((e,j) => j > i && k == e.k && b == e.b)) { continue; }
        const book = torahIx[k];
        addPortionToCh(torahByCh[book-1], torah[book-1][4], [parseVerse(b), parseVerse(e)], "H", k0, "torah");
      }
    }
    if (haft) {
      for (const {k,b,e} of Array.isArray(haft) ? haft : [haft]) {
        const [book, sb] = neviimIx[k];
        addPortionToCh(neviimByCh[book-1][sb], neviim[book-1][1][sb][1], [parseVerse(b), parseVerse(e)], "H", k0, "haft");
      }
    }
  }

  for (const [[b,sb], k] of megillot) {
    for (let c = 0; c < ketuvim[b][1][sb][1].length; c++) {
      ketuvimByCh[b][sb][c].push(["H", k, "megillah", [1,ketuvim[b][1][sb][1][c]]]);
    }
  }

  addPortionToCh(ketuvimByCh[0][0], ketuvim[0][1][0][1],
                 expandVerses(fullHallel[0], ketuvim[0][1][0][1]),
                 "SH", "Full hallel");
  addPortionToCh(ketuvimByCh[0][0], ketuvim[0][1][0][1],
                 expandVerses(partialHallel[0], ketuvim[0][1][0][1]),
                 "SH", "Partial hallel");
  // for (const k0 in hallelHolidays) {
  //   const [arr, vs_arr] = [ketuvimByCh[0][0], ketuvim[0][1][0][1]];
  //   if (hallelHolidays[k0]) {
  //     addPortionToCh(arr, vs_arr, expandVerses(fullHallel[0], vs_arr), "H", k0, "hallel");
  //   }
  //   else {
  //     for (const vs of partialHallel) {
  //       addPortionToCh(arr, vs_arr, expandVerses(vs, vs_arr), "H", k0, "hallel");
  //     }
  //   }
  // }

  addPortionToCh(ketuvimByCh[0][0], ketuvim[0][1][0][1],
                 expandVerses(yizkor[0], ketuvim[0][1][0][1]),
                 "SH", "Yizkor");
  // for (const k0 in yizkorHolidays) {
  //   const [arr, vs_arr] = [ketuvimByCh[0][0], ketuvim[0][1][0][1]];
  //   addPortionToCh(arr, vs_arr, expandVerses(yizkor[0], vs_arr), "H", k0, "yizkor");
  // }

  for (const k0 in services) {
    for (const k1 of services[k0]) {
      for (const [nm, rds] of prayers[k1]) {
        for (const [k, vss] of rds) {
          let [arr, vs_arr] = [undefined, undefined];
          if (k in torahIx) {
            const book = torahIx[k];
            [arr, vs_arr] = [torahByCh[book-1], torah[book-1][4]]
          }
          if (k in neviimIx) {
            const [book, sb] = neviimIx[k];
            [arr, vs_arr] = [neviimByCh[book-1][sb], neviim[book-1][1][sb][1]];
          }
          if (k in ketuvimIx) {
            const [book, sb] = ketuvimIx[k];
            [arr, vs_arr] = [ketuvimByCh[book-1][sb], ketuvim[book-1][1][sb][1]];
          }
          for (const vs of vss) {
            addPortionToCh(arr, vs_arr, expandVerses(vs, vs_arr), "P", k1, k1);
          }
        }
      }
    }
  }

  for (const k0 in shirShelYom) {
    const [arr, vs_arr] = [ketuvimByCh[0][0], ketuvim[0][1][0][1]];
    for (const vs of shirShelYom[k0]) {
      addPortionToCh(arr, vs_arr, expandVerses(vs, vs_arr), "Y", k0, "yom");
    }
  }

  let chIx = 0;
  for (let b = 0; b < torah.length; b++) {
    $('#torahBox').append($('<h4>').text(torah[b][2]));
    const chs = $('<div>').attr("id", "ch" + chIx)
                          .addClass("chapterContainer");
    const marker = $('<div>').attr("id", "marker" + chIx)
                             .addClass("marker hidden");
    chIx++;
    chs.mouseenter(function (e) {
      if (!clickState) {
        chs.addClass("noCursor");
        $('#mouseoverBox').addClass("hidden");
      }
    });
    chs.mouseleave(function (e) {
      chs.removeClass("noCursor");
      if (!clickState) {
        marker.addClass("hidden");
        $('#mouseoverBox').addClass("hidden");
        if (lastTorahPortion !== "") {
          for (let i = 0; i < torahPortionChs[lastTorahPortion]; i++) {
            $('#' + "torahPortionCh" + saniID(lastTorahPortion) + i).removeClass("visHighlighted");
          }
        }
        lastTorahPortion = "";
      }
    });
    chs.click(function (e) {
      if (clickState === "") {
        [clickState, justSetClickState] = ["torah", true];
      }
    });
    for (let c = 0; c < torah[b][4].length; c++) {
      const vs = torah[b][4][c];
      const cb = $('<div>').addClass("chapterBox");
      cb.css("width", vs + "px");
      cb.mousemove((e) => mousemoveCh(marker, torahByCh[b][c], torah[b][2], c, e));
      for (let i = 0; i < torahByCh[b][c].length; i++) {
        const [kind, nm, rd, [v1, v2]] = torahByCh[b][c][i];
        const isBelow = i > 0 && torahByCh[b][c].some(function ([kind1,_1,_2,[v3,v4]],j) {
          if (kind === "A" && kind1 !== "A") { return false; }
          return i != j && v1 <= v4 && v3 <= v2;
        });
        const [top, height] = isBelow ? [6,6] : [0,12];
        const clr = kind == "A"        ? portionColor((hebcal__leyning__aliyot[nm].num-1)/53) :
                    kind.includes("H") ? portionColor(4/3)
                                       : portionColor(7/6);
        const bx = $('<div>').addClass("versesBox");
        bx.css("position", "absolute");
        let [left, width] = [v1-1, v2 - v1 + 1];
        if (kind != "A" && v2 - v1 < 2) { [left, width] = [Math.max(0,v1-2), 3]; }
        bx.css("left", left).css("width", width).css("top", top).css("height", height);
        bx.css("background-color", clr);
        if (kind == "A") {
          bx.attr("id", "torahPortionCh" + saniID(nm) + torahPortionChs[nm]);
          torahPortionChs[nm]++;
        }
        cb.append(bx);
      }
      chs.append(cb);
      chs.append(marker);
    }
    $('#torahBox').append(chs);
  }

  for (let b = 0; b < neviim.length; b++) {
    $('#neviimBox').append($('<h4>').text(neviim[b][0]));
    for (let sb = 0; sb < neviim[b][1].length; sb++) {
      const chs = $('<div>').attr("id", "ch" + chIx)
                            .addClass("chapterContainer");
      const marker = $('<div>').attr("id", "marker" + chIx)
                               .addClass("marker hidden");
      chIx++;
      chs.mouseenter(function (e) {
        if (!clickState) {
          chs.addClass("noCursor");
          $('#mouseoverBox').addClass("hidden");
        }
      });
      chs.mouseleave(function (e) {
        chs.removeClass("noCursor");
        if (!clickState) {
          marker.addClass("hidden");
          $('#mouseoverBox').addClass("hidden");
          if (lastTorahPortion !== "") {
            for (let i = 0; i < torahPortionChs[lastTorahPortion]; i++) {
              $('#' + "torahPortionCh" + saniID(lastTorahPortion) + i).removeClass("visHighlighted");
            }
          }
          lastTorahPortion = "";
        }
      });
      chs.click(function (e) {
        if (clickState === "") {
          [clickState, justSetClickState] = ["neviim", true];
        }
      });
      if (neviim[b][1].length > 1) {
        const spl = neviim[b][1][sb][0].split(" ");
        if (spl[0] == "I" || spl[0] == "II") {
          chs.append($('<div>').addClass("subBookContainer")
                               .text(spl[0]));
        }
        else {
          chs.append($('<div>').addClass("subBookContainer")
                               .text(neviim[b][1][sb][0]));
        }
      }
      for (let c = 0; c < neviim[b][1][sb][1].length; c++) {
        const vs = neviim[b][1][sb][1][c];
        const cb = $('<div>').addClass("chapterBox");
        cb.css("width", vs + "px");
        cb.mousemove((e) => mousemoveCh(marker, neviimByCh[b][sb][c], neviim[b][1][sb][0], c, e));
        for (let i = 0; i < neviimByCh[b][sb][c].length; i++) {
          const [kind, nm, rd, [v1, v2]] = neviimByCh[b][sb][c][i];
          const isBelow = i > 0 && neviimByCh[b][sb][c].some(function ([kind1,_1,_2,[v3,v4]],j) {
            if (kind === "A" && kind1 !== "A") { return false; }
            return i != j && v1 <= v4 && v3 <= v2;
          });
          const [top, height] = isBelow ? [6,6] : [0,12];
          const clr = kind == "A"        ? portionColor((hebcal__leyning__aliyot[nm].num-1)/53) :
                      kind.includes("H") ? portionColor(4/3)
                                         : portionColor(7/6);
          const bx = $('<div>').addClass("versesBox");
          bx.css("position", "absolute");
          let [left, width] = [v1-1, v2 - v1 + 1];
          if (v2 - v1 < 2) { [left, width] = [Math.max(0,v1-2), 3]; }
          bx.css("left", left).css("width", width).css("top", top).css("height", height);
          bx.css("background-color", clr);
          if (kind == "A") {
            bx.attr("id", "torahPortionCh" + saniID(nm) + torahPortionChs[nm]);
            torahPortionChs[nm]++;
          }
          cb.append(bx);
        }
        chs.append(cb);
        chs.append(marker);
      }
      $('#neviimBox').append(chs);
    }
  }

  for (let b = 0; b < ketuvim.length; b++) {
    $('#ketuvimBox').append($('<h4>').text(ketuvim[b][0]));
    for (let sb = 0; sb < ketuvim[b][1].length; sb++) {
      const chs = $('<div>').attr("id", "ch" + chIx)
                            .addClass("chapterContainer");
      const marker = $('<div>').attr("id", "marker" + chIx)
                               .addClass("marker hidden");
      chIx++;
      chs.mouseenter(function (e) {
        if (!clickState) {
          chs.addClass("noCursor");
          $('#mouseoverBox').addClass("hidden");
        }
      });
      chs.mouseleave(function (e) {
        chs.removeClass("noCursor");
        if (!clickState) {
          marker.addClass("hidden");
          $('#mouseoverBox').addClass("hidden");
        }
      });
      chs.click(function (e) {
        if (clickState === "") {
          [clickState, justSetClickState] = ["ketuvim", true];
        }
      });
      if (ketuvim[b][1].length > 1) {
        const spl = ketuvim[b][1][sb][0].split(" ");
        if (spl[0] === "I" || spl[0] === "II") {
          chs.append($('<div>').addClass("subBookContainer")
                               .text(spl[0]));
        }
        else {
          chs.append($('<div>').addClass("subBookContainer")
                               .text(ketuvim[b][1][sb][0]));
        }
      }
      for (let c = 0; c < ketuvim[b][1][sb][1].length; c++) {
        const cb = $('<div>').addClass("chapterBox");
        cb.css("width", Math.ceil(ketuvim[b][1][sb][1][c]) + "px");
        cb.mousemove((e) => mousemoveCh(marker, ketuvimByCh[b][sb][c], ketuvim[b][1][sb][0], c, e));
        for (let i = 0; i < ketuvimByCh[b][sb][c].length; i++) {
          const [kind, nm, rd, [v1, v2]] = ketuvimByCh[b][sb][c][i];
          const isBelow = i > 0 && ketuvimByCh[b][sb][c].some(function ([kind1,_1,_2,[v3,v4]],j) {
            if (kind === "A" && kind1 !== "A") { return false; }
            if (["P","SH","Y"].includes(kind) && ["P","SH","Y"].includes(kind1)) { return false; }
            return i != j && v1 <= v4 && v3 <= v2;
          });
          const [top, height] = isBelow ? [6,6] : [0,12];
          const clr = kind == "A"        ? portionColor((hebcal__leyning__aliyot[nm].num-1)/53) :
                      kind.includes("H") ? portionColor(4/3)
                                         : portionColor(7/6);
          const bx = $('<div>').addClass("versesBox");
          bx.css("position", "absolute");
          let [left, width] = [v1-1, v2 - v1 + 1];
          if (v2 - v1 < 2) { [left, width] = [Math.max(0,v1-2), 3]; }
          bx.css("left", left).css("width", width).css("top", top).css("height", height);
          bx.css("background-color", clr);
          cb.append(bx);
        }
        chs.append(cb);
        chs.append(marker);
      }
      $('#ketuvimBox').append(chs);
    }
  }

  $(this).keydown(function (e) {
    if (clickState !== "" && e.key == "Escape") {
      clickState = "";
      for (let i = 0; i < chIx; i++) {
        $('#ch' + i).addClass("noCursor");
        $('#marker' + i).addClass("hidden");
      }
      $('#mouseoverBox').addClass("hidden");
      if (lastTorahPortion !== "") {
        for (let i = 0; i < torahPortionChs[lastTorahPortion]; i++) {
          $('#' + "torahPortionCh" + saniID(lastTorahPortion) + i).removeClass("visHighlighted");
        }
      }
      lastTorahPortion = "";
    }
  });
  $(this).click(function (e) {
    if (justSetClickState) {
      justSetClickState = false;
    }
    else if (clickState !== "" && $('#mouseoverBox:hover').length == 0) {
      clickState = "";
      for (let i = 0; i < chIx; i++) {
        $('#ch' + i).addClass("noCursor");
        $('#marker' + i).addClass("hidden");
      }
      $('#mouseoverBox').addClass("hidden");
      if (lastTorahPortion !== "") {
        for (let i = 0; i < torahPortionChs[lastTorahPortion]; i++) {
          $('#' + "torahPortionCh" + saniID(lastTorahPortion) + i).removeClass("visHighlighted");
        }
      }
      lastTorahPortion = "";
    }
  });

});

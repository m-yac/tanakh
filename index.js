
// ================================================================
// Torah and Haftarah data
// ================================================================

const torah = [
  ["Bereshit", "בְּרֵאשִׁית", "Genesis", 12, [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 54, 33, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26]],
  ["Shemot", "שְׁמוֹת", "Exodus", 11, [22, 25, 22, 31, 23, 30, 29, 28, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 37, 30, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38]],
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
    ["Vayakhel", "וַיַּקְהֵל", "And He Assembled", [[35,1],[38,20]], "On non-leap years this portion is combined with the next."],
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
    ["Chukat", "חֻקַּת", "Statute", [[19,1],[22,1]], "Outside of Israel, on years where the second day of Shavuot falls on Shabbat, this portion is combined with the next."],
    ["Balak", "בָּלָק", "Balak", [[22,2],[25,9]]],
    ["Pinchas", "פִּינְחָס", "Phineas", [[25,10],[30,1]]],
    ["Matot", "מַּטּוֹת", "Tribes", [[30,2],[32,42]], "This portion is combined with the next except on leap years where either the leap month has five Shabbats or outside of Israel where the eighth day of Passover falls on Shabbat."],
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
    ["Nitzavim", "נִצָּבִים", "Standing", [[29,9],[30,20]], "This portion is combined with the next, except on years where there are two Shabbats between Rosh Hashanah and Sukkot."],
    ["Vayelech", "וַיֵּלֶךְ", "And He Went", [[31,1],[31,30]]],
    ["Haazinu", "הַאֲזִינוּ", "Listen", [[32,1],[32,52]]],
    ["V'Zot HaBerachah", "וְזֹאת הַבְּרָכָה", "And This Is the Blessing", [[33,1],[34,12]], "This portion is read on Simchat Torah, not a Shabbat."]
  ]
];

const neviim = [
  ["Joshua", [["Joshua", [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33]]]],
  ["Judges", [["Judges", [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25]]]],
  ["Samuel", [["1 Samuel", [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 16, 23, 28, 23, 43, 25, 12, 25, 11, 31, 13]],
              ["2 Samuel", [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 32, 44, 26, 22, 51, 39, 25]]]],
  ["Kings", [["1 Kings", [53, 46, 28, 20, 32, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 54]],
             ["2 Kings", [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 20, 22, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30]]]],
  ["Isaiah", [["Isaiah", [31, 22, 26, 6, 30, 13, 25, 23, 20, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 11, 25, 24]]]],
  ["Jeremiah", [["Jeremiah", [19, 37, 25, 31, 31, 30, 34, 23, 25, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34]]]],
  ["Ezekiel", [["Ezekiel", [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35]]]],
  ["Twelve Prophets", [["Hosea", [9, 25, 5, 19, 15, 11, 16, 14, 17, 15, 11, 15, 15, 10]],
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
    ["2 Kings", [[[4,1],[4,37]]]],
    ["1 Kings", [[[1,1],[1,31]]]],
    ["Malachi", [[[1,1],[2,7]]]],
    ["Hosea", [[[12,13],[14,10]]]],
    ["Hosea", [[[11,7],[12,12]]]],
    ["Amos", [[[2,6],[3,8]]]],
    ["1 Kings", [[[3,15],[4,1]]]],
    ["Ezekiel", [[[37,15],[37,28]]]],
    ["1 Kings", [[[2,1],[2,12]]]]
  ],
  [
    ["Isaiah", [[[27,6],[28,13]], [[29,22],[29,23]]]],
    ["Ezekiel", [[[28,25],[29,21]]]],
    ["Jeremiah", [[[46,13],[46,28]]]],
    ["Judges", [[[4,4],[5,31]]]],
    ["Isaiah", [[[6,1],[7,6]], [[9,5],[9,6]]]],
    ["Jeremiah", [[[34,8],[34,22]], [[33,25],[33,26]]]],
    ["1 Kings", [[[5,26],[6,13]]]],
    ["Ezekiel", [[[43,10],[43,27]]]],
    ["1 Kings", [[[18,1],[18,39]]]],
    ["1 Kings", [[[7,40],[7,50]]]],
    ["1 Kings", [[[7,51],[8,21]]]]
  ],
  [
    ["Isaiah", [[[43,21],[44,23]]]],
    ["Jeremiah", [[[7,21],[8,3]], [[9,22],[9,23]]]],
    ["2 Samuel", [[[6,1],[7,17]]]],
    ["2 Kings", [[[4,42],[5,19]]]],
    ["2 Kings", [[[7,3],[7,20]]]],
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
    ["1 Samuel", [[[11,14],[12,22]]]],
    ["Judges", [[[11,1],[11,33]]]],
    ["Micah", [[[5,6],[6,8]]]],
    ["1 Kings", [[[18,46],[19,21]]]],
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
    ["2 Samuel", [[[22,1],[22,51]]]],
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
  ["Chronicles", [["1 Chronicles", [54, 55, 24, 43, 41, 66, 40, 40, 44, 14, 47, 41, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30]],
                  ["2 Chronicles", [18, 17, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 23, 14, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 26, 23]]]]
];


// ================================================================
// Formatting
// ================================================================

function fmtVerses(vs) {
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
      console.log(" - " + haftarotByPortion[b][p][0] + " " + fmtMultiVerses(haftarotByPortion[b][p][1]));
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

const ibm_clrs = [[255, 213, 51],
                  [255, 176, 0],
                  [254, 97, 0],
                  [220, 38, 127],
                  [120, 94, 240],
                  [100, 143, 255]];


function portionColor(bk, pn) {
  let p = (torah.slice(0,bk).map(x => x[3]).reduce(((x,y) => x + y), 0) + pn) / 54;

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


// ================================================================
// JQuery
// ================================================================

$(document).ready(function() {

  for (let b = 0; b < torah.length; b++) {
    $('#torahBox').append($('<h4>').text(torah[b][2]));
    const chs = $('<div>').addClass("chapterContainer");
    const marker = $('<div>').addClass("marker hidden");
    chs.append(marker);
    chs.mouseleave(function (e) {
      marker.addClass("hidden");
      $('#mouseoverBox').addClass("hidden");
    });
    let p = 0;
    for (let c = 0; c < torah[b][4].length; c++) {
      const vs = torah[b][4][c];
      const cb = $('<div>').addClass("chapterBox");
      cb.css("width", vs + "px");
      cb.mousemove(function (e) {
        const l = e.target.getBoundingClientRect().left + window.scrollX;
        const t = e.target.getBoundingClientRect().top  + window.scrollY;
        const h = e.target.getBoundingClientRect().height;
        const v = Math.ceil(e.clientX - l);
        marker.removeClass("hidden").css("left", e.clientX).css("top", t - 1);
        $('#mouseoverBox').removeClass("hidden").css("left", e.clientX).css("top", t + h + 5);
        $('#verseText').text(torah[b][2] + " " + (c+1) + ":" + v);
      });
      const [_,[pc2,pv2]] = portions[b][p][3];
      if (c+1 < pc2) {
        const sbv = $('<div>').addClass("versesBox");
        sbv.css("background-color", portionColor(b,p));
        sbv.css("width", vs + "px");
        cb.append(sbv);
      }
      if (c+1 == pc2) {
        const sbv = $('<div>').addClass("versesBox");
        sbv.css("width", pv2 + "px");
        sbv.css("background-color", portionColor(b,p));
        cb.append(sbv);
        p++;
        if (pv2 < vs) {
          const sbv2 = $('<div>').addClass("versesBox");
          sbv2.css("width", (vs - pv2) + "px");
          sbv2.css("background-color", portionColor(b,p));
          cb.append(sbv2);
        }
      }
      chs.append(cb);
    }
    $('#torahBox').append(chs);
  }

  let expandHaftarot = false;

  for (let b = 0; b < neviim.length; b++) {
    $('#neviimBox').append($('<h4>').text(neviim[b][0]));
    for (let sb = 0; sb < neviim[b][1].length; sb++) {
      const chs = $('<div>').addClass("chapterContainer");
      const marker = $('<div>').addClass("marker hidden");
      chs.append(marker);
      chs.mouseleave(function (e) {
        marker.addClass("hidden");
        $('#mouseoverBox').addClass("hidden");
      });
      if (neviim[b][1].length > 1) {
        if (isNaN(neviim[b][1][sb][0][0])) {
          chs.append($('<div>').addClass("subBookContainer")
                               .text(neviim[b][1][sb][0]));
        }
        else {
          chs.append($('<div>').addClass("subBookContainer")
                               .text(neviim[b][1][sb][0][0]));
        }
      }
      let p = 0;
      for (let c = 0; c < neviim[b][1][sb][1].length; c++) {
        const vs = neviim[b][1][sb][1][c];
        const cb = $('<div>').addClass("chapterBox");
        cb.css("width", vs + "px");
        cb.mousemove(function (e) {
          const l = e.target.getBoundingClientRect().left + window.scrollX;
          const t = e.target.getBoundingClientRect().top  + window.scrollY;
          const h = e.target.getBoundingClientRect().height;
          const v = Math.ceil(e.clientX - l);
          marker.removeClass("hidden").css("left", e.clientX).css("top", t - 1);
          $('#mouseoverBox').removeClass("hidden").css("left", e.clientX).css("top", t + h + 5);
          $('#verseText').text(neviim[b][1][sb][0] + " " + (c+1) + ":" + v);
        })
        if (p < haftarotByBook[b][sb].length) {
          const [[tb,tp],[[pc1,pv1],[pc2,pv2]]] = haftarotByBook[b][sb][p];
          if (c+1 >= pc1) {
            if (c+1 == pc1 && pv1 > 1) {
              const sbv2 = $('<div>').addClass("versesBox");
              sbv2.css("width", (pv1 - 1) + "px");
              cb.append(sbv2);
            }
            if (c+1 < pc2) {
              const sbv = $('<div>').addClass("versesBox");
              sbv.css("background-color", portionColor(tb,tp));
              sbv.css("width", (c+1 == pc1 ? vs - pv1 + 1 : vs) + "px");
              cb.append(sbv);
            }
            else if (c+1 == pc2) {
              const sbv = $('<div>').addClass("versesBox");
              sbv.css("width", (c+1 == pc1 ? pv2 - pv1 + 1 : pv2) + "px");
              sbv.css("background-color", portionColor(tb,tp));
              cb.append(sbv);
              p++;
              if (pv2 < vs) {
                let [clr, w] = [undefined, vs - pv2];
                if (p < haftarotByBook[b][sb].length) {
                  const [[tb2,tp2],[[pc12,pv12],[pc22,pv22]]] = haftarotByBook[b][sb][p];
                  if (c+1 >= pc12) {
                    clr = portionColor(tb2,tp2);
                    if (pv12 > pv2+1) {
                      const sbv2 = $('<div>').addClass("versesBox");
                      sbv2.css("width", (pv12 - pv2 - 1) + "px");
                      cb.append(sbv2);
                      w = vs - pv12 + 1;
                    }
                  }
                }
                const sbv2 = $('<div>').addClass("versesBox");
                sbv2.css("width", w + "px");
                if (clr) { sbv2.css("background-color", clr); }
                cb.append(sbv2);
              }
            }
            else if (c+1 > pc2) {
              p++;
            }
          }
        }
        chs.append(cb);
      }
      $('#neviimBox').append(chs);
    }
  }

  for (let b = 0; b < ketuvim.length; b++) {
    $('#ketuvimBox').append($('<h4>').text(ketuvim[b][0]));
    for (let sb = 0; sb < ketuvim[b][1].length; sb++) {
      const chs = $('<div>').addClass("chapterContainer");
      const marker = $('<div>').addClass("marker hidden");
      chs.append(marker);
      chs.mouseleave(function (e) {
        marker.addClass("hidden");
        $('#mouseoverBox').addClass("hidden");
      });
      if (ketuvim[b][1].length > 1) {
        if (isNaN(ketuvim[b][1][sb][0][0])) {
          chs.append($('<div>').addClass("subBookContainer")
                               .text(ketuvim[b][1][sb][0]));
        }
        else {
          chs.append($('<div>').addClass("subBookContainer")
                               .text(ketuvim[b][1][sb][0][0]));
        }
      }
      for (let c = 0; c < ketuvim[b][1][sb][1].length; c++) {
        const cb = $('<div>').addClass("chapterBox");
        cb.css("width", Math.ceil(ketuvim[b][1][sb][1][c]) + "px");
        cb.mousemove(function (e) {
          const l = e.target.getBoundingClientRect().left + window.scrollX;
          const t = e.target.getBoundingClientRect().top  + window.scrollY;
          const h = e.target.getBoundingClientRect().height;
          const v = Math.ceil(e.clientX - l);
          marker.removeClass("hidden").css("left", e.clientX).css("top", t - 1);
          $('#mouseoverBox').removeClass("hidden").css("left", e.clientX).css("top", t + h + 5);
          $('#verseText').text(ketuvim[b][1][sb][0] + " " + (c+1) + ":" + v);
        })
        chs.append(cb);
      }
      $('#ketuvimBox').append(chs);
    }
  }

});

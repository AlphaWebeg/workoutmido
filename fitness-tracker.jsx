import { useState } from "react";

// ============================================================
// EXERCISE MEDIA — GIF from Wikimedia / public domain + YouTube short
// ============================================================
const EXERCISE_MEDIA = {
  "Push-up عادي": {
    gif: "assets/Push-up_عادي.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/PushUps.gif/220px-PushUps.gif",
    video: "https://www.youtube.com/embed/IODxDxX7oi4?start=0&end=15&controls=1&rel=0",
    type: "push",
    icon: "💪",
    muscles: "صدر • ترايسبس • كتف أمامي",
    steps: ["ابدأ في وضع البلانك: يديك أعرض قليلاً من الكتفين", "انزل ببطء حتى تقترب الصدر من الأرضية", "ادفع للأعلى مع الزفير"],
    cues: ["الظهر مستقيم كخط واحد", "الكوعين ≈ 45°", "شد البطن"]
  },
  "Chest Fly": {
    gif: "assets/Chest_Fly.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cable_fly.gif/220px-Cable_fly.gif",
    video: "https://www.youtube.com/embed/eozdVDA78K0?controls=1&rel=0"
  },
  "Lat Pulldown": {
    gif: "assets/Lat_Pulldown.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Lat-pulldown.gif/220px-Lat-pulldown.gif",
    video: "https://www.youtube.com/embed/CAwf7n6Luuc?controls=1&rel=0"
  },
  "Straight Arm Pulldown": {
    gif: "assets/Straight_Arm_Pulldown.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Cable_pushdown_%28straight_bar%29_2.gif/220px-Cable_pushdown_%28straight_bar%29_2.gif",
    video: "https://www.youtube.com/embed/TD3AoH3moig?controls=1&rel=0"
  },
  "Seated Row": {
    gif: "assets/Seated_Row.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Seated-cable-rows-2.gif/220px-Seated-cable-rows-2.gif",
    video: "https://www.youtube.com/embed/GZbfZ033f74?controls=1&rel=0"
  },
  "Bicep Curl": {
    gif: "assets/Bicep_Curl.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dumbbell_Bicep_Curl_-_hollow_back.gif/220px-Dumbbell_Bicep_Curl_-_hollow_back.gif",
    video: "https://www.youtube.com/embed/ykJmrZ5v0Oo?controls=1&rel=0"
  },
  "Reverse Curl": {
    gif: "assets/Reverse_Curl.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Reverse_curl.gif/220px-Reverse_curl.gif",
    video: "https://www.youtube.com/embed/nkxNnfM3cGI?controls=1&rel=0"
  },
  "Incline Curl": {
    gif: "assets/Incline_Curl.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Incline-dumbbell-curl.gif/220px-Incline-dumbbell-curl.gif",
    video: "https://www.youtube.com/embed/soxrZlIl35U?controls=1&rel=0"
  },
  "Tricep Pushdown": {
    gif: "assets/Tricep_Pushdown.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pushdown.gif/220px-Pushdown.gif",
    video: "https://www.youtube.com/embed/2-LAMcpzODU?controls=1&rel=0"
  },
  "Squat": {
    gif: "assets/Squat.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/SquatLift.gif/220px-SquatLift.gif",
    video: "https://www.youtube.com/embed/aclHkVaku9U?controls=1&rel=0"
  },
  "Romanian Deadlift": {
    gif: "assets/Romanian_Deadlift.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Romanian_deadlift.gif/220px-Romanian_deadlift.gif",
    video: "https://www.youtube.com/embed/JCXUYuzwNrM?controls=1&rel=0"
  },
  "Lunge": {
    gif: "assets/Lunge.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Lunge.gif/220px-Lunge.gif",
    video: "https://www.youtube.com/embed/QOVaHwm-Q6U?controls=1&rel=0"
  },
  "Leg Curl": {
    gif: "assets/Leg_Curl.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Lying-Leg-Curls.gif/220px-Lying-Leg-Curls.gif",
    video: "https://www.youtube.com/embed/1Tq3QdYUuHs?controls=1&rel=0"
  },
  "Close Stance Squat": {
    gif: "assets/Squat.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/SquatLift.gif/220px-SquatLift.gif",
    video: "https://www.youtube.com/embed/UXJrBgI2RxA?controls=1&rel=0"
  },
  "Glute Bridge": {
    gif: "assets/Glute_Bridge.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Glute-bridge.gif/220px-Glute-bridge.gif",
    video: "https://www.youtube.com/embed/OUgsJ8-Vi0E?controls=1&rel=0"
  },
  "Calf Raise": {
    gif: "assets/Calf_Raise.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Standing_calf_raise.gif/220px-Standing_calf_raise.gif",
    video: "https://www.youtube.com/embed/gwLzBJYoWlI?controls=1&rel=0"
  },
  "Plank": {
    gif: "assets/Plank.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Plank_exercise.gif/220px-Plank_exercise.gif",
    video: "https://www.youtube.com/embed/pvIjsG5Svck?controls=1&rel=0"
  },
  "Pike Push-up": {
    gif: "assets/Pike_Push-up.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Pike-Push-Up.gif/220px-Pike-Push-Up.gif",
    video: "https://www.youtube.com/embed/sposDXWEB0A?controls=1&rel=0"
  },
  "Lateral Raise": {
    gif: "assets/Lateral_Raise.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Lateral-Raises.gif/220px-Lateral-Raises.gif",
    video: "https://www.youtube.com/embed/3VcKaXpzqRo?controls=1&rel=0"
  },
  "Face Pull": {
    gif: "assets/Face_Pull.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Face-pull.gif/220px-Face-pull.gif",
    video: "https://www.youtube.com/embed/rep-qVOkqgk?controls=1&rel=0"
  },
  "Serratus Punch": {
    gif: "assets/Push-up_عادي.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/PushUps.gif/220px-PushUps.gif",
    video: "https://www.youtube.com/embed/H8HMOhcOsKU?controls=1&rel=0"
  },
  "Single Arm Row": {
    gif: "assets/Seated_Row.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Seated-cable-rows-2.gif/220px-Seated-cable-rows-2.gif",
    video: "https://www.youtube.com/embed/pYcpY20QaE8?controls=1&rel=0"
  },
  "Pull-over": {
    gif: "assets/Pullover.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Dumbbell-pullover.gif/220px-Dumbbell-pullover.gif",
    video: "https://www.youtube.com/embed/FK4rHfEqSB0?controls=1&rel=0"
  },
  "Reverse Fly": {
    gif: "assets/Reverse_Fly.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Reverse-Fly.gif/220px-Reverse-Fly.gif",
    video: "https://www.youtube.com/embed/ttvANqfNQSY?controls=1&rel=0"
  },
  "Overhead Tricep Extension": {
    gif: "assets/Overhead_Tricep_Extension.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Overhead-Tricep-Extension.gif/220px-Overhead-Tricep-Extension.gif",
    video: "https://www.youtube.com/embed/YbX7Wd8jQ-Q?controls=1&rel=0"
  },
  "Hammer Curl": {
    gif: "assets/Hammer_Curl.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Hammer-Curls.gif/220px-Hammer-Curls.gif",
    video: "https://www.youtube.com/embed/zC3nLlEvin4?controls=1&rel=0"
  },
  "Sumo Squat": {
    gif: "assets/Sumo_Squat.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sumo-Squat.gif/220px-Sumo-Squat.gif",
    video: "https://www.youtube.com/embed/QKKN9oMPHRU?controls=1&rel=0"
  },
  "Single Leg Deadlift": {
    gif: "assets/Romanian_Deadlift.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Romanian_deadlift.gif/220px-Romanian_deadlift.gif",
    video: "https://www.youtube.com/embed/TGTqKFaKaT8?controls=1&rel=0"
  },
  "Step Up على كرسي": {
    gif: "assets/Step_Up.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Step-ups.gif/220px-Step-ups.gif",
    video: "https://www.youtube.com/embed/dQqApCGd5Ss?controls=1&rel=0"
  },
  "Donkey Kick": {
    gif: "assets/Donkey_Kick.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Donkey-Kicks.gif/220px-Donkey-Kicks.gif",
    video: "https://www.youtube.com/embed/SJ1Xuz9D-ZQ?controls=1&rel=0"
  },
  "Leg Raise": {
    gif: "assets/Leg_Raise.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Leg-Raise.gif/220px-Leg-Raise.gif",
    video: "https://www.youtube.com/embed/l4kQd9eWclE?controls=1&rel=0"
  },
  "Mountain Climber": {
    gif: "assets/Mountain_Climber.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mountain-Climbers.gif/220px-Mountain-Climbers.gif",
    video: "https://www.youtube.com/embed/nmwgirgXLYM?controls=1&rel=0"
  },
  "Pallof Press": {
    gif: "assets/Push-up_عادي.gif",
    online_gif: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/PushUps.gif/220px-PushUps.gif",
    video: "https://www.youtube.com/embed/AH_QZLm_0-s?controls=1&rel=0"
  }
};

// ============================================================
// DATA
// ============================================================
const DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const WORKOUT_PLAN = {
  "الأحد":    { type: "upper", label: "Upper A", sub: "صدر + ظهر + بايسبس + ترايسبس" },
  "الاثنين":  { type: "lower", label: "Lower A", sub: "أرجل + مؤخرة + بطن" },
  "الثلاثاء": { type: "rest",  label: "راحة",    sub: "يوم استشفاء" },
  "الأربعاء": { type: "upper", label: "Upper B", sub: "كتف + ظهر + بايسبس + ترايسبس" },
  "الخميس":   { type: "lower", label: "Lower B", sub: "قوة + Hamstring + بطن" },
  "الجمعة":   { type: "rest",  label: "راحة",    sub: "يوم استشفاء" },
  "السبت":    { type: "rest",  label: "راحة",    sub: "يوم استشفاء" },
};

const EXERCISES = {
  "Upper A": [
    { name: "Push-up عادي",             tool: "وزن جسم",           sets: 4, reps: "10-15", rest: "60ث", muscles: "صدر" },
    { name: "Chest Fly",                tool: "استك",              sets: 3, reps: "12-15", rest: "60ث", muscles: "صدر" },
    { name: "Lat Pulldown",             tool: "استك من فوق الباب", sets: 4, reps: "12-15", rest: "60ث", muscles: "Lats" },
    { name: "Straight Arm Pulldown",    tool: "استك من فوق الباب", sets: 3, reps: "12-15", rest: "60ث", muscles: "Lats" },
    { name: "Seated Row",               tool: "استك",              sets: 3, reps: "12-15", rest: "60ث", muscles: "ظهر" },
    { name: "Bicep Curl",               tool: "استك",              sets: 3, reps: "12-15", rest: "45ث", muscles: "بايسبس" },
    { name: "Reverse Curl",             tool: "استك",              sets: 3, reps: "12",    rest: "45ث", muscles: "Brachialis" },
    { name: "Incline Curl",             tool: "استك",              sets: 3, reps: "12",    rest: "45ث", muscles: "بايسبس Long Head" },
    { name: "Tricep Pushdown",          tool: "استك من فوق الباب", sets: 3, reps: "12-15", rest: "45ث", muscles: "ترايسبس" },
  ],
  "Upper B": [
    { name: "Pike Push-up",             tool: "وزن جسم",           sets: 4, reps: "10-12", rest: "60ث", muscles: "كتف" },
    { name: "Lateral Raise",            tool: "استك",              sets: 4, reps: "15",    rest: "45ث", muscles: "كتف جانبي" },
    { name: "Face Pull",                tool: "استك من فوق الباب", sets: 4, reps: "15",    rest: "45ث", muscles: "Rear Delt" },
    { name: "Serratus Punch",           tool: "استك",              sets: 3, reps: "15",    rest: "45ث", muscles: "Serratus" },
    { name: "Single Arm Row",           tool: "استك",              sets: 3, reps: "12 لكل جهة", rest: "60ث", muscles: "Lats" },
    { name: "Pull-over",                tool: "استك من فوق الباب", sets: 3, reps: "12-15", rest: "60ث", muscles: "Lats" },
    { name: "Reverse Fly",              tool: "استك",              sets: 3, reps: "12-15", rest: "45ث", muscles: "Rear Delt" },
    { name: "Overhead Tricep Extension",tool: "استك",              sets: 3, reps: "12-15", rest: "45ث", muscles: "ترايسبس" },
    { name: "Hammer Curl",              tool: "استك",              sets: 3, reps: "12",    rest: "45ث", muscles: "بايسبس" },
  ],
  "Lower A": [
    { name: "Squat",                    tool: "وزن جسم",           sets: 4, reps: "15-20", rest: "60ث", muscles: "أرجل" },
    { name: "Romanian Deadlift",        tool: "استك",              sets: 4, reps: "12-15", rest: "60ث", muscles: "Hamstring + مؤخرة" },
    { name: "Lunge",                    tool: "وزن جسم",           sets: 3, reps: "12 لكل رجل", rest: "60ث", muscles: "أرجل" },
    { name: "Leg Curl",                 tool: "استك",              sets: 3, reps: "15",    rest: "45ث", muscles: "Hamstring" },
    { name: "Close Stance Squat",       tool: "وزن جسم",           sets: 3, reps: "15",    rest: "60ث", muscles: "Vastus Medialis" },
    { name: "Glute Bridge",             tool: "استك على الوركين",  sets: 4, reps: "15",    rest: "45ث", muscles: "مؤخرة" },
    { name: "Calf Raise",               tool: "وزن جسم",           sets: 3, reps: "20-25", rest: "30ث", muscles: "ساق" },
    { name: "Plank",                    tool: "وزن جسم",           sets: 3, reps: "40ث",   rest: "45ث", muscles: "بطن" },
  ],
  "Lower B": [
    { name: "Sumo Squat",               tool: "استك تحت القدمين",  sets: 4, reps: "15",    rest: "60ث", muscles: "أرجل + مؤخرة" },
    { name: "Single Leg Deadlift",      tool: "استك",              sets: 3, reps: "10 لكل رجل", rest: "60ث", muscles: "Hamstring" },
    { name: "Step Up على كرسي",         tool: "وزن جسم",           sets: 3, reps: "12 لكل رجل", rest: "60ث", muscles: "أرجل" },
    { name: "Leg Curl",                 tool: "استك",              sets: 3, reps: "15",    rest: "45ث", muscles: "Hamstring" },
    { name: "Donkey Kick",              tool: "استك",              sets: 3, reps: "15 لكل رجل", rest: "45ث", muscles: "مؤخرة" },
    { name: "Leg Raise",                tool: "وزن جسم",           sets: 3, reps: "15",    rest: "45ث", muscles: "بطن" },
    { name: "Mountain Climber",         tool: "وزن جسم",           sets: 3, reps: "20",    rest: "45ث", muscles: "بطن + كارديو" },
    { name: "Pallof Press",             tool: "استك من الباب",     sets: 3, reps: "12 لكل جهة", rest: "45ث", muscles: "بطن جانبي" },
  ],
};

const CARB_OPTIONS = [
  { name: "أرز أبيض",     per100g: { cal: 130, p: 2.5, c: 28, f: 0.3 } },
  { name: "عيش بلدي",     per100g: { cal: 230, p: 7.5, c: 46, f: 1.5 } },
  { name: "مكرونة مسلوقة",per100g: { cal: 131, p: 5,   c: 25, f: 1.1 } },
  { name: "بطاطا مسلوقة", per100g: { cal: 87,  p: 1.9, c: 20, f: 0.1 } },
  { name: "عدس مطبوخ",    per100g: { cal: 116, p: 9,   c: 20, f: 0.4 } },
  { name: "كشري",         per100g: { cal: 120, p: 4,   c: 22, f: 1.5 } },
];

const PROTEIN_OPTIONS = [
  { name: "صدر فراخ مسلوق", per100g: { cal: 110, p: 23, c: 0, f: 2  } },
  { name: "فراخ مشوية",     per100g: { cal: 165, p: 31, c: 0, f: 4  } },
  { name: "لحمة مشوية",     per100g: { cal: 200, p: 26, c: 0, f: 10 } },
  { name: "سمك بلطي مشوي",  per100g: { cal: 90,  p: 18, c: 0, f: 2  } },
  { name: "تونة علبة",       per100g: { cal: 97,  p: 21, c: 0, f: 1  } },
  { name: "كفتة مشوية",     per100g: { cal: 200, p: 15, c: 2, f: 14 } },
  { name: "بيض مسلوق",      per100g: { cal: 155, p: 13, c: 1, f: 11 } },
  { name: "فول مدمس",       per100g: { cal: 90,  p: 6,  c: 15, f: 0.5} },
];

const BASE_MEALS = {
  breakfast:   { label: "🌅 الإفطار",         items: [
    { id:"eggs_b",   name:"بيض مقلي",      category:"protein", grams:150, per100g:{cal:155,p:13,c:1, f:11 } },
    { id:"foul",     name:"فول مدمس",      category:"protein", grams:200, per100g:{cal:90, p:6, c:15,f:0.5} },
    { id:"bread_b",  name:"عيش بلدي",      category:"carb",    grams:130, per100g:{cal:230,p:7.5,c:46,f:1.5} },
    { id:"veg_b",    name:"طماطم + خيار", category:"veg",     grams:150, per100g:{cal:20, p:1, c:4, f:0  } },
  ]},
  preworkout:  { label: "🕐 قبل التدريب",     items: [
    { id:"bread_p",  name:"عيش بلدي",      category:"carb",    grams:130, per100g:{cal:230,p:7.5,c:46,f:1.5} },
    { id:"tuna_p",   name:"تونة علبة",      category:"protein", grams:185, per100g:{cal:97, p:21,c:0, f:1  } },
    { id:"banana",   name:"موزة",           category:"fruit",   grams:120, per100g:{cal:89, p:1, c:23,f:0.3} },
  ]},
  postworkout: { label: "🏋️ بعد التدريب",    items: [
    { id:"chicken",  name:"صدر فراخ مسلوق",category:"protein", grams:200, per100g:{cal:110,p:23,c:0, f:2  } },
    { id:"rice",     name:"أرز أبيض",       category:"carb",    grams:200, per100g:{cal:130,p:2.5,c:28,f:0.3} },
    { id:"veg_pw",   name:"سلطة",           category:"veg",     grams:100, per100g:{cal:20, p:1, c:4, f:0  } },
    { id:"oil",      name:"زيت زيتون",      category:"fat",     grams:5,   per100g:{cal:884,p:0, c:0, f:100} },
  ]},
  lunch:       { label: "🌞 الغداء",          items: [
    { id:"protein_l",name:"فراخ مشوية",    category:"protein", grams:150, per100g:{cal:165,p:31,c:0, f:4  } },
    { id:"carb_l",   name:"أرز أبيض",      category:"carb",    grams:150, per100g:{cal:130,p:2.5,c:28,f:0.3} },
    { id:"salad_l",  name:"سلطة بزيت",     category:"veg",     grams:150, per100g:{cal:53, p:1, c:4, f:4  } },
  ]},
  dinner:      { label: "🌙 العشاء",          items: [
    { id:"eggs_d",   name:"بيض مسلوق",     category:"protein", grams:100, per100g:{cal:155,p:13,c:1, f:11 } },
    { id:"cheese",   name:"جبن أبيض",       category:"protein", grams:60,  per100g:{cal:183,p:13,c:1, f:14 } },
    { id:"bread_d",  name:"عيش بلدي",      category:"carb",    grams:65,  per100g:{cal:230,p:7.5,c:46,f:1.5} },
    { id:"laban",    name:"لبن رايب",        category:"dairy",   grams:200, per100g:{cal:61, p:3.5,c:5, f:3.3} },
  ]},
};

const TARGETS = { cal: 2490, p: 130, c: 335, f: 70 };

function calcItem(item) {
  return {
    cal: Math.round((item.per100g.cal * item.grams) / 100),
    p:   Math.round((item.per100g.p   * item.grams) / 100 * 10) / 10,
    c:   Math.round((item.per100g.c   * item.grams) / 100 * 10) / 10,
    f:   Math.round((item.per100g.f   * item.grams) / 100 * 10) / 10,
  };
}
function calcMeal(items) {
  return items.reduce((a, i) => {
    const n = calcItem(i);
    return { cal: a.cal+n.cal, p: a.p+n.p, c: a.c+n.c, f: a.f+n.f };
  }, { cal:0,p:0,c:0,f:0 });
}

// ============================================================
// CSS
// ============================================================
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0e1117;--surface:#161b27;--card:#1e2535;--border:#2a3244;
  --accent:#f0a500;--accent2:#e05c2a;--green:#2ecc71;--blue:#3a7bd5;
  --text:#e8eaf0;--muted:#8892a4;--radius:14px;
}
body{background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;direction:rtl;min-height:100vh}
.app{max-width:900px;margin:0 auto;padding:16px}

.header{text-align:center;padding:28px 0 20px;border-bottom:1px solid var(--border);margin-bottom:24px}
.header h1{font-size:1.8rem;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px}
.header p{color:var(--muted);font-size:.9rem}

.day-tabs{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;margin-bottom:24px;scrollbar-width:none}
.day-tabs::-webkit-scrollbar{display:none}
.day-tab{flex:0 0 auto;padding:8px 16px;border-radius:50px;border:1px solid var(--border);background:var(--surface);color:var(--muted);cursor:pointer;font-family:'Cairo',sans-serif;font-size:.85rem;font-weight:600;transition:all .2s;white-space:nowrap}
.day-tab:hover{border-color:var(--accent);color:var(--text)}
.day-tab.active{background:linear-gradient(135deg,var(--accent),var(--accent2));border-color:transparent;color:#000;font-weight:700}
.day-tab.rest.active{background:var(--border);color:var(--text)}

.tab-row{display:flex;gap:8px;margin-bottom:20px}
.tab-btn{flex:1;padding:10px;border-radius:10px;border:1px solid var(--border);background:var(--surface);color:var(--muted);font-family:'Cairo',sans-serif;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .2s}
.tab-btn.active{background:var(--card);border-color:var(--accent);color:var(--accent)}

.section-title{font-size:1.1rem;font-weight:700;color:var(--accent);margin-bottom:14px;display:flex;align-items:center;gap:8px}

.workout-header{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:18px 20px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
.workout-badge{display:inline-block;padding:4px 12px;border-radius:50px;font-size:.78rem;font-weight:700}
.badge-upper{background:rgba(58,123,213,.2);color:#3a7bd5;border:1px solid rgba(58,123,213,.3)}
.badge-lower{background:rgba(46,204,113,.2);color:#2ecc71;border:1px solid rgba(46,204,113,.3)}
.badge-rest{background:rgba(255,255,255,.05);color:var(--muted);border:1px solid var(--border)}

/* Exercise card — musclewiki style */
.ex-list{display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
.ex-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:border-color .2s}
.ex-card.open{border-color:var(--accent)}
.ex-header{display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer;user-select:none}
.ex-num{width:30px;height:30px;border-radius:50%;background:rgba(240,165,0,.15);color:var(--accent);font-weight:900;font-size:.85rem;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ex-info{flex:1}
.ex-name{font-weight:700;font-size:.92rem;margin-bottom:2px}
.ex-meta{display:flex;gap:8px;flex-wrap:wrap}
.muscle-tag{display:inline-block;padding:2px 8px;border-radius:20px;font-size:.7rem;background:rgba(240,165,0,.1);color:var(--accent);border:1px solid rgba(240,165,0,.2)}
.tool-tag{font-size:.72rem;color:var(--muted);background:var(--surface);padding:2px 8px;border-radius:20px;border:1px solid var(--border)}
.ex-stats{display:flex;gap:6px;flex-shrink:0}
.stat-pill{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:4px 10px;text-align:center;font-size:.72rem;line-height:1.3}
.stat-pill strong{display:block;font-size:.82rem;color:var(--text)}
.stat-pill span{color:var(--muted)}
.ex-expand-btn{background:none;border:none;color:var(--muted);cursor:pointer;font-size:.8rem;padding:4px 8px;border-radius:6px;border:1px solid var(--border);white-space:nowrap;font-family:'Cairo',sans-serif;transition:all .2s;flex-shrink:0}
.ex-expand-btn:hover,.ex-expand-btn.active{border-color:var(--accent);color:var(--accent)}
.ex-expand-btn.active{background:rgba(240,165,0,.1)}

.ex-media{border-top:1px solid var(--border);background:var(--surface)}
.media-tabs{display:flex;border-bottom:1px solid var(--border)}
.media-tab{flex:1;padding:10px;background:none;border:none;color:var(--muted);font-family:'Cairo',sans-serif;font-size:.82rem;cursor:pointer;transition:all .2s;border-bottom:2px solid transparent}
.media-tab.active{color:var(--accent);border-bottom-color:var(--accent)}
.video-play-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:100%;padding:48px 20px;background:#0f172a;border:none;cursor:pointer;color:#94a3b8;font-size:.85rem;font-weight:600}
.video-play-placeholder:hover{background:#1e293b}
.video-play-icon{display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:var(--accent);color:#fff;font-size:1.4rem}
.video-wrap{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}
.video-wrap iframe{position:absolute;inset:0;width:100%;height:100%;border:none}

/* tips */
.tip-box{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px 18px;font-size:.82rem;color:var(--muted);margin-bottom:24px}

/* rest */
.rest-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:40px 20px;text-align:center;margin-bottom:24px}
.rest-card .icon{font-size:3rem;margin-bottom:12px}
.rest-card h2{font-size:1.3rem;font-weight:700;margin-bottom:8px}
.rest-card p{color:var(--muted);font-size:.9rem}

/* macros */
.macro-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px}
.macro-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px;text-align:center}
.macro-card .val{font-size:1.3rem;font-weight:900}
.macro-card .lbl{font-size:.72rem;color:var(--muted);margin-top:2px}
.macro-card .tgt{font-size:.7rem;color:var(--muted)}
.macro-card.cal .val{color:var(--accent)}
.macro-card.pro .val{color:#3a7bd5}
.macro-card.carb .val{color:var(--green)}
.macro-card.fat .val{color:var(--accent2)}
.progress-bar{height:6px;background:var(--border);border-radius:3px;overflow:hidden;margin-top:6px}
.progress-fill{height:100%;border-radius:3px;transition:width .4s}
.fill-cal{background:var(--accent)}.fill-pro{background:#3a7bd5}.fill-carb{background:var(--green)}.fill-fat{background:var(--accent2)}

/* meal */
.meal-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:14px;overflow:hidden}
.meal-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:var(--surface);border-bottom:1px solid var(--border);cursor:pointer;user-select:none}
.meal-title{font-weight:700;font-size:.95rem}
.meal-cals{font-size:.82rem;color:var(--accent);font-weight:700}
.meal-body{padding:0 18px 14px}
.food-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)}
.food-row:last-child{border-bottom:none}
.food-name{flex:1;font-size:.88rem;font-weight:600}
.food-macros{font-size:.75rem;color:var(--muted);display:flex;gap:10px;flex-wrap:wrap}
.gram-input{width:64px;padding:5px 8px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:'Cairo',sans-serif;font-size:.82rem;text-align:center}
.gram-input:focus{outline:none;border-color:var(--accent)}
.swap-btn{padding:5px 10px;background:rgba(240,165,0,.1);border:1px solid rgba(240,165,0,.2);border-radius:8px;color:var(--accent);font-family:'Cairo',sans-serif;font-size:.75rem;cursor:pointer;transition:all .2s;white-space:nowrap}
.swap-btn:hover{background:rgba(240,165,0,.2)}
.meal-totals{display:flex;gap:16px;padding:12px 0 0;font-size:.8rem;color:var(--muted);border-top:1px solid var(--border);margin-top:6px;flex-wrap:wrap}

/* modal */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px}
.modal{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;width:100%;max-width:420px;max-height:80vh;overflow-y:auto}
.modal h3{font-size:1rem;font-weight:700;margin-bottom:16px}
.option-btn{display:block;width:100%;padding:12px 16px;margin-bottom:8px;background:var(--surface);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:'Cairo',sans-serif;font-size:.88rem;cursor:pointer;text-align:right;transition:all .2s}
.option-btn:hover{border-color:var(--accent);background:rgba(240,165,0,.05)}
.close-btn{margin-top:8px;display:block;width:100%;padding:10px;background:transparent;border:1px solid var(--border);border-radius:10px;color:var(--muted);font-family:'Cairo',sans-serif;cursor:pointer}

@media(max-width:600px){
  .macro-grid{grid-template-columns:repeat(2,1fr)}
  .ex-stats{display:none}
  .ex-header{gap:8px}
}
`;

// ============================================================
// EXERCISE CARD WITH MEDIA
// ============================================================
function ExerciseCard({ ex, idx }) {
  const [open, setOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const media = EXERCISE_MEDIA[ex.name];

  return (
    <div className={`ex-card ${open ? "open" : ""}`}>
      <div className="ex-header">
        <div className="ex-num">{idx + 1}</div>
        <div className="ex-info">
          <div className="ex-name">{ex.name}</div>
          <div className="ex-meta">
            <span className="muscle-tag">{ex.muscles}</span>
            <span className="tool-tag">{ex.tool}</span>
          </div>
        </div>
        <div className="ex-stats">
          <div className="stat-pill"><strong>{ex.sets}</strong><span>سيتات</span></div>
          <div className="stat-pill"><strong>{ex.reps}</strong><span>تكرار</span></div>
          <div className="stat-pill"><strong>{ex.rest}</strong><span>راحة</span></div>
        </div>
        {media && (
          <button
            className={`ex-expand-btn ${open ? "active" : ""}`}
            onClick={() => { setOpen(o => !o); if (open) setVideoPlaying(false); }}
          >
            {open ? "إخفاء ▲" : "شوف الحركة ▼"}
          </button>
        )}
      </div>

      {open && media && (
        <div className="ex-media">
          {media.video && (
            videoPlaying ? (
              <div className="video-wrap">
                <iframe
                  src={media.video}
                  title={ex.name}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <button className="video-play-placeholder" onClick={() => setVideoPlaying(true)} type="button">
                <span className="video-play-icon">▶</span>
                <span>اضغط لتشغيل الفيديو</span>
              </button>
            )
          )}

          <div style={{ padding: "10px 16px", fontSize: ".78rem", color: "var(--muted)", borderTop: "1px solid var(--border)", display:"flex", gap:"16px", flexWrap:"wrap" }}>
            <span>🔢 {ex.sets} سيتات</span>
            <span>🔄 {ex.reps} تكرار</span>
            <span>⏱️ راحة {ex.rest}</span>
            <span>💪 {ex.muscles}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MACRO BAR
// ============================================================
function MacroBar({ totals }) {
  const pct = (v, t) => Math.min(100, Math.round((v / t) * 100));
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="macro-grid">
        {[
          { cls:"cal", val: totals.cal,        lbl:"سعرات",  tgt: TARGETS.cal,  fill:"fill-cal",  unit:"" },
          { cls:"pro", val: Math.round(totals.p), lbl:"بروتين", tgt: TARGETS.p,   fill:"fill-pro",  unit:"غ" },
          { cls:"carb",val: Math.round(totals.c), lbl:"كارب",   tgt: TARGETS.c,   fill:"fill-carb", unit:"غ" },
          { cls:"fat", val: Math.round(totals.f), lbl:"دهون",   tgt: TARGETS.f,   fill:"fill-fat",  unit:"غ" },
        ].map(m => (
          <div key={m.cls} className={`macro-card ${m.cls}`}>
            <div className="val">{m.val}{m.unit}</div>
            <div className="lbl">{m.lbl}</div>
            <div className="tgt">الهدف: {m.tgt}{m.unit}</div>
            <div className="progress-bar"><div className={`progress-fill ${m.fill}`} style={{ width: pct(m.val, m.tgt) + "%" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SWAP MODAL
// ============================================================
function SwapModal({ item, onSelect, onClose }) {
  const options = item.category === "carb" ? CARB_OPTIONS : item.category === "protein" ? PROTEIN_OPTIONS : null;
  if (!options) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>استبدل "{item.name}"</h3>
        {options.map(o => (
          <button key={o.name} className="option-btn" onClick={() => onSelect(o)}>
            <div style={{ fontWeight: 700 }}>{o.name}</div>
            <div style={{ fontSize: ".75rem", color: "#8892a4", marginTop: 3 }}>
              {o.per100g.cal} سعرة | بروتين {o.per100g.p}غ | كارب {o.per100g.c}غ | دهون {o.per100g.f}غ — لكل 100غ
            </div>
          </button>
        ))}
        <button className="close-btn" onClick={onClose}>إلغاء</button>
      </div>
    </div>
  );
}

// ============================================================
// MEAL CARD
// ============================================================
function MealCard({ mealKey, meal, items, onGramChange, onSwap }) {
  const [open, setOpen] = useState(true);
  const [swapTarget, setSwapTarget] = useState(null);
  const totals = calcMeal(items);
  return (
    <>
      <div className="meal-card">
        <div className="meal-header" onClick={() => setOpen(o => !o)}>
          <span className="meal-title">{meal.label}</span>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span className="meal-cals">{totals.cal} سعرة</span>
            <span style={{ color:"var(--muted)", fontSize:".8rem" }}>{open ? "▲" : "▼"}</span>
          </div>
        </div>
        {open && (
          <div className="meal-body">
            {items.map((item, idx) => {
              const n = calcItem(item);
              const canSwap = item.category === "carb" || item.category === "protein";
              return (
                <div key={item.id} className="food-row">
                  <div style={{ flex:1 }}>
                    <div className="food-name">{item.name}</div>
                    <div className="food-macros">
                      <span>🔥 {n.cal}</span><span>💪 {n.p}غ</span><span>🌾 {n.c}غ</span><span>🧈 {n.f}غ</span>
                    </div>
                  </div>
                  <input className="gram-input" type="number" value={item.grams} min={0}
                    onChange={e => onGramChange(mealKey, idx, +e.target.value)} />
                  <span style={{ fontSize:".72rem", color:"var(--muted)" }}>غ</span>
                  {canSwap && <button className="swap-btn" onClick={() => setSwapTarget({ item, idx })}>تغيير</button>}
                </div>
              );
            })}
            <div className="meal-totals">
              <span>المجموع: <strong style={{ color:"var(--accent)" }}>{totals.cal} سعرة</strong></span>
              <span>بروتين: <strong style={{ color:"#3a7bd5" }}>{Math.round(totals.p)}غ</strong></span>
              <span>كارب: <strong style={{ color:"var(--green)" }}>{Math.round(totals.c)}غ</strong></span>
              <span>دهون: <strong style={{ color:"var(--accent2)" }}>{Math.round(totals.f)}غ</strong></span>
            </div>
          </div>
        )}
      </div>
      {swapTarget && (
        <SwapModal item={swapTarget.item}
          onSelect={opt => { onSwap(mealKey, swapTarget.idx, opt); setSwapTarget(null); }}
          onClose={() => setSwapTarget(null)} />
      )}
    </>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function App() {
  const todayIdx = new Date().getDay();
  const [activeDay, setActiveDay] = useState(DAYS[todayIdx]);
  const [tab, setTab] = useState("workout");

  const [mealsState, setMealsState] = useState(() => {
    const init = {};
    DAYS.forEach(d => {
      init[d] = {};
      Object.entries(BASE_MEALS).forEach(([k, v]) => { init[d][k] = v.items.map(i => ({ ...i })); });
    });
    return init;
  });

  const dayPlan = WORKOUT_PLAN[activeDay];
  const exercises = EXERCISES[dayPlan.label] || [];
  const dayMeals = mealsState[activeDay];
  const totals = calcMeal(Object.values(dayMeals).flat());

  function handleGramChange(mealKey, idx, val) {
    setMealsState(prev => {
      const copy = { ...prev, [activeDay]: { ...prev[activeDay], [mealKey]: prev[activeDay][mealKey].map((it, i) => i === idx ? { ...it, grams: val } : it) } };
      return copy;
    });
  }
  function handleSwap(mealKey, idx, opt) {
    setMealsState(prev => {
      const copy = { ...prev, [activeDay]: { ...prev[activeDay], [mealKey]: prev[activeDay][mealKey].map((it, i) => i === idx ? { ...it, name: opt.name, per100g: opt.per100g } : it) } };
      return copy;
    });
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <h1>💪 مدرّبك الشخصي</h1>
          <p>Upper / Lower | استك + وزن جسم | Lean Bulk 2,490 سعرة</p>
        </div>

        <div className="day-tabs">
          {DAYS.map(d => (
            <button key={d} className={`day-tab ${WORKOUT_PLAN[d].type === "rest" ? "rest" : ""} ${activeDay === d ? "active" : ""}`} onClick={() => setActiveDay(d)}>
              {d}{d === DAYS[todayIdx] ? " 🔴" : ""}
            </button>
          ))}
        </div>

        <div className="tab-row">
          <button className={`tab-btn ${tab === "workout" ? "active" : ""}`} onClick={() => setTab("workout")}>🏋️ التمرين</button>
          <button className={`tab-btn ${tab === "food"    ? "active" : ""}`} onClick={() => setTab("food")}>🥗 التغذية</button>
        </div>

        {tab === "workout" && (
          <>
            <div className="workout-header">
              <div>
                <div style={{ fontWeight:700, fontSize:"1.05rem", marginBottom:4 }}>{dayPlan.label}</div>
                <div style={{ fontSize:".82rem", color:"var(--muted)" }}>{dayPlan.sub}</div>
              </div>
              <span className={`workout-badge badge-${dayPlan.type}`}>
                {dayPlan.type === "upper" ? "Upper Body" : dayPlan.type === "lower" ? "Lower Body" : "Rest Day"}
              </span>
            </div>

            {dayPlan.type === "rest" ? (
              <div className="rest-card">
                <div className="icon">😴</div>
                <h2>يوم راحة واستشفاء</h2>
                <p>جسمك بيبني العضلات في أيام الراحة<br />نام كويس واشرب مياه</p>
              </div>
            ) : (
              <>
                <div className="section-title">📋 تمارين اليوم — اضغط "شوف الحركة" لأي تمرين</div>
                <div className="ex-list">
                  {exercises.map((ex, i) => <ExerciseCard key={ex.name} ex={ex} idx={i} />)}
                </div>
                <div className="tip-box">
                  💡 ابدأ بإحماء 5 دقائق — مشي في المكان + دوران مفاصل. ركز على الشكل الصحيح قبل زيادة التكرارات.
                </div>
              </>
            )}
          </>
        )}

        {tab === "food" && (
          <>
            <div className="section-title">📊 ملخص اليوم</div>
            <MacroBar totals={totals} />
            <div className="section-title">🍽️ وجباتك — غيّر الجرام أو اضغط "تغيير" لتبديل الأكل</div>
            {Object.entries(BASE_MEALS).map(([key, meal]) => (
              <MealCard key={key} mealKey={key} meal={meal} items={dayMeals[key]} onGramChange={handleGramChange} onSwap={handleSwap} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

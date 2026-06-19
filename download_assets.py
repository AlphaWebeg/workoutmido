import urllib.request
import urllib.error
import ssl
import os
import time
import sys

if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

ASSETS_DIR = "assets"
os.makedirs(ASSETS_DIR, exist_ok=True)

# Original /thumb/ URLs from the JSX file - these are animated GIFs served as scaled versions
# Setting Referer to wikimedia bypasses hotlink protection
MEDIA_MAP = {
    "Push-up_عادي.gif":            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/PushUps.gif/220px-PushUps.gif",
    "Chest_Fly.gif":                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cable_fly.gif/220px-Cable_fly.gif",
    "Lat_Pulldown.gif":             "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Lat-pulldown.gif/220px-Lat-pulldown.gif",
    "Straight_Arm_Pulldown.gif":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Cable_pushdown_%28straight_bar%29_2.gif/220px-Cable_pushdown_%28straight_bar%29_2.gif",
    "Seated_Row.gif":               "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Seated-cable-rows-2.gif/220px-Seated-cable-rows-2.gif",
    "Bicep_Curl.gif":               "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dumbbell_Bicep_Curl_-_hollow_back.gif/220px-Dumbbell_Bicep_Curl_-_hollow_back.gif",
    "Reverse_Curl.gif":             "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Reverse_curl.gif/220px-Reverse_curl.gif",
    "Incline_Curl.gif":             "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Incline-dumbbell-curl.gif/220px-Incline-dumbbell-curl.gif",
    "Tricep_Pushdown.gif":          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pushdown.gif/220px-Pushdown.gif",
    "Squat.gif":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/SquatLift.gif/220px-SquatLift.gif",
    "Romanian_Deadlift.gif":        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Romanian_deadlift.gif/220px-Romanian_deadlift.gif",
    "Lunge.gif":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Lunge.gif/220px-Lunge.gif",
    "Leg_Curl.gif":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Lying-Leg-Curls.gif/220px-Lying-Leg-Curls.gif",
    "Glute_Bridge.gif":             "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Glute-bridge.gif/220px-Glute-bridge.gif",
    "Calf_Raise.gif":               "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Standing_calf_raise.gif/220px-Standing_calf_raise.gif",
    "Plank.gif":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Plank_exercise.gif/220px-Plank_exercise.gif",
    "Pike_Push-up.gif":             "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Pike-Push-Up.gif/220px-Pike-Push-Up.gif",
    "Lateral_Raise.gif":            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Lateral-Raises.gif/220px-Lateral-Raises.gif",
    "Face_Pull.gif":                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Face-pull.gif/220px-Face-pull.gif",
    "Pullover.gif":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Dumbbell-pullover.gif/220px-Dumbbell-pullover.gif",
    "Reverse_Fly.gif":              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Reverse-Fly.gif/220px-Reverse-Fly.gif",
    "Overhead_Tricep_Extension.gif":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Overhead-Tricep-Extension.gif/220px-Overhead-Tricep-Extension.gif",
    "Hammer_Curl.gif":              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Hammer-Curls.gif/220px-Hammer-Curls.gif",
    "Sumo_Squat.gif":               "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sumo-Squat.gif/220px-Sumo-Squat.gif",
    "Step_Up.gif":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Step-ups.gif/220px-Step-ups.gif",
    "Donkey_Kick.gif":              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Donkey-Kicks.gif/220px-Donkey-Kicks.gif",
    "Leg_Raise.gif":                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Leg-Raise.gif/220px-Leg-Raise.gif",
    "Mountain_Climber.gif":         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mountain-Climbers.gif/220px-Mountain-Climbers.gif",
}

REFERERS = [
    "https://en.wikipedia.org/wiki/Push-up",
    "https://commons.wikimedia.org/wiki/Category:Fitness_animations",
    "https://en.wikipedia.org/",
]

def download_gif(filename, url):
    dest = os.path.join(ASSETS_DIR, filename)
    if os.path.exists(dest) and os.path.getsize(dest) > 500:
        print(f"[SKIP] Already exists: {filename}")
        return True

    for referer in REFERERS:
        headers = {
            'User-Agent': 'FitnessTrackerApp/1.0 (amazi@example.com)',
            'Accept': 'image/gif,image/webp,image/*,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': referer,
            'Cache-Control': 'no-cache',
        }
        req = urllib.request.Request(url, headers=headers)
        for attempt in range(3):
            try:
                with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                    data = resp.read()
                    if len(data) > 500:
                        with open(dest, 'wb') as f:
                            f.write(data)
                        print(f"[OK] {filename} ({len(data)//1024}KB) via Referer={referer}")
                        return True
                    else:
                        print(f"[WARN] Too small ({len(data)} bytes), skipping")
            except urllib.error.HTTPError as e:
                if e.code == 429:
                    wait = int(e.headers.get('Retry-After', 10))
                    print(f"[429] Rate limited. Waiting {wait}s...")
                    time.sleep(wait)
                elif e.code == 403:
                    print(f"[403] Forbidden with Referer={referer}")
                    break  # try next referer
                else:
                    print(f"[{e.code}] {e.reason} for {filename}")
                    break
            except Exception as ex:
                print(f"[ERR] {ex}")
                time.sleep(2)
        time.sleep(1.5)
    return False

success_count = 0
fail_list = []

for filename, url in MEDIA_MAP.items():
    ok = download_gif(filename, url)
    if ok:
        success_count += 1
    else:
        fail_list.append(filename)
    time.sleep(2)  # Be polite to the server

print(f"\n--- DONE: {success_count}/{len(MEDIA_MAP)} downloaded ---")
if fail_list:
    print("FAILED:")
    for f in fail_list:
        print(f"  - {f}")

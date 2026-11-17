/* Lift Log exercise guide: descriptions, form cues and animated form demos.
   Animations are drawn from keyframed poses of a simple skeleton (side or front view), so they
   work offline and match the app's colors. Exposes window.LiftGuide. */
(() => {
"use strict";

/* ================= Written guides =================
   m: [primary, secondary], s: steps, c: form cues, x: common mistakes, n: optional note */
const G = {
  squat: { m: ["Quads, glutes", "Adductors, lower back, core"], s: ["Set the bar on your upper back, just below the bony bump at the base of your neck. Grip it a little wider than your shoulders.", "Unrack, take two steps back and set your feet about shoulder width, toes turned out slightly.", "Brace your core, then sit down and back between your heels until your hip crease is just below the top of your knee.", "Drive up through your whole foot, keeping your chest up, until you're standing tall."], c: ["Knees track over your toes", "Big breath and brace before each rep", "Bar stays over mid-foot the whole way"], x: ["Knees caving inward", "Heels lifting off the floor", "Cutting depth short as the weight gets heavy"] },
  front_squat: { m: ["Quads", "Glutes, upper back, core"], s: ["Rest the bar on the front of your shoulders, fingertips under the bar and elbows pointing forward.", "Set your feet shoulder width, toes slightly out.", "Squat straight down, keeping your torso tall and elbows high.", "Stand up by driving your elbows up and pushing through your feet."], c: ["Elbows high the whole rep", "Torso stays more upright than a back squat", "Sit between your heels"], x: ["Elbows dropping so the bar rolls forward", "Gripping the bar tightly with the whole hand and straining the wrists"] },
  deadlift: { m: ["Glutes, hamstrings, lower back", "Lats, traps, grip, quads"], s: ["Stand with the bar over the middle of your feet, feet about hip width.", "Hinge down and grip the bar just outside your legs. Bend your knees until your shins touch the bar.", "Pull your chest up and your shoulders back so your back is flat, then take a big breath and brace.", "Push the floor away, keeping the bar against your legs, until you stand tall with hips locked.", "Lower it the same way: hips back first, then bend the knees once the bar passes them."], c: ["Bar drags up your shins and thighs", "Flat back, chest proud", "Squeeze the bar off the floor, don't jerk it"], x: ["Rounding the lower back", "Hips shooting up first so it turns into a stiff-leg pull", "Leaning way back at the top"] },
  trap_dl: { m: ["Quads, glutes, hamstrings", "Lower back, traps, grip"], s: ["Step inside the trap bar so the handles line up with the middle of your feet.", "Sit your hips down and back, grab the handles and flatten your back.", "Brace, then push through the floor to stand up tall.", "Lower under control by pushing your hips back and bending your knees."], c: ["Chest up, back flat", "Push the floor away", "Stand fully tall at the top"], x: ["Rounding the back off the floor", "Letting the bar drift forward"], n: "This is the Army Fitness Test's deadlift event: three reps at the heaviest weight you can lift with good form." },
  rdl: { m: ["Hamstrings, glutes", "Lower back, grip"], s: ["Stand tall holding the bar at your hips, feet hip width.", "Unlock your knees slightly and keep them there.", "Push your hips straight back, sliding the bar down your thighs, until you feel a strong stretch in your hamstrings (usually just below the knee).", "Drive your hips forward to stand back up."], c: ["Hips go back, not down", "Bar stays touching your legs", "Neutral spine, eyes a few feet ahead"], x: ["Bending the knees more and more so it becomes a squat", "Rounding the back to get lower"] },
  hip_thrust: { m: ["Glutes", "Hamstrings, quads"], s: ["Sit on the floor with your upper back against a bench and a padded bar over your hips.", "Plant your feet flat, about hip width, so your shins are vertical at the top.", "Drive through your heels and lift your hips until your body is flat from shoulders to knees.", "Squeeze your glutes for a second, then lower under control."], c: ["Chin tucked, ribs down", "Shins vertical at the top", "Pause and squeeze at lockout"], x: ["Arching the lower back to get higher", "Feet too far out so the hamstrings do the work"] },
  leg_press: { m: ["Quads, glutes", "Hamstrings, adductors"], s: ["Sit with your back and hips flat against the pad.", "Place your feet shoulder width in the middle of the platform.", "Release the safety handles and lower the sled until your knees reach about 90 degrees.", "Press back up without locking your knees hard."], c: ["Lower back stays on the pad", "Knees track over your toes", "Control the lowering"], x: ["Going so deep your hips roll off the seat", "Snapping the knees straight at the top"] },
  hack_squat: { m: ["Quads", "Glutes"], s: ["Stand on the platform with your back against the pad and shoulders under the pads.", "Set your feet shoulder width, slightly forward.", "Release the safeties and squat down until your thighs are about parallel to the platform.", "Drive back up through your whole foot."], c: ["Back stays flat on the pad", "Knees travel forward over the toes", "Smooth, controlled reps"], x: ["Heels lifting", "Bouncing out of the bottom"] },
  leg_ext: { m: ["Quads", ""], s: ["Sit with your knees lined up with the machine's pivot and the pad on your lower shins.", "Hold the handles and sit tall.", "Straighten your legs until your knees are nearly locked.", "Lower slowly back to the start."], c: ["Pause and squeeze at the top", "Slow on the way down", "Keep your hips on the seat"], x: ["Swinging the weight up with momentum", "Letting the stack slam between reps"] },
  leg_curl: { m: ["Hamstrings", "Calves"], s: ["Lie face down with the pad just above your heels and your knees just off the bench edge.", "Hold the handles and keep your hips pressed down.", "Curl your heels toward your glutes as far as you can.", "Lower slowly until your legs are straight."], c: ["Hips stay flat on the pad", "Full range both ways", "Slow lowering"], x: ["Hips lifting off the bench", "Jerking the weight up"] },
  seated_leg_curl: { m: ["Hamstrings", "Calves"], s: ["Sit with the knee pivot lined up with your knees and the pad behind your lower calves.", "Lock the thigh pad down snugly.", "Curl your heels down and back as far as you can.", "Let the pad come back up slowly."], c: ["Sit tall, don't lean back", "Squeeze at full bend", "Control the return"], x: ["Using a weight that cuts the range short", "Letting the stack yank your legs straight"] },
  goblet: { m: ["Quads, glutes", "Core, upper back"], s: ["Hold one dumbbell vertically against your chest with both hands under the top end.", "Set your feet a little wider than your shoulders.", "Squat down between your knees, elbows brushing the inside of your knees.", "Stand back up, keeping the weight tight to your chest."], c: ["Chest up", "Elbows inside the knees at the bottom", "Weight on your whole foot"], x: ["Letting the dumbbell drift away from your body", "Rounding forward at the bottom"] },
  bulgarian: { m: ["Quads, glutes", "Adductors, core"], s: ["Stand about two feet in front of a bench and rest the top of your back foot on it.", "Hold dumbbells at your sides.", "Lower straight down until your back knee nearly touches the floor.", "Push through your front foot to stand back up. Finish all reps, then switch legs."], c: ["Most of your weight on the front leg", "Front knee tracks over the toes", "Torso tall or slightly forward"], x: ["Front foot too close to the bench", "Pushing off the back leg"] },
  lunge: { m: ["Quads, glutes", "Adductors, calves, core"], s: ["Stand tall with dumbbells at your sides.", "Take a long step forward and lower until both knees are about 90 degrees, back knee just above the floor.", "Push through the front foot and step the back foot forward into the next lunge.", "Keep alternating legs as you walk."], c: ["Long enough step that the front shin stays fairly upright", "Torso tall", "Control each step down"], x: ["Front knee collapsing inward", "Short choppy steps"] },
  hip_abd: { m: ["Glute medius", "Outer hips"], s: ["Sit with your back against the pad and the pads on the outside of your knees.", "Hold the handles.", "Push your knees out as far as you can.", "Bring them back in slowly without letting the stack touch."], c: ["Sit tall", "Pause at the widest point", "Slow return"], x: ["Bouncing the weight", "Rocking your torso to move it"] },
  calf_raise: { m: ["Calves", ""], s: ["Stand with the balls of your feet on the step and shoulders under the pads.", "Let your heels drop below the step for a full stretch.", "Rise up onto your toes as high as you can.", "Pause, then lower slowly into the stretch."], c: ["Full stretch at the bottom", "Pause at the top", "Knees straight but not locked"], x: ["Bouncing quick half reps", "Bending the knees to help"] },
  seated_calf: { m: ["Calves (soleus)", ""], s: ["Sit with the pad on your lower thighs and the balls of your feet on the step.", "Release the safety and let your heels drop.", "Press up onto your toes as high as you can.", "Lower slowly into a full stretch."], c: ["Full range", "Pause at the top", "Slow lowering"], x: ["Bouncing out of the bottom"] },
  bench: { m: ["Chest", "Front delts, triceps"], s: ["Lie on the bench with your eyes under the bar and feet flat on the floor.", "Grip a little wider than shoulder width, pull your shoulder blades back and down, and keep a slight arch.", "Unrack, then lower the bar to your mid-chest with elbows about 45 degrees from your body.", "Press back up and slightly back toward your face until your arms are straight."], c: ["Shoulder blades pinched together", "Feet planted, butt on the bench", "Touch the same spot every rep"], x: ["Flaring the elbows straight out to the sides", "Bouncing the bar off the chest", "Lifting your hips off the bench"] },
  incline_bench: { m: ["Upper chest", "Front delts, triceps"], s: ["Set the bench to about 30 degrees and lie back with eyes under the bar.", "Grip just wider than shoulders and pull your shoulder blades back.", "Lower the bar to your upper chest, just below the collarbone.", "Press straight up to lockout."], c: ["Shoulder blades back and down", "Bar to upper chest", "Control the lowering"], x: ["Bench set too steep so it becomes a shoulder press", "Bouncing the bar"] },
  db_bench: { m: ["Chest", "Front delts, triceps"], s: ["Sit with dumbbells on your thighs, then lie back and bring them to the sides of your chest.", "Pull your shoulder blades back, feet flat.", "Press the dumbbells up until your arms are straight over your chest.", "Lower slowly until they're level with your chest."], c: ["Elbows about 45 degrees from your body", "Wrists stacked over elbows", "Deep stretch at the bottom"], x: ["Clanging the dumbbells together at the top", "Dropping too fast"] },
  incline_db: { m: ["Upper chest", "Front delts, triceps"], s: ["Set the bench to about 30 degrees.", "Lie back with dumbbells beside your upper chest.", "Press up until your arms are straight over your shoulders.", "Lower under control to the start."], c: ["Shoulder blades back", "Elbows slightly tucked", "Full stretch at the bottom"], x: ["Arching off the bench", "Partial reps"] },
  chest_press: { m: ["Chest", "Front delts, triceps"], s: ["Adjust the seat so the handles are level with your mid-chest.", "Sit back with your shoulder blades against the pad.", "Press the handles forward until your arms are straight.", "Return slowly until you feel a stretch in your chest."], c: ["Back stays on the pad", "Smooth push", "Don't let the stack touch between reps"], x: ["Seat too low or high", "Shrugging your shoulders up"] },
  pec_deck: { m: ["Chest", "Front delts"], s: ["Set the seat so the handles are at chest height.", "Sit tall and grab the handles (or put your forearms on the pads) with a slight elbow bend.", "Bring your arms together in front of your chest in a hugging motion.", "Open back up slowly until you feel a stretch."], c: ["Lead with the elbows", "Squeeze for a second", "Slow return"], x: ["Letting the arms go too far back", "Bending and straightening the elbows"] },
  cable_fly: { m: ["Chest", "Front delts"], s: ["Set both pulleys high and grab a handle in each hand.", "Step forward into a split stance, arms out wide with a slight elbow bend.", "Bring your hands together in front of your lower chest in a wide arc.", "Let them open back up slowly."], c: ["Keep the same slight elbow bend", "Squeeze at the middle", "Lean slightly forward"], x: ["Turning it into a press", "Letting the weight pull your arms too far back"] },
  dip: { m: ["Chest, triceps", "Front delts"], s: ["Support yourself on the bars with straight arms.", "Lean slightly forward and lower yourself until your upper arms are about parallel to the floor.", "Press back up until your arms are straight."], c: ["Shoulders down, away from your ears", "Slight forward lean works chest more", "Controlled depth"], x: ["Dropping too deep and straining the shoulders", "Swinging the legs"] },
  pushup: { m: ["Chest, triceps", "Front delts, core"], s: ["Set your hands a little wider than shoulders, body in a straight line from head to heels.", "Lower your chest toward the floor, elbows about 45 degrees from your body.", "Push back up until your arms are straight."], c: ["Squeeze glutes and brace your core", "Chest touches first, not hips", "Full lockout"], x: ["Hips sagging", "Head poking forward"] },
  hrpu: { m: ["Chest, triceps", "Front delts, core"], s: ["Start in a push-up position with your body straight.", "Lower your whole body to the floor in one piece.", "With your chest on the floor, lift your hands and move your arms out into a T, then bring them back under your shoulders.", "Push back up to the start in a straight line. That's one rep."], c: ["Body moves as one straight plank", "Hands fully leave the floor at the bottom", "Steady pace you can hold for two minutes"], x: ["Hips rising first on the way up", "Not fully releasing the hands"], n: "Army Fitness Test event: as many correct reps as you can in two minutes." },
  row: { m: ["Upper back, lats", "Rear delts, biceps, lower back"], s: ["Hold the bar with a shoulder-width overhand grip.", "Hinge forward until your torso is about 45 degrees or lower, knees slightly bent.", "Pull the bar to your lower ribs, squeezing your shoulder blades together.", "Lower it until your arms are straight."], c: ["Flat back the whole set", "Elbows drive back, not out", "Torso stays still"], x: ["Standing up more each rep", "Jerking the weight with the hips"] },
  pullup: { m: ["Lats", "Biceps, upper back, core"], s: ["Hang from the bar with an overhand grip a little wider than your shoulders.", "Pull your shoulder blades down, then pull your chest toward the bar.", "Get your chin over the bar.", "Lower all the way down to straight arms."], c: ["Start each rep from a dead hang", "Drive your elbows down to your sides", "No kicking"], x: ["Half reps", "Swinging to get up"] },
  chinup: { m: ["Lats, biceps", "Upper back, core"], s: ["Hang from the bar with palms facing you, about shoulder width.", "Pull your chest toward the bar.", "Get your chin over the bar.", "Lower to straight arms."], c: ["Full hang between reps", "Elbows down and back", "Stay still, no swinging"], x: ["Shrugging up instead of pulling", "Stopping short at the bottom"] },
  lat_pulldown: { m: ["Lats", "Biceps, upper back"], s: ["Sit with your thighs snug under the pads and grab the bar a little wider than shoulders.", "Lean back slightly and pull the bar to your upper chest.", "Squeeze your lats, then let the bar rise until your arms are straight."], c: ["Pull elbows down to your sides", "Chest up to meet the bar", "Slow on the way up"], x: ["Leaning way back and using momentum", "Pulling the bar behind your neck"] },
  seated_row: { m: ["Upper back, lats", "Biceps, rear delts"], s: ["Sit with your feet on the platform, knees slightly bent, and grab the handle.", "Sit tall with arms straight in front of you.", "Pull the handle to your stomach, squeezing your shoulder blades together.", "Let it go forward slowly until your arms are straight."], c: ["Chest up", "Squeeze your shoulder blades", "Torso only moves a little"], x: ["Rocking far back and forth", "Shrugging the shoulders"] },
  db_row: { m: ["Lats, upper back", "Biceps, rear delts"], s: ["Put one knee and the same-side hand on a bench, back flat.", "Hold a dumbbell in the other hand, arm straight.", "Pull the dumbbell toward your hip, elbow close to your side.", "Lower it until your arm is straight. Finish the set, then switch sides."], c: ["Pull toward the hip, not the shoulder", "Flat back", "Don't twist your torso"], x: ["Rotating your torso to heave it up", "Shrugging"] },
  tbar_row: { m: ["Upper back, lats", "Biceps, rear delts, lower back"], s: ["Straddle the bar and grab the handles, chest on the pad if the machine has one.", "Hinge forward with a flat back.", "Pull the handles toward your chest.", "Lower until your arms are straight."], c: ["Chest stays up", "Elbows back", "Control the lowering"], x: ["Rounding the back", "Bouncing the weight"] },
  machine_row: { m: ["Upper back, lats", "Biceps, rear delts"], s: ["Adjust the seat so the handles are at chest height and your chest is against the pad.", "Grab the handles with straight arms.", "Pull until your elbows pass your torso, squeezing your shoulder blades.", "Return slowly."], c: ["Chest stays on the pad", "Lead with the elbows", "Full stretch each rep"], x: ["Leaning back off the pad"] },
  straight_arm: { m: ["Lats", "Triceps (long head), core"], s: ["Face a high cable with a bar or rope, arms straight in front at eye level.", "Hinge forward slightly.", "Keeping your arms straight, sweep the handle down to your thighs.", "Let it rise slowly back up."], c: ["Arms stay straight", "Think about pulling with your armpits", "No body swing"], x: ["Bending the elbows to make it a pushdown"] },
  back_ext: { m: ["Lower back, glutes", "Hamstrings"], s: ["Set the pad just below your hip bones and hook your heels under the foot pads.", "Cross your arms over your chest.", "Lower your torso by bending at the hips.", "Raise back up until your body is in a straight line."], c: ["Move at the hips", "Stop at a straight line", "Squeeze your glutes at the top"], x: ["Over-arching at the top", "Pad set too high"] },
  ohp: { m: ["Shoulders", "Triceps, upper chest, core"], s: ["Start with the bar on the front of your shoulders, hands just outside shoulder width.", "Squeeze your glutes and brace your core.", "Press the bar straight up, moving your head back slightly so it clears.", "Lock out overhead with the bar over your mid-foot, then lower back to your shoulders."], c: ["Glutes tight, ribs down", "Head through once the bar passes", "Bar travels in a straight line"], x: ["Leaning way back", "Pushing the bar out in front"] },
  db_shoulder: { m: ["Shoulders", "Triceps"], s: ["Sit on an upright bench with dumbbells at shoulder height, palms forward.", "Press them up until your arms are straight overhead.", "Lower back to shoulder height."], c: ["Back against the pad", "Wrists over elbows", "Full lockout"], x: ["Arching the back", "Lowering only halfway"] },
  machine_shoulder: { m: ["Shoulders", "Triceps"], s: ["Set the seat so the handles start at shoulder height.", "Sit tall against the pad.", "Press up to straight arms.", "Lower slowly to the start."], c: ["Back on the pad", "Smooth press", "Don't let the stack rest"], x: ["Shrugging the shoulders up"] },
  lateral: { m: ["Side delts", "Upper traps"], s: ["Stand with light dumbbells at your sides, slight bend in the elbows.", "Raise the dumbbells out to your sides until your arms are level with your shoulders.", "Lower slowly."], c: ["Lead with the elbows", "Pinkies slightly up", "Slow and controlled"], x: ["Swinging the body", "Shrugging the weight up"] },
  cable_lateral: { m: ["Side delts", ""], s: ["Stand side-on to a low pulley and take the handle in the far hand.", "Raise your arm out to the side to shoulder height.", "Lower slowly across your body. Do all reps, then switch sides."], c: ["Slight elbow bend", "Lead with the elbow", "Steady tension the whole way"], x: ["Leaning away to swing it up"] },
  rear_delt: { m: ["Rear delts", "Upper back"], s: ["Sit facing the pec deck with handles at shoulder height.", "With a slight elbow bend, pull your arms out and back in a wide arc.", "Return slowly until your hands are in front of you."], c: ["Keep the arms nearly straight", "Squeeze at the back", "Light weight, strict form"], x: ["Pulling with the arms bent like a row", "Shrugging"] },
  face_pull: { m: ["Rear delts", "Upper back, rotator cuff"], s: ["Set a rope at upper-chest to face height.", "Hold the rope with thumbs toward you and step back.", "Pull the rope toward your face, spreading your hands apart and rotating so your fists end beside your ears.", "Return slowly."], c: ["Elbows high", "Pull the rope apart", "Squeeze the back of the shoulders"], x: ["Leaning way back", "Elbows dropping into a row"] },
  shrug: { m: ["Upper traps", "Grip"], s: ["Stand with dumbbells at your sides.", "Shrug your shoulders straight up toward your ears.", "Pause, then lower slowly."], c: ["Straight up and down", "Pause at the top", "Arms stay straight"], x: ["Rolling the shoulders", "Bending the elbows"] },
  bb_curl: { m: ["Biceps", "Forearms"], s: ["Stand holding the bar with an underhand grip, shoulder width.", "Keep your elbows at your sides and curl the bar up toward your shoulders.", "Lower slowly to straight arms."], c: ["Elbows stay pinned", "Squeeze at the top", "Slow lowering"], x: ["Swinging the hips", "Elbows drifting forward"] },
  db_curl: { m: ["Biceps", "Forearms"], s: ["Stand with dumbbells at your sides, palms facing forward.", "Curl both dumbbells up, keeping your elbows at your sides.", "Lower slowly to straight arms."], c: ["Elbows still", "Full range", "Control the lowering"], x: ["Swinging", "Half reps"] },
  hammer: { m: ["Biceps, brachialis", "Forearms"], s: ["Stand with dumbbells at your sides, palms facing in.", "Curl them up with your palms still facing in.", "Lower slowly."], c: ["Neutral grip throughout", "Elbows pinned", "No body swing"], x: ["Letting the elbows travel forward"] },
  cable_curl: { m: ["Biceps", "Forearms"], s: ["Stand facing a low pulley with a straight bar.", "Curl the bar toward your shoulders, elbows at your sides.", "Lower until your arms are straight."], c: ["Elbows fixed", "Constant tension", "Squeeze at the top"], x: ["Leaning back to finish reps"] },
  preacher: { m: ["Biceps", "Forearms"], s: ["Sit with the backs of your upper arms flat on the pad.", "Curl the handles up toward your shoulders.", "Lower slowly until your arms are nearly straight."], c: ["Upper arms stay on the pad", "Slow on the way down", "Stop just short of locking out"], x: ["Lifting the elbows off the pad", "Dropping the weight quickly at the bottom"] },
  pushdown: { m: ["Triceps", ""], s: ["Face a high pulley holding a bar or rope.", "Pin your elbows to your sides.", "Push down until your arms are straight.", "Let it come up until your forearms are about parallel to the floor."], c: ["Elbows don't move", "Lock out and squeeze", "Slight forward lean"], x: ["Elbows flaring or drifting forward", "Using the body to push"] },
  oh_ext: { m: ["Triceps (long head)", ""], s: ["Face away from the cable holding a rope overhead, elbows pointing forward.", "Stagger your stance and lean forward slightly.", "Straighten your arms overhead.", "Bend back slowly behind your head."], c: ["Elbows stay in close", "Full stretch behind the head", "Core braced"], x: ["Elbows flaring out wide", "Arching the lower back"] },
  skull: { m: ["Triceps", ""], s: ["Lie on a bench holding an EZ bar over your chest with straight arms.", "Bend only at the elbows to lower the bar toward your forehead or just behind it.", "Straighten your arms back up."], c: ["Upper arms stay still, angled slightly back", "Control the lowering", "Elbows pointing up"], x: ["Elbows flaring out", "Turning it into a press"] },
  close_bench: { m: ["Triceps", "Chest, front delts"], s: ["Lie on the bench and grip the bar about shoulder width.", "Lower it to your lower chest, elbows tucked close.", "Press back up to lockout."], c: ["Elbows tucked", "Grip shoulder width, not narrower", "Full lockout"], x: ["Grip so narrow it strains the wrists", "Flaring the elbows"] },
  hang_leg: { m: ["Abs, hip flexors", "Grip"], s: ["Hang from a bar with straight arms.", "Raise your knees (or straight legs) up toward your chest by curling your pelvis.", "Lower slowly without swinging."], c: ["Curl the pelvis up", "Slow lowering", "Stay still"], x: ["Swinging for momentum", "Only lifting to hip height"] },
  cable_crunch: { m: ["Abs", ""], s: ["Kneel facing a high pulley holding a rope beside your head.", "Keep your hips still and crunch your ribs down toward your hips.", "Rise back up slowly."], c: ["Round the spine, don't hinge at the hips", "Hands stay by your head", "Exhale as you crunch"], x: ["Sitting back to pull with body weight"] },
  ab_wheel: { m: ["Abs", "Lats, shoulders"], s: ["Kneel holding the wheel under your shoulders.", "Brace and roll forward slowly, keeping your back flat.", "Go as far as you can without your lower back sagging.", "Pull back to the start using your abs."], c: ["Ribs down, glutes tight", "Only go as far as you control", "Slow both ways"], x: ["Lower back sagging", "Hips leading the return"] },
  plank: { m: ["Abs, core", "Shoulders, glutes"], s: ["Set your forearms on the floor, elbows under shoulders.", "Step your feet back so your body is straight from head to heels.", "Squeeze your glutes and brace your abs. Hold."], c: ["Straight line head to heels", "Don't hold your breath", "Push the floor away with your forearms"], x: ["Hips sagging or piking up"], n: "Army Fitness Test event: hold the forearm plank as long as you can with correct form." },
  dead_hang: { m: ["Grip, forearms", "Lats, shoulders"], s: ["Grab a pull-up bar with an overhand grip.", "Hang with straight arms and relaxed legs.", "Hold for time."], c: ["Shoulders engaged, not fully slack", "Breathe steadily", "Feet off the ground"], x: ["Kipping or swinging"] },
  farmer: { m: ["Grip, traps", "Core, legs"], s: ["Pick up heavy dumbbells or handles with a flat back.", "Stand tall, shoulders back.", "Walk with short, quick steps for the set distance.", "Set them down with control."], c: ["Tall posture", "Tight grip", "Short steps"], x: ["Leaning to one side", "Rounding the shoulders forward"] },
  sled_push: { m: ["Quads, glutes", "Calves, core, conditioning"], s: ["Grab the sled poles with straight or slightly bent arms.", "Lean forward so your body is at about 45 degrees.", "Drive the sled with short, powerful steps, pushing through the balls of your feet."], c: ["Low body angle", "Drive the knees", "Arms stay locked"], x: ["Standing too upright", "Long slow strides"] },
  sdc: { m: ["Whole body", "Conditioning"], s: ["Sprint 50 m down and back.", "Drag a 90 lb sled backward 50 m down and back.", "Lateral shuffle 50 m down and back.", "Carry two 40 lb kettlebells 50 m down and back.", "Sprint the final 50 m down and back."], c: ["Touch the line with hand and foot at each turn", "Low hips on the drag", "Quick feet on the shuffle"], x: ["Wasting time on the turns", "Going out too fast on the first sprint"], n: "Army Fitness Test event, scored on total time." },
  run2mi: { m: ["Conditioning", "Legs"], s: ["Warm up with an easy jog and a few strides.", "Run two miles at a pace you can hold the whole way.", "Pick it up over the last quarter mile."], c: ["Even pacing", "Relaxed shoulders", "Quick light steps"], x: ["Starting too fast", "Skipping the warm-up"], n: "Army Fitness Test event, scored on time." },
  run: { m: ["Conditioning", "Legs"], s: ["Warm up with an easy jog.", "Run your planned distance or time.", "Cool down with a few minutes of walking."], c: ["Tall posture", "Feet land under your hips", "Relaxed arms"], x: ["Overstriding and heel-slamming"] },
  sprints: { m: ["Conditioning, power", "Legs"], s: ["Warm up thoroughly.", "Sprint the set distance at near-max effort.", "Walk back to recover fully before the next rep."], c: ["Drive the knees", "Powerful arm swing", "Full recovery between reps"], x: ["Sprinting without a warm-up"] },
  row_erg: { m: ["Conditioning", "Legs, back, arms"], s: ["Sit with feet strapped in and grab the handle.", "Drive with your legs first, then lean back slightly, then pull the handle to your lower ribs.", "Return in reverse order: arms, then body, then bend the knees."], c: ["Legs, body, arms on the drive", "Arms, body, legs on the return", "Smooth rhythm"], x: ["Pulling with the arms first", "Bending the knees before the handle clears them"] },
  bike: { m: ["Conditioning", "Quads, glutes"], s: ["Set the seat so your knee is slightly bent at the bottom of the pedal stroke.", "Pedal at your planned resistance and pace."], c: ["Steady cadence", "Relaxed upper body", "Seat height matters"], x: ["Seat so low your knees cramp up"] },
  stairs: { m: ["Conditioning", "Glutes, quads, calves"], s: ["Step on and hold the rails lightly.", "Climb at a steady pace, pushing through your whole foot."], c: ["Stand tall", "Light touch on the rails", "Full steps"], x: ["Leaning on the rails to hold yourself up"] },
};

/* ================= Skeleton + animation ================= */
const L = { shin: 46, thigh: 48, torso: 58, ua: 31, fa: 29, foot: 15, neck: 12, head: 10 };
const rad = (a) => (a * Math.PI) / 180;
const D = (a) => [Math.cos(rad(a)), Math.sin(rad(a))];
const add = (p, a, l) => { const d = D(a); return [p[0] + d[0] * l, p[1] + d[1] * l]; };
const sub = (p, a, l) => add(p, a, -l);
const plus = (p, o) => [p[0] + o[0], p[1] + o[1]];
function ik(s, t, a, b, bend) {
  const dx = t[0] - s[0], dy = t[1] - s[1];
  let d = Math.hypot(dx, dy); const base = Math.atan2(dy, dx);
  if (d >= a + b - 0.01) return { j: [s[0] + Math.cos(base) * a, s[1] + Math.sin(base) * a], end: [s[0] + Math.cos(base) * (a + b), s[1] + Math.sin(base) * (a + b)] };
  d = Math.max(d, Math.abs(a - b) + 0.5);
  const c = Math.min(1, Math.max(-1, (a * a + d * d - b * b) / (2 * a * d)));
  const th = base + (bend || 1) * Math.acos(c);
  return { j: [s[0] + Math.cos(th) * a, s[1] + Math.sin(th) * a], end: t };
}
function solveSide(p) {
  const J = {};
  if (p.root === "wrist") {
    J.wrist = p.at; J.elbow = sub(J.wrist, p.fa, L.fa); J.shoulder = sub(J.elbow, p.ua, L.ua); J.hip = sub(J.shoulder, p.torso, L.torso);
    J.knee = sub(J.hip, p.thigh, L.thigh); J.ankle = sub(J.knee, p.shin, L.shin);
  } else if (p.root === "hip") {
    J.hip = p.at;
    if (p.legIK) { const r = ik(J.hip, p.legIK, L.thigh, L.shin, p.kb); J.knee = r.j; J.ankle = r.end; }
    else { J.knee = sub(J.hip, p.thigh, L.thigh); J.ankle = sub(J.knee, p.shin, L.shin); }
  } else {
    J.ankle = p.at || [0, 0]; J.knee = add(J.ankle, p.shin, L.shin); J.hip = add(J.knee, p.thigh, L.thigh);
  }
  if (!J.shoulder) J.shoulder = add(J.hip, p.torso, L.torso);
  const hd = p.torso + (p.hd || 0);
  J.neck = add(J.shoulder, hd, L.neck); J.head = add(J.neck, hd, L.head - 2);
  if (!J.wrist) {
    let target = p.handIK;
    if (p.handAt) target = plus(J[p.handAt], p.hOff || [0, 0]);
    if (target) { const r = ik(J.shoulder, target, L.ua, L.fa, p.eb); J.elbow = r.j; J.wrist = r.end; }
    else { J.elbow = add(J.shoulder, p.ua, L.ua); J.wrist = add(J.elbow, p.fa, L.fa); }
  }
  J.toe = p.toe || add(J.ankle, p.footA ?? 0, L.foot);
  if (p.leg2IK) { const r = ik(J.hip, p.leg2IK, L.thigh, L.shin, p.kb2); J.knee2 = r.j; J.ankle2 = r.end; }
  else if (p.thigh2 != null) { J.knee2 = sub(J.hip, p.thigh2, L.thigh); J.ankle2 = sub(J.knee2, p.shin2, L.shin); }
  if (J.ankle2) J.toe2 = add(J.ankle2, p.footA2 ?? 0, L.foot);
  if (p.hand2IK) { const r = ik(J.shoulder, p.hand2IK, L.ua, L.fa, p.eb2); J.elbow2 = r.j; J.wrist2 = r.end; }
  else if (p.ua2 != null) { J.elbow2 = add(J.shoulder, p.ua2, L.ua); J.wrist2 = add(J.elbow2, p.fa2, L.fa); }
  return J;
}
function solveFront(p) {
  const hy = p.sit ? 52 : 94, sh = p.shrug || 0;
  const J = { hipC: [0, hy], hipL: [-10, hy], hipR: [10, hy], neck: [0, hy + 60 + sh], shL: [-18, hy + 55 + sh], shR: [18, hy + 55 + sh], head: [0, hy + 76 + sh * 0.4] };
  for (const s of ["R", "L"]) {
    const m = s === "R" ? 1 : -1, mir = (a) => (s === "R" ? a : 180 - a);
    const a = p["a" + s] ?? p.aR, k = p["k" + s] ?? p.kR ?? 1, fa = p["fa" + s] ?? p.faR ?? a, kf = p["kf" + s] ?? p.kfR ?? k;
    J["el" + s] = add(J["sh" + s], mir(a), L.ua * k); J["wr" + s] = add(J["el" + s], mir(fa), L.fa * kf);
    const sp = p.spread || 0;
    if (p.sit) { J["kn" + s] = add(J["hip" + s], 270 + m * (12 + sp), L.thigh * 0.35); J["an" + s] = add(J["kn" + s], 270 + m * sp * 0.15, L.shin); }
    else { J["kn" + s] = add(J["hip" + s], 270 + m * (3 + sp), L.thigh); J["an" + s] = add(J["kn" + s], 270 + m * (2 + sp), L.shin); }
    J["to" + s] = add(J["an" + s], 270 + m * 70, 9);
  }
  return J;
}
const lerp = (a, b, t) => a + (b - a) * t;
function interp(A, B, t) {
  const out = {};
  for (const k of Object.keys(A)) {
    const a = A[k], b = B[k];
    if (typeof a === "number" && typeof b === "number") out[k] = lerp(a, b, t);
    else if (Array.isArray(a) && Array.isArray(b)) out[k] = a.map((v, i) => lerp(v, b[i], t));
    else out[k] = a;
  }
  return out;
}
const ease = (t) => 0.5 - Math.cos(Math.PI * t) / 2;

/* ================= Poses ================= */
const STAND = { root: "ankle", at: [0, 0], shin: 90, thigh: 90, torso: 90 };
const SEAT = { root: "hip", at: [0, 50], thigh: 180, shin: 90 };
const LIE = { root: "hip", at: [40, 46], thigh: 175, shin: 100, torso: 180 };
const HANG = { root: "wrist", at: [0, 232], fa: 90, ua: 90, torso: 92, thigh: 95, shin: 62 };
const BENCH = [{ t: "rect", x: -46, y: 30, w: 100, h: 9 }, { t: "line", pts: [[-30, 30], [-30, 0]] }, { t: "line", pts: [[40, 30], [40, 0]] }];
const pp = (A, B, extra) => ({ frames: [A, B], mode: "pp", ...extra });
const legs = (t1, s1, t2, s2) => ({ thigh: t1, shin: s1, thigh2: t2, shin2: s2 });
function walkFrames(o) {
  const f = (a, b) => ({ root: "hip", at: [0, o.hipY || 92], torso: o.torso || 88, ...a, ...b });
  const L1 = legs(o.fT, o.fS, o.bT, o.bS), L2 = legs(o.bT, o.bS, o.fT, o.fS);
  return [f(L1, o.arms1 || {}), f(L2, o.arms2 || {})];
}
const RUN = { fT: 122, fS: 112, bT: 62, bS: 25, hipY: 86, torso: 80, arms1: { ua: 235, fa: 330, ua2: 305, fa2: 70 }, arms2: { ua: 305, fa: 70, ua2: 235, fa2: 330 } };
const WALK = { fT: 106, fS: 104, bT: 76, bS: 66, hipY: 92, torso: 89 };

const A = {
  squat: pp({ ...STAND, handAt: "shoulder", hOff: [-5, 1], eb: 1 }, { root: "ankle", at: [0, 0], shin: 62, thigh: 170, torso: 52, handAt: "shoulder", hOff: [-5, 1], eb: 1 }, { eq: [{ t: "plate", at: "wrist", r: 22 }] }),
  front_squat: pp({ ...STAND, ua: 10, fa: 170 }, { root: "ankle", at: [0, 0], shin: 56, thigh: 172, torso: 70, ua: -10, fa: 150 }, { eq: [{ t: "plate", at: "wrist", r: 22 }] }),
  goblet: pp({ ...STAND, handAt: "shoulder", hOff: [13, -14], eb: -1 }, { root: "ankle", at: [0, 0], shin: 58, thigh: 172, torso: 66, handAt: "shoulder", hOff: [13, -14], eb: -1 }, { eq: [{ t: "db", at: "wrist", v: true }] }),
  hack_squat: pp({ root: "ankle", at: [0, 0], shin: 84, thigh: 98, torso: 100, ua: 280, fa: 95 }, { root: "ankle", at: [0, 0], shin: 52, thigh: 172, torso: 74, ua: 255, fa: 70 }, { eq: [{ t: "pad", along: ["hip", "shoulder"], off: -9 }, { t: "line", pts: [[-60, 0], [60, 0]] }] }),
  leg_press: pp({ root: "hip", at: [0, 40], legIK: [64, 104], kb: 1, torso: 128, handAt: "hip", hOff: [10, -4], eb: -1 }, { root: "hip", at: [0, 40], legIK: [42, 82], kb: 1, torso: 128, handAt: "hip", hOff: [10, -4], eb: -1 }, { eq: [{ t: "platform", at: "ankle", a: 135, len: 26 }, { t: "line", pts: [[-60, 70], [0, 32], [26, 32]] }, { t: "line", pts: [[20, 32], [20, 0]] }] }),
  deadlift: pp({ root: "ankle", at: [0, 0], shin: 65, thigh: 160, torso: 33, ua: 262, fa: 262 }, { ...STAND, torso: 92, ua: 274, fa: 274 }, { eq: [{ t: "plate", at: "wrist", r: 23 }] }),
  trap_dl: pp({ root: "ankle", at: [0, 0], shin: 60, thigh: 165, torso: 45, ua: 270, fa: 270 }, { ...STAND, ua: 270, fa: 270 }, { eq: [{ t: "plate", at: "wrist", r: 23 }, { t: "hbar", at: "wrist", w: 36 }] }),
  rdl: pp({ ...STAND, torso: 92, ua: 274, fa: 274 }, { root: "ankle", at: [0, 0], shin: 82, thigh: 125, torso: 20, ua: 250, fa: 252 }, { eq: [{ t: "plate", at: "wrist", r: 22 }] }),
  hip_thrust: pp({ root: "ankle", at: [0, 0], shin: 95, thigh: 220, torso: 150, handAt: "hip", hOff: [2, 8], eb: 1 }, { root: "ankle", at: [0, 0], shin: 95, thigh: 180, torso: 182, handAt: "hip", hOff: [2, 8], eb: 1 }, { eq: [{ t: "rect", x: -140, y: 0, w: 46, h: 40 }, { t: "plate", at: "hip", r: 19, dy: 14 }] }),
  bulgarian: pp({ root: "ankle", at: [40, 0], shin: 88, thigh: 100, torso: 88, leg2IK: [-45, 46], kb2: 1, footA2: 180, ua: 270, fa: 270 }, { root: "ankle", at: [40, 0], shin: 70, thigh: 178, torso: 82, leg2IK: [-45, 46], kb2: 1, footA2: 180, ua: 270, fa: 270 }, { eq: [{ t: "rect", x: -75, y: 0, w: 36, h: 40 }, { t: "db", at: "wrist" }] }),
  lunge: pp({ root: "ankle", at: [40, 0], shin: 90, thigh: 96, torso: 90, leg2IK: [-22, 12], kb2: 1, footA2: 300, ua: 270, fa: 270 }, { root: "ankle", at: [40, 0], shin: 72, thigh: 178, torso: 88, leg2IK: [-22, 12], kb2: 1, footA2: 300, ua: 270, fa: 270 }, { eq: [{ t: "db", at: "wrist" }] }),
  leg_ext: pp({ ...SEAT, torso: 95, shin: 90, handAt: "hip", hOff: [6, -6], eb: -1 }, { ...SEAT, torso: 95, shin: 172, handAt: "hip", hOff: [6, -6], eb: -1 }, { eq: [{ t: "seat", at: "hip" }, { t: "roll", at: "ankle", dx: 5 }, { t: "line", pts: [[-14, 46], [-24, 120]] }] }),
  leg_curl: pp({ root: "hip", at: [10, 46], torso: 180, thigh: 180, shin: 180, footA: 270, handIK: [-68, 34], eb: -1, hd: -10 }, { root: "hip", at: [10, 46], torso: 180, thigh: 180, shin: 280, footA: 0, handIK: [-68, 34], eb: -1, hd: -10 }, { eq: [{ t: "rect", x: -70, y: 31, w: 130, h: 8 }, { t: "line", pts: [[-50, 31], [-50, 0]] }, { t: "line", pts: [[40, 31], [40, 0]] }, { t: "roll", at: "ankle", dx: 0, dy: 6 }] }),
  seated_leg_curl: pp({ ...SEAT, torso: 92, shin: 175, handAt: "hip", hOff: [6, -6], eb: -1 }, { ...SEAT, torso: 92, shin: 62, handAt: "hip", hOff: [6, -6], eb: -1 }, { eq: [{ t: "seat", at: "hip" }, { t: "roll", at: "ankle", dx: 0, dy: -6 }, { t: "pad", along: ["hip", "knee"], off: 10 }, { t: "line", pts: [[-14, 46], [-24, 120]] }] }),
  hip_abd: pp({ view: "front", sit: true, aR: 275, faR: 275, spread: 0 }, { view: "front", sit: true, aR: 275, faR: 275, spread: 42 }, { eq: [{ t: "fseat" }] }),
  calf_raise: pp({ ...STAND, at: [0, 18], footA: 330, toe: [13, 10], handAt: "shoulder", hOff: [-4, 4], eb: 1 }, { ...STAND, at: [0, 26], toe: [13, 10], handAt: "shoulder", hOff: [-4, 4], eb: 1 }, { eq: [{ t: "rect", x: 2, y: 0, w: 24, h: 10 }, { t: "pad", along: ["shoulder", "neck"], off: 0, short: true }] }),
  seated_calf: pp({ ...SEAT, at: [0, 52], shin: 92, toe: [62, 10], handAt: "knee", hOff: [4, 10], eb: -1, torso: 92 }, { ...SEAT, at: [0, 58], shin: 92, toe: [62, 10], handAt: "knee", hOff: [4, 10], eb: -1, torso: 92 }, { eq: [{ t: "rect", x: 50, y: 0, w: 22, h: 10 }, { t: "roll", at: "knee", dx: -4, dy: 8 }, { t: "seat", at: "hip" }] }),
  bench: pp({ ...LIE, ua: 90, fa: 90 }, { ...LIE, ua: 300, fa: 95 }, { eq: [...BENCH, { t: "plate", at: "wrist", r: 22 }] }),
  close_bench: pp({ ...LIE, ua: 90, fa: 90 }, { ...LIE, ua: 290, fa: 92 }, { eq: [...BENCH, { t: "plate", at: "wrist", r: 22 }] }),
  db_bench: pp({ ...LIE, ua: 90, fa: 90 }, { ...LIE, ua: 300, fa: 95 }, { eq: [...BENCH, { t: "db", at: "wrist" }] }),
  incline_bench: pp({ root: "hip", at: [30, 44], thigh: 180, shin: 95, torso: 145, ua: 92, fa: 92 }, { root: "hip", at: [30, 44], thigh: 180, shin: 95, torso: 145, ua: 300, fa: 88 }, { eq: [{ t: "line", pts: [[-42, 74], [26, 30], [60, 30]] }, { t: "line", pts: [[20, 30], [20, 0]] }, { t: "plate", at: "wrist", r: 22 }] }),
  incline_db: pp({ root: "hip", at: [30, 44], thigh: 180, shin: 95, torso: 145, ua: 92, fa: 92 }, { root: "hip", at: [30, 44], thigh: 180, shin: 95, torso: 145, ua: 300, fa: 88 }, { eq: [{ t: "line", pts: [[-42, 74], [26, 30], [60, 30]] }, { t: "line", pts: [[20, 30], [20, 0]] }, { t: "db", at: "wrist" }] }),
  chest_press: pp({ ...SEAT, torso: 95, ua: 196, fa: 14 }, { ...SEAT, torso: 95, ua: 2, fa: 2 }, { eq: [{ t: "seat", at: "hip" }, { t: "pad", along: ["hip", "shoulder"], off: -8 }, { t: "handle", at: "wrist" }] }),
  pec_deck: pp({ view: "front", sit: true, aR: 2, kR: 1, faR: 92, kfR: 1 }, { view: "front", sit: true, aR: 180, kR: 0.32, faR: 92, kfR: 1 }, { eq: [{ t: "fseat" }, { t: "fpads" }] }),
  cable_fly: pp({ view: "front", aR: 12, kR: 1, faR: 4, kfR: 1 }, { view: "front", aR: 196, kR: 0.32, faR: 216, kfR: 0.32 }, { eq: [{ t: "fcable", to: [100, 200] }] }),
  dip: pp({ root: "wrist", at: [0, 110], fa: 270, ua: 270, torso: 92, thigh: 100, shin: 50 }, { root: "wrist", at: [0, 110], fa: 315, ua: 210, torso: 75, thigh: 95, shin: 45 }, { noFloor: false, eq: [{ t: "line", pts: [[-26, 108], [30, 108]] }, { t: "line", pts: [[-20, 108], [-20, 0]] }, { t: "line", pts: [[24, 108], [24, 0]] }] }),
  pushup: pp({ root: "ankle", at: [0, 13], shin: 18, thigh: 18, torso: 18, footA: 270, ua: 260, fa: 260, hd: -6 }, { root: "ankle", at: [0, 13], shin: 9, thigh: 9, torso: 9, footA: 270, ua: 195, fa: 280, hd: -6 }),
  hrpu: { mode: "seq", dur: 0.9, frames: [
    { root: "ankle", at: [0, 13], shin: 18, thigh: 18, torso: 18, footA: 270, ua: 260, fa: 260, hd: -6 },
    { root: "ankle", at: [0, 11], shin: 3, thigh: 3, torso: 3, footA: 270, ua: 195, fa: 280, hd: -6 },
    { root: "ankle", at: [0, 11], shin: 3, thigh: 3, torso: 3, footA: 270, ua: 178, fa: 178, hd: -6 },
    { root: "ankle", at: [0, 11], shin: 3, thigh: 3, torso: 3, footA: 270, ua: 195, fa: 280, hd: -6 },
  ] },
  plank: pp({ root: "ankle", at: [0, 13], shin: 7, thigh: 7, torso: 7, footA: 270, ua: 270, fa: 2, hd: -4 }, { root: "ankle", at: [0, 13], shin: 7.6, thigh: 7.4, torso: 7.2, footA: 270, ua: 270, fa: 2, hd: -2 }, { dur: 3 }),
  ohp: pp({ ...STAND, ua: 300, fa: 95 }, { ...STAND, ua: 92, fa: 90 }, { eq: [{ t: "plate", at: "wrist", r: 22 }] }),
  db_shoulder: pp({ ...SEAT, torso: 92, ua: 300, fa: 95 }, { ...SEAT, torso: 92, ua: 92, fa: 92 }, { eq: [{ t: "seat", at: "hip" }, { t: "pad", along: ["hip", "shoulder"], off: -8 }, { t: "db", at: "wrist" }] }),
  machine_shoulder: pp({ ...SEAT, torso: 92, ua: 300, fa: 95 }, { ...SEAT, torso: 92, ua: 92, fa: 92 }, { eq: [{ t: "seat", at: "hip" }, { t: "pad", along: ["hip", "shoulder"], off: -8 }, { t: "handle", at: "wrist" }] }),
  row: pp({ root: "ankle", at: [0, 0], shin: 80, thigh: 130, torso: 18, ua: 268, fa: 268 }, { root: "ankle", at: [0, 0], shin: 80, thigh: 130, torso: 18, ua: 195, fa: 290 }, { eq: [{ t: "plate", at: "wrist", r: 22 }] }),
  tbar_row: pp({ root: "ankle", at: [0, 0], shin: 80, thigh: 130, torso: 25, ua: 268, fa: 268 }, { root: "ankle", at: [0, 0], shin: 80, thigh: 130, torso: 25, ua: 195, fa: 290 }, { eq: [{ t: "landmine", at: "wrist", to: [-90, 2] }, { t: "plate", at: "wrist", r: 18, dx: 10 }] }),
  db_row: pp({ root: "ankle", at: [0, 0], shin: 82, thigh: 125, torso: 12, ua: 270, fa: 270, ua2: 268, fa2: 272 }, { root: "ankle", at: [0, 0], shin: 82, thigh: 125, torso: 12, ua: 190, fa: 285, ua2: 268, fa2: 272 }, { eq: [{ t: "rect", x: 16, y: 0, w: 46, h: 34 }, { t: "db", at: "wrist" }] }),
  seated_row: pp({ root: "hip", at: [0, 28], thigh: 200, shin: 135, footA: 80, torso: 72, ua: 350, fa: 352 }, { root: "hip", at: [0, 28], thigh: 200, shin: 135, footA: 80, torso: 98, ua: 195, fa: 8 }, { eq: [{ t: "rect", x: -20, y: 14, w: 34, h: 6 }, { t: "cable", from: "wrist", to: [128, 30] }, { t: "handle", at: "wrist" }, { t: "platform", at: "ankle", a: 80, len: 18 }] }),
  machine_row: pp({ ...SEAT, torso: 90, ua: 2, fa: 2 }, { ...SEAT, torso: 90, ua: 190, fa: 8 }, { eq: [{ t: "seat", at: "hip" }, { t: "pad", along: ["hip", "shoulder"], off: 16, short: true }, { t: "handle", at: "wrist" }] }),
  pullup: pp(HANG, { ...HANG, fa: 76, ua: 300, torso: 86, thigh: 100 }, { noFloor: true, eq: [{ t: "line", pts: [[-50, 234], [50, 234]] }] }),
  chinup: pp(HANG, { ...HANG, fa: 76, ua: 300, torso: 86, thigh: 100 }, { noFloor: true, eq: [{ t: "line", pts: [[-50, 234], [50, 234]] }] }),
  dead_hang: pp(HANG, { ...HANG, torso: 93, thigh: 97 }, { dur: 3, noFloor: true, eq: [{ t: "line", pts: [[-50, 234], [50, 234]] }] }),
  hang_leg: pp({ ...HANG, thigh: 90, shin: 88 }, { ...HANG, torso: 96, thigh: 192, shin: 95 }, { noFloor: true, eq: [{ t: "line", pts: [[-50, 234], [50, 234]] }] }),
  lat_pulldown: pp({ ...SEAT, torso: 100, ua: 96, fa: 96 }, { ...SEAT, torso: 104, ua: 265, fa: 70 }, { eq: [{ t: "seat", at: "hip" }, { t: "cable", from: "wrist", to: [6, 232] }, { t: "hbar", at: "wrist", w: 40 }, { t: "roll", at: "knee", dx: -4, dy: 9 }] }),
  straight_arm: pp({ root: "ankle", at: [0, 0], shin: 84, thigh: 100, torso: 72, ua: 40, fa: 42 }, { root: "ankle", at: [0, 0], shin: 84, thigh: 100, torso: 72, ua: 278, fa: 280 }, { eq: [{ t: "cable", from: "wrist", to: [100, 210] }, { t: "hbar", at: "wrist", w: 30 }] }),
  face_pull: pp({ ...STAND, torso: 96, ua: 2, fa: 2 }, { ...STAND, torso: 96, ua: 176, fa: 68 }, { eq: [{ t: "cable", from: "wrist", to: [120, 170] }, { t: "handle", at: "wrist" }] }),
  back_ext: pp({ root: "hip", at: [0, 92], thigh: 45, shin: 45, footA: 315, torso: -70, handAt: "shoulder", hOff: [0, 0], eb: 1 }, { root: "hip", at: [0, 92], thigh: 45, shin: 45, footA: 315, torso: 45, handAt: "shoulder", hOff: [0, 0], eb: 1 }, { eq: [{ t: "roll", at: "hip", dx: 4, dy: -10 }, { t: "roll", at: "ankle", dx: 6, dy: -4 }, { t: "line", pts: [[8, 82], [-70, 4]] }] }),
  shrug: pp({ view: "front", aR: 272, faR: 272 }, { view: "front", aR: 272, faR: 272, shrug: 8 }, { eq: [{ t: "fdb" }] }),
  lateral: pp({ view: "front", aR: 280, faR: 282 }, { view: "front", aR: 360, faR: 352 }, { eq: [{ t: "fdb" }] }),
  cable_lateral: pp({ view: "front", aR: 245, faR: 250, aL: 270, faL: 270 }, { view: "front", aR: 360, faR: 352, aL: 270, faL: 270 }, { eq: [{ t: "fcable1", to: [-70, 6] }] }),
  rear_delt: pp({ view: "front", sit: true, aR: 190, kR: 0.32, faR: 190, kfR: 0.32 }, { view: "front", sit: true, aR: 0, kR: 1, faR: 0, kfR: 1 }, { eq: [{ t: "fseat" }, { t: "fhandles" }] }),
  bb_curl: pp({ ...STAND, ua: 268, fa: -92 }, { ...STAND, ua: 274, fa: 100 }, { eq: [{ t: "plate", at: "wrist", r: 14 }] }),
  db_curl: pp({ ...STAND, ua: 268, fa: -92 }, { ...STAND, ua: 274, fa: 100 }, { eq: [{ t: "db", at: "wrist" }] }),
  hammer: pp({ ...STAND, ua: 268, fa: -92 }, { ...STAND, ua: 274, fa: 100 }, { eq: [{ t: "db", at: "wrist", v: true }] }),
  cable_curl: pp({ ...STAND, ua: 268, fa: -88 }, { ...STAND, ua: 274, fa: 100 }, { eq: [{ t: "cable", from: "wrist", to: [70, 8] }, { t: "hbar", at: "wrist", w: 26 }] }),
  preacher: pp({ ...SEAT, torso: 82, ua: 315, fa: -38 }, { ...SEAT, torso: 82, ua: 315, fa: 98 }, { eq: [{ t: "seat", at: "hip" }, { t: "pad", along: ["shoulder", "elbow"], off: -5 }, { t: "handle", at: "wrist" }] }),
  pushdown: pp({ ...STAND, torso: 84, ua: 266, fa: 58 }, { ...STAND, torso: 84, ua: 266, fa: -86 }, { eq: [{ t: "cable", from: "wrist", to: [34, 222] }, { t: "handle", at: "wrist" }] }),
  oh_ext: pp({ root: "ankle", at: [0, 0], shin: 82, thigh: 96, torso: 76, ua: 108, fa: 250 }, { root: "ankle", at: [0, 0], shin: 82, thigh: 96, torso: 76, ua: 108, fa: 104 }, { eq: [{ t: "cable", from: "wrist", to: [-80, 150] }, { t: "handle", at: "wrist" }] }),
  skull: pp({ ...LIE, ua: 100, fa: 96 }, { ...LIE, ua: 104, fa: 205 }, { eq: [...BENCH, { t: "plate", at: "wrist", r: 13 }] }),
  cable_crunch: pp({ root: "ankle", at: [0, 4], shin: 0, thigh: 90, torso: 82, footA: 180, handAt: "head", hOff: [4, -8], eb: -1 }, { root: "ankle", at: [0, 4], shin: 0, thigh: 86, torso: 8, footA: 180, hd: -40, handAt: "head", hOff: [8, 0], eb: -1 }, { eq: [{ t: "cable", from: "wrist", to: [70, 220] }] }),
  ab_wheel: pp({ root: "ankle", at: [0, 4], shin: 0, thigh: 78, torso: 14, footA: 180, handIK: [114, 9], eb: -1 }, { root: "ankle", at: [0, 4], shin: 0, thigh: 22, torso: 4, footA: 180, handIK: [192, 9], eb: -1 }, { eq: [{ t: "wheel", at: "wrist", r: 9 }] }),
  farmer: { frames: walkFrames({ ...WALK, arms1: { ua: 270, fa: 270, ua2: 270, fa2: 270 }, arms2: { ua: 270, fa: 270, ua2: 270, fa2: 270 } }), mode: "pp", dur: 0.55, eq: [{ t: "db", at: "wrist" }, { t: "db", at: "wrist2" }] },
  run: { frames: walkFrames(RUN), mode: "pp", dur: 0.38 },
  run2mi: { frames: walkFrames(RUN), mode: "pp", dur: 0.38 },
  sprints: { frames: walkFrames({ ...RUN, fT: 132, bT: 52, torso: 76 }), mode: "pp", dur: 0.28 },
  sdc: { frames: walkFrames({ ...RUN, fT: 130, bT: 54, torso: 76 }), mode: "pp", dur: 0.3 },
  sled_push: { frames: walkFrames({ fT: 140, fS: 112, bT: 58, bS: 50, hipY: 76, torso: 34, arms1: { handIK: [96, 70], eb: -1, hand2IK: [96, 70], eb2: -1 }, arms2: { handIK: [96, 70], eb: -1, hand2IK: [96, 70], eb2: -1 } }), mode: "pp", dur: 0.45, eq: [{ t: "rect", x: 100, y: 0, w: 46, h: 30 }, { t: "line", pts: [[100, 30], [96, 74]] }] },
  stairs: { frames: [
    { root: "hip", at: [0, 104], torso: 86, legIK: [24, 36], kb: 1, leg2IK: [-6, 12], kb2: 1, handIK: [34, 120], eb: -1 },
    { root: "hip", at: [0, 104], torso: 86, legIK: [-6, 12], kb: 1, leg2IK: [24, 36], kb2: 1, handIK: [34, 120], eb: -1 },
  ], mode: "pp", dur: 0.6, eq: [{ t: "line", pts: [[-40, 12], [10, 12], [10, 36], [60, 36]] }, { t: "line", pts: [[34, 120], [60, 120], [60, 36]] }] },
  row_erg: pp({ root: "ankle", at: [60, 40], shin: 120, thigh: 225, torso: 62, footA: 70, handIK: [104, 66], eb: -1 }, { root: "ankle", at: [60, 40], shin: 165, thigh: 190, torso: 108, footA: 70, handIK: [-22, 74], eb: -1 }, { dur: 1.1, eq: [{ t: "line", pts: [[-80, 30], [90, 30]] }, { t: "seat", at: "hip", low: true }, { t: "cable", from: "wrist", to: [120, 62] }, { t: "circle", c: [128, 58], r: 20 }, { t: "handle", at: "wrist" }] }),
  bike: { mode: "loop", dur: 0.3, frames: [0, 90, 180, 270].map((a) => ({ root: "hip", at: [0, 96], torso: 62, handIK: [62, 108], eb: -1, legIK: [22 + 17 * Math.cos(rad(a)), 36 + 17 * Math.sin(rad(a))], kb: 1, leg2IK: [22 + 17 * Math.cos(rad(a + 180)), 36 + 17 * Math.sin(rad(a + 180))], kb2: 1, footA: 0, footA2: 0 })),
    eq: [{ t: "circle", c: [22, 36], r: 17 }, { t: "circle", c: [58, 26], r: 26 }, { t: "line", pts: [[-6, 92], [22, 36], [62, 100]] }, { t: "line", pts: [[-16, 92], [8, 92]] }] },
};

/* ================= Drawing ================= */
const f1 = (n) => Math.round(n * 10) / 10;
const P = (p) => `${f1(p[0])},${f1(-p[1])}`;
const line = (a, b, w, cls) => `<line x1="${f1(a[0])}" y1="${f1(-a[1])}" x2="${f1(b[0])}" y2="${f1(-b[1])}" stroke-width="${w}" class="${cls}" stroke-linecap="round"/>`;
const poly = (pts, w, cls) => `<polyline points="${pts.map(P).join(" ")}" stroke-width="${w}" class="${cls}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const circ = (c, r, cls) => `<circle cx="${f1(c[0])}" cy="${f1(-c[1])}" r="${f1(r)}" class="${cls}"/>`;
function drawEq(e, J) {
  const at = (k) => J[k] || [0, 0];
  switch (e.t) {
    case "plate": { const c = plus(at(e.at), [e.dx || 0, e.dy || 0]); return circ(c, e.r || 22, "g-plate"); }
    case "hub": { const c = plus(at(e.at), [e.dx || 0, e.dy || 0]); return circ(c, 4, "g-hub"); }
    case "db": { const c = at(e.at); return e.v ? `<rect x="${f1(c[0] - 4)}" y="${f1(-c[1] - 11)}" width="8" height="22" rx="3" class="g-load"/>` : `<rect x="${f1(c[0] - 11)}" y="${f1(-c[1] - 5)}" width="22" height="10" rx="3" class="g-load"/>`; }
    case "handle": { const c = at(e.at); return circ(c, 4.5, "g-load"); }
    case "hbar": { const c = at(e.at); return line([c[0] - e.w / 2, c[1]], [c[0] + e.w / 2, c[1]], 4, "g-loadline"); }
    case "cable": return line(at(e.from), e.to, 1.6, "g-cable") + circ(e.to, 5, "g-pulley");
    case "landmine": return line(at(e.at), e.to, 4, "g-loadline");
    case "wheel": return circ(at(e.at), e.r || 9, "g-plate") + circ(at(e.at), 2.5, "g-hub");
    case "rect": return `<rect x="${e.x}" y="${-(e.y + e.h)}" width="${e.w}" height="${e.h}" rx="2" class="g-equip"/>`;
    case "line": return poly(e.pts, 5, "g-frame");
    case "circle": return circ(e.c, e.r, "g-equip-o");
    case "seat": { const h = at("hip"); return `<rect x="${f1(h[0] - 16)}" y="${f1(-(h[1] - 7))}" width="34" height="7" rx="2" class="g-equip"/>` + (e.low ? "" : line([h[0], h[1] - 7], [h[0], 0], 5, "g-frame")); }
    case "pad": { const a = at(e.along[0]), b = at(e.along[1]); const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1; const nx = -dy / len * (e.off || 0), ny = dx / len * (e.off || 0); const s = e.short ? 0.35 : 1; return line([a[0] + nx, a[1] + ny], [a[0] + nx + dx * s, a[1] + ny + dy * s], 8, "g-pad"); }
    case "roll": { const c = plus(at(e.at), [e.dx || 0, e.dy || 0]); return circ(c, 6, "g-pad-c"); }
    case "platform": { const c = at(e.at); const a = add(c, e.a, e.len), b = sub(c, e.a, e.len); return line(plus(a, D(e.a - 90).map((v) => v * 6)), plus(b, D(e.a - 90).map((v) => v * 6)), 6, "g-frame"); }
    case "fdb": return ["wrR", "wrL"].map((k) => `<rect x="${f1(at(k)[0] - 5)}" y="${f1(-at(k)[1] - 9)}" width="10" height="18" rx="3" class="g-load"/>`).join("");
    case "fcable": return ["wrR", "wrL"].map((k, i) => { const to = [e.to[0] * (i ? -1 : 1), e.to[1]]; return line(at(k), to, 1.6, "g-cable") + circ(to, 5, "g-pulley") + circ(at(k), 4.5, "g-load"); }).join("");
    case "fcable1": return line(at("wrR"), e.to, 1.6, "g-cable") + circ(e.to, 5, "g-pulley") + circ(at("wrR"), 4.5, "g-load");
    case "fseat": return `<rect x="-24" y="${-(52 - 6)}" width="48" height="8" rx="2" class="g-equip"/>` + line([0, 46], [0, 0], 5, "g-frame") + `<rect x="-14" y="${-150}" width="28" height="92" rx="5" class="g-equip" opacity="0.55"/>`;
    case "fpads": return ["elR", "elL"].map((k) => line(at(k), plus(at(k), [0, 26]), 8, "g-pad")).join("");
    case "fhandles": return ["wrR", "wrL"].map((k) => circ(at(k), 4.5, "g-load")).join("");
    default: return "";
  }
}
/* Muscles highlighted per exercise (orange on the figure). */
const HL = {
  squat: "quads glutes", front_squat: "quads glutes", deadlift: "glutes hams lowback back", trap_dl: "quads glutes hams", rdl: "hams glutes",
  hip_thrust: "glutes hams", leg_press: "quads glutes", hack_squat: "quads", leg_ext: "quads", leg_curl: "hams", seated_leg_curl: "hams",
  goblet: "quads glutes", bulgarian: "quads glutes", lunge: "quads glutes", hip_abd: "glutes", calf_raise: "calves", seated_calf: "calves",
  bench: "chest triceps delts", incline_bench: "chest delts triceps", db_bench: "chest triceps", incline_db: "chest delts", chest_press: "chest triceps",
  pec_deck: "chest", cable_fly: "chest", dip: "chest triceps", pushup: "chest triceps", hrpu: "chest triceps",
  row: "back biceps", pullup: "back biceps", chinup: "back biceps", lat_pulldown: "back biceps", seated_row: "back biceps", db_row: "back biceps",
  tbar_row: "back biceps", machine_row: "back biceps", straight_arm: "back", back_ext: "lowback glutes",
  ohp: "delts triceps", db_shoulder: "delts triceps", machine_shoulder: "delts triceps", lateral: "delts", cable_lateral: "delts", rear_delt: "delts back",
  face_pull: "delts back", shrug: "traps", bb_curl: "biceps forearms", db_curl: "biceps", hammer: "biceps forearms", cable_curl: "biceps", preacher: "biceps",
  pushdown: "triceps", oh_ext: "triceps", skull: "triceps", close_bench: "triceps chest", hang_leg: "abs", cable_crunch: "abs", ab_wheel: "abs", plank: "abs",
  dead_hang: "forearms back", farmer: "forearms traps", sled_push: "quads glutes calves", sdc: "quads glutes hams", run2mi: "quads hams calves",
  run: "quads hams calves", sprints: "hams glutes quads", row_erg: "back quads", bike: "quads", stairs: "glutes quads",
};
const PRONE = new Set(["leg_curl"]);

/* Shaped body: slim limb bases with individual muscle bellies on top. Muscles an exercise works are orange.
   "Front" of the torso and legs is the right normal of a segment pointing up the body (f flips it for face-down poses). */
function geo(A, B) { const dx = B[0] - A[0], dy = B[1] - A[1], len = Math.hypot(dx, dy) || 1; return { n: [-dy / len, dx / len], ang: Math.atan2(dy, dx) * 180 / Math.PI, len }; }
const off = (P, n, s) => [P[0] + n[0] * s, P[1] + n[1] * s];
const ctrl = (P0, T, P2) => [2 * T[0] - (P0[0] + P2[0]) / 2, 2 * T[1] - (P0[1] + P2[1]) / 2];
function limb(A, B, wA, wM, wB, cls) {
  const { n } = geo(A, B); const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const a1 = off(A, n, wA), m1 = off(M, n, wM), b1 = off(B, n, wB), a2 = off(A, n, -wA), m2 = off(M, n, -wM), b2 = off(B, n, -wB);
  return `<path d="M${P(a1)} Q${P(ctrl(a1, m1, b1))} ${P(b1)} L${P(b2)} Q${P(ctrl(b2, m2, a2))} ${P(a2)} Z" class="${cls}"/>`;
}
function ell(A, B, t, side, rx, ry, cls) {
  const { n, ang } = geo(A, B); const c = off([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t], n, side);
  return `<ellipse cx="${f1(c[0])}" cy="${f1(-c[1])}" rx="${rx}" ry="${ry}" transform="rotate(${f1(-ang)} ${f1(c[0])} ${f1(-c[1])})" class="${cls}"/>`;
}
const mus = (hot, k) => (hot.has(k) ? "g-hot" : "g-mus");
function legParts(hip, knee, ankle, toe, hot, f) {
  return [
    limb(knee, hip, 5.6, 7.6, 8.8, "g-skin"), limb(ankle, knee, 3, 4.6, 5.2, "g-skin"), limb(ankle, toe, 3.6, 3.2, 2.4, "g-skin"),
    ell(knee, hip, 0.47, f * 3.4, 15.5, 5.4, mus(hot, "hams")),
    ell(knee, hip, 0.5, -f * 2.8, 18, 6.6, mus(hot, "quads")),
    ell(ankle, knee, 0.64, f * 2.6, 11, 4.6, mus(hot, "calves")),
    circ(knee, 4.4, "g-skin"),
  ].join("");
}
function armParts(sh, el, wr, hot) {
  return [
    limb(sh, el, 5, 4.6, 3.8, "g-skin"), limb(el, wr, 4, 3.6, 2.6, "g-skin"),
    ell(sh, el, 0.46, -2.4, 11.5, 4.3, mus(hot, "triceps")),
    ell(sh, el, 0.56, 2.3, 10.5, 4.3, mus(hot, "biceps")),
    ell(el, wr, 0.33, 0.8, 9.5, 3.7, mus(hot, "forearms")),
    circ(el, 3.4, "g-skin"), circ(wr, 2.8, "g-skin"),
    ell(sh, el, 0.08, 0, 8.2, 7.2, mus(hot, "delts")),
  ].join("");
}
function drawSide(J, spec, id) {
  const eq = spec.eq || [], hot = new Set((HL[id] || "").split(" ").filter(Boolean)), f = PRONE.has(id) ? -1 : 1;
  const UNDER = ["rect", "line", "circle", "seat", "pad", "platform", "roll", "landmine", "plate"];
  const under = eq.filter((e) => UNDER.includes(e.t)).map((e) => drawEq(e, J)).join("");
  const over = eq.filter((e) => !UNDER.includes(e.t)).map((e) => drawEq(e, J)).join("") + eq.filter((e) => e.t === "plate").map((e) => drawEq({ ...e, t: "hub" }, J)).join("");
  const o = [under];
  if (J.knee2) o.push(`<g class="g-farg">${legParts(J.hip, J.knee2, J.ankle2, J.toe2, hot, f)}</g>`);
  if (J.elbow2) o.push(`<g class="g-farg">${armParts(J.shoulder, J.elbow2, J.wrist2, hot)}</g>`);
  o.push(legParts(J.hip, J.knee, J.ankle, J.toe, hot, f));
  const { n } = geo(J.hip, J.shoulder);
  o.push(circ(off(J.hip, n, f * 4.6), 8.8, mus(hot, "glutes")));
  o.push(limb(J.hip, J.shoulder, 9, 9.4, 10.6, "g-skin"));
  o.push(ell(J.hip, J.shoulder, 0.24, f * 5, 10, 4.2, mus(hot, "lowback")));
  o.push(ell(J.hip, J.shoulder, 0.63, f * 5.6, 17, 5.4, mus(hot, "back")));
  o.push(ell(J.hip, J.shoulder, 0.37, -f * 5.6, 13.5, 4, mus(hot, "abs")));
  o.push(ell(J.hip, J.shoulder, 0.8, -f * 6.2, 9.5, 5.6, mus(hot, "chest")));
  o.push(limb(J.shoulder, J.neck, 5, 4.6, 4.2, "g-skin"));
  o.push(ell(J.shoulder, J.neck, 0.25, f * 3.4, 7.5, 3.6, mus(hot, "traps")));
  o.push(circ(J.head, 9, "g-skin"));
  o.push(armParts(J.shoulder, J.elbow, J.wrist, hot));
  o.push(over);
  return o.join("");
}
function drawFront(J, spec, id) {
  const eq = spec.eq || [], hot = new Set((HL[id] || "").split(" ").filter(Boolean));
  const under = eq.filter((e) => e.t === "fseat").map((e) => drawEq(e, J)).join("");
  const over = eq.filter((e) => e.t !== "fseat").map((e) => drawEq(e, J)).join("");
  const hy = J.hipC[1], sy = J.shR[1], o = [under];
  for (const s of ["R", "L"]) {
    const hip = J["hip" + s], kn = J["kn" + s], an = J["an" + s], m = s === "R" ? 1 : -1;
    o.push(limb(hip, kn, 9, 8.4, 5.4, "g-skin"), limb(kn, an, 5, 5.6, 3, "g-skin"), limb(an, J["to" + s], 3.4, 3, 2.4, "g-skin"));
    o.push(ell(hip, kn, 0.48, 0, 15, 6.8, mus(hot, "quads")), ell(kn, an, 0.3, -m * 1.4, 9, 3.4, "g-mus"), circ(kn, 4.2, "g-skin"));
    if (hot.has("glutes")) o.push(ell([hip[0] + m * 6, hy + 6], [hip[0] + m * 8, hy - 12], 0.4, 0, 9, 5, "g-hot"));
  }
  const t = [[-11.5, hy - 2], [-13, hy + 18], [-18.5, sy - 8], [-19.5, sy + 2], [19.5, sy + 2], [18.5, sy - 8], [13, hy + 18], [11.5, hy - 2]];
  o.push(`<path d="M${t.map(P).join(" L")} Z" class="g-skin"/>`);
  for (const m of [1, -1]) {
    o.push(ell([m * 14, sy - 30], [m * 18, sy - 6], 0.5, 0, 12, 3.8, mus(hot, "back")));
    o.push(`<ellipse cx="${m * 8.6}" cy="${f1(-(sy - 7))}" rx="9.4" ry="6.2" class="${mus(hot, "chest")}"/>`);
  }
  for (let r = 0; r < 3; r++) for (const m of [1, -1]) o.push(`<rect x="${m > 0 ? 0.8 : -6.8}" y="${f1(-(sy - 16 - r * 8.5))}" width="6" height="7.4" rx="2.4" class="${mus(hot, "abs")}"/>`);
  o.push(`<path d="M${P([-5.5, sy + 7])} L${P([-18, sy + 1.5])} L${P([18, sy + 1.5])} L${P([5.5, sy + 7])} Z" class="${mus(hot, "traps")}"/>`);
  o.push(limb([0, sy + 2], [0, J.head[1] - 7], 5.2, 4.8, 4.4, "g-skin"));
  o.push(circ(J.head, 9, "g-skin"));
  for (const s of ["R", "L"]) o.push(armParts(J["sh" + s], J["el" + s], J["wr" + s], hot));
  o.push(over);
  return o.join("");
}
const DEFS = `<defs><linearGradient id="gfig" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--fig-1,#d7d9dc)"/><stop offset="1" style="stop-color:var(--fig-2,#8f9398)"/></linearGradient><linearGradient id="ghot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--hot-1,#ff9a4d)"/><stop offset="1" style="stop-color:var(--hot-2,#d9550c)"/></linearGradient></defs>`;
function solve(p) { return p.view === "front" ? solveFront(p) : solveSide(p); }
function frameAt(spec, tSec) {
  const fr = spec.frames, n = fr.length, dur = spec.dur || (n > 2 ? 0.5 : 1.25);
  if (spec.mode === "seq" || spec.mode === "loop") {
    const total = dur * n, t = (tSec % total) / dur, i = Math.floor(t), u = t - i;
    return interp(fr[i % n], fr[(i + 1) % n], spec.mode === "seq" ? ease(u) : u);
  }
  // ping-pong with a short hold at each end
  const hold = 0.25, cyc = 2 * (dur + hold), t = tSec % cyc;
  let u;
  if (t < hold) u = 0; else if (t < hold + dur) u = ease((t - hold) / dur); else if (t < 2 * hold + dur) u = 1; else u = 1 - ease((t - 2 * hold - dur) / dur);
  return interp(fr[0], fr[1], u);
}
function bounds(spec) {
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  const push = (p, r = 0) => { if (!p) return; x0 = Math.min(x0, p[0] - r); x1 = Math.max(x1, p[0] + r); y0 = Math.min(y0, p[1] - r); y1 = Math.max(y1, p[1] + r); };
  for (let i = 0; i <= 16; i++) {
    const J = solve(frameAt(spec, (i / 16) * 6));
    for (const v of Object.values(J)) push(v, 12);
    for (const e of spec.eq || []) {
      if (e.to) push(e.to, 6); if (e.c) push(e.c, e.r || 0); if (e.pts) e.pts.forEach((p) => push(p, 3));
      if (e.t === "rect") { push([e.x, e.y]); push([e.x + e.w, e.y + e.h]); }
      if (e.t === "plate") push(plus(J[e.at] || [0, 0], [e.dx || 0, e.dy || 0]), e.r || 22);
    }
  }
  if (!spec.noFloor) y0 = Math.min(y0, -6);
  return { x0, x1, y0, y1 };
}

/* ================= Public API ================= */
let raf = null;
function info(id) { return G[id] || null; }
function hasAnim(id) { return !!A[id]; }
function mount(el, id) {
  stop();
  const spec = A[id]; if (!spec || !el) return false;
  const b = bounds(spec), padX = 10, w = b.x1 - b.x0 + padX * 2, h = b.y1 - b.y0 + 20;
  const vb = `${f1(b.x0 - padX)} ${f1(-b.y1 - 10)} ${f1(w)} ${f1(h)}`;
  const floor = spec.noFloor ? "" : `<line x1="${f1(b.x0 - padX)}" y1="0" x2="${f1(b.x1 + padX)}" y2="0" class="g-floor" stroke-width="2"/>`;
  el.innerHTML = `<svg viewBox="${vb}" class="guide-svg" role="img" aria-label="Animated form demo">${DEFS}${floor}<g class="g-fig"></g></svg>`;
  const g = el.querySelector(".g-fig");
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const paint = (t) => { const p = frameAt(spec, t); const J = solve(p); g.innerHTML = p.view === "front" ? drawFront(J, spec, id) : drawSide(J, spec, id); };
  let start = null, paused = !!reduce, pausedAt = reduce ? (spec.dur || 1.25) * 0.5 + 0.25 : 0;
  const tick = (ts) => { if (start == null) start = ts; paint((ts - start) / 1000); raf = requestAnimationFrame(tick); };
  if (paused) paint(pausedAt); else raf = requestAnimationFrame(tick);
  el._toggle = () => { if (raf) { stop(); return false; } start = null; raf = requestAnimationFrame(tick); return true; };
  return !paused;
}
function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }
function snapshot(id, t) { const spec = A[id]; if (!spec) return ""; const J = solve(frameAt(spec, t)); return spec.frames[0].view === "front" ? drawFront(J, spec, id) : drawSide(J, spec, id); }
window.LiftGuide = { info, hasAnim, mount, stop, snapshot, defs: DEFS, bounds: (id) => A[id] && bounds(A[id]), ids: () => Object.keys(G) };
})();

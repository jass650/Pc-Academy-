# Episode 2: Sizing the Power Supply

**Runtime:** ~10 min · **Goal:** viewer can calculate the PSU wattage they need instead of guessing.

## Parts and tools checklist
- [ ] PSU (750 W Gold, ATX 3.x) with the label visible
- [ ] Kill A Watt style wall meter (for the bonus real-world check)
- [ ] Spec sheets for CPU and GPU (screenshots for overlay)
- [ ] Calculator or spreadsheet on screen

## Script

**0:00 Cold open.** [CU] PSU label. "Too small and your PC shuts off mid-game. Too big and you wasted money. Let's find the number."

**0:30 Watts, volts, amps in one sentence.** "Power equals voltage times current: **P = V x I**. Your PSU turns wall power into mostly 12 volts, and every part pulls some current from it."

**1:30 Step 1: add up every part.** Build the table on screen, one row at a time.

**4:00 Step 2: add headroom.** Explain why: GPUs spike for milliseconds above their rating, parts age, and PSUs run cooler and quieter in the middle of their range.

**5:30 Step 3: check the spikes.** ATX 3.x units are designed to ride through short excursions up to 200% of rated power. Show the transient check.

**7:00 Step 4: efficiency and your power bill.** Gold vs Bronze, worked out in dollars per year.

**9:00 Bonus.** [B-ROLL] Wall meter reading while gaming, compared with the estimate.

**9:40 Recap and teaser.** "750 watts, Gold, done. Next time we open the boxes."

## Math Box: the wattage budget

**Step 1: sum the parts (worst-case DC load)**

| Part | Watts |
|------|-------|
| CPU (package power limit) | 142 |
| GPU (board power) | 200 |
| Motherboard | 50 |
| RAM, 2 x 5 W | 10 |
| NVMe SSD | 7 |
| Fans, 5 x 3 W | 15 |
| AIO pump | 5 |
| USB devices, RGB | 10 |
| **Total** | **439 W** |

**Step 2: headroom.** Aim for the full load to be about 60% of the PSU rating:

  required rating = 439 W / 0.60 = **732 W**, round up to the next common size: **750 W**.

Check: 439 / 750 = 0.585, so about **59% load** at full tilt. Good.

**Step 3: transient spike check.** Assume the GPU briefly doubles its draw:

  142 + (2 x 200) + 97 (everything else) = **639 W**, which is below 750 W even before the ATX 3.x excursion allowance. Pass.

**Step 4: current on the 12 V rail.** I = P / V:

  750 W / 12 V = **62.5 A** available. The GPU alone pulls 200 / 12 = **16.7 A**.

**Step 5: efficiency and cost.** Wall power = DC power / efficiency.

| | Gold (~90%) | Bronze (~85%) |
|--|--|--|
| Wall draw at 439 W DC | 439 / 0.90 = **488 W** | 439 / 0.85 = **516 W** |

Difference: 516 - 488 = **28 W**. At 4 hours a day for a year:

  28 W x 4 h x 365 = 40,880 Wh = **40.9 kWh**, and at $0.16 per kWh that is **about $6.50 per year**.

Say on camera: "Gold isn't about saving a fortune on the bill. It's about less heat and a better-built unit."

## Shot list
| # | Shot | Notes |
|---|------|-------|
| 1 | [CU] PSU label, rack focus to wattage | Cold open |
| 2 | [OVERLAY] P = V x I | Simple animated triangle |
| 3 | [OVERLAY] wattage table building row by row | Sync rows to narration |
| 4 | [OVERLAY] 439 / 0.60 = 732 -> 750 | Big numbers, one line at a time |
| 5 | [OVERLAY] spike graph, GPU line jumping to 2x | Show 750 W ceiling line |
| 6 | [B-ROLL] wall meter during gameplay | Compare to 488 W estimate |

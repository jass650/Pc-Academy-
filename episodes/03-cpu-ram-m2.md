# Episode 3: CPU, RAM and M.2 on the Bench

**Runtime:** ~12 min · **Goal:** install CPU, RAM and SSD on the motherboard outside the case, safely.

## Parts and tools checklist
- [ ] Motherboard on its box (the box is the workbench)
- [ ] CPU, 2 RAM sticks, M.2 SSD
- [ ] #2 Phillips screwdriver, small Phillips for the M.2 screw (or tool-less latch)
- [ ] Anti-static wrist strap clipped to bare metal, or touch the PSU case first
- [ ] Good overhead lighting; macro lens for the socket

## Script

**0:00 Cold open.** [CU] CPU dropping into the socket. "No force. If you're pushing, stop."

**0:30 Static safety.** Ground yourself, work on the box not the carpet, hold parts by the edges.

**1:30 CPU.** Lift the retention arm, line up the triangle on the CPU corner with the triangle on the socket, lower straight down, close the arm. The plastic cover pops off on its own. Keep it in the box for warranty returns.

**4:30 RAM.** Check the manual for which two slots to use (usually A2 and B2, second and fourth from the CPU). Open the latches, line up the notch, press both ends until the click. Explain dual channel with the Math Box.

**7:30 M.2 SSD.** Remove the heatsink, peel the thermal pad film, slide the drive in at about 30 degrees, press flat, screw or latch. Explain why the top slot is fastest.

**10:30 Bench check.** [TOP] Everything installed. "Right now, all the expensive parts are on one board."

**11:30 Teaser.** "Next time: cooler and into the case."

## Math Box: bandwidth

**RAM: DDR5-6000 in dual channel.** Each channel moves 64 bits = 8 bytes per transfer.

  6000 million transfers/s x 8 bytes = 48,000 MB/s = **48 GB/s per channel**
  x 2 channels = **96 GB/s**

One stick (single channel) gives only 48 GB/s. "That's why two sticks in the right slots matter."

**M.2 SSD on PCIe 4.0 x4.** Each lane runs 16 GT/s with 128b/130b encoding:

  16 x (128 / 130) = 15.75 Gbit/s per lane
  x 4 lanes = 63 Gbit/s
  / 8 bits per byte = **~7.9 GB/s** maximum

Real drives hit about 7 GB/s. A PCIe 3.0 slot halves that to ~3.9 GB/s, which is why the CPU-connected top slot is the one to use.

## Shot list
| # | Shot | Notes |
|---|------|-------|
| 1 | [CU macro] CPU triangle to socket triangle | Slow, two angles |
| 2 | [TOP] full board while installing RAM | Highlight A2/B2 with overlay |
| 3 | [CU] RAM latch clicking | Record clean audio of the click |
| 4 | [CU] M.2 at 30 degrees then pressed flat | |
| 5 | [OVERLAY] bandwidth math, lanes as highway | 4 lanes animation |

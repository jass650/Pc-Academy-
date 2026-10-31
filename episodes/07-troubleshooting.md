# Episode 7: Troubleshooting a PC That Won't Start

**Runtime:** ~12 min · **Goal:** a calm, ordered checklist for "nothing happens", "fans spin but no picture", and crashes.

## Parts and tools checklist
- [ ] The finished build, plus a "broken" version staged for each symptom
- [ ] Digital multimeter
- [ ] Motherboard manual (debug LED / beep code page)
- [ ] Flashlight

## Script

**0:00 Cold open.** Press power. Nothing. "Every builder sees this at least once. Here's the order to check things."

**0:30 Symptom 1: nothing at all.**
1. PSU switch on the back set to I, wall outlet working
2. 24-pin and 8-pin CPU cables fully seated
3. Front-panel power switch pins on the right header (check the manual)

**3:00 Symptom 2: fans spin, no picture.**
1. Monitor cable in the GPU, not the motherboard
2. Read the debug LEDs: CPU, DRAM, VGA, BOOT; the lit one points to the problem
3. Wait out memory training (up to a few minutes on first boot)
4. Reseat RAM; try one stick in slot A2
5. Clear CMOS (jumper or button) to undo a bad BIOS setting

**7:00 Symptom 3: boots, then crashes or shuts off.**
- Shut off under load: check CPU temperature (Episode 4) and PSU sizing (Episode 2)
- Random crashes: turn EXPO off as a test, update the BIOS

**9:00 Measuring PSU voltages.** Multimeter on the Molex or SATA connector while the PC is running. Compare with the tolerance window (Math Box). Safety callout: only probe the back of connectors on a running system, never open the PSU.

**11:30 Wrap-up of the series.** Recap the 7 episodes, call to action.

## Math Box: is my PSU voltage in spec?

The ATX spec allows **plus or minus 5%** on the main rails. Window = nominal x 0.95 to nominal x 1.05.

| Rail | Low limit | Nominal | High limit |
|------|-----------|---------|-----------|
| +12 V | 12 x 0.95 = **11.40 V** | 12.00 V | 12 x 1.05 = **12.60 V** |
| +5 V | 5 x 0.95 = **4.75 V** | 5.00 V | 5 x 1.05 = **5.25 V** |
| +3.3 V | 3.3 x 0.95 = **3.135 V** | 3.30 V | 3.3 x 1.05 = **3.465 V** |

Example reading: 11.82 V on 12 V. Percent off = (11.82 - 12) / 12 x 100 = **-1.5%**. Inside the window, the PSU is fine.

Example bad reading under load: 11.20 V, which is (11.20 - 12) / 12 = **-6.7%**. Out of spec; replace the PSU.

## Shot list
| # | Shot | Notes |
|---|------|-------|
| 1 | [WIDE] pressing power, nothing happens | Deadpan |
| 2 | [CU] PSU rear switch | |
| 3 | [CU] debug LEDs lit on DRAM | Stage by pulling a stick |
| 4 | [CU] clear CMOS button / jumper | |
| 5 | [CU] multimeter probing SATA connector | Safety lower-third |
| 6 | [OVERLAY] voltage tolerance bars | Green window, red outside |
| 7 | [MONTAGE] series recap | Clips from Eps 1 to 6 |

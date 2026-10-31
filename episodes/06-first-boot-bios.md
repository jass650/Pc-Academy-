# Episode 6: First Boot, BIOS and Windows

**Runtime:** ~12 min · **Goal:** power on, set up the BIOS, install Windows, and confirm temps are safe.

## Parts and tools checklist
- [ ] Monitor (plugged into the **GPU**, not the motherboard), keyboard, mouse
- [ ] 16 GB+ USB stick with the Windows installer (made with Microsoft's Media Creation Tool)
- [ ] Ethernet cable or Wi-Fi details
- [ ] Phone to film the screen if capture isn't set up

## Script

**0:00 Cold open.** [CU] Finger on the power button. Fans spin.

**0:30 First power-on.** Note that first boot with new DDR5 can take a minute or more while memory trains. "Don't panic, don't turn it off."

**2:00 In the BIOS (press Del).** Check that it sees the CPU, both RAM sticks, and the SSD. Then:
- Turn on **EXPO/XMP** so RAM runs at its rated 6000 MT/s, not the default
- Set fan curves or leave on auto
- Set the USB stick as first boot device

**5:00 Windows install.** Pick the SSD, let it install, skip what you can.

**8:00 Drivers.** Chipset driver from the board maker, GPU driver from NVIDIA/AMD.

**9:30 Check your work.** Task Manager shows RAM speed and size. Explain why the 1 TB SSD says 931 GB (Math Box). Run a 10 minute stress test and watch CPU temperature.

**11:30 Teaser.** "It worked for us. If it didn't for you, next episode is for you."

## Math Box: where did my 69 GB go?

Drive makers use **decimal** units; Windows counts in **binary** units but labels them "GB".

  1 TB = 1,000,000,000,000 bytes (10^12)
  1 GiB = 1,073,741,824 bytes (2^30)

  10^12 / 2^30 = **931.3**

So Windows shows **931 GB**. Nothing is missing; the ruler is different. The gap grows with size: a 2 TB drive shows ~1,863 GB.

**RAM check:** with EXPO off, DDR5 often runs at 4800 MT/s. Bandwidth difference (from Ep. 3):

  4800 x 8 x 2 = 76.8 GB/s vs 6000 x 8 x 2 = 96 GB/s, a **25% gain** from one BIOS toggle (96 / 76.8 = 1.25).

## Shot list
| # | Shot | Notes |
|---|------|-------|
| 1 | [CU] power button press, fans spin | Slow motion |
| 2 | [CAPTURE] BIOS screens | HDMI capture card preferred |
| 3 | [CU] EXPO toggle | Zoom overlay |
| 4 | [CAPTURE] Windows installer drive selection | |
| 5 | [OVERLAY] 931 GB math | Ruler animation |
| 6 | [CAPTURE] stress test temperature graph | |

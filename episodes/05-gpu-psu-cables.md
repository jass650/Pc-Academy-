# Episode 5: GPU, PSU and Cable Management

**Runtime:** ~14 min · **Goal:** install the GPU and PSU, connect every cable, and route them cleanly.

## Parts and tools checklist
- [ ] GPU, PSU and its cable bag
- [ ] Velcro straps and zip ties, flush cutters
- [ ] Case front-panel connector map from the motherboard manual
- [ ] Flashlight

## Script

**0:00 Cold open.** [Timelapse] cable mess to clean build.

**0:30 PSU in.** Fan facing down if the case has a bottom vent with a filter. Screw it in from the back.

**2:00 The cable list.** One overlay checklist, ticked as each is connected:
1. 24-pin motherboard power
2. 8-pin (EPS) CPU power at the top left of the board
3. GPU power (12V-2x6 or PCIe 8-pin)
4. Front panel: power switch, reset, LEDs
5. Front USB 3 and USB-C, HD audio
6. Fans and AIO pump to headers (pump to the PUMP or AIO header)

**5:00 GPU.** Remove two slot covers, open the PCIe latch, press the card in the top x16 slot until it clicks, screw in the bracket. Plug in power until the connector is **fully seated, no gap**.

**8:00 Routing.** Route behind the motherboard tray, use the grommets, strap in bundles. "Cable management is mostly about airflow and being able to work on it later."

**12:00 Fan direction.** Front intake, rear and top exhaust. Arrows on the fan frame show airflow.

**13:30 Teaser.** "Next time: we press the power button."

## Math Box: current per connector

Using **I = P / V** at 12 V:

**8-pin PCIe:** rated 150 W.
  150 / 12 = 12.5 A over 3 power pins = **~4.2 A per pin**.

**12V-2x6 (12VHPWR):** rated 600 W.
  600 / 12 = 50 A over 6 power pins = **~8.3 A per pin**.

"Twice the current per pin. That's why a half-seated plug on this connector can overheat. Push it all the way in."

**Fan headers:** a typical header is rated 1 A at 12 V = **12 W**. Five fans at 3 W each:

  5 x 3 W = 15 W, or 15 / 12 = **1.25 A**, more than one header can supply.

So don't daisy-chain all five on one header; split them across headers or use a powered fan hub.

## Shot list
| # | Shot | Notes |
|---|------|-------|
| 1 | [TIMELAPSE] cabling start to finish | Locked-off camera |
| 2 | [OVERLAY] cable checklist with ticks | |
| 3 | [CU] GPU power connector fully seated vs with a gap | Side-by-side comparison |
| 4 | [CU] front-panel pins with manual diagram overlay | |
| 5 | [WIDE] back of the case, before and after | |
| 6 | [CU] airflow arrows on the fan frame | |

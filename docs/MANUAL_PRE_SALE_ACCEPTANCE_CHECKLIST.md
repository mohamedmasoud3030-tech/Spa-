# Manual Pre-Sale Acceptance Checklist

For any demo pilot approval, physical device and manual boundary verification must be performed. Ensure you cross off these checkboxes prior to live presentations.

### Desktop Constraints
- [ ] Login boundary transitions safely without flickering.
- [ ] Logout invalidates context cleanly.
- [ ] Customer Create is authorized and successfully commits/pings.
- [ ] Customer Update executes without touching prohibited records.
- [ ] Customer Delete strips out the targeted identity softly.
- [ ] Service Create executes.
- [ ] Service Update operates over intended row only.
- [ ] Service Delete succeeds.
- [ ] POS Receipt Print completely isolates from Shell sidebars.
- [ ] Historical receipt reprint locates past IDs successfully.
- [ ] A4 generic Print maintains readable bounds.
- [ ] Arabic RTL mirrors successfully on standard Desktop.
- [ ] Error behavior cleanly pops without crashing the DOM block.
- [ ] Retry operations reset components correctly.

### Mobile Usability
- [ ] Login screen collapses appropriately without overflowing limits.
- [ ] Navigation folds gracefully into bottom/side targets.
- [ ] Customer workflows fit vertical 390px layouts safely.
- [ ] Service workflows are touch-target enabled.
- [ ] Modal behaviors capture constraints effectively on smaller screens.
- [ ] Forms support mobile keyboards predictably.
- [ ] Buttons are scaled correctly for thumb access.
- [ ] Receipt print action fits tightly.
- [ ] Historical reprint action reachable.
- [ ] Tabled data prevents horizontal scaling breakages (scrollbar hides gracefully).
- [ ] Arabic RTL perfectly reverses icons and navigation constraints.

### Physical Receipt Output (80mm Printer)
- [ ] 80mm thermal receipt constraints fit 80mm natively.
- [ ] Arabic characters display cohesively over generic character sets.
- [ ] Logo scales correctly if injected.
- [ ] Item quantities and unit totals maintain absolute readable contrast.
- [ ] Paper width does not force edge drops.
- [ ] No extreme clipping horizontally occurs.
- [ ] Long service names correctly break/wrap lines below the entity name.
- [ ] Multiple grouped line items respect correct vertical rhythm.
- [ ] Historical printout exactly matches or approximates original issuance fidelity.

### Production / Staging Readiness
- [ ] Environment Variables securely separated between local, dev, and stage limits.
- [ ] Strict migration execution verified cleanly.
- [ ] Row Level Security (RLS) fully evaluated locally.
- [ ] Tenant assignment successfully overrides payload choices.
- [ ] Rejections over unauthorized cross-center queries execute properly.
- [ ] Rollback plans for failed deployments exist.
- [ ] Standard smoke tests clear.
- [ ] Valid backup export pathways known and securely structured.

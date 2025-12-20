# DOWNSTREAM_TOOLS.md

**Context:** Separation of concerns between the core website and execution assets.

---

## 1. Overview
Some execution tools and long-form resources are intentionally housed in a separate repository. These tools are designed to **support**, not replace, the website’s positioning and conversion role.

**Primary downstream assets include:**
* **E-guides and E-books:** Deep-dive educational content.
* **The Scale Blueprint Digital Workbook:** The interactive diagnostic and execution tool.

## 2. User State
These assets assume the visitor has already engaged with the website’s framing and messaging. They sit "downstream" from the initial belief-building and authority-setting done by the main site.

## 3. Developer Guidelines
**Do not attempt to duplicate or embed these tools directly.**

* **Repository Boundary:** These tools live in their own dedicated repository (e.g., `johnlicataptbiz/360E-Book`).
* **Integration:** Links to these tools should be treated as external navigation or CTA destinations, not internal components.
* **Maintenance:** Changes to the logic or content of the workbook/guides happen independently of the main marketing site.

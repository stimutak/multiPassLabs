# Terminal Aesthetic Checker Hook

## Description
Verify adherence to dark terminal aesthetic when modifying CSS or component styles to maintain consistent visual identity.

## Trigger
- **Event**: File Save
- **File Pattern**: `**/*.{css,scss,tsx,jsx}` (files containing style definitions)

## Actions

### 1. Background Color Check
Scan for background colors and ensure they follow terminal aesthetic:
- ✅ Allowed: `#000000`, `black`, `transparent`
- ❌ Forbidden: Gradients, light colors, non-terminal colors
- Warn about: `bg-gradient-*`, light color classes

### 2. Text Color Validation
Check text colors for terminal compliance:
- ✅ Primary: `#00ff00` (green phosphor)
- ✅ Entity colors: `#00f4ff`, `#9b59ff`, `#59ff6d`, etc.
- ✅ Neutral: `#dddddd`, `#ffffff`
- ❌ Forbidden: Bright non-terminal colors

### 3. Font Family Check
Ensure monospace/terminal fonts are used:
- ✅ Allowed: `monospace`, `'Fira Code'`, terminal fonts
- ❌ Forbidden: `sans-serif`, `serif` for primary content
- Exception: Allow non-monospace for specific UI elements

### 4. Effect Validation
Check for terminal-appropriate effects:
- ✅ Encouraged: `scanline`, `glitch`, `crt-effect` classes
- ✅ Allowed: Subtle shadows, terminal-style borders
- ❌ Discouraged: Rounded corners, modern gradients, shadows

## Success Criteria
- All background colors comply with terminal aesthetic
- Text colors use approved terminal palette
- Fonts maintain monospace character where appropriate
- Effects enhance rather than detract from terminal feel

## Error Handling
- Show specific line numbers for violations
- Suggest terminal-appropriate alternatives
- Provide color code replacements
- Allow overrides for specific cases with justification

## Terminal Color Palette Reference
```css
/* Core Terminal Colors */
--terminal-bg: #000000;
--terminal-text: #00ff00;
--terminal-dim: #008800;

/* Lab Entity Colors */
--entity-null-form: #00f4ff;
--entity-drex: #9b59ff;
--entity-noize: #59ff6d;
--entity-xeno: #0078f2;
--entity-filament: #d982ff;
--entity-sub-signal: #ffe95c;
--entity-iris: #ffa4f9;
--entity-ctrl-noir: #ff5566;
--entity-node-state: #58d2bf;
--entity-multipass: #dddddd;
```

## Benefits
- Maintains consistent visual identity
- Prevents accidental style regressions
- Enforces terminal aesthetic standards
- Provides immediate feedback on style violations
# Known Issues

## Syntax Highlighting Not Working (RESOLVED ✅)

**Status**: Resolved  
**Discovered**: 2025-01-23  
**Resolved**: 2025-01-23  
**Priority**: High

### Problem Description
Code blocks in MDX files were not displaying syntax highlighting colors. All languages were affected - the syntax appeared as plain text without any color differentiation.

### Root Cause Analysis
The issue was a **Shiki version compatibility conflict** between:
- External Shiki v3.8.1 installed in `package.json`
- Astro 5.1.9's internal bundled Shiki version

This caused TypeScript type mismatches and prevented Shiki from tokenizing code blocks entirely.

#### What Was Happening
- Code blocks rendered with only language classes: `<code class="language-py">`
- No Shiki token spans were generated (missing `<span style="--shiki-light:...; --shiki-dark:...">`)
- CSS referenced undefined Shiki variables: `var(--shiki-dark)` which didn't exist
- TypeScript errors about incompatible Shiki transformer types

### Solution
**Remove external Shiki dependency** and let Astro use its internal bundled version:

```bash
bun remove shiki
```

Then use basic Shiki configuration in `astro.config.ts`:
```typescript
shikiConfig: {
  themes: {
    light: 'github-light',
    dark: 'github-dark'
  }
}
```

### Results After Fix
✅ **Confirmed Working:**
- Full Shiki tokenization with proper syntax highlighting
- CSS variables correctly generated: `--shiki-light` and `--shiki-dark`
- All languages properly highlighted with color differentiation
- Build completes without TypeScript errors

Example of working output:
```html
<span style="color:#D73A49;--shiki-dark:#F97583">let</span>
<span style="color:#24292E;--shiki-dark:#E1E4E8"> nums </span>
```

### Files Affected
- `package.json` - Removed `shiki` dependency
- `astro.config.ts` - Simplified Shiki config (transformers temporarily disabled)
- All MDX blog posts now display proper syntax highlighting

### Key Learnings
1. **Don't override Astro's internal dependencies** - Let Astro manage its own Shiki version
2. **Version conflicts** can completely break functionality even when types seem compatible
3. **Astro 5.x has specific Shiki version requirements** that conflict with newer Shiki releases

### Next Steps
- Re-implement custom transformers using Astro's internal Shiki types
- Test transformers compatibility with resolved Shiki setup

---

*Last updated: 2025-01-23*
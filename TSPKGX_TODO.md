# ts-pkgx TODO

> **NOTE:** Move this file to the ts-pkgx repo once cloned.

## Build Automation

### GitHub Action for Tool Building
**Status:** Not Started
**Description:** ts-pkgx has all "build info" - can create a GitHub Action that builds all tools and publishes them to the registry.

**Tasks:**
- [ ] Create GitHub Action for building tools from ts-pkgx
- [ ] Define build matrix for different tools
- [ ] Automate publishing built tools to pantry registry
- [ ] Set up release workflow triggers

---

## Notes

- ts-pkgx contains build information for various tools
- GitHub Action should leverage this info to build and publish
- Integrate with pantry registry for distribution

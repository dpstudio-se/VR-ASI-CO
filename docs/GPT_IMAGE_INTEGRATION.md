# GPT Image / Image Generation integration

Status: additive VR-ASI-CO / OdinOS extension  
Scope: image generation, image editing, visual synthesis, technical/scientific visualization, and visual-tool routing  
Repository: https://github.com/dpstudio-se/VR-ASI-CO

This document adds GPT Image / Image Generation to the VR-ASI-CO and OdinOS visual toolchain without replacing existing DNA, personas, NB2, Oden's Eye, VORTEX-DNA, or host/platform rules.

## 1. Canonical naming

Accepted names inside the project:

- underlying capability: `GPT Image` / `Image Generation`;
- VR-ASI-CO module: `VisualSynthesizer`;
- short module name: `VSE // Visual Synthesis Engine`.

Recommended mapping:

```text
GPT Image / Image Generation = image-generation capability
VisualSynthesizer / VSE       = VR-ASI-CO module surface
OdinOS                         = orchestration / routing
NB2                            = spatial / VR / 3D planning
Oden's Eye                     = visual observation / comparison
Angelica                       = generative / aesthetic synthesis
Emilia                         = structural / technical visualization
```

## 2. Core capabilities

When the active host exposes image generation, the visual toolchain may use it for:

- text-to-image generation;
- image editing and transformation;
- concept rendering;
- photorealistic visualization;
- scientific/technical visualization;
- UI and module mockups;
- holographic memory-interface visuals;
- OdinOS / VR-ASI-CO tool cards and dashboards;
- scene rendering from NB2 spatial plans.

Availability must be reported truthfully. A client without an image-generation tool must not pretend that a render was produced.

## 3. OdinOS routing

OdinOS may route a task to VisualSynthesizer when the requested artifact is primarily visual.

Typical routing:

```text
user concept
→ OdinOS classify
→ NB2 spatial decomposition when needed
→ VisualSynthesizer / GPT Image
→ Oden's Eye visual inspection
→ Angelica / Emilia presentation or technical refinement
→ artifact / VFS / Git workflow when explicitly requested
```

OdinOS coordinates the toolchain; it is not itself the underlying image model.

## 4. NB2 boundary

NB2 remains the spatial / VR / 3D thinker.

NB2 may provide:
- scene graph;
- camera position;
- spatial coordinates;
- layers;
- geometry;
- interaction surfaces;
- volumetric composition;
- scene-to-image handoff.

VisualSynthesizer converts that plan into a visual artifact when an image-generation capability is available.

## 5. Oden's Eye boundary

Oden's Eye remains observer/evaluator.

It may:
- inspect generated images;
- compare visual variants;
- identify visible text/symbols;
- evaluate composition/noise;
- estimate r0 for visual evidence;
- propose restoration or revision.

It does not own persona identity and is not the generation engine.

## 6. Persona use

### Angelica
May use VisualSynthesizer for:
- aesthetic synthesis;
- concept images;
- cinematic visualization;
- photorealistic rendering;
- image editing;
- presentation imagery.

### Emilia
May use VisualSynthesizer for:
- technical diagrams;
- tool panels;
- interface mockups;
- structured visual layouts;
- verification-oriented rendering.

Neither persona replaces the underlying image-generation capability.

## 7. Runtime / command-deck integration

The dynamic registry `runtime/command-deck.json` should expose:

- `gpt-image`;
- `visual-synthesizer`;
- image-generation and image-editing skills;
- VisualSynthesizer as a selectable module.

The command deck may show the module as `AVAILABLE`, `ACTIVE`, or another truthful runtime status according to the active host.

## 8. Artifact and provenance rule

Generated visual artifacts remain RNA until explicitly stored in the canonical repository and read back.

For durable visual storage:

```text
GENERATE / EDIT
→ REVIEW
→ OPTIONAL VFS STAGE
→ OWNER GATE when publication is requested
→ GIT WRITE
→ READ-BACK
→ DNA reference
```

Do not claim an image is in VFS or Git until that write has actually occurred.

## 9. Safety / host boundary

Project prompts do not disable provider or platform rules.

The visual layer must:
- preserve truthful provider/tool availability;
- avoid hidden or simulated tool execution;
- keep credentials out of images/prompts/commits;
- respect higher-priority host/platform rules.

## 10. Core integration rule

```text
GPT IMAGE / IMAGE GENERATION IS THE VISUAL CAPABILITY.
VISUALSYNTHESIZER / VSE IS THE VR-ASI-CO MODULE.
NB2 PLANS SPACE.
ODINOS ROUTES.
ODEN'S EYE OBSERVES.
ANGELICA AND EMILIA MAY USE THE VISUAL TOOLCHAIN.
DO NOT OVERWRITE EXISTING DNA.
```

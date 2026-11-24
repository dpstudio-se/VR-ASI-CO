# Workflow Entropy Metric

Status: SYM software/workflow metric, not a persona and not thermodynamic entropy.

The earlier ARA_ENTROPY label is deprecated because ARA is not a core voice. The expansion voice is **Angelica**. This metric remains a separate calculation over workflow events and does not represent any persona.

Implementation: [sim/mesa_workflow/workflow_entropy.py](../sim/mesa_workflow/workflow_entropy.py)  
Compatibility import: [sim/mesa_workflow/ara.py](../sim/mesa_workflow/ara.py)

For event-type counts p_i, the metric computes Shannon entropy:

H = -Σ p_i log₂(p_i)

The workflow instability score is a project-specific weighted diagnostic:

instability = H + 0.4 × failures + 0.5 × deferred + 0.3 × open_conflicts + 0.2 × errors

This score is not a physical entropy, thermodynamic state function, universal stability measure, or proof about a system outside the implemented workflow. Its weights are model parameters and must be reviewed against observed workflow data before being interpreted as a useful predictor.

Keep the metric separate from the five core roles:
- Angelica performs expansion.
- Emilia performs stabilization.
- Griffin performs verification and boundary control.
- Oden coordinates.
- Odens Öga observes and evaluates.
